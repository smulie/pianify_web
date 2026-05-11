'use client';

import { useI18n } from './LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      zIndex: 1000,
      display: 'flex',
      gap: 4,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '4px',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
    }}>
      <button
        onClick={() => setLanguage('en')}
        style={{
          padding: '6px 12px',
          borderRadius: '16px',
          border: 'none',
          background: language === 'en' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          color: language === 'en' ? '#fff' : 'rgba(255, 255, 255, 0.4)',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s',
          outline: 'none'
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('vi')}
        style={{
          padding: '6px 12px',
          borderRadius: '16px',
          border: 'none',
          background: language === 'vi' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          color: language === 'vi' ? '#fff' : 'rgba(255, 255, 255, 0.4)',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s',
          outline: 'none'
        }}
      >
        VI
      </button>
    </div>
  );
}
