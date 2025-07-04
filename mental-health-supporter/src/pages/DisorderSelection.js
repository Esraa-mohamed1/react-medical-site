import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/DisorderSelection.css';
import Footer from './../features/homePage/components/Footer';
import CustomNavbar from '../components/Navbar';

const DisorderSelection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = (disorder) => {
    navigate(`/article/${disorder.toLowerCase()}`);
  };

  const disorders = ['anger', 'anxiety', 'depression', 'ocd', 'stress'];

  return (
    <>
      <CustomNavbar />

      <div className="disorder-selection-page">
        <h1>{t('disorderSelection.title')}</h1>
        <div className="disorder-grid">
          {disorders.map((disorder) => (
            <div
              key={disorder}
              className="disorder-card"
              onClick={() => handleClick(disorder)}
            >
              {t(`disorderSelection.${disorder}`)}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DisorderSelection;
