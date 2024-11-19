import { DailySummary as DailySummaryType } from '../types';
import { Thermometer, ThermometerSun, ThermometerSnowflake } from 'lucide-react';

interface Props {
  summary: DailySummaryType;
}

export default function DailySummary({ summary }: Props) {
  const date = new Date(summary.date).toLocaleDateString('ja-JP', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-800">{date}</h3>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center gap-1 text-blue-500">
          <ThermometerSnowflake size={16} />
          <span>{summary.min}°C</span>
        </div>
        <div className="flex items-center gap-1 text-purple-500">
          <Thermometer size={16} />
          <span>{summary.avg}°C</span>
        </div>
        <div className="flex items-center gap-1 text-red-500">
          <ThermometerSun size={16} />
          <span>{summary.max}°C</span>
        </div>
      </div>
    </div>
  );
}