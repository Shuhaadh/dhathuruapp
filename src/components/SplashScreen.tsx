import { useEffect } from 'react';
import { Waves } from 'lucide-react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)' }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Waves className="w-24 h-24 mx-auto mb-6 text-white" />
        <h1 className="text-5xl text-white mb-2">Dhathuru</h1>
        <p className="text-white/80 text-lg">Island Speedboat Bookings</p>
      </motion.div>
    </div>
  );
}