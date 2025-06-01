import React from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../components/AuthForm';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (data) => {
    console.log('Register data:', data);
    router.push('/artical');
  };

  return <AuthForm variant="register" onSubmit={handleRegister} />;
}
