

'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="border-b border-gray-200 shadow-sm sticky top-0 bg-white">
            <div className="flex items-center justify-between px-4 py-3 md:px-16">
                {/* Logo */}
                <div className="flex-shrink-0 w-24">
                    <Link href="https://mittrathaiphone.com/">
                        <Image src="/images/logo.jpg" width={80} height={80} alt="Logo" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex md:gap-8 font-extrabold">
                    <a href="https://mittrathaiphone.com/iphone-new/" className="hover:text-blue-600">ผ่อนไอโฟน</a>
                    <a href="https://mittrathaiphone.com/iphone-for-cash/" className="hover:text-blue-600">ไอโฟนแลกเงิน</a>
                    <a href="https://mittrathaiphone.com/phone-for-rent/" className="hover:text-blue-600">เช่ามือถือ</a>
                    <a href="https://mittrathaiphone.com/blog/" className="hover:text-blue-600">บทความ</a>
                    <a href="https://mittrathaiphone.com/about-us/" className="hover:text-blue-600">เกี่ยวกับเรา</a>
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex md:gap-4">
                    <button className="bg-gray-200 px-6 py-2 rounded-full font-extrabold">สาขาใกล้คุณ</button>
                    <button className="bg-gradient-to-r from-blue-400 to-blue-800 px-8 py-2 rounded-full text-white font-extrabold">
                        ติดต่อเรา
                    </button>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {menuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    <a href="https://mittrathaiphone.com/iphone-new/" className="block font-extrabold hover:text-blue-600">ผ่อนไอโฟน</a>
                    <a href="https://mittrathaiphone.com/iphone-for-cash/" className="block font-extrabold hover:text-blue-600">ไอโฟนแลกเงิน</a>
                    <a href="https://mittrathaiphone.com/phone-for-rent/" className="block font-extrabold hover:text-blue-600">เช่ามือถือ</a>
                    <a href="https://mittrathaiphone.com/blog/" className="block font-extrabold hover:text-blue-600">บทความ</a>
                    <a href="https://mittrathaiphone.com/about-us/" className="block font-extrabold hover:text-blue-600">เกี่ยวกับเรา</a>
                    <div className="flex flex-col gap-2 mt-2">
                        <button className="bg-gray-200 px-6 py-2 rounded-full font-extrabold">สาขาใกล้คุณ</button>
                        <button className="bg-gradient-to-r from-blue-400 to-blue-800 px-8 py-2 rounded-full text-white font-extrabold">
                            ติดต่อเรา
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
