import PricingClient from './PricingClient';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Pianify Premium Pricing Plans',
  description: 'Choose the subscription plan that fits your piano self-study schedule. Unlock all lessons and songs with Pianify Premium.',
};

export default function PricingPage() {
  return <PricingClient />;
}
