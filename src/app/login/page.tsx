'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const PageLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false, // ตั้งเป็น false เพื่อจัดการเอง
                username,
                password,
            });

            console.log({ result });

            if (result?.error) {
                setError('Invalid email or password');
                console.log(result.error);
                toast.error('เข้าสู่ระบบไม่สำเร็จ')
            } else if (result?.ok) {
                router.refresh()
            }
        } catch (error) {
            setError('An unexpected error occurred.');
            console.log('Sign in error:', error);
            toast.error('เข้าสู่ระบบไม่สำเร็จ')
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="Enter your username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <input
                type="password"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter your password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />


            <div className="mb-4.5">
                <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium  transition hover:bg-opacity-90 bg-red-500"
                >
                    เข้าสู่ระบบ
                    {loading && (
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
                    )}
                </button>
            </div>
        </form>
    )
}

export default PageLogin