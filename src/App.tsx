import { useEffect, useState } from 'react';
import { CloudSun } from 'lucide-react';
import { WeatherData, City } from './types';
import { fetchWeatherData, calculateDailySummaries, CITIES } from './utils';
import WeatherChart from './components/WeatherChart';
import DailySummary from './components/DailySummary';
import DateRangeSelector from './components/DateRangeSelector';
import CitySelector from './components/CitySelector';

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setWeatherData(null); // Reset data while loading
        const data = await fetchWeatherData(selectedCity);
        setWeatherData(data);
        // Set initial date range
        if (data.hourly.time.length > 0) {
          setStartDate(data.hourly.time[0].split('T')[0]);
          setEndDate(data.hourly.time[data.hourly.time.length - 1].split('T')[0]);
        }
      } catch (err) {
        setError('Failed to load weather data. Please try again later.');
      }
    };
    loadData();
  }, [selectedCity]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center p-4">{error}</div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading weather data...</div>
      </div>
    );
  }

  const filteredData: WeatherData = {
    ...weatherData,
    hourly: {
      time: weatherData.hourly.time.filter((time, index) => {
        const date = time.split('T')[0];
        return date >= startDate && date <= endDate;
      }),
      temperature_2m: weatherData.hourly.temperature_2m.filter((_, index) => {
        const date = weatherData.hourly.time[index].split('T')[0];
        return date >= startDate && date <= endDate;
      })
    }
  };

  const dailySummaries = calculateDailySummaries(filteredData);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center gap-3 mb-8">
          <CloudSun size={32} className="text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">天気予報</h1>
            <p className="text-gray-500">Temperature forecast</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CitySelector
            cities={CITIES}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
          <DateRangeSelector
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            minDate={weatherData.hourly.time[0].split('T')[0]}
            maxDate={weatherData.hourly.time[weatherData.hourly.time.length - 1].split('T')[0]}
          />
        </div>

        <WeatherChart data={filteredData} cityName={selectedCity.name} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dailySummaries.map((summary) => (
            <DailySummary key={summary.date} summary={summary} />
          ))}
        </div>
      </div>
    </div>
  );
}