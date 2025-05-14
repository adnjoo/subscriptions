import { Subscription } from '../types/subscription';

const STORAGE_KEY = 'subscriptions';

export const getSubscriptions = (): Subscription[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addSubscription = (subscription: Subscription): void => {
  const subscriptions = getSubscriptions();
  subscriptions.push(subscription);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
};

export const deleteSubscription = (id: string): void => {
  const subscriptions = getSubscriptions();
  const filtered = subscriptions.filter(sub => sub.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}; 