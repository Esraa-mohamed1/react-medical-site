import { useState, useEffect } from "react";
import { fetchAllDoctors, fetchAllSpecialties } from "../dataSlice";
import styles from "../style/DoctorsSection.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function DoctorsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [doctorsPerPage] = useState(3);
  const [combinedDoctors, setCombinedDoctors] = useState([]);
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();  // Use translation hook

  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const isDoctor = user?.role === 'doctor';

  useEffect(() => {
    setAllSpecialties([
      { id: "General Surgeon", name: "General Surgeon" },
      { id: "Cardiology", name: "Cardiology" },
      { id: "Dermatology", name: "Dermatology" },
      { id: "Surgery", name: "Surgery" },
    ]);

    fetchData();
  }, []);

  const fetchData = async (filters = ["limit=10"]) => {
    try {
      setLoading(true);
      setError(null);

      const doctors = await fetchAllDoctors(filters);

      setCombinedDoctors(doctors.results);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError(t('doctorsSection.errorLoading'));
    } finally {
      setLoading(false);
    }
  };

  // Filter doctors by specialty
  const filteredDoctors = selectedSpecialty === ""
    ? combinedDoctors
    : combinedDoctors.filter(doctor => doctor.specialization === selectedSpecialty);

  // Pagination logic
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const currentDoctors = filteredDoctors.slice(
    currentPage * doctorsPerPage,
    (currentPage + 1) * doctorsPerPage
  );

  const handleReadMore = (doctorId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/doctors/${doctorId}`);
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.subtitle}>{t('doctorsSection.meetOurDoctors')}</p>
            <h2 className={styles.title}>
              <span className={styles.titleHighlight}>{t('doctorsSection.professional')}</span> & <span className="text-success">{t('doctorsSection.enthusiastic')}</span>
            </h2>
          </div>
          <div className={styles.loading}>{t('doctorsSection.loadingDoctors')}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.subtitle}>
            {t('doctorsSection.meetOurDoctors')} ({filteredDoctors.length} {t('doctorsSection.totalDoctors')})
          </p>
          <h2 className={styles.title}>
            <span className={`${styles.titleHighlight} text-success`}>{t('doctorsSection.professional')}</span> <span className="text-success">&</span> <span className="text-success">{t('doctorsSection.enthusiastic')}</span>
          </h2>

          {error && <p className={styles.error}>{error}</p>}

          {/* Specialty Filter Dropdown */}
          <div className={styles.filterContainer}>
            <select
              value={selectedSpecialty}
              onChange={async(e) => {
                setSelectedSpecialty(e.target.value);
                setCurrentPage(0); // Reset to first page when filter changes
                if (e.target.value !== "") {
                  await fetchData([`specialization=${e.target.value}`, "limit=10"]);
                } else {
                  await fetchData();
                }
              }}
              className={styles.filterDropdown}
            >
              <option value="">{t('doctorsSection.allSpecialties')}</option>
              {allSpecialties.map(specialty => (
                <option key={specialty.id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>

            {!isDoctor && (
              <a href="/doctors-list" className={styles.customLink}>
                {t('doctorsSection.seeMore')}
              </a>
            )}
          </div>
        </div>

        <div className={styles.doctorsGrid}>
          {currentDoctors.map((doctor) => (
            <div key={doctor.doctor_id} className={styles.doctorCard}>
              <div className={styles.cardContent}>
                <div className={styles.doctorImage} style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  margin: '0 auto',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: '#6b7280'
                }}>
                  {doctor.full_name?.charAt(0)?.toUpperCase() || 'D'}
                </div>
                <h3 className={styles.doctorName}>
                  <span className={styles.nameHighlight}>{doctor.full_name ?? "John Smith"}</span>
                </h3>
                <p className={styles.specialty}>{doctor.specialization}</p>
                <p className={styles.bio}>{doctor.bio}</p>
                <div className={styles.details}>
                  <p>{doctor.phone}</p>
                </div>
                {!isDoctor && (
                  <button
                    onClick={() => handleReadMore(doctor.doctor_id)}
                    className={styles.readMoreButton}
                  >
                    {t('doctorsSection.readMore')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`${styles.paginationDot} ${index === currentPage ? styles.active : ""}`}
              >
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
