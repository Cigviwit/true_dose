'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const SubscriptionModal = ({ isOpen, onClose, onSubscribe }) => {
  const features = [
    {
      icon: 'U',
      title: 'UNLIMITED EXPLANATIONS',
      description: 'GET DETAILED EXPLANATIONS FOR EVERY QUESTION',
      color: 'bg-blue-500',
    },
    {
      icon: 'A',
      title: 'ANALYTICS DASHBOARD',
      description: 'TRACK YOUR PROGRESS AND IDENTIFY WEAK AREAS',
      color: 'bg-green-500',
    },
    {
      icon: 'S',
      title: 'SPEED INSIGHTS',
      description: 'ANALYZE YOUR RESPONSE TIMES AND ACCURACY',
      color: 'bg-yellow-500',
    },
    {
      icon: 'P',
      title: 'PREMIUM BADGE',
      description: 'SHOW OFF YOUR PREMIUM STATUS',
      color: 'bg-red-500',
    },
  ];

  const handleSubscribe = () => {
    onSubscribe();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-gray-900/80 backdrop-blur-sm border border-purple-500 w-full max-w-sm max-h-[90vh] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gray-900/50 p-4 text-center border-b border-purple-500 relative">
              <Button
                onClick={onClose}
                variant="destructive"
                size="icon"
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700"
              >
                X
              </Button>

              <div className="bg-purple-600 w-16 h-16 flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold rounded-full">
                P
              </div>

              <h2 className="text-white text-xl font-black mb-2 drop-shadow-lg">UPGRADE TO PREMIUM</h2>
              <p className="text-purple-300 text-sm">UNLOCK UNLIMITED EXPLANATIONS AND FEATURES</p>
            </div>

            {/* Features */}
            <div className="p-4 space-y-3 max-h-48 overflow-y-auto text-white">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className={`${feature.color} p-2 border border-purple-400 rounded-md flex-shrink-0 text-white font-bold`}>
                    {feature.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs leading-tight text-purple-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pricing */}
            <div className="bg-gray-900/50 p-4 border-t border-purple-500 text-white">
              <div className="text-center mb-4">
                <div className="text-2xl font-black mb-1">
                  ₹299<span className="text-base font-bold text-purple-300">/MONTH</span>
                </div>
                <div className="text-sm text-purple-300">CANCEL ANYTIME • 7-DAY FREE TRIAL</div>
              </div>

              <Button
                onClick={handleSubscribe}
                className="w-full py-3 font-bold text-base mb-3 bg-purple-600 hover:bg-purple-700"
              >
                START FREE TRIAL
              </Button>

              <div className="text-center">
                <Button onClick={onClose} variant="link" className="text-sm text-cyan-400">
                  MAYBE LATER
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionModal;
