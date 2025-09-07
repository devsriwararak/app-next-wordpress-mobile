

'use client'
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { BiMap, BiSolidMap, BiSolidUserPlus } from 'react-icons/bi';

const HeaderAdmin = () => {
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
                    <Link href="/admin/pages/page-1" className="hover:text-blue-600">ไอโฟนมือ 1</Link>
                    <Link href="/admin/pages/page-2" className="hover:text-blue-600">ไอโฟนมือ 2</Link>
                    <Link href="/admin/pages/page-3" className="hover:text-blue-600">ไอโฟนแลกเงิน</Link>
                    <Link href="/admin/pages/page-4" className="hover:text-blue-600">ผ่อนกับบริษัทเรา</Link>
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex md:gap-4">
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                        ออกจากระบบ
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
                    <Link href="/admin/pages/page-1" className="block font-extrabold hover:text-blue-600">ไอโฟนมือ 1</Link>
                    <Link href="/admin/pages/page-2" className="block font-extrabold hover:text-blue-600">ไอโฟนมือ 2</Link>
                    <Link href="/admin/pages/page-3" className="block font-extrabold hover:text-blue-600">ไอโฟนแลกเงิน</Link>
                    <Link href="/admin/pages/page-4" className="block font-extrabold hover:text-blue-600">ผ่อนกับบริษัทเรา</Link>
                    <div className="flex flex-col gap-2 mt-2">
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
                        >
                            ออกจากระบบ
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default HeaderAdmin
