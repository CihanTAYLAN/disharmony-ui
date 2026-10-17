import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome back!</h1>
        <LoginForm />
      </div>
    </div>
  );
}
