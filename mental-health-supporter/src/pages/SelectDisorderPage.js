import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SelectDisorderPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelect = (disorder) => {
    navigate(`/article/${disorder.toLowerCase()}`);
  };

  return (
    <div className="select-disorder container text-center mt-5">
      <h2>{t('selectDisorder.titlee')}</h2>
      <div className="btn-group mt-4">
        <button className="btn btn-primary m-2" onClick={() => handleSelect('anger')}>
          {t('selectDisorder.angerr')}
        </button>
        <button className="btn btn-info m-2" onClick={() => handleSelect('anxiety')}>
          {t('selectDisorder.anxietyy')}
        </button>
        <button className="btn btn-success m-2" onClick={() => handleSelect('depression')}>
          {t('selectDisorder.depressionn')}
        </button>
        <button className="btn btn-warning m-2" onClick={() => handleSelect('stress')}>
          {t('selectDisorder.stresss')}
        </button>
        <button className="btn btn-secondary m-2" onClick={() => handleSelect('ocd')}>
          {t('selectDisorder.ocdd')}
        </button>
      </div>
    </div>
  );
}
