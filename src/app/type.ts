export interface ProductImage {
  id: number;
  src: string;
}

export interface Product {
  id: number;
  name: string;
  images: ProductImage[];
  slug: string; // <-- Add the slug property here
  price : string
}