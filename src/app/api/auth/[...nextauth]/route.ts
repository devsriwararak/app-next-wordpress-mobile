// pages/api/auth/[...nextauth].ts (หรือ app/api/auth/[...nextauth]/route.ts ใน App Router)
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import jwt from "jsonwebtoken";

import CredentialsProvider from "next-auth/providers/credentials";

// ให้กำหนด interface สำหรับ token และ session เพื่อช่วยในการตรวจสอบประเภท
declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        role_id?: number;
        id?: string;
        error?: string;
    }
}

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        user: {
            id?: string;
            role_id?: number;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }
    interface User {
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        role_id?: number;
        id?: string;
        name?: string | null;
        error?: string;
    }
}

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                
                try {
                    // *** การตรวจสอบข้อมูลผู้ใช้ ควรทำจากฐานข้อมูลจริง ***
                    if (credentials.username === "aaa" && credentials.password === "aaa") {
                        const user: User = {
                            id: '123',
                            name: 'admin',
                            role_id: 1, // ใช้ role_id แทน role เพื่อความชัดเจน
                        };
                        return user; // NextAuth จะสร้าง JWT token ให้เอง
                    }
                    return null;

                } catch (error) {
                    console.error("Authorize error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            // เมื่อมีการลงชื่อเข้าใช้สำเร็จ (ครั้งแรก)
            if (user) {
                token.id = user.id;
                token.role_id = user.role_id;
            }
            return token;
        },

        async session({ session, token }) {
            // ส่งข้อมูลจาก token ไปที่ session
            if (token) {
                session.user.id = token.id as string;
                session.user.role_id = token.role_id as number;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET, // ใช้ NEXTAUTH_SECRET เท่านั้น
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };