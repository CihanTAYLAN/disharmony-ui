'use client';

import React from 'react';
import { ServerSidebar } from '../navigation/server-sidebar';
import { ChannelSidebar } from '../navigation/channel-sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <ServerSidebar />
      </div>
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 left-[72px]">
        <ChannelSidebar />
      </div>
      <main className="h-full md:pl-[calc(72px+240px)]">
        {children}
      </main>
    </div>
  );
};
