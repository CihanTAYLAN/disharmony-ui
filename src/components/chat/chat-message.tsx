import { UserAvatar } from "@/components/user/user-avatar";
import { formatDate } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  member: any;
  timestamp: Date;
}

export const ChatMessage = ({
  content,
  member,
  timestamp
}: ChatMessageProps) => {
  return (
    <div className="flex gap-x-3 py-4 px-4">
      <UserAvatar 
        src={member.imageUrl}
        className="cursor-pointer hover:drop-shadow-md transition"
      />
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-x-2">
          <div className="flex items-center">
            <p className="font-semibold text-sm hover:underline cursor-pointer">
              {member.name}
            </p>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">
              {formatDate(timestamp)}
            </span>
          </div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {content}
        </p>
      </div>
    </div>
  )
}
