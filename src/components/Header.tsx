'use client';

export default function Header() {
  return (
    <header className="text-center py-16 relative">
      <div className="absolute inset-0"></div>
      <div className="relative">
        <h1 className="text-4xl font-bold text-indigo-400 mb-4">
          <span className="relative">
            SubsZero
            {/* <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-indigo-500/50"></span> */}
          </span>
        </h1>
        <h2 className="mb-6 text-5xl font-bold tracking-tight text-stone-50">
          Manage your <span className="relative inline-block">subscriptions<span className="absolute -bottom-1 left-0 w-full h-[2px] bg-indigo-500/30"></span></span>
        </h2>
        <p className="mx-auto max-w-xl text-base text-stone-300 leading-relaxed">
          Keep track of all your recurring expenses in one place. Add, monitor, and manage your subscriptions with ease.
        </p>
      </div>
    </header>
  );
} 