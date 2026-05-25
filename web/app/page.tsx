"use client";

import { useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
  BarVisualizer,
} from "@livekit/components-react";
import "@livekit/components-styles";

export default function VetClinicDemo() {
  const [token, setToken] = useState("");

  const connectToRoom = async () => {
    try {
      const res = await fetch("/api/token");
      const data = await res.json();
      setToken(data.token);
    } catch (e) {
      console.error("Ошибка при получении токена:", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-sans p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100">
        <div className="text-5xl mb-4">🐾</div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Хвостики</h1>
        <p className="text-slate-500 mb-8">
          Нажмите кнопку ниже, чтобы поговорить с нашим ИИ-администратором Анной. Потребуется доступ к микрофону.
        </p>

        {!token ? (
          <button
            onClick={connectToRoom}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-200"
          >
            Начать звонок
          </button>
        ) : (
          <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            connect={true}
            audio={true}
            video={false}
            onDisconnected={() => setToken("")}
          >
            {/* Этот компонент невидим, но он выводит звук бота в твои динамики */}
            <RoomAudioRenderer />
            
            <div className="flex flex-col items-center gap-6 mt-4">
              <div className="h-24 flex items-center justify-center w-full bg-slate-50 rounded-2xl">
                {/* Красивый прыгающий эквалайзер голоса */}
                <BarVisualizer
                  state="speaking"
                  barCount={5}
                  options={{ minHeight: 15, colors: ["#4f46e5", "#818cf8"] }}
                />
              </div>
              {/* Панель с кнопкой микрофона и отключения */}
              <VoiceAssistantControlBar />
            </div>
          </LiveKitRoom>
        )}
      </div>
    </div>
  );
}