'use client';

import { Subscription } from '../types/subscription';
import { deleteSubscription } from '../utils/localStorage';

export default function SubscriptionList({ 
  subscriptions,
  onDelete
}: { 
  subscriptions: Subscription[],
  onDelete: () => void
}) {
  const handleDelete = (id: string) => {
    deleteSubscription(id);
    onDelete();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
      
      {subscriptions.length === 0 ? (
        <div className="bg-white dark:bg-black/20 rounded-lg p-6 text-center">
          <p className="text-black/60 dark:text-white/60">No subscriptions yet. Add one above!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white dark:bg-black/20 rounded-lg p-6 hover:ring-1 hover:ring-black/10 dark:hover:ring-white/10 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">{sub.name}</h3>
                <button
                  onClick={() => handleDelete(sub.id)}
                  className="text-black/40 dark:text-white/40 hover:text-red-500 dark:hover:text-red-400"
                  aria-label="Delete subscription"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-2">
                <p className="text-2xl font-semibold">
                  {sub.amount.toFixed(2)} {sub.currency}
                </p>
                <div className="text-sm text-black/60 dark:text-white/60">
                  <p>Bills {sub.billingCycle}</p>
                  <p>Next payment: {formatDate(sub.nextBillingDate)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 