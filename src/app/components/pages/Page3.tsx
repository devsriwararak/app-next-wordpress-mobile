'use client'
import { Product, ShowTableType, ValueOptionType } from '@/app/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page3 = ({ setStatusForm }: { setStatusForm: (value: boolean) => void }) => {


    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [select1, setSelect1] = useState("")
    const [select2, setSelect2] = useState("")
    const [select3, setSelect3] = useState("")
    const [select4, setSelect4] = useState("")
    const [select5, setSelect5] = useState("")
    const [select6, setSelect6] = useState("")


    const [sum, setSum] = useState(0)
    const [sumMount, setSumMount] = useState(0)
    const [showDetail, setShowDetail] = useState<Product | null>(null)
    const [showTable, setShowTable] = useState<ShowTableType[]>([])
    const [selectTimer, setSelectTimer] = useState<ValueOptionType[]>([])
    const [maxRate, setMaxRate] = useState<number>(0)

    useEffect(() => {

        //    Log หา id Category
        // async function fetchCategories() {
        //     const res = await fetch("/api/categories");
        //     const data = await res.json();
        //     console.log("หมวดหมู่ทั้งหมด:", data);
        // }
        // fetchCategories();

        async function fetchProducts() {
            try {
                const response = await fetch("/api/products?category=108");
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
        const dataTableMount = [
            { id: 1, mount: 3, interest: 1.25 },
            { id: 2, mount: 4, interest: 1.40 },
            { id: 3, mount: 6, interest: 1.60 },
        ]
        const dataTableDay = [
            { id: 1, mount: 10, interest: 0.1 },
        ]


        if (select1 && select2 && select3 && select4 && select5 && select6) {

            const updatedDataTableMount = dataTableMount.map(row => {

                const Installment = (Number(select5) * row.interest) / row.mount
                const monthlyRounded = Math.round(Installment / 10) * 10
                const totalSum = monthlyRounded * row.mount
                const profit = totalSum - Number(select5)

                return {
                    ...row,
                    downPayment: 0, // ค่าเงินดาวน์
                    excellent: Number(select5), // ยอดคงเหลือ
                    monthly: monthlyRounded, // ค่าผ่อนรายเดือน
                    sumAll: 0, // ยอดรวมทั้งหมด
                    Installment: 0, // ยอดรวม
                    profit: 0 // กำไร
                }
            })

            const updatedDataTableDay = dataTableDay.map(row => {

                const monthlyRounded = Number(select5) * row.interest

                return {
                    ...row,
                    downPayment: 0, // ค่าเงินดาวน์
                    excellent: Number(select5), // ยอดคงเหลือ
                    monthly: monthlyRounded, // ค่าผ่อนรายเดือน
                    sumAll: 0, // ยอดรวมทั้งหมด
                    Installment: 0, // ยอดรวม
                    profit: 0 // กำไร
                }
            })
            console.log(select6);
            if (select6 === 'day') {
                setShowTable(updatedDataTableDay)
            } else {
                setShowTable(updatedDataTableMount)
            }



        } else {
            toast.error('กรุณาเลือกให้ครบทุกรายการ !')
            setShowTable([])
        }
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
        setShowDetail(null)
    }

    const handleChagePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const price = e.target.value
        setSelect5(price)
        let data: ValueOptionType[]
        if (Number(price) >= 6000) {
            data = [
                {
                    label: "ราย เดือน",
                    value: "mount"
                }
            ]
        } else {
            data = [
                {
                    label: "ราย 10 วัน",
                    value: "day"
                }
            ]
        }
        setSelectTimer(data)
    }

    const handleSelectBattery = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect4(e.target.value)
        if (e.target.value) {
            setMaxRate(Number(showDetail?.price))
        } else {
            setMaxRate(0)
        }
    }

    return (
        <div className='flex flex-col md:flex-row gap-4 md:gap-8 items-start'>


            <section className=' w-full md:w-1/3'>
                {showDetail ? (
                    <div className='border border-gray-300 rounded-md px-4 py-4'>
                        <Image src={showDetail.images[0].src} alt='' width={900} height={900} />
                        <p className='mt-2 text-xl'> รุ่น : {showDetail?.name}</p>
                        {/* <p className='mt-2 text-lg'>ยอดแลกไอโฟนสูงสุด : {Number(select1).toLocaleString() || "0"} บาท</p> */}
                    </div>
                ) : <p>กรุณาเลือกสินค้า ....</p>}
            </section>

            <section className='w-full md:w-2/3'>


                <div className='w-full'>
                    <label htmlFor="" className='font-semibold'>เลือกรุ่นมือถือ  </label>
                    <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2'
                        // onChange={(e) => { setSelect1(e.target.value) }}
                        onChange={(e) => {
                            const selectedProduct = products.find(p => p.price === e.target.value);

                            if (selectedProduct) {
                                setSelect1(e.target.value);
                                setShowDetail(selectedProduct);
                            } else {
                                toast.error('ไม่พบราคามือถือ !')
                            }
                        }}

                        value={select1}
                    >
                        <option value="">เลือก</option>
                        {products.map((item) => (
                            <option key={item.id} value={item.price || 0}>{item.name}</option>
                        ))}
                    </select>
                </div>


                <div className='flex flex-col md:flex-row gap-4 mt-4'>
                    <div className='w-full'>
                        <label htmlFor="" className='font-semibold'>ประเมินหน้าจอ </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect2(e.target.value)} value={select2}>
                            <option value="">เลือก</option>
                            <option value="no">ไม่แตก</option>
                            <option value="yes">แตก</option>
                        </select>
                    </div>

                    <div className='w-full'>
                        <label htmlFor="" className='font-semibold'>ประกันศูนย์ </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect3(e.target.value)} value={select3}>
                            <option value="">เลือก</option>
                            <option value="no">ไม่มี</option>
                            <option value="yes">มี</option>
                        </select>
                    </div>

                    <div className='w-full'>
                        <label htmlFor="" className='font-semibold'>แบตเตอรี่ </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => handleSelectBattery(e)} value={select4}>
                            <option value="">เลือก</option>
                            {
                                Array.from({ length: 61 }, (_, i) => 100 - i).map(item => (
                                    <option key={item} value={item}>
                                        {item}%
                                    </option>
                                ))
                            }
                        </select>
                    </div>


                </div>

                <p className='my-8 text-2xl w-full '>ยอดประเมินสูงสุด : {Number(maxRate).toLocaleString() || "0"} บาท</p>

                <div className='flex flex-col md:flex-row gap-4 mt-4 items-end'>

                    <div className='w-full'>
                        <label htmlFor="" className='font-semibold'>ยอดที่ต้องการ </label>
                        <input type="number" placeholder='0.00' className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => handleChagePrice(e)} value={select5} />
                    </div>

                    <div className='w-full'>
                        <label htmlFor="" className='font-semibold'>ระยะเวลา </label>
                        <select
                            className={` w-full border border-gray-400 px-4 py-2 rounded-md mt-2
                            ${!select5 ? 'bg-gray-200 text-gray-500' : ''} `}

                            onChange={(e) => setSelect6(e.target.value)} value={select6} disabled={!select5}>
                            <option value="">เลือก</option>
                            {selectTimer.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className='mt-8 text-center flex gap-4'>
                    <button onClick={handleCalculate} className=' w-full bg-linear-to-r from-orange-400 to-orange-600 py-3 rounded-md text-white font-extrabold cursor-pointer'>คำนวณ</button>
                    <button onClick={handleCancel} className=' w-full bg-linear-to-r from-blue-400 to-blue-800 py-3 rounded-md text-white font-extrabold cursor-pointer'>ยกเลิก</button>
                </div>


                <div className='mt-6 text-center flex gap-4 '>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        {showTable.length > 0 && (
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-sm text-gray-700 uppercase bg-gray-300  ">
                                    <tr>
                                        <th scope="col" className="px-4 py-4">
                                            ระยะเวลา
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            ยอดที่ต้องการ
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            {select6 === "mount" ? "ผ่อนเดือนละ" : "ดอกเบี้ย"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showTable.map((item, index) => (
                                        <tr key={item.id}
                                            className={`${index % 2 === 1 ? "bg-gray-50" : "bg-white"} border border-gray-200`}
                                        >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {item.mount}  {select6 === "mount" ? "เดือน" : "วัน"}
                                            </th>
                                            <td className="px-4 py-4">
                                                {Number(item.excellent).toLocaleString()} บาท
                                            </td>
                                            <td className="px-4 py-4">
                                                {Number(item.monthly).toLocaleString()} บาท
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>



                <div className='mt-8 text-center'>
                    <h2 className='text-sm text-red-500'>
                        * ยอดดังกล่าวเป็นเพียงการประเมินคร่าวๆเท่านั้น ( ต้องให้เจ้าหน้าที่ประเมินอีกครั้งหนึ่งที่หน้าร้าน )
                    </h2>
                </div>
            </section>

        </div>
    )
}

export default Page3