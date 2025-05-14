'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="text-center py-16 relative">
      {/* Hero gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
      
      {/* Glassmorphism card effect */}
      <div className="relative backdrop-blur-sm bg-slate-900/30 rounded-2xl p-8 mx-auto max-w-3xl border border-white/5 shadow-2xl">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-indigo-400 mb-4 flex items-center justify-center gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Image
              src="/logo.png"
              alt="SubsZero Logo"
              width={45}
              height={45}
              className="object-contain drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]"
            />
          </motion.div>
          <span className="relative">
            SubsZero
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500/50 to-purple-500/50"></span>
          </span>
        </motion.h1>

        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 text-5xl font-bold tracking-tight text-stone-50"
        >
          Manage your{' '}
          <span className="relative inline-block">
            subscriptions
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30 animate-gradient"></span>
          </span>
        </motion.h2>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto max-w-xl text-base text-stone-300 leading-relaxed bg-clip-text"
        >
          Keep track of all your recurring expenses in one place, for free.
        </motion.p>
      </div>
    </header>
  );
} 