"use client"
import { DayOption, Product, ProductById, ShowTableType, ValueOptionType, Variation } from '@/app/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface TableType {
    day: string;
    sumAll: number;
    perDay: string | number;
}

const Page4 = ({ setStatusForm }: { setStatusForm: (value: boolean) => void }) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [select1, setSelect1] = useState("")
    // const [select2, setSelect2] = useState("")
    const [select3, setSelect3] = useState("")

    const [sum, setSum] = useState(0)
    const [sumDown, setSumDown] = useState(0)
    const [showDetail, setShowDetail] = useState<Product | null>(null)
    const [showDetail2, setShowDetail2] = useState<ProductById | null>(null)
    const [deposit, setDeposit] = useState<number | null>(null)

    const [label, setLabel] = useState<string[]>([])


    const [selectDay, setSelectDay] = useState<DayOption[]>([])
    const [showTable, setShowTable] = useState<TableType[]>([])
    const [maxRate, setMaxRate] = useState<number>(0)



    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("/api/products?category=47");
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    async function fetchProductByid(id: number) {
        try {
            const response = await fetch(`/api/product?id=${id}`);
            const data: ProductById = await response.json();

            const labels = data.attributes[1].options
            const deposit = data.attributes[0].options
            console.log(deposit);
            setLabel(labels)
            setShowDetail2(data)
            setDeposit(Number(deposit))
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }



    const fetchDataById = async (product_id: number): Promise<number> => {
        try {
            // const res = await fetch(`/api/admin/deposit/${product_id}`);
            const res = await fetch("/api/admin/depositGetId", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product_id: product_id }),
            });

            if (!res.ok) throw new Error("Network response was not ok");

            const data = await res.json();
            const price = Number(data.price) || 0;
            console.log({ price });

            return price;
        } catch (error) {
            console.error(error);
            return 0; // fallback
        }
    };


    const handleCalculate = async () => {

        const dataTable = label.map((item) => {

            const selectedVariation = showDetail2?.variations?.find(variation => {
                return variation.attributes.some(attr => String(attr.option) === String(item))
            })

            const result = selectedVariation?.regular_price || 0
            const sumAll = Number(result) * Number(item)

            return {
                day: item,
                sumAll,
                perDay: result,
            }
        })

        setShowTable(dataTable)

    }

    const handleCancel = () => {
        setSum(0)
        setSelect1("")
        setSelect3("")
        setStatusForm(false)
        setShowDetail(null)
        setSumDown(0)
        setShowTable([])
        setShowDetail2(null)


    }



    const handleChangeDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value // 3 
        setSelect3(value)

        const selectedVariation = showDetail2?.variations?.find(item => {
            return item.attributes.some(attr => attr.option === value)
        })

        const result = selectedVariation?.regular_price || 0
        setDeposit(Number(result))


    }



    if (loading) return <div>โหลดข้อมูล ...... </div>;

    return (
        <div className='flex flex-col md:flex-row gap-4 md:gap-8 items-start'>

            <section className=' w-full md:w-1/3'>
                {showDetail2 ? (
                    <div className='border border-gray-300 rounded-md px-4 py-4'>
                        <Image src={showDetail2?.images[0]?.src || ""} alt='' width={900} height={900} />
                        <p className='mt-2 text-xl'>รุ่น : {showDetail2?.name}</p>

                    </div>
                ) : <p>กรุณาเลือกสินค้า ....</p>}
            </section>

            <section className='w-full md:w-2/3'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full'>
                        <label htmlFor="" className='font-semibold'>เลือกรุ่นมือถือ </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2'
                            onChange={(e) => {
                                const selectedProduct = products.find(p => p.id === Number(e.target.value));
                                if (selectedProduct) {
                                    setSelect1(e.target.value);
                                    // setShowDetail(selectedProduct);
                                    fetchProductByid(selectedProduct.id)
                                    setSelect3("")
                                    setDeposit(0)
                                }
                            }}
                            value={select1}
                        >
                            <option value="">เลือก</option>
                            {products.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <p className='my-5 text-2xl w-full '>ค่ามัดจำ : {Number(deposit).toLocaleString() || "0"} บาท</p>

                <div className='mt-5 text-center flex gap-4'>
                    <button onClick={handleCalculate} className=' w-full bg-linear-to-r from-orange-400 to-orange-600 py-3 rounded-md text-white font-extrabold cursor-pointer'>คำนวณ</button>
                    <button onClick={handleCancel} className=' w-full bg-linear-to-r from-blue-400 to-blue-800 py-3 rounded-md text-white font-extrabold cursor-pointer'>ยกเลิก</button>
                </div>


                {/* 
                <div className='mt-3 text-center flex gap-2 '>
                    <h2 className='text-3xl'>ราคา {Number(sum).toLocaleString()} บาท</h2>
                    <p> (ราคตามือถือ - ส่วนต่าง) -  วัน</p>
                </div>


                <div className='mt-3 text-center flex gap-2 '>
                    <h2 className='text-xl'>ถูกลง {Number(sumDown).toLocaleString()} บาท</h2>
                </div> */}

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
                                            ค่าเช่าทั้งหมด
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            เฉลียวันละ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showTable.map((item, index) => (
                                        <tr key={index}
                                            className={`${index % 2 === 1 ? "bg-gray-50" : "bg-white"} border border-gray-200`}
                                        >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {item.day}  วัน
                                            </th>
                                            <td className="px-4 py-4">
                                                {Number(item.sumAll).toLocaleString()} บาท
                                            </td>
                                            <td className="px-4 py-4">
                                                {Number(item.perDay).toLocaleString()} บาท
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            </section>

        </div>
    )
}

export default Page4


