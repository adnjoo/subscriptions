'use client';

import { useState, useEffect } from 'react';
import SubscriptionForm from '../components/SubscriptionForm';
import SubscriptionList from '../components/SubscriptionList';
import { getSubscriptions } from '../utils/localStorage';
import { Subscription } from '../types/subscription';
import { ContainerScroll, CardSticky } from '../components/blocks/cards-stack';

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
      .reduce((acc, sub) => acc + sub.amount, 0);
    
    const totalSubscriptions = subscriptions.length;
    
    const nextPayment = subscriptions.length > 0 
      ? subscriptions.reduce((earliest, sub) => {
          return new Date(sub.nextBillingDate) < new Date(earliest.nextBillingDate) 
            ? sub 
            : earliest;
        }).nextBillingDate
      : null;

    return [
      {
        id: 'stat-1',
        title: 'Monthly Total (USD)',
        value: `$${monthlyTotal.toFixed(2)}`,
        description: 'Monthly subscriptions',
        bg: 'rgb(58,148,118)'
      },
      {
        id: 'stat-2',
        title: 'Yearly Total (USD)',
        value: `$${yearlyTotal.toFixed(2)}`,
        description: 'Yearly subscriptions',
        bg: 'rgb(195,97,158)'
      },
      {
        id: 'stat-3',
        title: 'Total Subscriptions',
        value: totalSubscriptions.toString(),
        description: 'Active subscriptions',
        bg: 'rgb(202,128,53)'
      },
      {
        id: 'stat-4',
        title: 'Next Payment',
        value: nextPayment ? new Date(nextPayment).toLocaleDateString() : '-',
        description: 'Upcoming bill',
        bg: 'rgb(135,95,195)'
      }
    ];
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container min-h-svh">
        <header className="text-center py-12">
          <h5 className="text-xs uppercase tracking-wide text-stone-50">subscription tracker</h5>
          <h2 className="mb-4 mt-1 text-4xl font-bold tracking-tight text-stone-50">
            Manage your <span className="text-indigo-500">subscriptions</span>
          </h2>
          <p className="mx-auto max-w-prose text-sm text-stone-50/80">
            Keep track of all your recurring expenses in one place. Add, monitor, and manage your subscriptions with ease.
          </p>
        </header>

        <ContainerScroll className="min-h-[400vh] place-items-center space-y-8 p-12 text-center">
          {getStats().map((stat, index) => (
            <CardSticky
              key={stat.id}
              incrementY={20}
              index={index + 2}
              className="flex h-72 w-[420px] flex-col place-content-center justify-evenly rounded-2xl border border-current p-8 shadow-md text-stone-50"
              style={{ rotate: index + 2, background: stat.bg }}
            >
              <h1 className="text-left text-6xl font-semibold opacity-80">
                {stat.value}
              </h1>
              <div className="place-items-end text-right">
                <h3 className="max-w-[15ch] text-wrap text-4xl font-semibold capitalize tracking-tight">
                  {stat.description}
                </h3>
              </div>
            </CardSticky>
          ))}
        </ContainerScroll>

        <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12 p-12">
          <div className="left-0 top-0 md:sticky md:h-svh md:py-12">
            <h5 className="text-xs uppercase tracking-wide text-stone-50">add new</h5>
            <h2 className="mb-6 mt-4 text-4xl font-bold tracking-tight text-stone-50">
              Track your <span className="text-indigo-500">expenses</span>
            </h2>
            <p className="max-w-prose text-sm text-stone-50/80">
              Add your subscriptions and keep track of your recurring payments. We'll help you stay on top of your expenses.
            </p>
            <SubscriptionForm onAdd={loadSubscriptions} />
          </div>

          <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
            <SubscriptionList 
              subscriptions={subscriptions} 
              onDelete={loadSubscriptions} 
            />
          </ContainerScroll>
        </div>
      </div>
    </div>
  );
}
