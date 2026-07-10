'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Mascot {
  src: string;
  alt: string;
  type: 'peek-left' | 'peek-right' | 'peek-bottom-right' | 'peek-bottom-left' | 'float-bg';
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  size?: number;
  opacity?: number;
}

export default function MascotAmbience() {
  const pathname = usePathname();
  const [activeMascots, setActiveMascots] = useState<Mascot[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Define mascots based on active subpage
    let mascots: Mascot[] = [];

    if (pathname === '/') {
      mascots = [
        {
          src: '/mascot_flow_loading_zen.webp',
          alt: 'Zen Mascot',
          type: 'float-bg',
          top: '30%',
          left: '5%',
          size: 100,
          opacity: 0.12
        },
        {
          src: '/mascot_emotion_cheeky_winking.webp',
          alt: 'Winking Mascot',
          type: 'peek-right',
          top: '55%',
          size: 110
        },
        {
          src: '/mascot_emotion_cheeky_shrug.webp',
          alt: 'Shrug Mascot',
          type: 'peek-bottom-left',
          bottom: -15,
          left: -15,
          size: 110
        }
      ];
    } else if (pathname?.startsWith('/about')) {
      mascots = [
        {
          src: '/mascot_win_gigachad.webp',
          alt: 'Gigachad Mascot',
          type: 'peek-bottom-right',
          bottom: -10,
          right: -10,
          size: 120
        },
        {
          src: '/mascot_flow_book.webp',
          alt: 'Book Mascot',
          type: 'peek-left',
          top: '40%',
          size: 90
        }
      ];
    } else if (pathname?.startsWith('/pricing')) {
      mascots = [
        {
          src: '/mascot_emotion_cheeky_smirk.webp',
          alt: 'Smirk Mascot',
          type: 'peek-right',
          top: '45%',
          size: 105
        },
        {
          src: '/mascot_win_cool.webp',
          alt: 'Cool Mascot',
          type: 'peek-bottom-left',
          bottom: -15,
          left: -15,
          size: 115
        }
      ];
    } else if (pathname?.startsWith('/faq')) {
      mascots = [
        {
          src: '/mascot_status_sleepy.webp',
          alt: 'Sleepy Mascot',
          type: 'peek-bottom-left',
          bottom: -20,
          left: -20,
          size: 110
        },
        {
          src: '/mascot_emotion_cheeky_winking.webp',
          alt: 'Winking Mascot',
          type: 'peek-right',
          top: '30%',
          size: 95
        }
      ];
    } else if (pathname?.startsWith('/support')) {
      mascots = [
        {
          src: '/mascot_system_support.webp',
          alt: 'Support Mascot',
          type: 'peek-left',
          top: '55%',
          size: 100
        }
      ];
    } else if (pathname?.startsWith('/features')) {
      mascots = [
        {
          src: '/mascot_win_woohoo.webp',
          alt: 'Cheering Mascot',
          type: 'peek-right',
          top: '65%',
          size: 110
        },
        {
          src: '/mascot_learn_piano_solo.webp',
          alt: 'Piano Mascot',
          type: 'peek-bottom-left',
          bottom: -15,
          left: -15,
          size: 115
        }
      ];
    }

    setActiveMascots(mascots);
  }, [pathname, mounted]);

  if (!mounted) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 99 }}>
      {activeMascots.map((mascot, index) => {
        // Base styling for each type of peek/float
        const baseStyle: React.CSSProperties = {
          position: 'fixed',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          cursor: 'pointer',
          pointerEvents: 'auto',
          userSelect: 'none',
          zIndex: mascot.type === 'float-bg' ? 1 : 9999
        };

        let style: React.CSSProperties = {};
        let animationClass = '';

        if (mascot.type === 'float-bg') {
          style = {
            ...baseStyle,
            top: mascot.top,
            left: mascot.left,
            opacity: mascot.opacity ?? 0.15,
            width: mascot.size,
            height: 'auto',
            animation: 'mascot-float 6s ease-in-out infinite'
          };
        } else if (mascot.type === 'peek-left') {
          style = {
            ...baseStyle,
            top: mascot.top,
            left: 0,
            transform: 'translateX(-50%)',
            width: mascot.size,
            height: 'auto',
          };
          animationClass = 'mascot-hover-left';
        } else if (mascot.type === 'peek-right') {
          style = {
            ...baseStyle,
            top: mascot.top,
            right: 0,
            transform: 'translateX(50%)',
            width: mascot.size,
            height: 'auto',
          };
          animationClass = 'mascot-hover-right';
        } else if (mascot.type === 'peek-bottom-left') {
          style = {
            ...baseStyle,
            bottom: mascot.bottom,
            left: mascot.left,
            transform: 'translate(-25%, 25%)',
            width: mascot.size,
            height: 'auto',
          };
          animationClass = 'mascot-hover-bottom-left';
        } else if (mascot.type === 'peek-bottom-right') {
          style = {
            ...baseStyle,
            bottom: mascot.bottom,
            right: mascot.right,
            transform: 'translate(25%, 25%)',
            width: mascot.size,
            height: 'auto',
          };
          animationClass = 'mascot-hover-bottom-right';
        }

        return (
          <img
            key={`${pathname}-${index}`}
            src={mascot.src}
            alt={mascot.alt}
            style={style}
            className={animationClass}
            draggable={false}
            onClick={(e) => {
              // Add a funny click jump/bounce effect!
              const target = e.currentTarget;
              target.style.transform = `${target.style.transform} scale(1.3) translateY(-15px)`;
              setTimeout(() => {
                target.style.transform = '';
              }, 300);
            }}
          />
        );
      })}
    </div>
  );
}
