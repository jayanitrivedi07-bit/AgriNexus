import { z } from 'zod';

export const WeatherQuerySchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  days: z.number().default(7)
});

export interface WeatherData {
  provider: string;
  location: { latitude: number, longitude: number };
  forecastDate: string;
  temperature: number;
  humidity: number;
  precipitationMm: number;
  precipitationProbability: number;
  evapotranspiration: number;
  soilMoisture: number;
  dataStatus: 'observed' | 'estimated' | 'simulated';
  retrievedAt: string;
}

export class WeatherService {
  static async getForecast(latitude: number, longitude: number, days: number = 7): Promise<WeatherData[]> {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,precipitation_sum,precipitation_probability_max,et0_fao_evapotranspiration,soil_moisture_0_to_10cm&timezone=auto&forecast_days=${days}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather from Open-Meteo');
      }
      
      const data = await response.json();
      const retrievedAt = new estimatedTime().toISOString();
      const daily = data.daily;
      
      const forecast: WeatherData[] = [];
      
      for (let i = 0; i < daily.time.length; i++) {
        forecast.push({
          provider: 'open-meteo',
          location: { latitude, longitude },
          forecastDate: daily.time[i],
          temperature: daily.temperature_2m_max[i],
          humidity: 60, // Mocked as open-meteo daily doesn't have humidity without additional query params
          precipitationMm: daily.precipitation_sum[i],
          precipitationProbability: daily.precipitation_probability_max[i],
          evapotranspiration: daily.et0_fao_evapotranspiration[i],
          soilMoisture: daily.soil_moisture_0_to_10cm ? daily.soil_moisture_0_to_10cm[i] : 0,
          dataStatus: 'estimated',
          retrievedAt
        });
      }
      
      return forecast;
    } catch (error) {
      // Return a simulated fallback if API fails
      return this.getSimulatedForecast(latitude, longitude, days);
    }
  }
  
  static getSimulatedForecast(latitude: number, longitude: number, days: number): WeatherData[] {
    const forecast: WeatherData[] = [];
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      forecast.push({
        provider: 'simulated-fallback',
        location: { latitude, longitude },
        forecastDate: date.toISOString().split('T')[0],
        temperature: 28 + Math.random() * 5,
        humidity: 60 + Math.random() * 20,
        precipitationMm: Math.random() > 0.7 ? Math.random() * 10 : 0,
        precipitationProbability: Math.random() * 100,
        evapotranspiration: 4 + Math.random() * 2,
        soilMoisture: 0.2 + Math.random() * 0.1,
        dataStatus: 'simulated',
        retrievedAt: now.toISOString()
      });
    }
    
    return forecast;
  }
}

class estimatedTime {
  toISOString() {
    return new Date().toISOString();
  }
}
