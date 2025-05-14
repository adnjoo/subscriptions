'use client';

import { useState, useEffect } from 'react';
import SubscriptionForm from '../components/SubscriptionForm';
import SubscriptionList from '../components/SubscriptionList';
import { getSubscriptions } from '../utils/localStorage';
import { Subscription } from '../types/subscription';
import { ContainerScroll, CardSticky } from '../components/blocks/cards-stack';
import Header from '../components/Header';

export default function Home() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const loadSubscriptions = () => {
    const subs = getSubscriptions();
    setSubscriptions(subs);
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const getStats = () => {
    const monthlyTotal = subscriptions
      .filter(sub => sub.billingCycle === 'monthly')
      .reduce((acc, sub) => acc + sub.amount, 0);
    
    const yearlyTotal = subscriptions
      .filter(sub => sub.billingCycle === 'yearly')
      .reduce((acc, sub) => acc + sub.amount, 0) + (monthlyTotal * 12);
    
    const totalSubscriptions = subscriptions.length;

    return [
      {
        id: 'stat-1',
        title: 'Monthly Total',
        value: `$${monthlyTotal.toFixed(2)}`,
        description: 'Monthly subscriptions',
        gradient: 'from-emerald-500/20 to-emerald-500/5'
      },
      {
        id: 'stat-2',
        title: 'Annual Total',
        value: `$${yearlyTotal.toFixed(2)}`,
        description: 'Total yearly cost',
        gradient: 'from-fuchsia-500/20 to-fuchsia-500/5'
      },
      {
        id: 'stat-3',
        title: 'Total Subscriptions',
        value: totalSubscriptions.toString(),
        description: 'Active subscriptions',
        gradient: 'from-amber-500/20 to-amber-500/5'
      }
    ];
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="min-h-svh max-w-7xl mx-auto px-4">
        <Header />

        <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12 p-12">
          <div className="left-0 top-0 md:sticky md:h-svh">
            <SubscriptionForm onAdd={loadSubscriptions} />
          </div>

          <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
            <SubscriptionList 
              subscriptions={subscriptions} 
              onDelete={loadSubscriptions} 
            />
          </ContainerScroll>
        </div>

        <ContainerScroll className="min-h-[400vh] place-items-center space-y-8 p-12 text-center">
          {getStats().map((stat, index) => (
            <CardSticky
              key={stat.id}
              incrementY={20}
              index={index + 2}
              className="flex h-72 w-[420px] flex-col place-content-center justify-evenly rounded-2xl border border-white/5 p-8 shadow-xl text-stone-50 bg-gradient-to-br"
              style={{ 
                rotate: `${(index + 1) * 2}deg`,
                background: `linear-gradient(to bottom right, rgb(30, 41, 59), rgb(15, 23, 42))`,
              }}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient}`} style={{ opacity: 0.8 }} />
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-stone-300 uppercase tracking-widest">
                  {stat.title}
                </h3>
                <p className="text-5xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-stone-400">
                  {stat.description}
                </p>
              </div>
            </CardSticky>
          ))}
        </ContainerScroll>

        <footer className="py-8 text-center text-sm text-stone-400">
          Made with <span className="text-red-500">❤️</span> by{' '}
          <a 
            href="https://github.com/adnjoo/subscriptions" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            @adnjoo
          </a>
        </footer>
      </div>
    </div>
  );
}
