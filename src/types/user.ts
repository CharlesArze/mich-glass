export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  address?: string | null;
  avatar?: string | null;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
}

export interface AddressForm {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage?: string | null;
  description?: string | null;
  category?: string | null;
  stock: number;
  rating: number;
  ratingCount: number;
  createdAt: string;
}

export interface BookForm {
  title: string;
  author: string;
  price: number;
  stock: number;
  description?: string;
  coverImage?: string;
  category?: string;
}
