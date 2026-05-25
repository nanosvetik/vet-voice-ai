import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

export async function GET() {

  const roomName = 'vet-clinic-room-test-4';

  const participantName = 'Client_' + Math.floor(Math.random() * 1000);

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { identity: participantName }
  );

  at.addGrant({ roomJoin: true, room: roomName });

  const token = await at.toJwt();

  return NextResponse.json({ token });
}