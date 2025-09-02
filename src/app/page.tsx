// // src/app/page.tsx

// import ProductWidget from "./components/ProductWidget";
// import { Product } from "./type"; // <-- Import the types

// // The getProducts function needs to fetch the 'slug' from the API
// async function getProducts(): Promise<Product[]> {
//   const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE;
//   const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
//   const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_KEY_SECRET;

//   if (!websiteUrl || !consumerKey || !consumerSecret) {
//     throw new Error("API credentials are not set in .env.local");
//   }

//   const credentials = btoa(`${consumerKey}:${consumerSecret}`);

//   try {
//     const response = await fetch(`${websiteUrl}/wp-json/wc/v3/products`, {
//       headers: {
//         Authorization: `Basic ${credentials}`
//       }
//     });
//     console.log({response});
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data: (Product & { slug: string })[] = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return [];
//   }
// }

// export default async function Home() {
//   const products = await getProducts();
// console.log("Key:", process.env.NEXT_PUBLIC_CONSUMER_KEY);

//   return (
//     <div>
//       <h1>สินค้าแนะนำ 0001</h1>
//       <ProductWidget products={products} />
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import ProductWidget from "./components/ProductWidget";
import { Product } from "./type";
import PageHome from "./components/Home";

export default function Home() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const response = await fetch("/api/products");
  //       const data: Product[] = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchProducts();
  // }, []);

  // if (loading) return <div>Loading products... 001</div>;

  return (
    <div>
   
      {/* <ProductWidget products={products} /> */}
      <PageHome />
    </div>
  );
}