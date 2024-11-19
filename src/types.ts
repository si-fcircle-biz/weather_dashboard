export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  hourly_units: {
    temperature_2m: string;
  };
}

export interface DailySummary {
  date: string;
  min: number;
  max: number;
  avg: number;
}

export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}