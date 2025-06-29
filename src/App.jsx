'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FactCard from './components/FactCard';
import TimerBar from './components/TimerBar';
import ExplanationModal from './components/ExplanationModal';
import GameOverScreen from './components/GameOverScreen';
import BottomHUD from './components/BottomHUD';
import SwipeContainer from './components/SwipeContainer';
import SubscriptionModal from './components/SubscriptionModal';
import { medicalFacts } from './data/medicalFacts';
import { useGameState } from './hooks/useGameState';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function App() {
  const [paused, setPaused] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isPracticeMode = pathname === '/practice';

  const {
    currentFactIndex,
    streak,
    score,
    timeLeft,
    gameState,
    userAnswer,
    showExplanation,
    dailyExplanations,
    isSubscribed,
    user,
    highestStreak,
    handleAnswer,
    nextFact,
    resetGame,
    toggleSubscription,
    setShowExplanation,
    currentFact,
    quitGame,
  } = useGameState(paused, isPracticeMode);

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const speedBonus = timeLeft > 10 ? 50 : timeLeft > 5 ? 25 : 0;

  const handleQuit = () => {
    router.replace('/landing');
  };

  const handleExplanationRequest = () => {
    if (!isSubscribed && dailyExplanations >= 5) {
      setShowSubscriptionModal(true);
    } else {
      setShowExplanation(true);
    }
  };

  return (
    <div
      className="h-screen w-screen flex flex-col relative overflow-hidden"
    >
      {/* Pause Overlay */}
      <AnimatePresence>
        {paused && (
          <motion.div
            key="pause-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="flex flex-col space-y-4 items-center">
              <Button
                onClick={() => setPaused(false)}
                className="text-lg bg-purple-600 hover:bg-purple-700"
              >
                Resume
              </Button>
              <Button
                onClick={() => {
                  setPaused(false); // Close pause overlay
                  quitGame(); // Trigger game quit logic
                }}
                variant="destructive"
                className="text-lg bg-red-600 hover:bg-red-700"
              >
                Quit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer Bar */}
      {gameState === 'playing' && !paused && <TimerBar timeLeft={timeLeft} />}

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col min-h-0" style={{ minHeight: 0 }}>
        <AnimatePresence mode="wait">
          {gameState === 'playing' && !paused && (
            <SwipeContainer key="game">
              <FactCard
                fact={currentFact}
                onAnswer={paused ? () => {} : handleAnswer}
                userAnswer={userAnswer}
                timeLeft={timeLeft}
                speedBonus={speedBonus}
                onContinue={() => setShowExplanation(true)}
              />
            </SwipeContainer>
          )}

          {gameState === 'gameOver' && (
            <GameOverScreen
              key="gameOver"
              streak={streak}
              score={score}
              onRestart={resetGame}
              isSubscribed={isSubscribed}
              user={user}
              highestStreak={highestStreak}
              isPracticeMode={isPracticeMode}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom HUD */}
      {gameState === 'playing' && (
        <BottomHUD
          streak={streak}
          score={score}
          speedBonus={speedBonus}
          onPause={() => setPaused(true)}
          onQuit={handleQuit}
          isPracticeMode={isPracticeMode}
        />
      )}

      {/* Explanation Modal */}
      <ExplanationModal
        isOpen={showExplanation}
        onClose={() => setShowExplanation(false)}
        fact={currentFact}
        userAnswer={userAnswer}
        onNext={nextFact}
        onExplanationRequest={handleExplanationRequest}
        canViewExplanation={isSubscribed || dailyExplanations < 5}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={toggleSubscription}
      />
    </div>
  );
}

export default App;
