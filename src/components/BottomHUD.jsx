'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const AnimatedValue = ({ value, className }) => {
  const [prev, setPrev] = useState(value);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setAnimate(true);
      setPrev(value);
      const timeout = setTimeout(() => setAnimate(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [value, prev]);

  return (
    <motion.span
      animate={animate ? { scale: 1.3, color: '#8B5CF6' } : { scale: 1, color: '#FFFFFF' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {value}
    </motion.span>
  );
};

const BottomHUD = ({ streak, score, speedBonus, onPause, onQuit, isPracticeMode }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mx-2 mb-4 border border-purple-500 bg-gray-900/80 backdrop-blur-sm py-5 px-6 rounded-lg flex-shrink-0"
    >
      <div className="flex items-center justify-between h-full text-center w-full text-white">
        {/* Pause */}
        <div className="flex flex-col items-center justify-center gap-1 flex-1">
          <Button
            onClick={onPause}
            variant="ghost"
            size="icon"
            aria-label="Pause"
            className="hover:bg-purple-700"
          >
            P
          </Button>
          <div className="min-w-0">
            <div className="text-xs">PAUSE</div>
          </div>
        </div>
        {/* Quit Button */}
        <div className="flex flex-col items-center justify-center gap-1 flex-1">
          <Button
            onClick={onQuit}
            variant="destructive"
            size="icon"
            aria-label="Home"
            className="bg-red-600 hover:bg-red-700"
          >
            H
          </Button>
          <div className="min-w-0">
            <div className="text-xs">HOME</div>
          </div>
        </div>
        {/* Streak */}
        {!isPracticeMode && (
          <div className="flex flex-col items-center justify-center gap-1 flex-1">
            <div className="bg-purple-600 p-3 border border-purple-400 rounded-md mb-1">
              S
            </div>
            <div className="min-w-0">
              <AnimatedValue value={streak} className="font-bold text-lg" />
              <div className="text-xs">STREAK</div>
            </div>
          </div>
        )}
        {/* Score */}
        <div className="flex flex-col items-center justify-center gap-1 flex-1">
          <div className="bg-blue-600 p-3 border border-blue-400 rounded-md mb-1">
            C
          </div>
          <div className="min-w-0">
            <AnimatedValue value={score > 999 ? `${Math.floor(score / 1000)}k` : score} className="font-bold text-lg" />
            <div className="text-xs">SCORE</div>
          </div>
        </div>
        {/* Speed Bonus */}
        <div className="flex flex-col items-center justify-center gap-1 flex-1">
          <div className="bg-yellow-500 p-3 border border-yellow-300 rounded-md mb-1">
            B
          </div>
          <div className="min-w-0">
            <AnimatedValue value={`+${speedBonus}`} className="font-bold text-lg" />
            <div className="text-xs">BONUS</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BottomHUD;
