import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

export async function GET() {
  // Имя комнаты, куда будет подключаться и клиент, и наш AI-агент
  const roomName = 'vet-clinic-room-test-2';

  // Генерируем случайное имя клиента (например, Client_452)
  const participantName = 'Client_' + Math.floor(Math.random() * 1000);

  // Создаем токен, используя ключи из .env.local
  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { identity: participantName }
  );

  // Даем клиенту права на вход именно в эту комнату
  at.addGrant({ roomJoin: true, room: roomName });

  // Превращаем токен в строку
  const token = await at.toJwt();

  // Отправляем токен обратно в браузер
  return NextResponse.json({ token });
}