import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ParallaxBackground from '@/components/ParallaxBackground';
import StorySection from '@/components/StorySection';
import { ChevronLeft, ChevronRight, Book, Volume2, VolumeX, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Chapter4 = () => {
  // Scroll to top when component mounts
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
      <audio ref={audioRef} src="/images/Clash of the Eternal Brothers.mp3" />

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
        
        {/* Animated background elements */}
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
        
        {/* Main content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-20 text-center px-4"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-bold mb-6 animate-pulse-glow"
          >
            Chapter 4
          </motion.h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-cinzel font-semibold mb-10 text-primary animate-pulse-glow">
            The Curse of Rebirth
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl md:text-2xl font-raleway text-gray-200 max-w-xl mx-auto">
            The final confrontation with fate itself
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
        title="The Forgotten Betrayal" 
        backgroundClass="bg-gradient-to-b from-gray-950 to-indigo-950"
        paragraphs={[
          "Ren and Aoi stood at the threshold of an ancient temple deep within Yomi. Unlike the rest of the underworld, which was filled with endless twilight, this place was bathed in an eerie golden glow.",
          "Before them lay a great stone altar, covered in ancient inscriptions. At its center, embedded into the stone, was a single, glowing red thread—the legendary Thread of Rebirth.",
          "Ren's breath caught in his throat.",
          "\"This is it,\" he whispered. \"The artifact we stole… the one we were punished for.\"",
          "Aoi stepped closer, her fingers tracing the inscriptions. The ancient language was unreadable, but somehow, she understood it.",
          "\"To rewrite fate, to break the cycle—one must remember the betrayer.\"",
          "The betrayer.",
          "The one who had torn them apart centuries ago.",
          "For every life they had lived, the betrayer's name had been lost to time.",
          "But now, standing before the altar, it was as if the air itself whispered the truth.",
          "Ren's eyes widened.",
          "\"It was… him?\""
        ]}
        characters={[
          { 
            name: "artifact", 
            position: "left", 
            emotion: "surprised",
            imagePath: "/images/artifact.jpeg",
            animationStyle: "slide" 
          },
          { 
            name: "The shrin of Re-Rirth", 
            position: "right", 
            emotion: "neutral",
            imagePath: "/images/rebirth.jpeg",
            animationStyle: "slide" 
          }
        ]}
      />
      
      <StorySection 
        id="section2" 
        title="A Brother's Jealousy" 
        backgroundClass="bg-gradient-to-b from-indigo-950 to-purple-950"
        paragraphs={[
          "Hundreds of years ago, when Ren had been Hikaru, the celestial prince, he had an older brother—Souta.",
          "Souta had always been a perfect son. A warrior. A leader. The one their father loved most.",
          "But Hikaru had been different. A dreamer, an artist. He never wanted power.",
          "He only wanted her.",
          "Tsukiko.",
          "She had been a moon maiden, a being meant to serve the heavens. She and Hikaru had fallen in love in secret, knowing it was forbidden.",
          "And when they had tried to escape with the Thread of Rebirth, they had trusted one person to help them—",
          "Souta.",
          "But Souta had betrayed them.",
          "It wasn't because of duty.",
          "It was because he had loved Tsukiko, too.",
          "And if he couldn't have her, then neither could Hikaru.",
          "The betrayal had led to their capture, their punishment, and their cursed fate.",
          "\"He was the one who doomed us,\" Aoi whispered, voice shaking.",
          "For lifetimes, they had been blinded by fate, unable to remember who had destroyed them.",
          "But now—they knew."
        ]}
        characters={[
          { 
            name: "Souta", 
            position: "left", 
            emotion: "sad",
            imagePath: "/images/brother.png",
            animationStyle: "fade" 
          },
          { 
            name: "ren and souta", 
            position: "right", 
            emotion: "sad",
            imagePath: "/images/renbro.png",
            animationStyle: "fade" 
          }
        ]}
      />
      
      <StorySection 
        id="section3" 
        title="The Trial of the Forgotten One" 
        backgroundClass="bg-gradient-to-b from-purple-950 to-gray-900"
        paragraphs={[
          "The moment they spoke Souta's name, the temple began to shake.",
          "A dark presence awoke.",
          "The air turned cold as the shadows gathered at the altar, forming into a towering figure—",
          "A man in black armor, his face obscured by a cracked mask.",
          "The betrayer had returned.",
          "\"You were never meant to remember,\" Souta's voice echoed, a mix of sorrow and fury.",
          "\"You should have accepted your fate.\"",
          "Ren clenched his fists. \"We will never accept a fate you forced upon us!\"",
          "The shadows lunged."
        ]}
        characters={[
          { 
            name: "souta entrty", 
            position: "left", 
            emotion: "neutral",
            imagePath: "/images/entry.jpeg",
            animationStyle: "float" 
          },
          { 
            name: "souta,ren and aoi", 
            position: "right", 
            emotion: "surprised",
            imagePath: "/images/frame.jpeg",
            animationStyle: "float" 
          }
        ]}
      />
      
      <StorySection 
        id="section4" 
        title="The Awakening of the Celestial Flame" 
        backgroundClass="bg-gradient-to-b from-gray-900 to-blue-950"
        paragraphs={[
          "Souta stood before them, a towering figure of darkness, his golden eyes glowing with cruel amusement.",
          "\"Now do you see?\" he whispered, his voice a storm of echoes. \"Every life you have lived—every moment of suffering—was proof that you were never meant to win.\"",
          "And then—he unleashed it.",
          "A tidal wave of memories crashed into Ren and Aoi.",
          "Each reincarnation.",
          "Each separation.",
          "Each death.",
          "They felt everything.",
          "The pain of endless goodbyes.",
          "The loneliness of lifetimes spent searching for a face they could no longer remember.",
          "The despair of never knowing why their hearts ached for someone just out of reach.",
          "Aoi fell to her knees, clutching her chest. The weight of their past was unbearable.",
          "But Ren—",
          "Ren stood.",
          "His entire body trembled—not from pain, but from rage.",
          "He clenched his fists, his breath coming in ragged gasps. His soul, forged through lifetimes of suffering, began to burn.",
          "A power long forgotten—a force buried beneath centuries of curses—awakened.",
          "And for the first time—Ren remembered everything."
        ]}
      />
      
      <StorySection 
        id="section5" 
        title="The Celestial Blood Awakens" 
        backgroundClass="bg-gradient-to-b from-blue-950 to-gray-900"
        paragraphs={[
          "A blazing white flame erupted from Ren's body, consuming the darkness around him.",
          "Souta staggered back, his eyes widening in shock.",
          "\"Impossible—\"",
          "Ren lifted his gaze, his once-dark eyes now shining with pure white fire.",
          "He had been a celestial prince once.",
          "He had been divine.",
          "And that power—was returning.",
          "\"No more!\" Ren roared.",
          "His voice shook the temple, his aura expanding with blinding intensity.",
          "The curse that had bound him and Aoi for centuries—began to crack.",
          "Souta let out a furious snarl. \"You dare defy fate?! Then let us see if you are worthy to break it!\"",
          "And the battle began."
        ]}
        characters={[
          { 
            name: "Ren Awakens", 
            position: "left", 
            emotion: "neutral",
            imagePath: "/images/rage.jpg",
            animationStyle: "pulse" 
          }
        ]}
      />
      
      <StorySection 
        id="section6" 
        title="A Clash That Shattered the Heavens" 
        backgroundClass="bg-gradient-to-b from-gray-900 to-purple-950"
        paragraphs={[
          "The air trembled as Ren and Souta collided.",
          "Each blow sent shockwaves through the temple, cracking stone and shattering reality itself.",
          "Souta's dark energy lashed out like a storm, while Ren's white flames burned through the very fabric of fate.",
          "Every strike carried centuries of pain.",
          "Souta's fists tore through Ren's body, leaving deep wounds that bled golden light.",
          "Ren's fire seared through Souta's shadows, burning away the lies and curses that had bound them.",
          "The temple collapsed around them, swallowed by the force of their battle.",
          "Yet neither of them stopped.",
          "Neither could afford to lose."
        ]}
        characters={[
          { 
            name: "Ren", 
            position: "left", 
            emotion: "neutral",
            imagePath: "/images/fight.jpeg",
            animationStyle: "float" 
          },
          { 
            name: "Battel Field", 
            position: "right", 
            emotion: "neutral",
            imagePath: "/images/test3.jpeg",
            animationStyle: "float" 
          }
        ]}
      />
      
      <StorySection 
        id="section7" 
        title="The Price of Victory" 
        backgroundClass="bg-gradient-to-b from-purple-950 to-blue-950"
        paragraphs={[
          "Aoi watched in horror as Ren took a devastating blow to the chest, his body sent crashing into the ruins.",
          "\"Ren!\" she cried.",
          "But he didn't fall.",
          "He rose again—bloodied, broken, but unyielding.",
          "He staggered forward, his fire dim but not extinguished.",
          "Souta rushed at him for the final strike—",
          "And Ren moved.",
          "With the last of his strength, he drove his burning fist straight into Souta's chest.",
          "The impact sent a shockwave of light through the entire underworld.",
          "Souta's body froze, his golden eyes wide with shock—",
          "And then, with a blinding explosion of white fire—",
          "Everything ended."
        ]}
        characters={[
          { 
            name: "Ren and souta", 
            position: "left", 
            emotion: "neutral",
            imagePath: "/images/test.jpeg",
            animationStyle: "slide" 
          },
          { 
            name: "Battel End", 
            position: "right", 
            emotion: "surprised",
            imagePath: "/images/battelend.jpeg",
            animationStyle: "fade" 
          }
        ]}
      />
      
      <StorySection 
        id="section8" 
        title="The Final Flash of Light" 
        backgroundClass="bg-gradient-to-b from-blue-950 to-indigo-950"
        paragraphs={[
          "A blinding light engulfed the battlefield.",
          "For a moment, there was nothing.",
          "No pain.",
          "No suffering.",
          "No fate.",
          "Just silence.",
          "And then—",
          "Ren opened his eyes.",
          "The battle was over.",
          "The darkness was gone.",
          "And Souta…",
          "His form, once monstrous and twisted, had returned to that of the older brother Ren had once known.",
          "He was kneeling, his body fading into golden light.",
          "Souta lifted his gaze, a faint, sad smile on his lips.",
          "\"You have surpassed me,\" he whispered. \"Just as you were always meant to.\"",
          "Ren swallowed hard, his chest tightening.",
          "Despite everything…",
          "Souta had once been his brother.",
          "And now, he was gone.",
          "As the last of his light faded, his voice echoed one final time—",
          "\"Live, little brother. This time… live freely.\"",
          "And with that—",
          "The curse was undone."
        ]}
        characters={[
          { 
            name: "Ren", 
            position: "left", 
            emotion: "neutral",
            imagePath: "/images/characters/ren.png",
            animationStyle: "fade" 
          },
          { 
            name: "Aoi", 
            position: "right", 
            emotion: "happy",
            imagePath: "/images/characters/aoi.png",
            animationStyle: "fade" 
          },
          { 
            name: "Souta", 
            position: "center", 
            emotion: "neutral",
            imagePath: "/images/characters/shadow-ren.png",
            animationStyle: "fade" 
          }
        ]}
      />
      
      {/* Epilogue section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 to-black opacity-90" />
        
        {/* Animated stars background - simplified */}
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
            The End?
          </h2>
          
          <div className="w-24 h-1 bg-primary mx-auto mb-10" />
          
          <p className="text-xl mb-6">
            Ren and Aoi's journey has broken the cycle of rebirth, but what awaits them now that they are free?
          </p>
          <p className="text-xl mb-12">
            The legend continues...
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link to="/chapter3">
              <Button variant="outline" size="lg" className="px-8 py-6 rounded-full group">
                <ChevronLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Previous Chapter
              </Button>
            </Link>
            <Link to="/Chapter5">
              <Button variant="shimmer" size="lg" className="px-8 py-6 rounded-full group">
                Final Chapter
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
            <section className="py-16 bg-gradient-to-b from-black to-gray-900">
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-xl font-cinzel text-gray-300 mb-8">Navigate Chapters</h3>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://storyweb2.vercel.app/" className="inline-block">
                      <Button variant="outline" size="default" className="font-cinzel">
                        Chapter 2
                      </Button>
                    </a>
                    <a href="/chapter3" className="inline-block">
                      <Button variant="outline" size="default" className="font-cinzel">
                        Chapter 3 
                      </Button>
                    </a>
                    <Button variant="secondary" size="default" className="font-cinzel pointer-events-none">
                      Chapter 4 (Current)
                    </Button>
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
            <a href="https://www.instagram.com/_bharath.s?igsh=MXZkOWltZHZybGcxNQ==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
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

export default Chapter4;
