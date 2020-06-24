import { OrderStatus } from 'delever/lib/constants';

export enum PaymentType {
  Cash = 'cash',
  Card = 'card',
}

export type DataWithID = {
  id: number;
};

export type MealCategory = {
  id: number;
  name: string;
  image: string;
};

export type MealSize = {
  id: number;
  name: string;
  extra_price: number;
  is_available: boolean;
};

export type MealAddition = {
  id: number;
  name: string;
  extra_price: number;
  is_available: boolean;
};

export type MenuMeal = {
  id: number;
  name: string;
  price: number;
  is_available: boolean;
  image: string;
  sizes: MealSize[];
  additions?: MealAddition[];
  category: MealCategory;
};

export type OrderMeal = {
  // id: number;
  name: string;
  count: number;
  price: number;
  size: MealSize | {};
  additions: null | MealAddition[];
  totalPrice: number;
};

export type Location = {
  address: string;
  reference_place: string;
  coordinates: {
    x: number;
    y: number;
  };
};

export type Vendor = {
  name: string;
  location: Location;
};

export type NewOrder = {
  meals: OrderMeal[];
  location?: Location;
  payment?: PaymentType;
  comments?: string;
  // totalPrice: number;
};

export type Order = {
  id: number;
  number: number;
  meal_price: number;
  delivery_price: number;
  payment: PaymentType;
  created_at: string;
  delivered_at: string | null;
  canceled_at: string | null;
  pick_up_at: string | null;
  meals: OrderMeal[];
  vendor: Vendor;
  location: Location;
  distance: number;
  courier: {
    id: number;
    name: string;
  } | null;
  status:
    | OrderStatus.PENDING_FOOD
    | OrderStatus.PENDING_COURIER
    | OrderStatus.PICKED_UP
    | OrderStatus.DELIVERED
    | OrderStatus.CANCELED;
};
