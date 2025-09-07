'use client'
import { Down } from '@/app/type';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';



const MountSetting = () => {

    const [downs, setDowns] = useState<Down[]>([]);
    const [name, setName] = useState('');
    const [sum, setSum] = useState(0);
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchDowns = async () => {
        const res = await fetch('/api/admin/mounts');
        const data = await res.json();
        setDowns(data);
    };

    const handleCreate = async () => {
        if (!editingId) {
            const res = await fetch('/api/admin/mounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, sum }),
            });
            if (res.status === 201) {
                toast.success('ทำรายการสำเร็จ')
            } else {
                toast.error('ไม่สามารถทำรายการได้')
            }

        } else {
            const res = await fetch('/api/admin/mounts', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editingId, name, sum }),
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
    };

    const handleDelete = async (id: number) => {
        await fetch('/api/admin/mounts', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        fetchDowns(); // รีเฟรชข้อมูล
    };

    const handleEditClick = (down: Down) => {
        setEditingId(down.id);
        setName(down.name);
        setSum(down.sum);
    };

    useEffect(() => {
        fetchDowns();
    }, []);

    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <h2 className='text-xl'>เพิ่ม/แก้ไข (ผ่อนกี่เดือน)</h2>
            </div>

            <div className='flex flex-col md:flex-row gap-4'>
                <div className='mt-6'>
                    <p>ผ่อนกี่เดือน/เดือน </p>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text" className='border border-gray-400 px-4 py-2 rounded-md w-full' placeholder='1' />
                </div>

                <div className='mt-6'>
                    <p>ราคา </p>
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
                        <span>{down.name} - {down.sum}</span>
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

export default MountSetting