import { useState, useEffect } from "react";
import { fetchAllDoctors, fetchAllSpecialties } from "../dataSlice";
import styles from "../style/DoctorsSection.module.css";
import { useNavigate } from "react-router-dom";

export default function DoctorsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [doctorsPerPage] = useState(3);
  const [combinedDoctors, setCombinedDoctors] = useState([]);
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const isDoctor = user?.role === 'doctor';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [doctors, specialties] = await Promise.all([
          fetchAllDoctors(),
          fetchAllSpecialties()
        ]);

        const enrichedDoctors = doctors.map(doctor => {
          const specialty = specialties.find(s => s.id === doctor.specialty_id);
          return {
            ...doctor,
            username: typeof doctor.user === 'object' ? doctor.user.username : doctor.user,
            specialtyName: specialty?.name || "General"
          };
        });

        setCombinedDoctors(enrichedDoctors);
        setAllSpecialties(specialties);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Unable to load doctors at this time. Please try again later.");
        // Set some placeholder data for demonstration
        setCombinedDoctors([
          {
            id: 1,
            username: "Dr. Sarah Johnson",
            specialtyName: "Psychiatry",
            bio: "Experienced psychiatrist specializing in anxiety and depression treatment.",
            years_of_experience: 8,
            phone: "+1 (555) 123-4567"
          },
          {
            id: 2,
            username: "Dr. Michael Chen",
            specialtyName: "Psychology",
            bio: "Clinical psychologist with expertise in cognitive behavioral therapy.",
            years_of_experience: 12,
            phone: "+1 (555) 234-5678"
          },
          {
            id: 3,
            username: "Dr. Emily Rodriguez",
            specialtyName: "Counseling",
            bio: "Licensed counselor helping individuals with stress management and life transitions.",
            years_of_experience: 6,
            phone: "+1 (555) 345-6789"
          }
        ]);
        setAllSpecialties([
          { id: 1, name: "Psychiatry" },
          { id: 2, name: "Psychology" },
          { id: 3, name: "Counseling" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter doctors by specialty
  const filteredDoctors = selectedSpecialty === "all" 
    ? combinedDoctors 
    : combinedDoctors.filter(doctor => doctor.specialtyName === selectedSpecialty);

  // Pagination logic
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const currentDoctors = filteredDoctors.slice(
    currentPage * doctorsPerPage,
    (currentPage + 1) * doctorsPerPage
  );

  const handleReadMore = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/doctors-list');
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.subtitle}>MEET OUR DOCTORS</p>
            <h2 className={styles.title}>
              <span className={styles.titleHighlight}>Professional</span> & Enthusiastic
            </h2>
          </div>
          <div className={styles.loading}>Loading doctors...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.subtitle}>MEET OUR DOCTORS ({filteredDoctors.length} Total)</p>
          <h2 className={styles.title}>
            <span className={styles.titleHighlight}>Professional</span> & Enthusiastic
          </h2>
          
          {error && <p className={styles.error}>{error}</p>}
          
          {/* Specialty Filter Dropdown */}
          <div className={styles.filterContainer}>
            <select
              value={selectedSpecialty}
              onChange={(e) => {
                setSelectedSpecialty(e.target.value);
                setCurrentPage(0); // Reset to first page when filter changes
              }}
              className={styles.filterDropdown}
            >
              <option value="all">All Specialties</option>
              {allSpecialties.map(specialty => (
                <option key={specialty.id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.doctorsGrid}>
          {currentDoctors.map((doctor) => (
            <div key={doctor.id} className={styles.doctorCard}>
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
                  {doctor.username?.charAt(0)?.toUpperCase() || 'D'}
                </div>
                <h3 className={styles.doctorName}>
                  <span className={styles.nameHighlight}>{doctor.username}</span>  
                </h3>
                <p className={styles.specialty}>{doctor.specialtyName}</p>
                <p className={styles.bio}>{doctor.bio}</p>
                <div className={styles.details}>
                  <p>{doctor.years_of_experience} years of experience</p>
                  <p>{doctor.phone}</p>
                </div>
                {!isDoctor && (
                  <button 
                    onClick={handleReadMore}
                    className={styles.readMoreButton}
                  >
                    READ MORE
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
                className={`${styles.paginationDot} ${
                  index === currentPage ? styles.active : ""
                }`}
              >
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}