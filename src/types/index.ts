export interface Game {
  id: number | string;
  name: string;
  price: number | string;
  genre: string;
  rating: number;
  cover: string;
  desc?: string;
  release?: string;
  developers?: string;
  publishers?: string;
  platforms?: string;
  footage?: string[];
}

export interface User {
  id: number | string;
  name: string;
  email: string;
  password?: string;
}

export interface CartItem extends Game {
  quantity: number;
}

export interface Order {
  id?: number | string;
  userId: number | string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: string;
}

export interface WishlistItem {
  id?: number | string;
  userId: number | string;
  gameId: number | string;
}