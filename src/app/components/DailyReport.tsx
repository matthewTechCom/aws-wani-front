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
    <div className="w-full h-full bg-white rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-8">
        {format(date, 'M月d日の日報の振り返り', { locale: ja })}
      </h2>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-4">反省点</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {report?.reflection || '日付を選択してください。ここにその日の反省点が表示されます'}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">改善点</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {report?.improvement || '日付を選択してください。ここにその日の改善点が表示されます'}
          </p>
        </section>
      </div>
    </div>
  );
}