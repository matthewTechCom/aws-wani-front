"use client"
import React, { useEffect, useState } from "react";
import { DailyReport as DailyReportType } from './types/report';
import { DailyReport } from "./components/DailyReport";
import { Calendar } from "./components/Calender";
import { useUser } from "./context/UserContext";
import { useRouter } from "next/navigation";

//ダミーデータ
const sampleReports: { [key: string]: DailyReportType } = {
  '2024-03-16': {
    date: '2024-03-16',
    reflection: '・営業もリサーチできてその日の内に解決できない内容が増えた\n・オフラインの時間の意識が足',
    improvement: 'プランニングの際、オフラインを作ることを意識して、時間を確保\nしていく。その中で当日に区切りをいかに作れるかを検討した\nり、より時間を意識してタスクの調整がなんとかなりそうです'
  }
};

export default function Home() {
  const { accessToken } = useUser();
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const router = useRouter();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const getReport = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return sampleReports[dateString];
  };

  useEffect(() => {
    if (accessToken === undefined) return;

    if (!accessToken) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:8080/api/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();

          if (res.status === 401 || text.includes("Invalid token")) {
            console.warn("アクセストークンが無効です。ログイン画面へ遷移します。");
            router.push("/login");
            return;
          }

          throw new Error(text);
        }
        return res.json();
      })
      .then((data) => {
        if (data) setMessage(data.message);
      })
      .catch((err) => console.error("Fetch error:", err.message));
  }, [accessToken, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">ホーム</h1>
          <h2 className="text-sm text-gray-600">{message}</h2>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-73px)]">
        <div className="flex gap-8 h-full">
          <div className="w-1/2">
            <div className="bg-white rounded-2xl shadow-md h-full p-6">
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="bg-white rounded-2xl shadow-md h-full p-6">
              <DailyReport
                date={selectedDate}
                report={getReport(selectedDate)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
