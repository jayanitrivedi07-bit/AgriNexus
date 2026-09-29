import { db } from '../config/firebase';
import { FieldZone } from '../models/fieldModel';

export class FieldService {
  static async createField(farmId: string, fieldData: Partial<FieldZone>): Promise<FieldZone> {
    const now = new Date().toISOString();
    const newField: FieldZone = {
      ...fieldData,
      farmId,
      name: fieldData.name || 'Unnamed Field',
      status: fieldData.status || 'active',
      createdAt: now,
      updatedAt: now
    } as FieldZone;

    const docRef = await db.collection('farms').doc(farmId).collection('fieldZones').add(newField);
    return { ...newField, id: docRef.id };
  }

  static async getFields(farmId: string): Promise<FieldZone[]> {
    const snapshot = await db.collection('farms').doc(farmId).collection('fieldZones').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FieldZone));
  }

  static async getField(farmId: string, fieldId: string): Promise<FieldZone | null> {
    const doc = await db.collection('farms').doc(farmId).collection('fieldZones').doc(fieldId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as FieldZone;
  }
}
