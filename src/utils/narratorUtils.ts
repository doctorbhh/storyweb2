type NarrationOptions = {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
};

type NarrationState = {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
  currentUtterance: SpeechSynthesisUtterance | null;
};

class Narrator {
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private options: Required<NarrationOptions> = {
    rate: 0.95, // Slightly slower for better storytelling
    pitch: 1.05, // Slight pitch adjustment for more dramatic effect
    volume: 1,
    voice: null
  };
  private state: NarrationState = {
    isPlaying: false,
    isPaused: false,
    currentText: '',
    currentUtterance: null
  };
  private onStartCallbacks: (() => void)[] = [];
  private onEndCallbacks: (() => void)[] = [];
  private voicesLoaded = false;
  private isInitializing = false;

  constructor(options?: NarrationOptions) {
    if (options) {
      this.setOptions(options);
    }
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Prevent multiple initialization attempts
    if (this.isInitializing) return;
    this.isInitializing = true;

    // Force cancel any ongoing speech to reset the state
    window.speechSynthesis.cancel();

    // Load available voices
    this.voices = window.speechSynthesis.getVoices();

    // If voices are not available immediately, wait for them to load
    if (this.voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
        this.findPreferredVoice();
        this.voicesLoaded = true;
        this.isInitializing = false;
      };
    } else {
      this.findPreferredVoice();
      this.voicesLoaded = true;
      this.isInitializing = false;
    }
  }

  private findPreferredVoice() {
    // Enhanced voice selection with preference for deeper, more dramatic voices
    // Priority: Microsoft David > Google UK English Male > English (UK) Male voices > any English voice
    const voiceNames = [
      'Microsoft David', 
      'Google UK English Male', 
      'Daniel', 
      'James',
      'Microsoft Samantha',
      'Google US English'
    ];
    
    for (const name of voiceNames) {
      const voice = this.voices.find(v => 
        v.name.includes(name) && v.lang.includes('en')
      );
      if (voice) {
        this.preferredVoice = voice;
        this.options.voice = voice;
        return;
      }
    }
    
    // Fallback to any English voice
    const englishVoice = this.voices.find(v => v.lang.includes('en'));
    if (englishVoice) {
      this.preferredVoice = englishVoice;
      this.options.voice = englishVoice;
      return;
    }
    
    // Last resort: use the first available voice
    if (this.voices.length > 0) {
      this.preferredVoice = this.voices[0];
      this.options.voice = this.voices[0];
    }
  }

  public getVoices() {
    return this.voices;
  }

  public setOptions(options: NarrationOptions) {
    this.options = {
      ...this.options,
      ...options
    };
    return this;
  }

  public setVoice(voice: SpeechSynthesisVoice) {
    this.options.voice = voice;
    return this;
  }

  public speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.error('Speech synthesis is not supported in this browser');
      return this;
    }

    // Cancel any current narration to prevent stacking
    this.stop();
    
    // Add a small delay before starting new speech to ensure the previous one is fully stopped
    setTimeout(() => {
      // Break text into sentences for more natural pauses and to prevent getting stuck
      const sentences = this.splitIntoSentences(text);
      this.speakSentences(sentences);
    }, 50);
    
    return this;
  }
  
  private splitIntoSentences(text: string): string[] {
    // Split by common sentence delimiters but keep the delimiters
    return text.split(/(?<=[\.\?\!])\s+/);
  }
  
  private speakSentences(sentences: string[]): void {
    if (!sentences.length) return;
    
    // Take the first sentence
    const sentence = sentences[0];
    
    const utterance = new SpeechSynthesisUtterance(sentence);
    
    // Set options
    utterance.rate = this.options.rate;
    utterance.pitch = this.options.pitch;
    utterance.volume = this.options.volume;
    
    // Set voice if available
    if (this.options.voice) {
      utterance.voice = this.options.voice;
    } else if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }
    
    // Set up event handlers
    if (sentences.length === 1) {
      // This is the final sentence
      utterance.onstart = () => {
        this.state.isPlaying = true;
        this.state.isPaused = false;
        this.onStartCallbacks.forEach(cb => cb());
      };
      
      utterance.onend = () => {
        this.state.isPlaying = false;
        this.state.isPaused = false;
        this.state.currentUtterance = null;
        this.onEndCallbacks.forEach(cb => cb());
      };
    } else {
      // There are more sentences to speak
      utterance.onstart = () => {
        if (!this.state.isPlaying) {
          this.state.isPlaying = true;
          this.state.isPaused = false;
          this.onStartCallbacks.forEach(cb => cb());
        }
      };
      
      utterance.onend = () => {
        // Speak the next sentence with a small pause
        setTimeout(() => {
          if (this.state.isPlaying && !this.state.isPaused) {
            this.speakSentences(sentences.slice(1));
          }
        }, 200); // Small pause between sentences
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        // Try to recover by moving to the next sentence
        setTimeout(() => {
          if (this.state.isPlaying && !this.state.isPaused) {
            this.speakSentences(sentences.slice(1));
          }
        }, 200);
      };
    }
    
    // Store current state
    this.state.currentText = sentence;
    this.state.currentUtterance = utterance;
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
  }

  public pause() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return this;

    if (this.state.isPlaying && !this.state.isPaused) {
      window.speechSynthesis.pause();
      this.state.isPaused = true;
    }
    
    return this;
  }

  public resume() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return this;

    if (this.state.isPaused) {
      window.speechSynthesis.resume();
      this.state.isPaused = false;
    }
    
    return this;
  }

  public stop() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return this;

    window.speechSynthesis.cancel();
    this.state.isPlaying = false;
    this.state.isPaused = false;
    this.state.currentUtterance = null;
    
    return this;
  }

  public onStart(callback: () => void) {
    this.onStartCallbacks.push(callback);
    return this;
  }

  public onEnd(callback: () => void) {
    this.onEndCallbacks.push(callback);
    return this;
  }

  public getState() {
    return { ...this.state };
  }

  public isVoicesLoaded() {
    return this.voicesLoaded;
  }
}

// Create a singleton instance
const narrator = typeof window !== 'undefined' ? new Narrator() : null;

export { narrator };
export type { NarrationOptions, NarrationState };
