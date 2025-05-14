'use client';

import { useState } from 'react';
import { addSubscription } from '../utils/localStorage';
import { Subscription } from '../types/subscription';

export default function SubscriptionForm({ onAdd }: { onAdd: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    currency: 'USD',
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
      currency: 'USD',
      billingCycle: 'monthly',
      nextBillingDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="bg-white dark:bg-black/20 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Add Subscription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 rounded border border-black/10 dark:border-white/10 bg-transparent"
            placeholder="Netflix, Spotify, etc."
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">Amount</label>
            <input
              type="number"
              required
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full px-3 py-2 rounded border border-black/10 dark:border-white/10 bg-transparent"
              placeholder="0.00"
            />
          </div>

          <div className="w-1/3">
            <label className="block text-sm mb-1">Currency</label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value})}
              className="w-full px-3 py-2 rounded border border-black/10 dark:border-white/10 bg-transparent"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Billing Cycle</label>
            <select
              value={formData.billingCycle}
              onChange={(e) => setFormData({...formData, billingCycle: e.target.value as 'monthly' | 'yearly'})}
              className="w-full px-3 py-2 rounded border border-black/10 dark:border-white/10 bg-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Next Billing Date</label>
            <input
              type="date"
              required
              value={formData.nextBillingDate}
              onChange={(e) => setFormData({...formData, nextBillingDate: e.target.value})}
              className="w-full px-3 py-2 rounded border border-black/10 dark:border-white/10 bg-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 px-4 py-2 bg-foreground text-background rounded hover:opacity-90 transition-opacity"
        >
          Add Subscription
        </button>
      </form>
    </div>
  );
} 