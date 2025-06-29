'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const ExplanationModal = ({ isOpen, onClose, fact, onNext, onExplanationRequest, canViewExplanation, userAnswer }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    const bookmarks = JSON.parse(localStorage.getItem('truedose_bookmarks') || '[]');
    if (!isBookmarked) {
      bookmarks.push(fact.id);
    } else {
      const index = bookmarks.indexOf(fact.id);
      if (index > -1) bookmarks.splice(index, 1);
    }
    localStorage.setItem('truedose_bookmarks', JSON.stringify(bookmarks));
  };

  const handleContinue = () => {
    onNext();
  };

  if (!fact) return null;

  const isUserCorrect = userAnswer === fact.correct;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-gray-900/80 backdrop-blur-sm border border-purple-500 w-full max-w-md overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gray-900/50 p-3 border-b border-purple-500 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className={`font-bold text-base ${isUserCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isUserCorrect ? 'CORRECT!' : 'INCORRECT'}
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleBookmark}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-purple-700"
                  >
                    {isBookmarked ? 'B+' : 'B'}
                  </Button>
                  <Button onClick={onClose} variant="destructive" size="icon" className="bg-red-600 hover:bg-red-700">
                    X
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto text-white" style={{ maxHeight: '50vh' }}>
              <div className="mb-4">
                <div className="text-xs font-semibold mb-2 text-purple-300">Statement:</div>
                <div className="font-medium text-sm mb-3 leading-relaxed">{fact.statement}</div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-purple-300">Your Answer:</span>
                  <span
                    className={`px-2 py-1 text-xs font-bold text-white rounded-md ${
                      isUserCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {userAnswer ? 'TRUE' : 'FALSE'}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-purple-300">Correct Answer:</span>
                  <span className="px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-md">
                    {fact.correct ? 'TRUE' : 'FALSE'}
                  </span>
                </div>
              </div>

              {/* Explanation Section */}
              <div className="mb-4">
                <div className="text-xs font-semibold mb-2 text-purple-300">Explanation:</div>
                {canViewExplanation ? (
                  <div className="p-4 border border-purple-500 bg-gray-800/50 rounded-lg">
                    <div className="text-base leading-relaxed font-medium">{fact.explanation}</div>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 border border-purple-500 p-4 text-center rounded-lg">
                    <div className="bg-red-600 w-10 h-10 flex items-center justify-center mx-auto mb-3 rounded-full">
                      L
                    </div>
                    <div className="text-xs mb-3 font-semibold">5 free explanations used today</div>
                    <Button
                      onClick={onExplanationRequest}
                      variant="secondary"
                      className="text-xs bg-purple-600 hover:bg-purple-700"
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                )}
              </div>

              {/* Source */}
              {canViewExplanation && fact.source && (
                <div className="bg-gray-800/50 border border-purple-500 p-3 rounded-lg">
                  <div className="text-xs">
                    <span className="font-semibold text-purple-300">Source:</span> {fact.source}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-900/50 p-3 border-t border-purple-500 flex-shrink-0">
              <Button
                onClick={handleContinue}
                className="w-full py-3 font-bold text-sm flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <span>Continue</span>
                <span>-&gt;</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExplanationModal;
