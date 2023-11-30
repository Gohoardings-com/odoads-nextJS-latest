import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const userIsAuthenticated = typeof window !== 'undefined' && Cookies.get('odoads_goh') !== undefined;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push('/login');
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}
