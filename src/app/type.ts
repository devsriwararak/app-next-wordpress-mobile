export interface ProductImage {
  id: number;
  src: string;
}

export interface Product {
  id: number;
  name: string;
  images: ProductImage[];
  slug: string; 
  price : string
   attributes: ProductAttribute[];
}

export interface ProductById {
  id: number;
  name: string;
  slug: string;
  price: string;
  images: { src: string }[];
  attributes: {
    id: number;
    name: string;
    slug: string;
    position: number;
    visible: boolean;
    options: string[];
  }[];
  variations?: {
    id: number;
    price: string;
    sale_price?: string;
    description? :string;
    regular_price?: string;
    attributes: {
      name: string;
      option: string;
    }[];
  }[];
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
  slug: string
  
}

export interface DayOption {
  label: string;
  value: string; // price ของวันนั้น
  description?: string;
}

export interface Attribute {
    option: string;
    [key: string]: unknown; 
}
export interface Variation {
    price: string;
    description?: string;
    attributes: Attribute[];
}

export type Down = {
    id: number;
    name: string;
    sum: number;
};

export type deposit = {
      id: number;
    product_id: number;
    product_name :string
    price: number;
}

export type ShowTableType = {
  id: number |string
  mount : number
  interest : number
  downPayment : number
  excellent : number
  monthly : number
  sumAll : number
}

export interface ValueOptionType {
    label: string;
    value: string;
}