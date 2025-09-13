

// "use client"
// import { Down, Product } from '@/app/type';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify';

// const Page2 = ({ setStatusForm }: { setStatusForm: (value: boolean) => void }) => {

//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);

//     const [select1, setSelect1] = useState("")
//     const [select2, setSelect2] = useState("")
//     const [select3, setSelect3] = useState("")

//     const [sum, setSum] = useState(0)

//     const [showDetail, setShowDetail] = useState<Product | null>(null)
//     const [sumDown, setSumDown] = useState(0)
//     const [downs, setDowns] = useState<Down[]>([]);
//     const [mounts, setMounts] = useState<Down[]>([]);

//     const fetchDowns = async () => {
//         const res = await fetch('/api/admin/downs');
//         const data = await res.json();
//         setDowns(data);
//     };

//     const fetchMounts = async () => {
//         const res = await fetch('/api/admin/mounts');
//         const data = await res.json();
//         setMounts(data);
//     };


//     useEffect(() => {
//         // Log หา id Category
//         async function fetchCategories() {
//             const res = await fetch("/api/categories");
//             const data = await res.json();
//             console.log("หมวดหมู่ทั้งหมด:", data);
//         }
//         fetchCategories();

//         async function fetchProducts() {
//             try {
//                 const response = await fetch("/api/products?category=15");
//                 const data: Product[] = await response.json();
//                 console.log(data);

//                 setProducts(data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchProducts();
//         fetchDowns()
//         fetchMounts()
//     }, []);

//     const handleCalculate = () => {
//         let sum = null
//         if (select1 && select2 && select3) {
//             sum = (Number(select1) - Number(select2)) / Number(select3)           
//              setStatusForm(true)
//             setSumDown(Number(select2))
//         } else {
//             toast.error('กรุณาเลือกให้ครบทุกรายการ !')
//         }
//         setSum(Number(sum))
//     }

//     const handleCancel = () => {
//         setSum(0)
//         setSelect1("")
//         setSelect2("")
//         setSelect3("")
//         setStatusForm(false)
//         setShowDetail(null)
//     }

//     if (loading) return <div>โหลดข้อมูล ...... </div>;
//     return (
//         <div className='flex flex-col md:flex-row gap-4 items-center'>
//             <section className='w-full md:w-1/3 '>
//                 {showDetail ? (
//                     <div className='border border-gray-300 rounded-md px-4 py-4'>
//                         <Image src={showDetail.images[0].src} alt='' width={900} height={900} />
//                         <p className='mt-2 text-xl'>สินค้า : {showDetail?.name}</p>
//                         <p className='mt-2 text-xl'>ราคา : {Number(select1).toLocaleString() || "0"} บาท</p>

//                     </div>
//                 ) : <p>กรุณาเลือกสินค้า ....</p>}

//             </section>
//             <section className='w-full md:w-2/3'>
//                 <div className='flex flex-col md:flex-row gap-4'>
//                     <div className='w-full'>
//                         <label htmlFor="">เลือกรุ่นมือถือ  </label>
//                         <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2'
//                             onChange={(e) => {
//                                 const selectedProduct = products.find(p => p.price === e.target.value);
//                                 if (selectedProduct) {
//                                     setSelect1(e.target.value);
//                                     setShowDetail(selectedProduct);
//                                 }
//                             }}
//                             value={select1}
//                         >
//                             <option value="">เลือก</option>
//                             {products.map((item) => (
//                                 <option key={item.id} value={item.price}>{item.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className='w-full'>
//                         <label htmlFor="">ดาว กี่% </label>
//                         <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect2(e.target.value)} value={select2}>
//                             <option value="">เลือก</option>
//                             {
//                                 downs.map((item) => (
//                                     <option key={item.id} value={item.sum}>{item.name} </option>
//                                 ))
//                             }
//                         </select>
//                     </div>

//                     <div className='w-full'>
//                         <label htmlFor="">ผ่อนกี่เดือน </label>
//                         <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect3(e.target.value)} value={select3}>
//                             <option value="">เลือก</option>
//                             {
//                                 mounts.map((item) => (
//                                     <option key={item.id} value={item.sum}>{item.name} </option>
//                                 ))
//                             }
//                         </select>
//                     </div>
//                 </div>
//                 <div className='mt-8 text-center flex gap-4'>
//                     <button onClick={handleCalculate} className=' w-full bg-linear-to-r from-orange-400 to-orange-600 py-3 rounded-md text-white font-extrabold cursor-pointer'>คำนวณ</button>
//                     <button onClick={handleCancel} className=' w-full bg-linear-to-r from-blue-400 to-blue-800 py-3 rounded-md text-white font-extrabold cursor-pointer'>ยกเลิก</button>
//                 </div>
//                 <div className='mt-8 text-center'>
//                     <h2 className='text-xl'>วางเงินดาว {Number(sumDown).toLocaleString()} บาท</h2>
//                 </div>

