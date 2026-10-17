'use client';

import { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/hooks/use-socket';
import { Button } from '../ui/button';
import { Mic, MicOff, Video, VideoOff, Monitor, StopCircle } from 'lucide-react';

interface VoiceChannelProps {
  roomId: string;
}

export const VoiceChannel = ({ roomId }: VoiceChannelProps) => {
  const { socket } = useSocket();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinVoiceRoom', { roomId, userId: 'current-user-id' });

    return () => {
      socket.emit('leaveVoiceRoom', { roomId, userId: 'current-user-id' });
    };
  }, [roomId, socket]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    socket?.emit('toggleMute', {
      roomId,
      userId: 'current-user-id',
      isMuted: !isMuted,
    });
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    socket?.emit('toggleVideo', {
      roomId,
      userId: 'current-user-id',
      isVideoOn: !isVideoOn,
    });
  };

  const toggleScreenShare = () => {
    if (isScreenSharing) {
      setIsScreenSharing(false);
      socket?.emit('stopScreenShare', {
        roomId,
        userId: 'current-user-id',
      });
    } else {
      setIsScreenSharing(true);
      socket?.emit('startScreenShare', {
        roomId,
        userId: 'current-user-id',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <div className="flex space-x-4">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-64 h-48 bg-zinc-800 rounded-lg"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-64 h-48 bg-zinc-800 rounded-lg"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Button
          onClick={toggleMute}
          variant={isMuted ? 'destructive' : 'default'}
          size="icon"
        >
          {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Button
          onClick={toggleVideo}
          variant={isVideoOn ? 'default' : 'destructive'}
          size="icon"
        >
          {isVideoOn ? (
            <Video className="h-4 w-4" />
          ) : (
            <VideoOff className="h-4 w-4" />
          )}
        </Button>
        <Button
          onClick={toggleScreenShare}
          variant={isScreenSharing ? 'destructive' : 'default'}
          size="icon"
        >
          {isScreenSharing ? (
            <StopCircle className="h-4 w-4" />
          ) : (
            <Monitor className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
