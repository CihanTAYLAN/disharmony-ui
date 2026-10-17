'use client';

import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from '../ui/scroll-area';
import { ServerItem } from './server-item';
import { Separator } from '../ui/separator';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export const ServerSidebar = () => {
  const { data: servers } = useQuery({
    queryKey: ['servers'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/servers');
      return response.json();
    },
  });

  return (
    <div className="flex flex-col items-center h-full space-y-4 py-3 bg-[#1E1F22] text-primary w-full dark:bg-[#1E1F22]">
      <ScrollArea className="flex-1 w-full">
        <div className="flex flex-col items-center space-y-2 px-3">
          {servers?.map((server: any) => (
            <ServerItem
              key={server.id}
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          ))}
        </div>
      </ScrollArea>
      <Separator className="h-[2px] w-10 mx-auto bg-zinc-700 rounded-md" />
      <div className="pb-3 px-3">
        <Button
          variant="ghost"
          className="group flex items-center"
          size="icon"
        >
          <Plus className="group-hover:text-white transition text-emerald-500" />
        </Button>
      </div>
    </div>
  );
};
