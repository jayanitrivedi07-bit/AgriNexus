import { db } from '../config/firebase';
import { CooperationSignal } from '../models/cooperationModel';

export class CooperationService {
  static async publishSignal(signalData: Partial<CooperationSignal>): Promise<CooperationSignal> {
    const now = new Date().toISOString();
    const newSignal: CooperationSignal = {
      ...signalData,
      schemaVersion: '1.0',
      observedAt: signalData.observedAt || now,
      dataStatus: signalData.source === 'sensor' ? 'verified' : 'unverified'
    } as CooperationSignal;

    const docRef = await db.collection('cooperationSignals').add(newSignal);
    return { ...newSignal, id: docRef.id };
  }

  static async getSignalsByRegion(countryCode: string, regionCode: string): Promise<CooperationSignal[]> {
    const snapshot = await db.collection('cooperationSignals')
      .where('countryCode', '==', countryCode)
      .where('regionCode', '==', regionCode)
      .orderBy('observedAt', 'desc')
      .limit(50)
      .get();
      
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CooperationSignal));
  }
}
