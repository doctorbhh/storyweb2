import React, { useEffect, useState, useRef } from 'react';
import StorySection from '@/components/StorySection';
import ScrollProgress from '@/components/ScrollProgress';
import { ChevronLeft, ChevronRight, Book, Volume2, VolumeX, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParallaxBackground from '@/components/ParallaxBackground';

const Chapter3 = () => {
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
      <audio ref={audioRef} src="/images/ch3.mp3" />

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
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-950 to-indigo-950 z-0" />
        <ParallaxBackground 
          imageUrl="/images/night-sky.jpg" 
          speed={0.2} 
          opacity={0.5}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold mb-6 animate-pulse-glow">
            Chapter 3
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-cinzel font-semibold mb-10 text-primary animate-pulse-glow">
            The Land of Forgotten Souls
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl md:text-2xl font-raleway text-gray-200 max-w-xl mx-auto">
            A journey into the realm of the dead
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
        title="The Descent into Yomi" 
        backgroundClass="bg-gradient-to-b from-gray-950 to-indigo-950"
        paragraphs={[
          "The air inside the shrine grew heavy, charged with an energy neither Ren nor Aoi could describe. The walls seemed to stretch, the wooden pillars twisting like they were alive. The once-forgotten mirror now shone with a dark, ethereal glow, as if a doorway had been unlocked.",
          "Izanami stepped forward, her presence dominating the space, her golden eyes gleaming like dying embers.",
          "\"You have chosen to defy the heavens once more,\" she said. \"But know this—no love that challenges fate comes without a price.\"",
          "The ground trembled. The shrine began to crumble around them.",
          "\"The gates to Yomi are open,\" Izanami whispered.",
          "A sudden force pulled Ren and Aoi downward.",
          "The world around them vanished—",
          "And when they opened their eyes, they were somewhere else."
        ]}
        characters={[
          { 
            name: "Inside the shrine", 
            position: "left", 
            emotion: "surprised",
            imagePath: "/images/land.jpeg",
            animationStyle: "slide" 
          }
        ]}
      >
        <ParallaxBackground 
          imageUrl="/images/eclipse.jpg" 
          speed={0.1} 
          opacity={0.2}
          className="mix-blend-overlay"
        />
      </StorySection>
      
      <StorySection 
        id="section2" 
        title="The Twilight World" 
        backgroundClass="bg-gradient-to-b from-indigo-950 to-purple-950"
        paragraphs={[
          "They stood in a world where the sky was neither night nor day.",
          "It was a vast expanse of endless twilight, tinged with deep purples and ghostly blues. Shadows flickered at the edges of their vision, strange figures moving just beyond their sight.",
          "The land was silent.",
          "Not a single bird. Not a single breeze.",
          "Just an overwhelming sense of emptiness.",
          "Aoi clutched Ren's sleeve. \"Where… where are we?\"",
          "Ren swallowed hard, his throat dry. \"Yomi.\"",
          "The realm of the dead.",
          "A place where souls that have forgotten their past lives wander forever.",
          "A place no living mortal was meant to enter.",
          "And yet, they had returned."
        ]}
        characters={[
          { 
            name: "Twilight world", 
            position: "right", 
            emotion: "sad",
            imagePath: "/images/del.jpeg",
            animationStyle: "slide" 
          }
        ]}
      >
        <div className="absolute bottom-0 right-0 opacity-20 z-0">
          <ParallaxBackground 
            imageUrl="/images/moon.jpg" 
            speed={0.1} 
            opacity={0.2}
            className="mix-blend-overlay"
          />
        </div>
      </StorySection>
      
      <StorySection 
        id="section3" 
        title="The River of Forgetting" 
        backgroundClass="bg-gradient-to-b from-purple-950 to-gray-900"
        paragraphs={[
          "Before them stretched a river of black water, still and unmoving, like liquid glass.",
          "A wooden bridge arched over it, ancient and crumbling. At its center stood a figure—a woman in white robes, her face hidden behind a fox mask.",
          "\"To pass, you must cross the River of Forgetting,\" the woman spoke. Her voice was neither warm nor cold, neither kind nor cruel. \"But be warned—if you lose your way, the river will strip you of your memories. You will forget your love, your past, and even yourselves.\"",
          "Aoi's grip on Ren tightened. \"What do we do?\"",
          "Ren took a deep breath.",
          "They had failed in every lifetime before this.",
          "But not this time.",
          "\"We walk together,\" he said.",
          "And so, they stepped onto the bridge.",
          "The moment they did, the world around them began to blur."
        ]}
        characters={[]}
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
        title="Shadows of the Past" 
        backgroundClass="bg-gradient-to-b from-gray-900 to-blue-950"
        paragraphs={[
          "The mist thickened around them, swirling like phantom hands reaching from the abyss.",
          "Each step forward felt heavier, as if the very air was trying to hold them back.",
          "And then—",
          "The world shifted.",
          "The bridge beneath their feet vanished.",
          "The cold air of the underworld was replaced by the distant murmur of voices, the faint rustle of papers—",
          "A classroom."
        ]}
        characters={[
          { 
            name: "Past lifes", 
            position: "left", 
            emotion: "surprised",
            imagePath: "/images/pastlife.jpeg",
            animationStyle: "pulse" 
          },
          { 
            name: "Bridge-crossing", 
            position: "right", 
            emotion: "surprised",
            imagePath: "/images/shadw.jpeg",
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
        id="section5" 
        title="A World That Shouldn't Exist" 
        backgroundClass="bg-gradient-to-b from-blue-950 to-gray-900"
        paragraphs={[
          "Aoi gasped, her heart hammering.",
          "She knew this place.",
          "The familiar rows of desks, the cracked blackboard, the soft afternoon sunlight filtering through the windows—",
          "It was their old high school.",
          "Except something was wrong.",
          "The air was too still.",
          "The students in the room sat motionless, their faces blurred, their voices silent.",
          "And then—she saw him.",
          "Ren.",
          "He was sitting at his desk, his gaze locked onto the pages of his textbook, expression unreadable.",
          "But there was no life in his eyes.",
          "No sign that he even knew she was there.",
          "Aoi swallowed hard. This wasn't real.",
          "\"Ren!\" she called, her voice breaking through the silence.",
          "He didn't react.",
          "\"Ren, look at me!\"",
          "She rushed to his side, shaking him, forcing him to see her.",
          "For a moment—just a flicker—",
          "His fingers twitched.",
          "His head turned slightly.",
          "And then—a shadow moved."
        ]}
        characters={[
          { 
            name: "Aoi", 
            position: "right", 
            emotion: "surprised",
            imagePath: "/images/characters/aoi.png",
            animationStyle: "slide" 
          },
          { 
            name: "Unresponsive Ren", 
            position: "left", 
            emotion: "neutral",
            imagePath: "/images/characters/ren-emotionless.png",
            animationStyle: "fade" 
          }
        ]}
      >
        <ParallaxBackground 
          imageUrl="/images/shrine-bg.jpg" 
          speed={0.15} 
          opacity={0.1}
          className="mix-blend-overlay"
        />
      </StorySection>
      
      <StorySection 
        id="section6" 
        title="The Thing in the Mist" 
        backgroundClass="bg-gradient-to-b from-gray-900 to-purple-950"
        paragraphs={[
          "From the far corner of the classroom, a presence uncoiled.",
          "Aoi froze.",
          "Something else was here.",
          "A tall, looming figure in a school uniform stood near the blackboard, its head tilted unnaturally.",
          "Its face was Ren's.",
          "But it was wrong.",
          "Its eyes were completely black, hollow voids that seemed to pull everything into them.",
          "When it spoke, its voice was not human.",
          "\"Why are you trying so hard?\" it whispered.",
          "Aoi's breath hitched.",
          "\"What…?\"",
          "The shadow Ren stepped forward, his head still tilted in that unnatural way.",
          "\"You know this is how things were meant to be. Just let him forget.\"",
          "Aoi gritted her teeth, stepping in front of Ren's real body. \"No. I won't let you take him.\"",
          "The shadow smiled, a slow, twisted grin.",
          "\"Then I will take you instead.\"",
          "And in a blink, it was there.",
          "Right in front of her.",
          "Its black hands latched onto her shoulders, cold and heavy.",
          "Aoi's vision blurred.",
          "Her thoughts felt distant, slipping away like water through her fingers.",
          "She was forgetting.",
          "Forgetting everything.",
          "Ren's voice.",
          "His touch.",
          "His name.",
          "No.",
          "No.",
          "No.",
          "She refused.",
          "Summoning every ounce of strength, she gripped Ren's wrist, pressing her forehead against his.",
          "\"Ren, please—remember!\""
        ]}
        characters={[
          { 
            name: "Aoi", 
            position: "right", 
            emotion: "sad",
            imagePath: "/images/characters/aoi.png",
            animationStyle: "float" 
          },
          { 
            name: "Shadow Ren", 
            position: "center", 
            emotion: "neutral",
            imagePath: "/images/characters/shadow-ren.png",
            animationStyle: "reveal" 
          }
        ]}
      >
        <ParallaxBackground 
          imageUrl="/images/eclipse.jpg" 
          speed={0.1} 
          opacity={0.2}
          className="mix-blend-overlay"
        />
      </StorySection>
      
      <StorySection 
        id="section7" 
        title="The Memory That Would Not Break" 
        backgroundClass="bg-gradient-to-b from-purple-950 to-blue-950"
        paragraphs={[
          "The real Ren's fingers curled around hers, tight, desperate.",
          "And suddenly—",
          "The world shattered.",
          "The classroom ripped apart like glass, the desks, the walls, the empty students—all dissolving into mist.",
          "The shadow Ren screamed, its form unraveling, torn apart by the weight of the truth.",
          "Ren blinked, his eyes clearing.",
          "He saw Aoi.",
          "And in that moment—",
          "He remembered everything.",
          "The years of searching.",
          "The pain of being torn apart.",
          "The love that had survived every lifetime.",
          "He stood.",
          "The mist recoiled from him.",
          "And with one final breath—",
          "Ren banished the illusion.",
          "The shadow let out a final, inhuman wail before it vanished into nothingness."
        ]}
        characters={[
          { 
            name: "Aoi holds ren hand", 
            position: "left", 
            emotion: "neutral",
            imagePath: "/images/hold.jpeg",
            animationStyle: "slide" 
          }
        ]}
      >
        <ParallaxBackground 
          imageUrl="/images/night-sky.jpg" 
          speed={0.1} 
          opacity={0.2}
          className="mix-blend-overlay"
        />
      </StorySection>
      
      <StorySection 
        id="section8" 
        title="The Return to Reality" 
        backgroundClass="bg-gradient-to-b from-blue-950 to-indigo-950"
        paragraphs={[
          "They were back.",
          "The cold wind of the underworld brushed against their skin.",
          "The bridge beneath them was solid once more.",
          "Ren was breathing hard, his fingers still intertwined with Aoi's.",
          "Aoi looked up—",
          "The masked woman who had led them here was gone.",
          "The mist was clearing.",
          "And ahead of them—",
          "A path leading forward.",
          "Aoi exhaled shakily, squeezing Ren's hand.",
          "\"You came back,\" she whispered.",
          "Ren looked at her, his expression determined.",
          "\"I was never leaving.\"",
          "And with that, together—",
          "They stepped forward into the unknown."
        ]}
        characters={[]}
      >
        <ParallaxBackground 
          imageUrl="/images/moon.jpg" 
          speed={0.1} 
          opacity={0.2}
          className="mix-blend-overlay"
        />
      </StorySection>
      
      <StorySection 
        id="section9" 
        title="The Gate of Shadows" 
        backgroundClass="bg-gradient-to-b from-indigo-950 to-gray-900"
        paragraphs={[
          "Beyond the river stood a massive gate of black stone, ancient and covered in carvings of twisting serpents and weeping figures.",
          "It creaked open on its own.",
          "And inside—",
          "The shadows awaited.",
          "They were not alone.",
          "Figures emerged from the darkness.",
          "Copies of themselves.",
          "Shadows of the past.",
          "Every version of them that had failed before.",
          "A Ren who had walked past Aoi without ever speaking to her.",
          "An Aoi who had never waited long enough for Ren to remember.",
          "A thousand lost lives, standing before them.",
          "\"Turn back,\" one of the shadows whispered. \"You are doomed to fail again.\"",
          "Another voice, softer—\"It will only hurt more if you try.\"",
          "The shadows surrounded them.",
          "Ren clenched his fists.",
          "\"No.\"",
          "The air crackled as something shifted inside him.",
          "And suddenly—",
          "He remembered."
        ]}
        characters={[]}
      >
        <ParallaxBackground 
          imageUrl="/images/shrine-bg.jpg" 
          speed={0.15} 
          opacity={0.1}
          className="mix-blend-overlay"
        />
      </StorySection>
      
      {/* Final section with next chapter button */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-8 bg-gradient-to-b from-gray-900 to-black">
        <ParallaxBackground 
          imageUrl="/images/eclipse.jpg" 
          speed={0.1} 
          opacity={0.4}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <div className="max-w-2xl text-center relative z-20">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold mb-8 text-primary animate-pulse-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            The Power of a Name
          </motion.h2>
          
          <motion.div
            className="text-xl md:text-2xl space-y-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.5 }}
          >
            <p>"Hikaru."</p>
            <p>A name from a life long past.</p>
            <p>A name that had once belonged to him.</p>
            <p>Memories came flooding back—a love stolen by fate, a promise left unfulfilled.</p>
            <p>He turned to Aoi.</p>
            <p>"Tsukiko."</p>
            <p>Her eyes widened.</p>
            <p>And she, too, remembered everything.</p>
            <p>She was Tsukiko, the moon maiden who had once risked everything for love.</p>
            <p>She had waited lifetimes for him to say her name again.</p>
            <p>And now—he finally had.</p>
            <p>The shadows around them screamed as their forms began to dissolve.</p>
            <p>They had broken through the illusion.</p>
            <p>And when they stepped forward—the Gate of Shadows crumbled to dust.</p>
            <p>They were one step closer to rewriting fate.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Link to="/chapter4">
              <Button variant="shimmer" className="text-lg px-10 py-7 rounded-full group">
                Continue to Chapter 4: The Curse of Rebirth
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
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
              <a href="/" className="inline-block">
                <Button variant="outline" size="default" className="font-cinzel">
                  Chapter 2 
                </Button>
              </a>
              <Button variant="secondary" size="default" className="font-cinzel pointer-events-none">
                Chapter 3 (Current)
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

export default Chapter3;
