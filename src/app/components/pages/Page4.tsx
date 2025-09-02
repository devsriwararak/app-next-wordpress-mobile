"use client"
import { Product } from '@/app/type';
import React, { useEffect, useState } from 'react'

const Page4 = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [select1 , setSelect1] = useState("")
    const [select2 , setSelect2] = useState("")
    const [select3 , setSelect3] = useState("")

    const [sum , setSum] = useState(0)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("/api/products");
                const data: Product[] = await response.json();
                console.log(data);
                
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);


    const handleCalculate = ()=> {
        let sum = null
        if(select1 && select2 && select3) {
             sum  = Number(select2)  * Number(select3)
        }
        setSum(Number(sum))

    }

    const handleCancel = ()=> {
        setSum(0)
        setSelect1("")
        setSelect2("")
        setSelect3("")
    }

    useEffect(()=> {
        if(select1){
            const sum = Number(select1) - 15000
            setSelect2(String(sum))
        }
    },[select1])

    if (loading) return <div>โหลดข้อมูล ...... </div>;
    return (
        <div>

            <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full'>
                    <label htmlFor="">เลือกรุ่นมือถือ - ราคา {Number(select1).toLocaleString() || "0"} บาท</label>
                    <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e)=>setSelect1(e.target.value)} value={select1}>
                        <option value="">เลือก</option>
                        {products.map((item) => (
                            <option key={item.id} value={item.price}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className='w-full'>
                    <label htmlFor="">ราคามัดจำ (บาท) </label>
                    <div className='w-full border border-gray-400 px-4 py-2 rounded-md mt-2 bg-gray-200'>{Number(select2).toLocaleString() || "0.00"}</div>
                </div>

                <div className='w-full'>
                    <label htmlFor="">รอบจ่ายค่าเช่า (วัน) </label>
                    <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e)=>setSelect3(e.target.value)} value={select3}>
                        <option value="">เลือก</option>
                        <option value="7">7 วัน</option>
                        <option value="10">10 วัน</option>
                        <option value="15">15 วัน</option>
                   
                    </select>
                </div>
            </div>

            <div className='mt-8 text-center flex gap-4'>
                <button onClick={handleCalculate} className=' w-full bg-linear-to-r from-blue-400 to-blue-800 py-3 rounded-md text-white font-extrabold cursor-pointer'>คำนวณ</button>
                <button onClick={handleCancel} className=' w-full bg-linear-to-r from-blue-400 to-blue-800 py-3 rounded-md text-white font-extrabold cursor-pointer'>ยกเลิก</button>
            </div>

            <div className='mt-8 text-center'>
                <h2 className='text-3xl'>ราคา {Number(sum).toLocaleString()} บาท</h2>
            </div>

        </div>
    )
}

export default Page4


