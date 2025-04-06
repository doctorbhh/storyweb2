
import React, { useEffect, useRef } from 'react';

type ParallaxBackgroundProps = {
  imageUrl: string;
  speed?: number;
  opacity?: number;
  className?: string;
};

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ 
  imageUrl, 
  speed = 0.3,
  opacity = 0.5,
  className = ''
}) => {
  const bgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = bgRef.current;
    if (!element) return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const yPos = -scrollTop * speed;
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={bgRef}
      className={`absolute inset-0 w-full h-full -z-10 ${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        opacity: opacity
      }}
    />
  );
};

export default ParallaxBackground;
