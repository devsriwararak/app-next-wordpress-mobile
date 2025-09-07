'use client'
import { deposit, Down, Product } from '@/app/type';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';



const AdminPage4 = () => {

    const [downs, setDowns] = useState<deposit[]>([]);
    const [name, setName] = useState('');
    const [sum, setSum] = useState(0);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [select1, setSelect1] = useState("")
    const [loading, setLoading] = useState(true);
    const [productName, setProductName] = useState("")



    const fetchDowns = async () => {
        const res = await fetch('/api/admin/deposit');
        const data = await res.json();
        setDowns(data);
    };

    const handleCreate = async () => {
        try {
            if (!editingId) {
                const res = await fetch('/api/admin/deposit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_id: Number(select1), product_name: productName, price: Number(sum) }),
                });
                if (res.status === 201) {
                    toast.success('ทำรายการสำเร็จ')
                } else {
                    toast.error('ไม่สามารถทำรายการได้')
                }
            } else {
                const res = await fetch('/api/admin/deposit', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingId, product_id: Number(select1), product_name: productName, price: Number(sum) }),
                });
                if (res.status === 201) {
                    toast.success('ทำรายการสำเร็จ')
                } else {
                    toast.error('ไม่สามารถทำรายการได้')
                }

            }
            setName('');
            setSum(0);
            setEditingId(null);
            fetchDowns();
        } catch (error) {
            console.log(error);


        }
    };

    const handleDelete = async (id: number) => {
        await fetch('/api/admin/deposit', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        toast.success('ทำรายการสำเร็จ')
        fetchDowns(); // รีเฟรชข้อมูล
    };

    const handleEditClick = (down: deposit) => {
        setEditingId(down.id);
        setSelect1(String(down.product_id));
        setSum(down.price);
    };

    useEffect(() => {
        fetchDowns();
    }, []);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("/api/products?category=47");
                const data: Product[] = await response.json();
                setProducts(data);
                console.log(data);

            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) return <div>โหลดข้อมูล ...... </div>;
    return (
        <div className='border border-gray-300 px-4 py-4 shadow-md rounded-md'>
            <div className='flex flex-row justify-between items-center'>
                <h2 className='text-xl'>ตั้งค่า ราคามัดจำ</h2>
            </div>

            <div className='flex flex-col md:flex-row gap-4'>
                <div className='mt-6'>
                    <p>เลือกสินค้า ประเภท มัดจำ</p>
                    <select className=' w-full border border-gray-400 px-4 py-2 rounded-md mt-2'
                        onChange={(e) => {
                            const selectedProduct = products.find(p => p.id === Number(e.target.value));
                            if (selectedProduct) {
                                setSelect1(e.target.value);
                                setProductName(selectedProduct.name);
                            } else {
                                setSelect1("")
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

                <div className='mt-6'>
                    <p>ราคามัดจำ</p>
                    <input
                        value={sum}
                        onChange={(e) => setSum(Number(e.target.value))}
                        type="text" className='border border-gray-400 px-4 py-2 rounded-md w-full' placeholder='0 บาท' />
                </div>
                <div className='flex items-end'>
                    <button onClick={handleCreate} className='bg-blue-500 text-white px-4 py-2 rounded-md'>บันทึก </button>
                </div>
            </div>

            <ul className=' mt-6 bg-gray-100 px-4 py-1 rounded-md border border-gray-200'>
                {downs.map((down) => (
                    <li key={down.id} className="flex justify-between items-center border p-2 mb-2">
                        <span>{down.product_name} | ราคา {down.price} บาท</span>
                        <div>
                            <button onClick={() => handleEditClick(down)} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>
                            <button onClick={() => handleDelete(down.id)} className="bg-red-500 text-white p-1">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminPage4

