import React, { useEffect, useState, useRef } from 'react';
import StorySection from '@/components/StorySection';
import ParallaxBackground from '@/components/ParallaxBackground';
import ScrollProgress from '@/components/ScrollProgress';
import { ChevronLeft, ChevronRight, Book, Volume2, VolumeX, Twitter, Facebook, Instagram, Linkedin,Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Index = () => {
  // Audio state and ref
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Audio setup
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true; // Make the audio loop
      audio.volume = 1; // Set initial volume (0.0 to 1.0)
      audio.play().catch(error => {
        console.log("Autoplay prevented:", error);
        // Handle autoplay restrictions - might need user interaction to start
      });
    }

    // Cleanup on unmount
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  // Toggle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="story-container relative">
      {/* Audio element */}
      <audio ref={audioRef} src="/images/ch2.mp3" />

      {/* Fixed mute/unmute button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          className="rounded-full p-3 bg-gray-900/80 hover:bg-gray-800/80 border-gray-700"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-white" />
          ) : (
            <Volume2 className="h-5 w-5 text-white" />
          )}
        </Button>
      </div>

      <ScrollProgress />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <ParallaxBackground 
          imageUrl="/images/night-sky.jpg" 
          speed={0.2} 
          opacity={0.7}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-20 text-center px-4"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-bold mb-6 animate-pulse-glow"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            Chapter 2
          </motion.h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-cinzel font-semibold mb-10 text-primary animate-pulse-glow">
            The Shrine of the Eclipse
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl md:text-2xl font-raleway text-gray-200 max-w-xl mx-auto">
            A tale of forgotten memories and eternal love
          </p>
          
          <Button 
            className="mt-10 text-lg rounded-full px-8 py-6"
            onClick={() => {
              document.getElementById('section1')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Book className="mr-2 h-5 w-5" /> Begin Reading
          </Button>
        </motion.div>
      </section>
      
      {/* Story Sections with Character Animations */}
      <StorySection 
        id="section1" 
        title="A Call from the Past" 
        backgroundClass="bg-gradient-to-b from-gray-950 to-indigo-950"
        paragraphs={[
          "The days leading up to the eclipse were restless.",
          "Ren couldn't focus on his studies. His dreams became more intense—visions of a forgotten shrine, a mirror cracked down the middle, and the same girl standing in the moonlight, reaching out to him.",
          "And then—",
          "\"Come find me.\"",
          "A whisper in the wind.",
          "A voice that felt so painfully familiar.",
          "The moment he woke up, his heart was pounding.",
          "He knew this wasn't just a dream.",
          "Something—or someone—was calling him."
        ]}
        characters={[
          { 
            name: "Ren", 
            position: "left", 
            emotion: "neutral",
            imagePath: "/images/ren.png",
            animationStyle: "slide" 
          }
        ]}
      >
        <ParallaxBackground 
          imageUrl="/images/moon.jpg" 
          speed={0.1} 
          opacity={0.2}
          className="mix-blend-overlay"
        />
      </StorySection>
      
      <StorySection 
        id="section2" 
        title="The Same Pull" 
        backgroundClass="bg-gradient-to-b from-indigo-950 to-purple-950"
        paragraphs={[
          "Across town, Aoi sat on her balcony, staring at the full moon.",
          "For as long as she could remember, she had been drawn to the night sky.",
          "But tonight, she felt something different.",
          "A strange pull in her chest, an unspoken urgency.",
          "And then, she heard it—a whisper carried by the wind.",
          "\"Come find me.\"",
          "The voice sent a shiver down her spine.",
          "She looked at the calendar on her desk.",
          "The solar eclipse was in three days.",
          "And for some reason, she knew—she had to go to the shrine."
        ]}
        characters={[
          { 
            name: "Aoi", 
            position: "right", 
            emotion: "surprised",
            imagePath: "/images/aoi.png",
            animationStyle: "reveal" 
          }
        ]}
      >
        <div className="absolute bottom-0 right-0 opacity-20 z-0">
          <Moon className="h-72 w-72 text-blue-200" strokeWidth={0.5} />
        </div>
      </StorySection>
      
      <StorySection 
        id="section3" 
        title="The Forgotten Shrine" 
        backgroundClass="bg-gradient-to-b from-purple-950 to-gray-900"
        paragraphs={[
          "The old shrine sat atop a hill overlooking the sea, hidden behind thick trees and tangled vines.",
          "Few people visited it anymore.",
          "Legends said it was once dedicated to a forgotten moon goddess, but over time, her name had faded from history.",
          "That morning, Ren stood at the entrance, his breath misting in the crisp autumn air.",
          "His hands trembled as he stepped forward.",
          "Every part of him knew—this place was important.",
          "But why?",
          "The wind howled as he entered.",
          "And at the same time, from the other side of the shrine, Aoi arrived.",
          "They didn't see each other yet.",
          "Not until they both stepped into the heart of the shrine—where a massive, ancient mirror stood.",
          "Its surface was cracked down the middle, golden veins of kintsugi lacing through the glass.",
          "And the moment their eyes met in the reflection—",
          "The world shattered."
        ]}
        characters={[
          { 
            name: "The Forgotten Shrine", 
            position: "left", 
            emotion: "neutral",
            imagePath: "/images/shrin.jpeg",
            animationStyle: "fade" 
          }
        ]}
      >
        <ParallaxBackground 
          imageUrl="/images/shrine-bg.jpg" 
          speed={0.15} 
          opacity={0.3}
          className="mix-blend-overlay"
        />
      </StorySection>
      
      <StorySection 
        id="section4" 
        title="A Glimpse of the Past" 
        backgroundClass="bg-gradient-to-b from-gray-900 to-blue-950"
        paragraphs={[
          "A wave of light exploded from the mirror.",
          "Aoi gasped as a flood of memories—no, visions—flashed before her eyes.",
          "A grand celestial palace, high above the mortal world.",
          "A forbidden love, hidden in moonlit corridors.",
          "A desperate escape, running hand in hand.",
          "And then—",
          "Betrayal.",
          "Someone ripped them apart.",
          "Ren clutched his head as pain seared through him.",
          "Memories of another life, another name, another love—",
          "And just as suddenly as it began, it ended.",
          "They collapsed to the floor, gasping for breath.",
          "The shrine was silent.",
          "The mirror was no longer broken.",
          "And standing before them—",
          "A woman with golden eyes and long, flowing black hair.",
          "\"You have returned,\" she whispered."
        ]}
        characters={[
          { 
            name: "past-life memories", 
            position: "left", 
            emotion: "surprised",
            imagePath: "/images/past1.jpeg",
            animationStyle: "float" 
          },
          { 
            name: "Reincarnation Revelation (Dream Realm)", 
            position: "right", 
            emotion: "surprised",
            imagePath: "/images/past2.jpeg",
            animationStyle: "float" 
          }
        ]}
      />
      
      <StorySection 
        id="section5" 
        title="The Goddess of Death" 
        backgroundClass="bg-gradient-to-b from-blue-950 to-purple-950"
        paragraphs={[
          "Ren and Aoi stared in horror.",
          "The woman before them was no ordinary spirit.",
          "She was Izanami, the goddess of death.",
          "The ruler of Yomi, the land of the dead.",
          "And she looked upon them with an expression that was both sorrowful and amused.",
          "\"It has taken you long enough to find each other again.\"",
          "Aoi's voice shook. \"Who… who are you?\"",
          "Izanami smiled—a smile filled with centuries of sadness.",
          "\"I am the one who cursed you.\"",
          "Ren and Aoi froze.",
          "\"A curse?\"",
          "Izanami stepped closer, her golden eyes burning like fire.",
          "Do you remember your past? Do you remember the lives you have lost?"
        ]}
        characters={[
          { 
            name: "Izanami", 
            position: "left", 
            emotion: "surprised",
            imagePath: "/images/ch2.png",
            animationStyle: "pulse" 
          },
          { 
            name: "Izanami, Aoi and Ren", 
            position: "right", 
            emotion: "sad",
            imagePath: "/images/img1.png",
            animationStyle: "pulse" 
          }
        ]}
      >
        <ParallaxBackground 
          imageUrl="/images/eclipse.jpg" 
          speed={0.2} 
          opacity={0.2}
          className="mix-blend-soft-light"
        />
      </StorySection>
      
      <StorySection 
        id="section6" 
        title="The Curse of Rebirth" 
        backgroundClass="bg-gradient-to-b from-purple-950 to-black"
        paragraphs={[
          "Long ago—hundreds of years before this moment—they had been Hikaru and Tsukiko.",
          "A celestial prince and a moon maiden.",
          "Their love was never meant to be.",
          "The gods had forbidden it.",
          "And yet, they had defied the heavens, running away together, stealing a sacred artifact known as the Thread of Rebirth—an artifact that could weave fate itself.",
          "They had planned to use it to be reborn as mortals, to escape the grasp of the gods and live a quiet, happy life.",
          "But before they could escape—someone betrayed them.",
          "Someone they trusted.",
          "They were caught.",
          "And the gods were furious.",
          "\"You shall be reborn again and again,\" the gods had decreed, \"but in every life, one of you shall forget, and one of you shall remember. Your love shall never bloom. You shall never be free.\"",
          "And so they suffered.",
          "Lifetime after lifetime.",
          "Sometimes, they met as strangers. Sometimes, they became friends. But before love could ever truly blossom—one of them always forgot.",
          "Until now.",
          "Because this time, they both remembered."
        ]}
        characters={[]}
      />
      
      <section className="min-h-screen flex flex-col items-center justify-center relative">
        <ParallaxBackground 
          imageUrl="/images/eclipse.jpg" 
          speed={0.1} 
          opacity={0.6}
        />
        <div className="absolute inset-0 bg-black/70 z-10" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="relative z-20 text-center px-4 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-cinzel font-semibold mb-8 text-primary">
            Izanami studied them carefully.
          </h2>
          <motion.p 
            className="text-xl md:text-2xl mb-10 font-raleway"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            "So," she murmured, "do you wish to defy the heavens again?"
          </motion.p>
          <motion.p 
            className="text-xl md:text-2xl mb-10 font-raleway"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ren and Aoi locked eyes.
          </motion.p>
          <motion.p 
            className="text-xl md:text-2xl mb-10 font-raleway"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            viewport={{ once: true }}
          >
            They had been denied their love for lifetimes.
          </motion.p>
          <motion.p 
            className="text-xl md:text-2xl mb-10 font-raleway"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            And now, they had a choice:
          </motion.p>
          <motion.p 
            className="text-xl md:text-2xl font-medium mb-10 text-primary font-raleway"
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Accept their fate—or fight against it.
          </motion.p>
          <motion.p 
            className="text-xl md:text-2xl mb-10 font-raleway"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            This time, they would not run.
          </motion.p>
          <motion.p 
            className="text-xl md:text-2xl mb-10 font-raleway"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            viewport={{ once: true }}
          >
            This time, they would fight.
          </motion.p>
          <motion.p 
            className="text-xl md:text-3xl font-raleway"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            And so, they spoke the words that would change everything:
          </motion.p>
          <motion.p 
            className="text-2xl md:text-4xl font-medium mt-8 text-primary font-cinzel animate-pulse-glow"
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 2.7, duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
          >
            "Tell us what we need to do."
          </motion.p>
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1.5 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-cinzel text-gray-400">
              To Be Continued in Chapter 3:
            </p>
            <p className="text-2xl md:text-3xl font-cinzel text-gray-300 mt-2 mb-8">
              The Land of Forgotten Souls
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <a href="/chapter3" className="inline-block">
                <Button 
                  variant="shimmer" 
                  size="lg"
                  className="text-lg font-cinzel rounded-full px-8 py-7 shadow-lg shadow-primary/30"
                >
                  Continue to Chapter 3
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-cinzel text-gray-300 mb-8">Navigate Chapters</h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://storyweb-orcin.vercel.app/" className="inline-block">
                <Button variant="outline" size="default" className="font-cinzel">
                  Chapter 1
                </Button>
              </a>
              <Button variant="secondary" size="default" className="font-cinzel pointer-events-none">
                Chapter 2 (Current)
              </Button>
              <a href="/chapter3" className="inline-block">
                <Button variant="outline" size="default" className="font-cinzel">
                  Chapter 3
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gradient-to-b from-black to-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm mb-4">
            © Copyright BHARATH. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/__bharath_.s?igsh=MXZkOWltZHZybGcxNQ%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
