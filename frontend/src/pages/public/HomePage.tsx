// src/pages/public/HomePage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { potholeApi } from '@/utils/api';

const HomePage = () => {
  const { t } = useTranslation();
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    potholeApi.getAll({ limit: 1 })
      .then((res) => setTotal(res.data.pagination.total))
      .catch(() => {/* non-critical */ });
  }, []);

  const steps = [
    { num: '01', title: t('home.step_1_title'), body: t('home.step_1_body') },
    { num: '02', title: t('home.step_2_title'), body: t('home.step_2_body') },
    { num: '03', title: t('home.step_3_title'), body: t('home.step_3_body') },
    { num: '04', title: t('home.step_4_title'), body: t('home.step_4_body') },
  ];

  return (
    <div className="home-page">
      {/* Gov Banner Hero */}
      <section className="gov-banner">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">{t('home.hero_badge')}</div>
            <h1 className="hero-title">
              {t('home.hero_title')}
            </h1>
            <p className="hero-subtitle">{t('home.hero_subtitle')}</p>
            <div className="hero-ctas">
              <Link to="/report" className="btn-gold btn-large">{t('home.cta_report')}</Link>
              <Link to="/map" className="btn-secondary btn-large" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>{t('home.cta_map')}</Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">

            <div className="gov-dept-label">
              Ministry of Communications<br />
              Road Infrastructure Division
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      {total !== null && (
        <section className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">{total.toLocaleString()}</span>
            <span className="stat-label">{t('home.stats_total')}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-label">{t('home.stats_inprogress')}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-label">{t('home.stats_resolved')}</span>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="how-it-works">
        <div className="section-header">
          <div className="section-label">{t('home.how_it_works_label')}</div>
          <h2 className="section-title">{t('home.how_it_works_title')}</h2>
          <p className="section-desc">{t('home.how_it_works_desc')}</p>
        </div>
        <div className="steps-grid">
          {steps.map((s) => (
            <div key={s.num} className="step-card">
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>{t('home.cta_banner')}</h2>
        <p>{t('home.cta_banner_desc')}</p>
        <Link to="/report" className="btn-gold btn-large">
          {t('home.cta_report')}
        </Link>
      </section>

      {/* Official footer note */}
      <div className="gov-footer">
        {t('footer.copyright')}
      </div>
    </div>
  );

};

export default HomePage;
