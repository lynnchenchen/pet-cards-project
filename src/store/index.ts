import { create } from 'zustand';
import { AppState, UserProfile } from '../types';

export const useStore = create<AppState>((set) => ({
  userProfile: {
    hasPet: false,
  },
  setUserProfile: (profile: Partial<UserProfile>) =>
    set((state) => ({
      userProfile: { ...state.userProfile, ...profile },
    })),
  locationData: {
    lat: 39.9042,
    lng: 116.4074,
    city: '北京市',
  },
  timeContext: new Date(),
}));
