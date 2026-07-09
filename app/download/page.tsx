import DownloadClient from './DownloadClient';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Download Orbit IDE - AI Coding Agent',
  description: 'Download the Orbit agentic coding environment built for game and product developers.',
};

export default function DownloadPage() {
  return <DownloadClient />;
}
