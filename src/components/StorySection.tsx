
import React, { useEffect, useRef, useState } from 'react';
import { createScrollAnimation, createStaggeredAnimation } from '../utils/animationUtils';
import { motion } from 'framer-motion';

type StorySectionProps = {
  id: string;
  title: string;
  paragraphs: string[];
  backgroundClass?: string;
  children?: React.ReactNode;
  characters?: {
    name: string;
    position: 'left' | 'right' | 'center';
    emotion?: 'neutral' | 'surprised' | 'sad' | 'happy';
    imagePath?: string; // New property for character image
    animationStyle?: 'fade' | 'slide' | 'reveal' | 'float' | 'pulse'; // Animation styles
  }[];
};

const StorySection: React.FC<StorySectionProps> = ({ 
  id, 
  title, 
  paragraphs, 
  backgroundClass = "bg-gradient-to-b from-gray-900 to-indigo-950",
  children,
  characters = []
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;
    
    // Apply animations when section comes into view
    const sectionCleanup = createScrollAnimation(sectionRef.current);
    
    // Apply staggered animations to paragraphs
    const textCleanup = createStaggeredAnimation(
      textRef.current,
      'p',
      'visible',
      150
    );
    
    return () => {
      sectionCleanup();
      textCleanup();
    };
  }, []);

  // Handle section visibility for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Set visible to trigger character animations
          setIsVisible(true);
        } else {
          // Section is out of view, reset visibility for animations
          setIsVisible(false);
        }
      },
      { threshold: 0.6 } // Higher threshold to ensure section is well in view
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Get animation variant based on character's animation style
  const getAnimationVariant = (position: 'left' | 'right' | 'center', style?: string) => {
    const baseVariants = {
      hidden: {
        x: position === 'left' ? -100 : position === 'right' ? 100 : 0,
        y: position === 'center' ? 50 : 0,
        opacity: 0,
        scale: 0.8,
      },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          duration: 0.8,
          bounce: 0.4
        }
      }
    };

    // Custom animation variants based on style
    switch(style) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: 1.2 }
          }
        };
      case 'slide':
        return {
          hidden: { 
            x: position === 'left' ? -200 : position === 'right' ? 200 : 0,
            opacity: 0 
          },
          visible: { 
            x: 0,
            opacity: 1,
            transition: { 
              type: 'spring',
              stiffness: 50,
              damping: 20
            }
          }
        };
      case 'reveal':
        return {
          hidden: { 
            clipPath: 'inset(100% 0 0 0)',
            y: 50
          },
          visible: { 
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            transition: { 
              duration: 1,
              ease: [0.25, 1, 0.5, 1]
            }
          }
        };
      case 'float':
        return {
          hidden: { 
            y: 100,
            opacity: 0
          },
          visible: { 
            y: 0,
            opacity: 1,
            transition: { 
              duration: 1.2,
              ease: "easeOut"
            }
          }
        };
      case 'pulse':
        return {
          hidden: { 
            scale: 0.8,
            opacity: 0
          },
          visible: { 
            scale: 1,
            opacity: 1,
            transition: { 
              duration: 0.5,
              yoyo: Infinity,
              ease: "easeInOut"
            }
          }
        };
      default:
        return baseVariants;
    }
  };
  
  // Enhanced character animations with emotion transitions
  const emotionVariants = {
    neutral: { scale: 1, rotate: 0 },
    surprised: { scale: 1.1, rotate: 0, transition: { type: 'spring', stiffness: 500 } },
    sad: { scale: 0.95, rotate: -2, transition: { duration: 0.5 } },
    happy: { scale: 1.05, rotate: 2, transition: { type: 'spring', stiffness: 300 } }
  };

  // Character hover animation
  const hoverAnimation = {
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Character continuous animation
  const continuousAnimations = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    breathe: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    pulse: {
      boxShadow: [
        "0 0 10px 0px rgba(139, 92, 246, 0.3)",
        "0 0 20px 5px rgba(139, 92, 246, 0.6)",
        "0 0 10px 0px rgba(139, 92, 246, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      id={id} 
      className={`story-section ${backgroundClass}`} 
      ref={sectionRef}
    >
      {/* Character Animations */}
      {characters.map((character, index) => (
        <motion.div 
          key={`${id}-char-${index}`}
          className={`absolute ${getCharacterPosition(character.position)} z-10`}
          custom={character.position}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={getAnimationVariant(character.position, character.animationStyle)}
          whileHover="hover"
        >
          <motion.div 
            className="character-container"
            animate={character.emotion || 'neutral'}
            variants={emotionVariants}
            whileHover={hoverAnimation.hover}
          >
            {/* If character has image, display it, otherwise use silhouette */}
            {character.imagePath ? (
              <motion.div 
                className="character-image-wrapper"
                animate={["float", "breathe", "pulse"]}
                variants={continuousAnimations}
              >
                <img 
                  src={character.imagePath} 
                  alt={character.name}
                  className="character-image" 
                />
                <motion.div 
                  className="character-glow"
                  animate={{
                    boxShadow: [
                      "0 0 20px 0px rgba(139, 92, 246, 0.3)",
                      "0 0 40px 10px rgba(139, 92, 246, 0.5)",
                      "0 0 20px 0px rgba(139, 92, 246, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ) : (
              <div className={`character-silhouette ${character.emotion || 'neutral'}`} />
            )}
            <motion.span 
              className="character-name"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3 }}
            >
              {character.name}
            </motion.span>
          </motion.div>
        </motion.div>
      ))}

      <h2 className="section-heading animate-pulse-glow">{title}</h2>
      <div className="story-text" ref={textRef}>
        {paragraphs.map((paragraph, index) => (
          <p key={`${id}-p-${index}`}>{paragraph}</p>
        ))}
      </div>
      {children}
    </section>
  );
};

// Helper function to determine character positions
function getCharacterPosition(position: 'left' | 'right' | 'center') {
  switch (position) {
    case 'left':
      return 'left-8 bottom-1/4 md:left-16';
    case 'right':
      return 'right-8 bottom-1/4 md:right-16';
    case 'center':
      return 'left-1/2 -translate-x-1/2 bottom-1/4';
    default:
      return 'left-8 bottom-1/4';
  }
}

export default StorySection;
