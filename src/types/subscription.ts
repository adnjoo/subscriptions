export interface Subscription {
  id: string;
  name: string;
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
} 