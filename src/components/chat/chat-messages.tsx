import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from '../ui/scroll-area';
import { ChatMessage } from './chat-message';
import { useSocket } from '@/hooks/use-socket';

interface ChatMessagesProps {
  roomId: string;
}

export const ChatMessages = ({ roomId }: ChatMessagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();

  const { data: messages, refetch } = useQuery({
    queryKey: ['messages', roomId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/messages/room/${roomId}`);
      return response.json();
    },
    enabled: !!roomId,
  });

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinRoom', roomId);

    const handleNewMessage = () => {
      refetch();
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.emit('leaveRoom', roomId);
      socket.off('newMessage', handleNewMessage);
    };
  }, [roomId, socket, refetch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="flex flex-col gap-y-4">
        {messages?.map((message: any) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            member={message.sender}
            timestamp={new Date(message.createdAt)}
          />
        ))}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
};
