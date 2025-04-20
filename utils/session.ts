'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
    (await cookies()).delete("accessToken");
    redirect('/auth/signin');
}

export async function getToken() {
    return (await cookies()).get('accessToken')?.value ?? null;
}