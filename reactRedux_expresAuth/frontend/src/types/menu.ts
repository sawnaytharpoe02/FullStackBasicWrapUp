import { BaseOptions } from "./user";

export interface BaseMenu {
  name: string;
  price: number;
}

export interface MenuSlice {
  menus: Menu[];
  isLoading: boolean;
  isError: null | string;
}

export interface CreateMenuParams extends BaseMenu, BaseOptions {}

export interface Menu extends BaseMenu {}
