import RequestDemoClient from './RequestDemoClient';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Request Orbit Demo - AI Coding Agent',
  description: 'Schedule a personalized walkthrough of Orbit integrating with your game or product codebase.',
};

export default function RequestDemoPage() {
  return <RequestDemoClient />;
}
