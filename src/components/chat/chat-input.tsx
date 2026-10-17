import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../ui/input';
import { useSocket } from '@/hooks/use-socket';

interface ChatInputProps {
  roomId: string;
  userId: string;
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ roomId, userId }: ChatInputProps) => {
  const { socket } = useSocket();
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      socket?.emit('sendMessage', {
        content: values.content,
        roomId,
        senderId: userId,
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <Input
        {...register('content')}
        placeholder="Type a message..."
        className="px-4 py-6 bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200"
      />
    </form>
  );
};
