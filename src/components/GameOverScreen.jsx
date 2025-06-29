'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const GameOverScreen = ({ streak, score, onRestart, isSubscribed, user, highestStreak, isPracticeMode }) => {
  const router = useRouter();
  const getGameOverMessage = () => {
    if (isPracticeMode) return 'PRACTICE SESSION COMPLETE!';
    if (score > 500) return 'FANTASTIC PERFORMANCE!';
    if (score > 200) return 'GREAT EFFORT!';
    return 'YOU CAN DO BETTER!';
  };

  const getStreakMotivation = () => {
    if (streak >= 50) return "YOU'RE A TRUEDOSE LEGEND!";
    if (streak >= 25) return 'INCREDIBLE STREAK!';
    if (streak >= 10) return 'SOLID KNOWLEDGE!';
    if (streak >= 5) return 'GOOD PROGRESS!';
    return 'KEEP PUSHING!';
  };

  const getStreakColor = () => {
    if (streak >= 50) return 'bg-yellow-500';
    if (streak >= 25) return 'bg-orange-500';
    if (streak >= 10) return 'bg-green-500';
    if (streak >= 5) return 'bg-blue-500';
    return 'bg-purple-500';
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 text-center min-h-0 text-white">
      {/* Game Over Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-4 flex-shrink-0"
      >
        <h1 className="text-3xl sm:text-4xl font-black mb-1 drop-shadow-lg">{isPracticeMode ? 'SESSION ENDED' : 'GAME OVER!'}</h1>
        <p className="text-base font-semibold text-purple-300">{getGameOverMessage()}</p>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`bg-gray-900/80 backdrop-blur-sm border border-purple-500 p-6 mb-4 w-full rounded-lg ${isPracticeMode ? 'max-w-md' : 'max-w-xs'}`}
      >
        {isPracticeMode ? (
          // Practice Mode Stats Card Content (Only Score)
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-blue-600 p-3 border border-blue-400 rounded-md">
                  SCORE
                </div>
              </div>
              <div className="text-sm font-semibold mb-1 text-purple-300">Score</div>
              <div className="text-4xl font-black">{score.toLocaleString()}</div>
            </div>
          </div>
        ) : (
          // Classic Mode Stats Card Content (Streak and Score)
          <div className="space-y-4">
            {/* Streak */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className={`${getStreakColor()} p-3 border border-purple-400 rounded-md`}>
                  STREAK
                </div>
              </div>
              <div className="text-sm font-semibold mb-1 text-purple-300">Final Streak</div>
              <div className="text-3xl font-black mb-1">{streak}</div>
              <div className="text-sm font-bold text-yellow-300">{getStreakMotivation()}</div>
            </div>

            {/* Score & Performance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-blue-600 p-3 border border-blue-400 rounded-md">
                    SCORE
                  </div>
                </div>
                <div className="text-sm font-semibold mb-1 text-purple-300">Score</div>
                <div className="text-xl font-black">{score.toLocaleString()}</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-green-600 p-3 border border-green-400 rounded-md">
                    HIGH
                  </div>
                </div>
                <div className="text-sm font-semibold mb-1 text-purple-300">Highest Streak</div>
                <div className="text-xl font-bold">
                  {user ? (
                    highestStreak !== null ? (
                      highestStreak
                    ) : (
                      'N/A'
                    )
                  ) : (
                    'SIGN UP'
                  )}
                </div>
                {!user && (
                  <p className="text-xs text-cyan-400 mt-1 font-semibold">
                    Sign up to save!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Motivational Message */}
      {!isSubscribed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-4 text-center flex-shrink-0 bg-gray-900/80 backdrop-blur-sm border border-purple-500 p-4 rounded-lg"
        >
          <p className="text-sm mb-2 font-semibold text-yellow-300">
            PREMIUM: UNLOCK DETAILED ANALYTICS!
          </p>
          <Button variant="link" className="text-xs text-cyan-400">
            LEARN MORE
          </Button>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button
          onClick={onRestart}
          className="text-base bg-purple-600 hover:bg-purple-700 text-white py-3"
        >
          PLAY AGAIN
        </Button>

        <Button
          onClick={() => router.replace('/landing')}
          variant="outline"
          className="text-base border-purple-500 text-white hover:bg-purple-700 hover:text-white py-3"
        >
          HOME
        </Button>
      </div>
    </div>
  );
};

export default GameOverScreen;
