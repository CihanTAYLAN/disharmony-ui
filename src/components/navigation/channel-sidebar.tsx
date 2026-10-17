'use client';

import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from '../ui/scroll-area';
import { Hash, Mic, Plus, Settings, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { UserAvatar } from '../user/user-avatar';
import { useParams } from 'next/navigation';

interface RoomType {
  TEXT: 'TEXT';
  VOICE: 'VOICE';
}

export const ChannelSidebar = () => {
  const params = useParams();
  const serverId = params?.serverId as string;

  const { data: rooms } = useQuery({
    queryKey: ['rooms', serverId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/servers/${serverId}/rooms`);
      return response.json();
    },
    enabled: !!serverId,
  });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/users/me');
      return response.json();
    },
  });

  const getRoomIcon = (type: keyof RoomType) => {
    switch (type) {
      case 'TEXT':
        return <Hash className="mr-2 h-4 w-4" />;
      case 'VOICE':
        return currentUser?.videoEnabled ? (
          <Video className="mr-2 h-4 w-4" />
        ) : (
          <Mic className="mr-2 h-4 w-4" />
        );
      default:
        return <Hash className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#2B2D31] dark:bg-[#2B2D31]">
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <div className="flex items-center justify-between py-2">
            <h2 className="text-lg font-semibold text-zinc-200">Text Channels</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {rooms?.filter((room: any) => room.type === 'TEXT').map((room: any) => (
            <Button
              key={room.id}
              variant="ghost"
              className="w-full justify-start font-normal py-2"
            >
              {getRoomIcon(room.type)}
              {room.name}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between py-2">
            <h2 className="text-lg font-semibold text-zinc-200">Voice Channels</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {rooms?.filter((room: any) => room.type === 'VOICE').map((room: any) => (
            <Button
              key={room.id}
              variant="ghost"
              className="w-full justify-start font-normal py-2"
            >
              {getRoomIcon(room.type)}
              {room.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-3 bg-[#232428]">
        <div className="flex items-center gap-x-2">
          <UserAvatar
            src={currentUser?.imageUrl}
            className="h-8 w-8 md:h-8 md:w-8"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-zinc-200">
              {currentUser?.name}
            </span>
            <span className="text-xs text-zinc-400">
              {currentUser?.status || 'online'}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
