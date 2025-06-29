'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function HowToPlayPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center text-white">
      <div
        className="space-y-6 max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-purple-500"
      >
        <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
          How to Play TrueDose
        </h1>
        <p className="text-lg mb-4">
          <strong className="text-purple-400">Read the medical fact on the screen.</strong>
        </p>
        <p className="text-lg mb-4">
          <strong className="text-purple-400">Tap TRUE or FALSE within 15 seconds.</strong>
        </p>
        <p className="text-lg mb-4">
          If you're right – <strong className="text-green-400">your streak continues.</strong>
        </p>
        <p className="text-lg mb-4">
          If you're wrong – <strong className="text-red-400">game over.</strong>
        </p>
        <p className="text-lg mb-4">
          After each correct answer, you'll see a short explanation.
        </p>
        <p className="text-lg mb-4">
          You get <strong className="text-cyan-400">5 free explanations daily</strong> (unlimited if subscribed).
        </p>
        <p className="text-lg mb-8">
          Tap <strong className="text-cyan-400">Continue</strong> to move to the next fact.
        </p>
        <Button
          onClick={() => router.push('/')}
          className="mt-8 text-lg bg-purple-600 hover:bg-purple-700 text-white py-3"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
} 