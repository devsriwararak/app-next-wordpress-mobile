// src/app/components/ProductWidget.tsx
'use client'

import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  slug: string; // เพิ่ม slug เพื่อใช้ในการสร้าง URL
}

export default function ProductWidget({ products }: { products: Product[] }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>สินค้าแนะนำ</h1>
      <p>เลือกสินค้าที่คุณสนใจเพื่อดูรายละเอียด</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <h2>{product.name}</h2>
            {/* ลิงก์ไปยังหน้ารายละเอียดสินค้าใน Next.js */}
            {/* <Link href={`/lists/${product.slug}`} passHref target="_top">
              <button style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                ดูรายละเอียด
              </button>
            </Link> */}
            <a
              href={`https://mittrathaiphone.com/lists/${product.slug}`}
              target="_top"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                ดูรายละเอียด
              </button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}