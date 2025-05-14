'use client';

import { useState, useEffect } from 'react';
import SubscriptionForm from '../components/SubscriptionForm';
import SubscriptionList from '../components/SubscriptionList';
import { getSubscriptions } from '../utils/localStorage';
import { Subscription } from '../types/subscription';

export default function Home() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const loadSubscriptions = () => {
    const subs = getSubscriptions();
    setSubscriptions(subs);
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const getTotalAmount = (cycle: 'monthly' | 'yearly') => {
    return subscriptions
      .filter(sub => sub.billingCycle === cycle)
      .reduce((acc, sub) => acc + sub.amount, 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Subscription Tracker</h1>
        <p className="text-black/60 dark:text-white/60">Keep track of your recurring expenses</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="bg-white dark:bg-black/20 rounded-lg p-6">
          <h3 className="text-sm mb-1 text-black/60 dark:text-white/60">Monthly Total</h3>
          <p className="text-2xl font-bold">${getTotalAmount('monthly')} USD</p>
        </div>
        <div className="bg-white dark:bg-black/20 rounded-lg p-6">
          <h3 className="text-sm mb-1 text-black/60 dark:text-white/60">Yearly Total</h3>
          <p className="text-2xl font-bold">${getTotalAmount('yearly')} USD</p>
        </div>
      </div>

      <SubscriptionForm onAdd={loadSubscriptions} />
      <SubscriptionList 
        subscriptions={subscriptions} 
        onDelete={loadSubscriptions} 
      />
    </div>
  );
}
