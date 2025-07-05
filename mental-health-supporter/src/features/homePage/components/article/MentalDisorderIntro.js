import { useTranslation } from 'react-i18next';

const MentalDisorderIntro = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('articles.mentalDisorderIntroTitle')}</h2>
      <p>{t('articles.mentalDisorderIntroBody')}</p>
    </div>
  );
};

export default MentalDisorderIntro; 