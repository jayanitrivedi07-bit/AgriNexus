import { db } from '../config/firebase';
import { Farm, FarmSchema, CreateFarmInput, UpdateFarmInput } from '../models/farmModel';
import { FieldValue } from 'firebase-admin/firestore';

const FARMS_COLLECTION = 'farms';

export class FarmService {
  static async createFarm(ownerId: string, input: CreateFarmInput): Promise<Farm> {
    const data = { ...input, ownerId };
    FarmSchema.parse(data);

    const docRef = db.collection(FARMS_COLLECTION).doc();
    
    const now = new Date().toISOString();
    
    await docRef.set({
      ...data,
      createdAt: now,
      updatedAt: now
    });
    
    return {
      id: docRef.id,
      ...data,
      createdAt: now,
      updatedAt: now
    } as Farm;
  }

  static async getFarmsByOwner(ownerId: string): Promise<Farm[]> {
    const snapshot = await db.collection(FARMS_COLLECTION)
      .where('ownerId', '==', ownerId)
      .get();
      
    if (snapshot.empty) {
      return [];
    }
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Farm[];
  }
  
  static async getFarm(farmId: string, ownerId: string): Promise<Farm | null> {
    const doc = await db.collection(FARMS_COLLECTION).doc(farmId).get();
    
    if (!doc.exists) {
      return null;
    }
    
    const data = doc.data();
    if (data?.ownerId !== ownerId) {
      return null; // Don't allow access if not owner
    }
    
    return { id: doc.id, ...data } as Farm;
  }

  static async updateFarm(farmId: string, ownerId: string, input: UpdateFarmInput): Promise<Farm | null> {
    const farmRef = db.collection(FARMS_COLLECTION).doc(farmId);
    const doc = await farmRef.get();
    
    if (!doc.exists || doc.data()?.ownerId !== ownerId) {
      return null;
    }
    
    const now = new Date().toISOString();
    
    await farmRef.update({
      ...input,
      updatedAt: now
    });
    
    const updated = await farmRef.get();
    return { id: updated.id, ...updated.data() } as Farm;
  }
  
  static async deleteFarm(farmId: string, ownerId: string): Promise<boolean> {
    const farmRef = db.collection(FARMS_COLLECTION).doc(farmId);
    const doc = await farmRef.get();
    
    if (!doc.exists || doc.data()?.ownerId !== ownerId) {
      return false;
    }
    
    await farmRef.delete();
    return true;
  }
  
  static async getFarmTwin(farmId: string, ownerId: string): Promise<any> {
    const farm = await this.getFarm(farmId, ownerId);
    if (!farm) return null;
    
    // In a full implementation, this would fetch from soil, weather, risks, etc.
    // For MVP phase 3, we just return the farm data structured as a twin.
    return {
      farm,
      latestSoil: null,
      currentWeather: null,
      vegetation: null,
      risks: [],
      recentChanges: [],
      latestAdvisory: null
    };
  }
}
