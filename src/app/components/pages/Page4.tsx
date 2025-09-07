"use client"
import { DayOption, Product, ProductById, Variation } from '@/app/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page4 = ({ setStatusForm }: { setStatusForm: (value: boolean) => void }) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [select1, setSelect1] = useState("")
    // const [select2, setSelect2] = useState("")
    const [select3, setSelect3] = useState("")

    const [sum, setSum] = useState(0)
    const [sumDown, setSumDown] = useState(0)
    const [showDetail, setShowDetail] = useState<Product | null>(null)
    const [deposit, setDeposit] = useState<number | null>(null)



    const [selectDay, setSelectDay] = useState<DayOption[]>([])

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
            // setProducts(data);
            console.log({ data });
            const labels = data.attributes[1].options
            console.log({ labels });

            // const dayOptions: DayOption[] = labels.map((label: string) => {
            //     const variation = (data.variations as Variation[] | undefined)?.find(
            //         (v) => v.attributes.some((a) => a.option === label)
            //     );

            //     return {
            //         label,
            //         value: variation?.price || "0",
            //         description: variation?.description || "",
            //     };
            // });

            // setSelectDay(dayOptions)

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    // const fetchDataById = async (product_id: number) => {

    //     try {
    //         const res = await fetch(`/api/admin/deposit/${product_id}`);
    //         const data = await res.json();
    //         const price = data.price || 0
    //         console.log({ price });

    //         return price

    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    const fetchDataById = async (product_id: number): Promise<number> => {
        try {
            // const res = await fetch(`/api/admin/deposit/${product_id}`);
            const res = await fetch("/api/admin/deposit/[product_id]", {
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
        let sum = null
        let test = 50
        if (Number(select3) <= 1) {
            test = 0;
        } else if (Number(select3) >= 2 && Number(select3) <= 3) {
            test = test;
        } else if (Number(select3) >= 4 && Number(select3) <= 7) {
            test = test * 2;
        }
        else if (Number(select3) >= 8 && Number(select3) <= 12) {
            test = test * 3;
        } else if (Number(select3) >= 13 && Number(select3) <= 17) {
            test = test * 4;
        }

        if (select1 && select3 && deposit) {
            sum = (Number(showDetail?.price) - Number(test)) * Number(select3)
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
        setSelect3("")
        setStatusForm(false)
        setShowDetail(null)
        setSumDown(0)
    }

    // useEffect(() => {
    //     const fetchAndSetDeposit = async () => {
    //         if (select1) {
    //             const result = await fetchDataById(Number(select1));
    //             console.log({ result });

    //             if (result) {
    //                 setDeposit(Number(result));
    //             }
    //         }
    //     };

    //     fetchAndSetDeposit();
    // }, [select1]);

    useEffect(() => {
        const fetchAndSetDeposit = async () => {
            if (!select1) return;

            setLoading(true);
            try {
                const price = await fetchDataById(Number(select1));
                setDeposit(price);
            } catch (error) {
                console.error("Failed to fetch deposit:", error);
                setDeposit(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSetDeposit();
    }, [select1]);

    if (loading) return <div>โหลดข้อมูล ...... </div>;

    return (
        <div className='flex flex-col md:flex-row gap-4 items-center'>

            <section className=' w-full md:w-1/3'>
                {showDetail ? (
                    <div className='border border-gray-300 rounded-md px-4 py-4'>
                        <Image src={showDetail.images[0].src} alt='' width={900} height={900} />
                        <p className='mt-2 text-xl'>สินค้า : {showDetail?.name}</p>
                        <p className='mt-2 text-xl'>ราคา : {Number(showDetail.price).toLocaleString() || "0"} บาท/วัน</p>

                    </div>
                ) : <p>กรุณาเลือกสินค้า ....</p>}
            </section>

            <section className='w-full md:w-2/3'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full'>
                        <label htmlFor="">เลือกรุ่นมือถือ </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2'
                            onChange={(e) => {
                                const selectedProduct = products.find(p => p.id === Number(e.target.value));
                                if (selectedProduct) {
                                    setSelect1(e.target.value);
                                    setShowDetail(selectedProduct);
                                    fetchProductByid(selectedProduct.id)
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

                    <div className='w-full'>
                        <label htmlFor="">ราคามัดจำ (บาท) </label>
                        <div className='w-full border border-gray-400 px-4 py-2 rounded-md mt-2 bg-gray-200'>{Number(deposit).toLocaleString() || "0.00"}</div>
                    </div>

                    <div className='w-full'>
                        <label htmlFor="">รอบจ่ายค่าเช่า (วัน) </label>


                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect3(e.target.value)} value={select3}>
                            <option value="">เลือก</option>
                            <option value="1">1 วัน</option>
                            <option value="3">2-3 วัน</option>
                            <option value="7">4-7 วัน</option>
                            <option value="12">8-12 วัน</option>
                            <option value="17">13-17 วัน</option>
                            {/* {selectDay.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))} */}
                        </select>
                    </div>
                </div>

                <div className='mt-8 text-center flex gap-4'>
                    <button onClick={handleCalculate} className=' w-full bg-linear-to-r from-orange-400 to-orange-600 py-3 rounded-md text-white font-extrabold cursor-pointer'>คำนวณ</button>
                    <button onClick={handleCancel} className=' w-full bg-linear-to-r from-blue-400 to-blue-800 py-3 rounded-md text-white font-extrabold cursor-pointer'>ยกเลิก</button>
                </div>



                <div className='mt-3 text-center flex gap-2 '>
                    <h2 className='text-3xl'>ราคา {Number(sum).toLocaleString()} บาท</h2>
                    <p> (ราคตามือถือ - ส่วนต่าง) -  วัน</p>
                </div>


                <div className='mt-3 text-center flex gap-2 '>
                    <h2 className='text-xl'>ถูกลง {Number(sumDown).toLocaleString()} บาท</h2>
                </div>
            </section>

        </div>
    )
}

export default Page4


