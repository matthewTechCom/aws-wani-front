import React from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { DailyReport as DailyReportType } from '@/app/types/report';

interface DailyReportProps {
  date: Date;
  report?: DailyReportType;
}

export function DailyReport({ date, report }: DailyReportProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {format(date, 'M月d日の日報の振り返り', { locale: ja })}
      </h2>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-green-700 mb-2">反省点</h3>
          <p className="text-gray-700 whitespace-pre-line bg-green-50 p-4 rounded-md shadow-sm">
            {report?.reflection || '日付を選択してください。ここにその日の反省点が表示されます'}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">改善点</h3>
          <p className="text-gray-700 whitespace-pre-line bg-blue-50 p-4 rounded-md shadow-sm">
            {report?.improvement || '日付を選択してください。ここにその日の改善点が表示されます'}
          </p>
        </section>
      </div>
    </div>
  );
}
