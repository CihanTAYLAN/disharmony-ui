import { MainLayout } from '@/components/layouts/main-layout';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';
import { VoiceChannel } from '@/components/voice/voice-channel';
import { useQuery } from '@tanstack/react-query';

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default function RoomPage({ params }: RoomPageProps) {
  const { data: room } = useQuery({
    queryKey: ['room', params.roomId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/rooms/${params.roomId}`);
      return response.json();
    },
  });

  return (
    <MainLayout>
      <div className="flex flex-col h-screen bg-white dark:bg-[#313338]">
        {room?.type === 'TEXT' ? (
          <>
            <div className="flex-1">
              <ChatMessages roomId={params.roomId} />
            </div>
            <ChatInput roomId={params.roomId} userId="current-user-id" />
          </>
        ) : (
          <VoiceChannel roomId={params.roomId} />
        )}
      </div>
    </MainLayout>
  );
}
