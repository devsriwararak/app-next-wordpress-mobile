'use client'
import { Product } from '@/app/type';
import React, { useEffect, useState } from 'react'

const Page3 = ({setStatusForm} : {setStatusForm : (value:boolean)=> void}) => {


    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [select1, setSelect1] = useState("")
    const [select2, setSelect2] = useState("")
    const [select3, setSelect3] = useState("")
    const [select4, setSelect4] = useState("")
    const [select5, setSelect5] = useState("")
    const [select6, setSelect6] = useState("")
    

    const [sum, setSum] = useState(0)
    const [sumMount , setSumMount] = useState(0)

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
    if (loading) return <div>โหลดข้อมูล ...... </div>;


    const handleCalculate = () => {
        let sum = null
        let sumMount = null
        if (select1 && select2 && select3 && select4 && select5) {
            sum = (Number(select1) * Number(2)) + Number(select3) + Number(select4) + Number(select5)
            if(select6) {
            sumMount = Number(sum) / Number(select6)
            }
             setStatusForm(true)
        }
        
        setSum(Number(sum))
        setSumMount(Number(sumMount))

    }

    const handleCancel = () => {
        setSum(0)
        setSumMount(0)
        setSelect1("")
        setSelect2("")
        setSelect3("")
        setSelect4("")
        setSelect5("")
        setSelect6("")
        setStatusForm(false)
    }

    return (
        <div>

            <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full'>
                    <label htmlFor="">เลือกรุ่นมือถือ - ราคา {Number(select1).toLocaleString() || "0"} บาท</label>
                    <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect1(e.target.value)} value={select1}>
                        <option value="">เลือก</option>
                        {products.map((item) => (
                            <option key={item.id} value={item.price}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className='w-full'>
                    <label htmlFor="">ประเมินหน้าจอ </label>
                    <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect2(e.target.value)} value={select2}>
                        <option value="">เลือก</option>
                        <option value="100">แตก 10%</option>
                        <option value="200">แตก 20%</option>
                        <option value="300">แตก 30%</option>
                    </select>
                </div>

                <div className='w-full'>
                    <label htmlFor="">แบตเตอรี่ (%)</label>
                    {/* <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect3(e.target.value)} value={select3}>
                        <option value="">เลือก</option>
                        <option value="100">เสื่อม 10%</option>
                        <option value="200">เสื่อม 20%</option>
                        <option value="300">เสื่อม 30%</option>
                    </select> */}
                    <input type="number" placeholder='90' className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect3(e.target.value)} value={select3} />
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 mt-4'>

                <div className='w-full'>
                    <label htmlFor="">ประเมินเคยทำหล่นไหม </label>
                    <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect4(e.target.value)} value={select4}>
                        <option value="">เลือก</option>
                        <option value="100">หล่น 1-2 ครั้ง</option>
                        <option value="200">หล่น 3-5 ครั้ง</option>
                        <option value="0">ไม่เคยทำหล่นเลย</option>
                    </select>
                </div>

                <div className='w-full'>
                    <label htmlFor="">เวอร์ชั่น IOS ? </label>
                    <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect5(e.target.value)} value={select5}>
                        <option value="">เลือก</option>
                        <option value="30">IOS 10</option>
                        <option value="60">IOS 15</option>
                        <option value="90">IOS 14</option>

                    </select>
                </div>

                            <div className='w-full'>
                    <label htmlFor="">ผ่อนกี่เดือน </label>
                    <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e)=>setSelect6(e.target.value)} value={select6}>
                        <option value="">เลือก</option>
                        <option value="30">1 เดือน</option>
                        <option value="60">2 เดือน</option>
                        <option value="90">3 เดือน</option>
                   
                    </select>
                </div>
            </div>

            <div className='mt-8 text-center flex gap-4'>
                <button onClick={handleCalculate} className=' w-full bg-linear-to-r from-orange-400 to-orange-600 py-3 rounded-md text-white font-extrabold cursor-pointer'>คำนวณ</button>
                <button onClick={handleCancel} className=' w-full bg-linear-to-r from-blue-400 to-blue-800 py-3 rounded-md text-white font-extrabold cursor-pointer'>ยกเลิก</button>
            </div>

            <div className='mt-8 text-center'>
                <h2 className='text-3xl'>ราคา {Number(sum).toLocaleString()} บาท</h2>
            </div>

            <div className='mt-8 text-center'>
                <h2 className='text-3xl'>ผ่อนเดือนละ {Number(sumMount).toLocaleString()} บาท</h2>
            </div>

        </div>
    )
}

export default Page3