//                 <div className='mt-4 text-center'>
//                     <h2 className='text-3xl'>ผ่อนเดือนละ {Number(sum).toLocaleString()} บาท</h2>
//                 </div>
//             </section>
//         </div>
//     )
// }
// export default Page2

"use client"
import { Down, Product, ShowTableType } from '@/app/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page2 = ({ setStatusForm }: { setStatusForm: (value: boolean) => void }) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [select1, setSelect1] = useState("")
    const [select2, setSelect2] = useState("")

    const [showDetail, setShowDetail] = useState<Product | null>(null)
    const [downs, setDowns] = useState<string[]>([]);

    const [showTable, setShowTable] = useState<ShowTableType[]>([])

    useEffect(() => {

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
        const dataTable = [
            { id: 1, mount: 3, interest: 1.53 },
            { id: 2, mount: 4, interest: 1.63 },
            { id: 3, mount: 6, interest: 1.93 },
            { id: 4, mount: 8, interest: 2.00 },
            { id: 5, mount: 10, interest: 2.08 },
            { id: 6, mount: 12, interest: 2.16 },
        ]

        if (select1 && select2) {
            const NewSelect1 = select2.replace('%', '')
            const select1Percent = Number(NewSelect1) / 100

            const totalAmount = Number(select1);
            const downPayment = totalAmount * select1Percent;
            const remainingBalance = totalAmount - downPayment;

            const updatedDataTable = dataTable.map(row => {

                const monthlyRaw = (remainingBalance * row.interest) / row.mount
                const monthlyRounded = Math.round(monthlyRaw / 10) * 10
                const totalSum = downPayment + (monthlyRounded * row.mount)

                return {
                    ...row,
                    downPayment: downPayment, // ค่าเงินดาวน์
                    excellent: remainingBalance, // ยอดคงเหลือ
                    monthly: monthlyRounded, // ค่าผ่อนรายเดือน
                    sumAll: totalSum, // ยอดรวมทั้งหมด
                }
            })
            setShowTable(updatedDataTable)
setStatusForm(true)
        } else {
            toast.error('กรุณาเลือกให้ครบทุกรายการ !')
            setShowTable([])
        }

    }

    const handleCancel = () => {
        setSelect1("")
        setSelect2("")
        setStatusForm(false)
        setShowDetail(null)
        setShowTable([])
    }

    const handleChangeMobile = (selectedProduct: Product | null) => {
        setSelect2("")
        setShowDetail(selectedProduct);

        const payPartAttribute = selectedProduct?.attributes.find(
            (attribute) => attribute.slug === "pa_pay-part"
        );

        if (payPartAttribute) {
            setDowns(payPartAttribute.options);
        }

    }

    if (loading) return <div>โหลดข้อมูล ...... </div>;
    return (
        <div className='flex flex-col md:flex-row gap-4 md:gap-8 items-start'>
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
                        <label htmlFor="" className='font-semibold'>เลือกรุ่นมือถือ  </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2'
                            // onChange={(e) => {setSelect1(e.target.value)}} 
                            onChange={(e) => {
                                const selectedProduct = products.find(p => p.price === e.target.value);
                                if (selectedProduct) {
                                    setSelect1(e.target.value);
                                    handleChangeMobile(selectedProduct)
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
                        <label htmlFor="" className='font-semibold'>เงินดาวน์ </label>
                        <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2' onChange={(e) => setSelect2(e.target.value)} value={select2}>
                            <option value="">เลือก</option>
                            {
                                downs.map((item, index) => (
                                    <option key={index} value={item}>{item} </option>
                                ))
                            }
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
                                            จำนวนเดือนที่ผ่อน
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            เงินดาวน์
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            ยอดจัด
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            ผ่อนเดือนละ
                                        </th>
                                  

                                    </tr>
                                </thead>
                                <tbody>
                                    {showTable.map((item, index) => (
                                        <tr key={item.id}
                                            className={`${index % 2 === 1 ? "bg-gray-50" : "bg-white"} border border-gray-200`}
                                        >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {item.mount} เดือน
                                            </th>
                                            <td className="px-4 py-4">
                                                {Number(item.downPayment).toLocaleString()} บาท
                                            </td>
                                            <td className="px-4 py-4">
                                                {Number(item.excellent).toLocaleString()} บาท
                                            </td>
                                            <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                 {Number(item.monthly).toLocaleString()} บาท
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

export default Page2