import { MainLayout } from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">Welcome to Disharmony</h1>
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}