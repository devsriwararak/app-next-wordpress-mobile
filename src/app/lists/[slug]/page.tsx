// // src/app/products/[slug]/page.tsx
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// interface ProductImage {
//   id: number;
//   src: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   images: ProductImage[];
// }

// async function getProductBySlug(slug: string): Promise<Product | null> {
//   const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE;
//   const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
//   const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_KEY_SECRET;

//   if (!websiteUrl || !consumerKey || !consumerSecret) {
//     throw new Error("API credentials are not set in .env.local");
//   }

//   const credentials = btoa(`${consumerKey}:${consumerSecret}`);

//   try {
//     const response = await fetch(`${websiteUrl}/wp-json/wc/v3/products?slug=${slug}`, {
//       headers: {
//         Authorization: `Basic ${credentials}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data[0] || null; // คืนค่าสินค้าตัวแรกที่พบ
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return null;
//   }
// }

// export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
//   const product = await getProductBySlug(params.slug);

//   if (!product) {
//     notFound(); // แสดงหน้า 404 หากไม่พบสินค้า
//   }

//   return (
//     <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
//       <Link href="/" style={{ marginBottom: '2rem', display: 'block' }}>
//         &larr; กลับหน้าหลัก
//       </Link>
//       <h1>{product.name}</h1>
//       {product.images && product.images.length > 0 && (
//         <Image 
//           src={product.images[0].src} 
//           width={800} 
//           height={600} 
//           alt={product.name || 'Product image'} 
//           style={{ objectFit: 'cover', borderRadius: '8px' }}
//         />
//       )}
//       <p style={{ fontSize: '1.5rem', color: '#007bff' }}>ราคา: {product.price}</p>
//       <div dangerouslySetInnerHTML={{ __html: product.description }} />
//     </div>
//   );
// }




// src/app/products/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductImage {
  id: number;
  src: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: ProductImage[];
}

// export async function generateStaticParams() {
//   const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE;
//   const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
//   const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_KEY_SECRET;

//   if (!websiteUrl || !consumerKey || !consumerSecret) {
//     // If credentials are not set, return an empty array to prevent build failure.
//     return [];
//   }

//   const credentials = btoa(`${consumerKey}:${consumerSecret}`);

//   try {
//     const response = await fetch(`${websiteUrl}/wp-json/wc/v3/products`, {
//       headers: {
//         Authorization: `Basic ${credentials}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const products = await response.json();
//     // Return an array of objects, where each object has a 'slug' property.
//     return products.map((product: { slug: string }) => ({
//       slug: product.slug,
//     }));
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [];
//   }
// }

async function getProductBySlug(slug: string): Promise<Product | null> {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE;
  const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_KEY_SECRET;

  if (!websiteUrl || !consumerKey || !consumerSecret) {
    throw new Error("API credentials are not set in .env.local");
  }

  const credentials = btoa(`${consumerKey}:${consumerSecret}`);

  try {
    const response = await fetch(`${websiteUrl}/wp-json/wc/v3/products?slug=${slug}`, {
      headers: {
        Authorization: `Basic ${credentials}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[0] || null; // คืนค่าสินค้าตัวแรกที่พบ
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);


  if (!product) {
    notFound(); // แสดงหน้า 404 หากไม่พบสินค้า
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <Link href={process.env.NODE_ENV === "production" ? String(process.env.NEXT_PUBLIC_WEBSITE) : "/"} style={{ marginBottom: '2rem', display: 'block' }}>
        &larr; กลับหน้าหลัก
      </Link>
      <h1>{product.name}</h1>
      {product.images && product.images.length > 0 && (
        <Image 
          src={product.images[0].src} 
          width={800} 
          height={600} 
          alt={product.name || 'Product image'} 
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
      )}
      <p style={{ fontSize: '1.5rem', color: '#007bff' }}>ราคา: {product.price}</p>
      {/* <div dangerouslySetInnerHTML={{ __html: product.description }} /> */}
    </div>
  );
}