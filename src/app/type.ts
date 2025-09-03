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