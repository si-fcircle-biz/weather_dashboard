import { City } from '../types';
import { MapPin } from 'lucide-react';

interface CitySelectorProps {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export default function CitySelector({ cities, selectedCity, onCityChange }: CitySelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={16} className="text-gray-500" />
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          都市を選択
        </label>
      </div>
      <select
        id="city"
        value={selectedCity.id}
        onChange={(e) => {
          const city = cities.find(c => c.id === e.target.value);
          if (city) onCityChange(city);
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {cities.map(city => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}