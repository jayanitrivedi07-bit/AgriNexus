export interface FieldZone {
  id?: string;
  farmId: string;
  name: string;
  geometry?: any; // GeoJSON
  status: 'active' | 'fallow' | 'harvested';
  area?: number;
  cropType?: string;
  createdAt: string;
  updatedAt: string;
}
