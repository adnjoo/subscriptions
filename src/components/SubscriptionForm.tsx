'use client';

import { useState } from 'react';
import { addSubscription } from '../utils/localStorage';
import { Subscription } from '../types/subscription';

export default function SubscriptionForm({ onAdd }: { onAdd: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    billingCycle: 'monthly' as 'monthly' | 'yearly',
    nextBillingDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubscription: Subscription = {
      id: Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount)
    };
    addSubscription(newSubscription);
    onAdd();
    setFormData({
      name: '',
      amount: '',
      billingCycle: 'monthly',
      nextBillingDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="mt-8 rounded-2xl border border-indigo-500/20 p-8 shadow-md backdrop-blur-md bg-indigo-950/50">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Add Subscription</h2>
        <p className="text-sm text-black/60 dark:text-white/60">
          Track your recurring expenses by adding a new subscription
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-stone-50">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-indigo-500/20 bg-indigo-950/50 text-stone-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Netflix, Spotify, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-stone-50">Amount (USD)</label>
          <input
            type="number"
            required
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-indigo-500/20 bg-indigo-950/50 text-stone-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-stone-50">Billing Cycle</label>
            <select
              value={formData.billingCycle}
              onChange={(e) => setFormData({...formData, billingCycle: e.target.value as 'monthly' | 'yearly'})}
              className="w-full px-4 py-2 rounded-lg border border-indigo-500/20 bg-indigo-950/50 text-stone-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-50">Next Billing Date</label>
            <input
              type="date"
              required
              value={formData.nextBillingDate}
              onChange={(e) => setFormData({...formData, nextBillingDate: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-indigo-500/20 bg-indigo-950/50 text-stone-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-6 py-3 bg-indigo-500 text-stone-50 rounded-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          Add Subscription
        </button>
      </form>
    </div>
  );
} 