import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { USER } from '../constants/auth';
import { pages } from '../constants/pages';
import { User } from '../types/user.types';

export const ProtectedRoute = ({ children }: { children: any }) => {
  const router = useRouter();

  useEffect(() => {
    const publicRoutes = ['/login', '/signup'];
    const user = JSON.parse(localStorage.getItem(USER)) as User;
    if (user) {
      if (publicRoutes.includes(router.pathname)) {
        router.push('/');
        return;
      }

      console.log('Router: ', router)
      console.log('Router pathname: ', router.pathname)
      const page = pages.find(p => p?.link === router.pathname);
      if (!page) {
        router.push('/');
        return;
      }

      if (page.roles && !page.roles.includes(user.role)) {
        router.push('/');
        return;
      }
    } else {
      if (!publicRoutes.includes(router.pathname)) router.push('/login');
    }
  }, [router.pathname]);

  return children;
};