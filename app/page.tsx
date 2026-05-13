import HomeClient from './HomeClient';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Pianify - Learn Piano Easily',
  description: 'Awaken your musical passion. Self-study a complete set of skills from basic to intermediate with Pianify.',
};

export default function Home() {
  return <HomeClient />;
}
