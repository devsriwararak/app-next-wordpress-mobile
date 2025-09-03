

"use client"
import { Product } from '@/app/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page2 = ({ setStatusForm }: { setStatusForm: (value: boolean) => void }) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [select1, setSelect1] = useState("")
    const [select2, setSelect2] = useState("")
    const [select3, setSelect3] = useState("")

    const [sum, setSum] = useState(0)

    const [showDetail, setShowDetail] = useState<Product | null>(null)
    const [sumDown, setSumDown] = useState(0)


    useEffect(() => {
        // Log หา id Category
        async function fetchCategories() {
            const res = await fetch("/api/categories");
            const data = await res.json();
            console.log("หมวดหมู่ทั้งหมด:", data);
        }
        fetchCategories();

        async function fetchProducts() {
            try {
                const response = await fetch("/api/products?category=15");
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

    const handleCalculate = () => {
        let sum = null
        if (select1 && select2 && select3) {
            const test = (Number(select1) * Number(select2)) / 100
            sum = (Number(select1) - test) / Number(select3)
            setStatusForm(true)
            setSumDown(test)
        } else {
            toast.error('กรุณาเลือกให้ครบทุกรายการ !')
        }
        setSum(Number(sum))
    }

    const handleCancel = () => {
        setSum(0)
        setSelect1("")
        setSelect2("")
        setSelect3("")
        setStatusForm(false)
        setShowDetail(null)
    }

    if (loading) return <div>โหลดข้อมูล ...... </div>;
    return (
        <div className='flex flex-col md:flex-row gap-4 items-center'>
            <section className='w-full md:w-1/3 '>
                {showDetail ? (
                    <div className='border border-gray-300 rounded-md px-4 py-4'>
                        <Image src={showDetail.images[0].src} alt='' width={900} height={900} />
                        <p className='mt-2 text-xl'>สินค้า : {showDetail?.name}</p>
                        <p className='mt-2 text-xl'>ราคา : {Number(select1).toLocaleString() || "0"} บาท</p>

                    </div>
                ) : <p>กรุณาเลือกสินค้า ....</p>}

            </section>
            <section className='w-full md:w-2/3'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full'>
                        <label htmlFor="">เลือกรุ่นมือถือ  </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2'
                            onChange={(e) => {
                                const selectedProduct = products.find(p => p.price === e.target.value);
                                if (selectedProduct) {
                                    setSelect1(e.target.value);
                                    setShowDetail(selectedProduct);
                                }
                            }}
                            value={select1}
                        >
                            <option value="">เลือก</option>
                            {products.map((item) => (
                                <option key={item.id} value={item.price}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full'>
                        <label htmlFor="">ดาว กี่% </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect2(e.target.value)} value={select2}>
                            <option value="">เลือก</option>
                            <option value="30">30% </option>
                            <option value="40">40%</option>
                            <option value="50">50%</option>
                            <option value="60">60%</option>
                        </select>
                    </div>

                    <div className='w-full'>
                        <label htmlFor="">ผ่อนกี่เดือน </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect3(e.target.value)} value={select3}>
                            <option value="">เลือก</option>
                            <option value="3">3 เดือน</option>
                            <option value="6">6 เดือน</option>
                            <option value="8">8 เดือน</option>
                            <option value="10">10 เดือน</option>
                        </select>
                    </div>
                </div>
                <div className='mt-8 text-center flex gap-4'>
                    <button onClick={handleCalculate} className=' w-full bg-linear-to-r from-orange-400 to-orange-600 py-3 rounded-md text-white font-extrabold cursor-pointer'>คำนวณ</button>
                    <button onClick={handleCancel} className=' w-full bg-linear-to-r from-blue-400 to-blue-800 py-3 rounded-md text-white font-extrabold cursor-pointer'>ยกเลิก</button>
                </div>
                <div className='mt-8 text-center'>
                    <h2 className='text-xl'>วางเงินดาว {Number(sumDown).toLocaleString()} บาท</h2>
                </div>

                <div className='mt-4 text-center'>
                    <h2 className='text-3xl'>ผ่อนเดือนละ {Number(sum).toLocaleString()} บาท</h2>
                </div>
            </section>
        </div>
    )
}
export default Page2