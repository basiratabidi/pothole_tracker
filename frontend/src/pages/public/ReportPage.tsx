// src/pages/public/ReportPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReportForm from '@/components/forms/ReportForm';
import type { Pothole } from '@/types';

const ReportPage = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ pothole: Pothole; isCluster: boolean } | null>(null);

  const handleSuccess = (pothole: Pothole, isCluster: boolean) => {
    setResult({ pothole, isCluster });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tips = [
    t('report.tip_1'),
    t('report.tip_2'),
    t('report.tip_3'),
    t('report.tip_4'),
    t('report.tip_5'),
  ];

  return (
    <div className="report-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('report.title')}</h1>
          <p className="page-subtitle">{t('report.subtitle')}</p>
        </div>
      </div>

      <div className="report-container">
        {submitted && result ? (
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>{t('report.success_title')}</h2>
            <p>{t('report.success_message')}</p>
            <div className="success-details">
              <div className="detail-row">
                <span>{t('report.severity_score')}:</span>
                <strong>{result.pothole.severityScore}</strong>
              </div>
              {result.isCluster && (
                <div className="detail-row cluster-note">
                  [CLUSTER] {t('report.cluster_note')}
                </div>
              )}
            </div>
            <div className="success-actions">
              <button
                className="btn-primary"
                onClick={() => { setSubmitted(false); setResult(null); }}
              >
                {t('report.report_another')}
              </button>
              <Link to="/map" className="btn-secondary">{t('report.view_on_map')}</Link>
            </div>
          </div>
        ) : (
          <div className="form-card">
            <ReportForm onSuccess={handleSuccess} />
          </div>
        )}

        <aside className="report-tips">
          <h3>{t('report.tips_title')}</h3>
          <ul>
            {tips.map((tip) => <li key={tip}>{tip}</li>)}
          </ul>
          <div className="tips-note">
            <strong>{t('report.cluster_bonus_title')}:</strong> {t('report.cluster_bonus_desc')}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ReportPage;
