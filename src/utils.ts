import { WeatherData, DailySummary, City } from './types';

export const CITIES: City[] = [
  {
    id: 'tokyo',
    name: '東京',
    latitude: 35.6785,
    longitude: 139.6823
  },
  {
    id: 'osaka',
    name: '大阪',
    latitude: 34.6937,
    longitude: 135.5023
  },
  {
    id: 'nagoya',
    name: '名古屋',
    latitude: 35.1815,
    longitude: 136.9066
  }
];

export const fetchWeatherData = async (city: City): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m&timezone=Asia%2FTokyo`
  );
  return response.json();
};

export const calculateDailySummaries = (data: WeatherData): DailySummary[] => {
  const dailyData: { [key: string]: number[] } = {};

  data.hourly.time.forEach((time, index) => {
    const date = time.split('T')[0];
    const temp = data.hourly.temperature_2m[index];
    
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(temp);
  });

  return Object.entries(dailyData).map(([date, temps]) => ({
    date,
    min: Math.min(...temps),
    max: Math.max(...temps),
    avg: Number((temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1))
  }));
};