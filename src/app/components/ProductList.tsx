// src/app/components/ProductList.tsx
'use client'

import Image from "next/image";

interface ProductImage {
  id: number;
  src: string;
}

interface Product {
  id: number;
  name: string;
  images: ProductImage[];
}

export default function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div>ไม่พบสินค้า</div>;
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.images && product.images.length > 0 && (
            <Image 
              src={product.images[0].src} 
              width={500} 
              height={500} 
              alt={product.name || 'Product image'} 
              style={{ objectFit: 'cover' }}
            />
          )}
          <h2>{product.name}</h2>
        </li>
      ))}
    </ul>
  );
}