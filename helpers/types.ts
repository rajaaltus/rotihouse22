export type IProduct = {
  id: number;
  name: string;
  price: string;
  image: Image;
  new: string;
};
export type LoginRequest = {
  identifier: string;
  password: string;
};

export type AuthState = {
  authReady: boolean;
  user: {} | null;
  error: string;
  authorize: (access_token: string | string[], provider: string) => void;
  login: (data: LoginRequest) => void;
};

export type CommonState = {
  filterKey: number;
  filteredProducts: CartItemType[];
  allProducts: CartItemType[];
  totalProducts: number;
  initFilter: (payload: CartItemType[]) => void;
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
  dishes: IProduct;
};
export type CartItemType = {
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
  cartItems: CartItemType[];
  checkout: boolean;
  itemCount: number;
  total: string;
  increase: (payload: CartItemType) => void;
  decrease: (payload: CartItemType) => void;
  addProduct: (payload: CartItemType) => void;
  removeProduct: (payload: CartItemType) => void;
};
