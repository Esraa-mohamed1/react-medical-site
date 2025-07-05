import { useNavigate } from 'react-router-dom';

export default function SelectDisorderPage() {
  const navigate = useNavigate();

  const handleSelect = (disorder) => {
    navigate(`/article/${disorder.toLowerCase()}`);
  };

  return (
    <div className="select-disorder container text-center mt-5">
      <h2>Select Your Current Mental Health Concern</h2>
      <div className="btn-group mt-4">
        <button className="btn btn-primary m-2" onClick={() => handleSelect('anger')}>Anger</button>
        <button className="btn btn-info m-2" onClick={() => handleSelect('anxiety')}>Anxiety</button>
        <button className="btn btn-success m-2" onClick={() => handleSelect('depression')}>Depression</button>
        <button className="btn btn-warning m-2" onClick={() => handleSelect('stress')}>Stress</button>
        <button className="btn btn-secondary m-2" onClick={() => handleSelect('ocd')}>OCD</button>
      </div>
    </div>
  );
}
