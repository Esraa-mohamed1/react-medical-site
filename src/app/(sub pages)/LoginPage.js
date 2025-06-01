import React from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (data) => {
    console.log('Login data:', data);
    router.push('/artical');
  };

  return <AuthForm variant="login" onSubmit={handleLogin} />;
}
