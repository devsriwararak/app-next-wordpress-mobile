"use client"
import { Down, Product } from '@/app/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page1 = ({ setStatusForm }: { setStatusForm: (value: boolean) => void }) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [select1, setSelect1] = useState("")
    const [select2, setSelect2] = useState("")
    const [select3, setSelect3] = useState("")

    const [sum, setSum] = useState(0)
    const [sumDown, setSumDown] = useState(0)


    const [showDetail, setShowDetail] = useState<Product | null>(null)
    const [downs, setDowns] = useState<Down[]>([]);
    const [mounts, setMounts] = useState<Down[]>([]);

    const fetchDowns = async () => {
        const res = await fetch('/api/admin/downs');
        const data = await res.json();
        setDowns(data);
    };

        const fetchMounts = async () => {
        const res = await fetch('/api/admin/mounts');
        const data = await res.json();
        setMounts(data);
    };

    useEffect(() => {

        async function fetchProducts() {
            try {
                const response = await fetch("/api/products?category=20");
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
        fetchDowns()
        fetchMounts()
    }, []);

    const handleCalculate = () => {
        let sum = null
        if (select1 && select2 && select3) {
            sum = (Number(select1) - Number(select2) ) / Number(select3)
            setStatusForm(true)
            setSumDown(Number(select2))
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
                            // onChange={(e) => {setSelect1(e.target.value)}} 
                            onChange={(e) => {
                                const selectedProduct = products.find(p => p.price === e.target.value);
                                if (selectedProduct) {
                                    setSelect1(e.target.value);
                                    // setShowDetail((prev) => ({ ...prev, selectedProduct }));
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
                            {
                                downs.map((item) => (
                                    <option key={item.id} value={item.sum}>{item.name} </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='w-full'>
                        <label htmlFor="">ผ่อนกี่เดือน </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect3(e.target.value)} value={select3}>
                            <option value="">เลือก</option>
                            {
                                mounts.map((item) => (
                                    <option key={item.id} value={item.sum}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className='mt-8 text-center flex gap-4'>
                    <button onClick={handleCalculate} className=' w-full bg-linear-to-r from-orange-400 to-orange-600 py-3 rounded-md text-white font-extrabold cursor-pointer'>คำนวณ</button>
                    <button onClick={handleCancel} className=' w-full bg-linear-to-r from-blue-400 to-blue-800 py-3 rounded-md text-white font-extrabold cursor-pointer'>ยกเลิก</button>
                </div>

                <div className='mt-8 text-center flex gap-4'>
                    <h2 className='text-xl'>วางเงินดาว {Number(sumDown).toLocaleString()} บาท</h2>
                    <p className='bg-yellow-200 '>สูตร ราคามือถือ - ราคาดาวน์</p>
                </div>

                <div className='mt-4 text-center flex gap-4'>
                    <h2 className='text-3xl'>ผ่อนเดือนละ {Number(sum).toLocaleString()} บาท</h2>
                    <p className='bg-yellow-200 '>สูตร (ราคามือถือ - ราคาดาวน์) / เดือน</p>
                </div>
            </section>

        </div>
    )
}

export default Page1