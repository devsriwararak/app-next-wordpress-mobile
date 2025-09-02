import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-row gap-4 items-center  px-16 py-3 border-b border-gray-200 shadow-sm '>
        <div className='w-2/12'>
            <Image src="/images/logo.jpg" width={80} height={80} alt='' />
        </div>
        <div className='w-6/12'>
        <ul className='flex gap-8 font-extrabold'>
            <li>ผ่อนไอโฟน</li>
            <li>ไอโฟนแลกเงิน</li>
            <li>เช่ามือถือ</li>
            <li>บทความ</li>
            <li>เกี่ยวกับเรา</li>
            </ul>
            </div>
        <div className='w-4/12'>
        <div className='flex flex-row gap-4'>
            <button className='bg-gray-200 px-6 py-2 rounded-full font-extrabold'>สาขาใกล้คุณ</button>
            <button className='bg-linear-to-r from-blue-400 to-blue-800 px-8 py-2 rounded-full text-white font-extrabold '>ติดต่อเรา</button>
        </div>
            </div>

    </div>
  )
}

export default Header