export interface CooperationSignal {
  id?: string;
  countryCode: string;
  regionCode: string;
  signalType: 'pest' | 'disease' | 'weather_anomaly' | 'market_shift';
  value: string;
  unit: string;
  source: string; // 'farmer_reported', 'satellite', 'sensor'
  dataStatus: 'verified' | 'unverified';
  schemaVersion: string;
  observedAt: string;
}
