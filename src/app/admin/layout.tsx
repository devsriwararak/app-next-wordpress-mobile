'use client';
import { signOut } from "next-auth/react";
import HeaderAdmin from "../components/layouts/HeaderAdmin";


export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div >
            <HeaderAdmin />
            <div className="my-8  container mx-auto">
                {children}
            </div>

        </div>

    );
}
