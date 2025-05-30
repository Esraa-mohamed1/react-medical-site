"use client";
import Image from "next/image";
import Link from "next/link";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-background/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64">
        <Image
          src={doctor.image || "/images/doctor-placeholder.jpg"}
          alt={doctor.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
        <p className="text-muted mb-2">{doctor.specialization}</p>
        <p className="text-sm mb-4">{doctor.experience} years of experience</p>
        <div className="flex justify-between items-center">
          <span className="text-accent font-medium">Rating: {doctor.rating}/5</span>
          <Link
            href={`/doctors/${doctor.id}`}
            className="bg-accent text-background px-4 py-2 rounded hover:bg-accent/90 transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard; 