import PricingClient from './PricingClient';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Orbit Pricing Plans - Free & Team Tiers',
  description: 'Whether you are an indie developer or scaling a game studio, choose the right fit with Orbit pricing plans.',
};

export default function PricingPage() {
  return <PricingClient />;
}
