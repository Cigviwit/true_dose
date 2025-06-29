'use client';

import { motion } from 'framer-motion';

const TimerBar = ({ timeLeft }) => {
  const percentage = (timeLeft / 15) * 100;

  return (
    <div className="w-full h-4 bg-gray-900/80 border-y border-purple-500 relative overflow-hidden rounded-full">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
        initial={{ width: '100%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.2, ease: 'linear' }}
      />
    </div>
  );
};

export default TimerBar;
