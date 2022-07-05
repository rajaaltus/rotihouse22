export type IProduct = {
  id: number;
  name: string;
  price: string;
  image: Image;
};
export type LoginRequest = {
  identifier: string;
  password: string;
};

export type AuthState = {
  authReady: boolean;
  user: {};
  error: string;
  authorize: (access_token: string | string[], provider: string) => void;
  login: (data: LoginRequest) => void;
};

export type CommonState = {
  filterKey: number;
  filteredProducts: CartItem[];
  allProducts: CartItem[];
  totalProducts: number;
  initFilter: (payload: CartItem[]) => void;
  setFilter: (payload: number) => void;
  typeFilter: (payload: string) => void;
  clearFilter: () => void;
};
export type Image = {
  id: number;
  name: string;
  ext: string;
  url: string;
  alternativeText: string | null;
};
export type Category = {
  id: number;
  name: string;
  type: string;
  image: Image;
};
export type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  active: boolean;
  featured: boolean;
  category: Category;
  new: boolean;
  cooking_time: number;
  image: Image;
  qty: number;
};
export type CartState = {
  cartItems: CartItem[];
  checkout: boolean;
  itemCount: number;
  total: string;
  increase: (payload: CartItem) => void;
  decrease: (payload: CartItem) => void;
  addProduct: (payload: CartItem) => void;
  removeProduct: (payload: CartItem) => void;
};
