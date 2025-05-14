'use client';

import { Subscription } from '../types/subscription';
import { deleteSubscription } from '../utils/localStorage';
import { ContainerScroll, CardSticky } from './blocks/cards-stack';

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

  const getRandomColor = (index: number) => {
    const colors = [
      'rgb(58,148,118)',
      'rgb(195,97,158)',
      'rgb(202,128,53)',
      'rgb(135,95,195)'
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      {subscriptions.length === 0 ? (
        <div className="text-center text-stone-50/80">
          <p>No subscriptions yet. Add one to get started!</p>
        </div>
      ) : (
        <>
          {subscriptions.map((sub, index) => (
            <CardSticky
              key={sub.id}
              index={index + 2}
              className="rounded-2xl border border-indigo-500/20 p-8 shadow-md backdrop-blur-md bg-indigo-950/50"
              incrementY={60}
              incrementZ={5}
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tighter text-stone-50">
                  {sub.name}
                </h2>
                <button
                  onClick={() => handleDelete(sub.id)}
                  className="text-stone-50/40 hover:text-red-500"
                  aria-label="Delete subscription"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-4xl font-bold text-indigo-500">
                  ${sub.amount.toFixed(2)}
                </p>
                <div className="text-sm text-stone-50/60">
                  <p>Bills {sub.billingCycle}</p>
                  <p>Next payment: {formatDate(sub.nextBillingDate)}</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                    {sub.billingCycle}
                  </span>
                </div>
              </div>
            </CardSticky>
          ))}
        </>
      )}
    </>
  );
} 