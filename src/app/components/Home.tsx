'use client'
import React, { useEffect, useState } from 'react'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import { toast } from 'react-toastify'

const PageHome = () => {
    const [selectPage, setSelectPage] = useState<number | null>(null)
    const [statusForm, setStatusForm] = useState(false)

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        if (!name || !phone || !email) {
            toast.error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
            return;
        }

        try {
            const res = await fetch('/api/send-mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('บันทึกสำเร็จ !');
                setName(''); setPhone(''); setEmail('');
            } else {
                toast.error(data.message || 'เกิดข้อผิดพลาดในการส่งอีเมล');
            }
        } catch (error) {
            console.error(error);
            toast.error('เกิดข้อผิดพลาดในการส่งอีเมล');
        }
    };

    useEffect(() => {
        setStatusForm(false)
    }, [selectPage])


    return (
        <div className=''>
            <h1 className='text-3xl font-extrabold text-center mt-8 ' >เลือกรายการที่ต้องการ  </h1>

            <div className='flex flex-row gap-3 md:gap-4 items-center justify-center mt-10 mx-4 md:mx-40 text-base '>
                <div className={`w-full border border-gray-400 rounded-md px-4 py-4  cursor-pointer hover:bg-gray-200 ${selectPage === 1 ? "bg-gray-300" : ""}`} onClick={() => setSelectPage(1)}>
                    <div className='text-center' >
                        <p className=' text-md md:text-xl font-semibold'> ผ่อนไอโฟน มือ 1</p>
                    </div>
                </div>
                <div className={`w-full border border-gray-400 rounded-md px-4 py-4  cursor-pointer hover:bg-gray-200 ${selectPage === 2 ? "bg-gray-300" : ""}`} onClick={() => setSelectPage(2)}>
                    <div className=' text-center'>
                        <p className='font-semibold text-md md:text-xl'>ผ่อนไอโฟน มือ 2</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-3 md:gap-4 items-center justify-center mt-10 mx-4 md:mx-40 '>
                <div className={`w-full border border-gray-400 rounded-md px-4 py-4  cursor-pointer hover:bg-gray-200 ${selectPage === 3 ? "bg-gray-300" : ""}`} onClick={() => setSelectPage(3)}>
                    <div className='text-center'>
                        <p className='text-md md:text-xl font-semibold'>ไอโฟนแลกเงิน</p>
                    </div>
                </div>
                <div className={`w-full border border-gray-400 rounded-md px-0.5 md:px-4 py-4  cursor-pointer hover:bg-gray-200 ${selectPage === 4 ? "bg-gray-300" : ""}`} onClick={() => setSelectPage(4)}>
                    <div className=' text-center'>
                        <p className='font-semibold text-base md:text-xl'>เช่าไอโฟน กับบริษัทเรา</p>
                    </div>
                </div>
            </div>

            <hr className='my-6 md:my-14 mx-6  md:mx-40 text-gray-300' />

            <div className='mx-6 md:mx-40'>
                {selectPage === 1 && (<Page1 setStatusForm={setStatusForm} />)}
                {selectPage === 2 && (<Page2 setStatusForm={setStatusForm} />)}
                {selectPage === 3 && (<Page3 setStatusForm={setStatusForm} />)}
                {selectPage === 4 && (<Page4 setStatusForm={setStatusForm} />)}

            </div>


            <hr className='my-6 md:my-14 mx-6  md:mx-40 text-gray-300' />

            {/* Form SEnd */}
            {statusForm && (
                <div className='mt-10 mx-40'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='w-full'>
                            <p>ชื่อ-สกุล</p>
                            <input type="text" placeholder='กรอกชื่อ-สกุล'
                                className='border border-gray-400 px-4 py-1.5 rounded-md w-full mt-2'
                                value={name} onChange={e => setName(e.target.value)} />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <div className='w-full'>
                            <p>เบอร์โทรศัพท์</p>
                            <input type="number" placeholder='กรอกเบอร์โทรศัพท์' className='border border-gray-400 px-4 py-1.5 rounded-md w-full mt-2'
                                value={phone} onChange={e => setPhone(e.target.value)}
                            />
                        </div>

                        <div className='w-full'>
                            <p>กรอกเมล์</p>
                            <input type="mail" placeholder='กรอกเมล์' className='border border-gray-400 px-4 py-1.5 rounded-md w-full mt-2'
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button onClick={handleSubmit} className='mt-10 w-full bg-linear-to-r from-green-600 to-green-800 py-3 rounded-md text-white font-extrabold cursor-pointer'>ยืนยัน</button>
                </div>
            )}

        </div>
    )
}

export default PageHome