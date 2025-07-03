import { useNavigate } from 'react-router-dom';
import '../styles/DisorderSelection.css';
import Footer from "./../features/homePage/components/Footer";
import CustomNavbar from '../components/Navbar';

const DisorderSelection = () => {
  const navigate = useNavigate();
  const handleClick = (disorder) => {
    navigate(`/article/${disorder.toLowerCase()}`);
  };

  return (<>
      <CustomNavbar />

    <div className="disorder-selection-page">
      <h1>Select a Mental Health Topic</h1>
      <div className="disorder-grid">
        {['Anger', 'Anxiety', 'Depression', 'OCD', 'Stress'].map((disorder) => (
          <div
            key={disorder}
            className="disorder-card"
            onClick={() => handleClick(disorder)}
          >
            {disorder}
          </div>
        ))}
      </div>
    </div>
      <Footer />

    </>
  );
};

export default DisorderSelection;