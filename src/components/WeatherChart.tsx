import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WeatherData } from '../types';

interface Props {
  data: WeatherData;
}

export default function WeatherChart({ data }: Props) {
  const chartData = data.hourly.time.map((time, index) => ({
    time: new Date(time).toLocaleTimeString('ja-JP', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    }),
    date: new Date(time).toLocaleDateString('ja-JP', { 
      month: 'short',
      day: 'numeric'
    }),
    temp: data.hourly.temperature_2m[index]
  }));

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="time"
            interval={23}
            tickFormatter={(time, index) => chartData[index * 24]?.date || ''}
            className="text-sm"
          />
          <YAxis 
            domain={['dataMin - 1', 'dataMax + 1']}
            unit="°C"
            className="text-sm"
          />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            labelFormatter={(label, data) => `${data[0]?.payload.date} ${label}`}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}