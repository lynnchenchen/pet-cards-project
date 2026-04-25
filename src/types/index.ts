export interface UserProfile {
  hasPet: boolean;
  petType?: 'dog' | 'cat' | 'other';
  petName?: string;
  petAge?: number;
  petTags?: string[];
  inEstrus?: boolean;
}

export interface NearbyPet {
  id: string;
  name: string;
  type: string;
  distance: string;
  tags: string[];
  image: string;
  ownerMessage?: string;
}

export interface AppState {
  userProfile: UserProfile;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  locationData: { lat: number; lng: number; city: string };
  timeContext: Date;
}
