import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Book, Volume2, VolumeX, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import ParallaxBackground from '@/components/ParallaxBackground';
import StorySection from '@/components/StorySection';

const Chapter5 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Audio state and ref
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Audio setup
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 1;
      audio.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
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
      <audio ref={audioRef} src="/images/chapter5.mp3" />

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

      {/* Main hero section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <ParallaxBackground 
          imageUrl="/images/night-sky.jpg" 
          speed={0.2} 
          opacity={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-indigo-950 opacity-90" />
        
        <div className="absolute inset-0 -z-5 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-20 text-center px-4"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-bold mb-6 animate-pulse-glow"
          >
            Chapter 5
          </motion.h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-cinzel font-semibold mb-10 text-primary animate-pulse-glow">
            The First Life
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl md:text-2xl font-raleway text-gray-200 max-w-xl mx-auto">
            A new beginning after breaking the cycle
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
      
      {/* Story sections */}
      <StorySection 
        id="section1" 
        title="Awakening in a New World" 
        backgroundClass="bg-gradient-to-b from-gray-950 to-indigo-950"
        paragraphs={[
          "Ren’s eyes fluttered open.",
          "The first thing he noticed was the warmth of the sun against his skin.",
          "For a moment, he didn’t move. He simply lay there, breathing in the scent of fresh earth, feeling the soft caress of the wind.",
          "It was strange.",
          "The air was lighter. The weight he had always carried in his chest—the unexplainable sorrow, the missing piece in his heart—was gone.",
          "For the first time in countless lives, he felt… whole.",
          "He sat up.",
          "And that’s when he saw her.",
          "Aoi.",
          "She was standing a few feet away, staring at her own hands as if she had never seen them before.",
          "And then, slowly—she turned to him.",
          "Their eyes met.",
          "And they both knew.",
          "The cycle was over.",
          "This was their first life.",
          "A life where they were finally free."
        ]}
        characters={[
          { 
            name: "Aoi", 
            position: "left", 
            emotion: "happy",
            imagePath: "/images/lake1.jpeg",
            animationStyle: "slide" 
          },
          
        ]}
      />
      
      <StorySection 
        id="section2" 
        title="The New Beginning" 
        backgroundClass="bg-gradient-to-b from-indigo-950 to-purple-950"
        paragraphs={[
          "The world around them was different from anything they had ever known.",
          "Gone were the towering celestial palaces. Gone were the endless corridors of fate that had dictated their every choice.",
          "Instead—",
          "They stood on the shore of a vast, shimmering lake, surrounded by rolling green hills.",
          "The sky was painted in hues of soft gold and deep violet, as if the heavens themselves were celebrating their rebirth.",
          "Aoi knelt down, touching the water’s surface. It was real.",
          "She turned to Ren, her voice barely a whisper. \"Is this… truly happening?\"",
          "Ren walked toward her.",
          "Without hesitation, he reached out—and took her hand.",
          "\"Yes.\"",
          "The warmth of his fingers against hers sent a shiver down her spine.",
          "For centuries, they had been torn apart.",
          "Now, for the first time in eternity—they had found each other at the very beginning.",
          "They could finally write their own story."
        ]}
        characters={[
         
          { 
            name: "Ren and Aoi", 
            position: "right", 
            emotion: "happy",
            imagePath: "/images/lake.jpeg",
            animationStyle: "fade" 
          }
        ]}
      />
      
      <StorySection 
        id="section3" 
        title="The Unfinished Dream" 
        backgroundClass="bg-gradient-to-b from-purple-950 to-gray-900"
        paragraphs={[
          "They didn’t remember how they got here.",
          "There were no memories of childhood, no past filled with loss or longing.",
          "But they remembered each other.",
          "That was enough.",
          "\"What do we do now?\" Aoi asked, looking up at him.",
          "Ren smiled.",
          "For the first time, he didn’t have to search for an answer.",
          "\"We live.\"",
          "And for the first time—they did.",
          "They spent their days exploring the vast landscapes of their new world, discovering forests filled with glowing fireflies, rivers that sparkled like liquid silver, and fields of wildflowers that danced in the wind.",
          "They laughed.",
          "They dreamed.",
          "They loved—without fear, without tragedy, without fate pulling them apart.",
          "For the first time, there was no destiny written for them.",
          "They were just two people in love.",
          "And that was enough."
        ]}
        characters={[
          { 
            name: "Ren and Aoi", 
            position: "left", 
            emotion: "happy",
            imagePath: "/images/sun.jpeg",
            animationStyle: "float" 
          },
          
        ]}
      />
      
      <StorySection 
        id="section4" 
        title="The Final Gift" 
        backgroundClass="bg-gradient-to-b from-gray-900 to-blue-950"
        paragraphs={[
          "One evening, as they sat beneath a tree watching the sunset, Aoi looked at Ren, her eyes thoughtful.",
          "\"Do you think… the gods will ever try to take this away from us again?\"",
          "Ren squeezed her hand.",
          "\"No.\"",
          "Because this time, they had earned this life.",
          "The curse had been lifted.",
          "The gods had let them go.",
          "But even if fate ever tried to challenge them again—",
          "They would never forget each other.",
          "Not in this life.",
          "Not in any life to come.",
          "Because now, they had something they had never had before—",
          "A true beginning."
        ]}
        characters={[
          
          { 
            name: "Ren and Aoi", 
            position: "right", 
            emotion: "happy",
            imagePath: "/images/tree.jpg",
            animationStyle: "pulse" 
          }
        ]}
      />
      
      <StorySection 
        id="section5" 
        title="The Story That Never Ends" 
        backgroundClass="bg-gradient-to-b from-blue-950 to-gray-900"
        paragraphs={[
          "And so, Ren and Aoi lived.",
          "Their story, once filled with sorrow and tragedy, became one of warmth and endless possibilities.",
          "There were no more lifetimes lost.",
          "No more cursed reincarnations.",
          "Only this—",
          "A life where they were simply Ren and Aoi.",
          "Two souls who had fought against fate and won.",
          "And as the stars appeared in the night sky above them, Aoi leaned against Ren’s shoulder and whispered—",
          "\"Do you think this is our happy ending?\"",
          "Ren smiled, pressing a soft kiss to her forehead.",
          "\"No,\" he said. \"This is just the beginning.\"",
          "And beneath the endless sky, they watched the world they had waited lifetimes for finally unfold before them.",
          "Together.",
          "Forever."
        ]}
        characters={[
          { 
            name: "Ren and Aoi", 
            position: "left", 
            emotion: "happy",
            imagePath: "/images/final.jpg",
            animationStyle: "fade" 
          },
          
        ]}
      />
      
      {/* Epilogue section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 to-black opacity-90" />
        
        <div className="absolute inset-0 -z-5 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`end-star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="max-w-2xl text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-5xl font-cinzel font-medium mb-8 text-primary">
            The End
          </h2>
          
          <div className="w-24 h-1 bg-primary mx-auto mb-10" />
          
          <p className="text-xl mb-6">
            Ren and Aoi have found their true beginning, free from the chains of fate.
          </p>
          <p className="text-xl mb-12">
            Their story continues in the life they choose to live...
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link to="/chapter4">
              <Button variant="outline" size="lg" className="px-8 py-6 rounded-full group">
                <ChevronLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Previous Chapter
              </Button>
            </Link>
            <Link to="https://storyweb-orcin.vercel.app/">
              <Button variant="shimmer" size="lg" className="px-8 py-6 rounded-full group">
                Return to Beginning
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
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

export default Chapter5;
