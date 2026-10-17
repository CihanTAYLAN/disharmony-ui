import { MainLayout } from '@/components/layouts/main-layout';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';

interface ServerPageProps {
  params: {
    serverId: string;
  };
}

export default function ServerPage({ params }: ServerPageProps) {
  return (
    <MainLayout>
      <div className="flex flex-col h-screen bg-white dark:bg-[#313338]">
        <div className="flex-1">
          <ChatMessages roomId={params.serverId} />
        </div>
        <ChatInput roomId={params.serverId} userId="current-user-id" />
      </div>
    </MainLayout>
  );
}
