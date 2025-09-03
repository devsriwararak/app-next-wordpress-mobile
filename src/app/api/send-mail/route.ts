import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const {  name, phone, email } = await req.json();

        if ( !name || !phone || !email) {
            return NextResponse.json({ message: 'กรอกข้อมูลไม่ครบ' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_USER,
                pass: process.env.NEXT_PUBLIC_EMAIL_PASS // ใช้ App Password
            },
        });

        await transporter.sendMail({
            from: email,
            to: 'devsriwararak.work@gmail.com',
            subject: 'กรุณาติดต่อกลับหา ลูกค้า โดยด่วน',
            html: `
                   <p>ชื่อ-สกุล: ${name}</p>
                   <p>เบอร์โทรศัพท์: ${phone}</p>
                   <p>อีเมล: ${email}</p>`
        });

        return NextResponse.json({ message: 'ส่งอีเมลสำเร็จ' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'เกิดข้อผิดพลาดในการส่งอีเมล' }, { status: 500 });
    }
}
