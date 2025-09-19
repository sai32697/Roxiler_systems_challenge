export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
  role: 'admin' | 'user' | 'owner';
}

export interface Store {
  id: number;
  name: string;
  email?: string;
  address?: string;
  ownerId?: number;
  avgRating?: number | string;
  ratingCount?: number | string;
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  id: number;
  stars: number;
  comment?: string;
  userId: number;
  storeId: number;
  createdAt: string;
  updatedAt: string;
  User?: User;
  Store?: Store;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  address?: string;
  role?: 'user' | 'owner';
}

export interface RatingRequest {
  storeId: number;
  stars: number;
  comment?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}
