"use client";

import { LoginContext } from '@/context/LoginContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const context = useContext(LoginContext);
    const router = useRouter();

    useEffect(() => {
        if (!context || context.login !== "logado") {
            router.push('/login');
        }
    }, [context, router]);

    // Se o usuário estiver logado, renderize os filhos
    return <>{context && context.login === "logado" ? children : null}</>;
};
