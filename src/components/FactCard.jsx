'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const FactCard = ({ fact, onAnswer, userAnswer, timeLeft, speedBonus, onContinue }) => {
  if (!fact) {
    return null; // Render nothing if fact is undefined
  }

  const getAnswerColor = (answer) => {
    if (userAnswer === null) return 'default';
    if (userAnswer === answer) {
      return userAnswer === fact.correct ? 'success' : 'destructive';
    }
    return 'outline';
  };

  const getAnswerIcon = (answer) => {
    if (userAnswer === null) return null;
    if (userAnswer === answer) {
      return userAnswer === fact.correct ? '✓' : '✗';
    }
    if (answer === fact.correct && userAnswer !== null) {
      return '✓';
    }
    return null;
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-3 py-2 min-h-0">
      {/* Speed Bonus Indicator */}
      {speedBonus > 0 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="flex items-center justify-center mb-2"
        >
          <div className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold flex items-center gap-1 rounded-full">
            SPEED +{speedBonus}
          </div>
        </motion.div>
      )}

      {/* Fact Card */}
      <motion.div
        className="bg-gray-900/80 backdrop-blur-sm border border-purple-500 p-8 mb-6 rounded-lg"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight px-2 text-center">
            {fact.statement}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-2 bg-gray-800/50 border border-purple-500 px-4 py-2 rounded-lg">
              <span className="text-purple-300 font-semibold text-xs">{fact.category}</span>
            </div>
            <div className="flex items-center gap-2 bg-red-600/80 border border-red-400 px-3 py-2 rounded-lg">
              <span className="text-white font-bold text-base">{timeLeft}s</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Answer Buttons */}
      <div className="flex gap-4 flex-1 items-stretch mb-2">
        {[true, false].map((answer) => (
          <Button
            key={answer}
            onClick={() => onAnswer(answer)}
            disabled={userAnswer !== null}
            variant={getAnswerColor(answer)}
            className={`flex-1 flex items-center justify-center text-3xl h-full min-h-[120px] select-none transition-all duration-200 
              ${getAnswerColor(answer) === 'success' ? 'bg-green-500' : ''} 
              ${getAnswerColor(answer) === 'destructive' ? 'bg-red-500' : ''}
              ${userAnswer === null ? 'bg-purple-600 hover:bg-purple-700' : ''}`
            }
          >
            <span>{answer ? 'TRUE' : 'FALSE'}</span>
            {getAnswerIcon(answer) && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl ml-2">
                {getAnswerIcon(answer)}
              </motion.span>
            )}
          </Button>
        ))}
      </div>

      {/* Continue Button */}
      {userAnswer !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex-shrink-0">
          <Button
            onClick={onContinue}
            className="w-full py-4 text-lg bg-gray-700 hover:bg-gray-600"
          >
            Continue
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default FactCard;
