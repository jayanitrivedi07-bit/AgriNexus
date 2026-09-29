import { z } from 'zod';

export const LocationSchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([z.number(), z.number()]) // [longitude, latitude]
});

export const FarmSchema = z.object({
  ownerId: z.string(),
  name: z.string().min(1),
  countryCode: z.string().length(2),
  regionCode: z.string().min(1),
  location: LocationSchema,
  area: z.number().positive(),
  areaUnit: z.enum(['acre', 'hectare']),
  soilType: z.string(),
  irrigationType: z.string(),
  currentCropId: z.string(),
  growthStage: z.string(),
  sowingDate: z.string().optional(),
});

export type Farm = z.infer<typeof FarmSchema> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateFarmInput = Omit<z.infer<typeof FarmSchema>, 'ownerId'>;
export type UpdateFarmInput = Partial<CreateFarmInput>;
