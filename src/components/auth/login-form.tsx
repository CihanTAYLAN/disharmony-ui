'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store token
      localStorage.setItem('token', data.token);
      
      // Redirect to servers page
      router.push('/servers');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('email')}
          placeholder="Email"
          type="email"
          className="bg-zinc-300/50 dark:bg-zinc-700/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black dark:text-white"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div>
        <Input
          {...register('password')}
          placeholder="Password"
          type="password"
          className="bg-zinc-300/50 dark:bg-zinc-700/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black dark:text-white"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}
      </div>
      {error && (
        <div className="bg-red-500/15 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};
