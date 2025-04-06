
import React from 'react';
import { useNarrator } from '../contexts/NarratorContext';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const NarratorControls: React.FC = () => {
  const { isPlaying, isPaused, isMuted, toggleMute, pause, resume, stop } = useNarrator();
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute narration" : "Mute narration"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Volume2 className="h-5 w-5 text-primary" />
        )}
      </Button>
      
      {isPlaying && (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={isPaused ? resume : pause}
          aria-label={isPaused ? "Resume narration" : "Pause narration"}
        >
          {isPaused ? (
            <Play className="h-5 w-5 text-primary" />
          ) : (
            <Pause className="h-5 w-5 text-primary" />
          )}
        </Button>
      )}
    </div>
  );
};

export default NarratorControls;
