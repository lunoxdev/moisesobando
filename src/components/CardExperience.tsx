import React, { useRef, useState } from 'react';

interface ExperienceProps {
  year: string;
  description: string;
}

const CardExperience: React.FC<ExperienceProps> = ({ year, description }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-r from-black to-gray-950 px-6 py-20 shadow-2xl'
    >
      <div
        className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 40%)`,
        }}
      />
      <div className='flex flex-col justify-center items-center space-y-5'>
      <span className='text-5xl text-pretty text-center text-white font-semibold'>{year}</span>
      <p className=' text-pretty text-center text-gray-200'>{description}</p>
      </div>
    </div>
  );
};

export default CardExperience;
