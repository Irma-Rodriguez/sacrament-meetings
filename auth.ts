import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = z.object({
                    email: z.string().email(),
                    password: z.string().min(1),
                }).safeParse(credentials);

                if (!parsed.success) return null;

                const { email, password } = parsed.data;

                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (!adminEmail || !adminPassword) {
                    throw new Error('Admin credentials are not configured.');
                }

                if (
                    email.toLowerCase() !== adminEmail.toLowerCase() ||
                    password !== adminPassword
                ) {
                    return null;
                }

                return {
                    id: 'admin',
                    name: 'Administrator',
                    email: adminEmail,
                };
            },
        }),
    ],
});
