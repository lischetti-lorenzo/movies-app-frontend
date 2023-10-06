import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../services/providers/AuthContext';
import { AUTH_TOKEN } from '../constants/auth';

export const ProtectedRoute = ({ children }: { children: any }) => {
  const router = useRouter();
  // TODO: check why user is always undefined
  const { user } = useContext(AuthContext);  

  useEffect(() => {
    const publicRoutes = ['/login'];
    const token = localStorage.getItem(AUTH_TOKEN);
    if (publicRoutes.includes(router.pathname) && token) {
      router.push('/');
    }

    if (!publicRoutes.includes(router.pathname) && !token) {
      router.push('/login');
    }
  }, [router.pathname]);

  return children;
};