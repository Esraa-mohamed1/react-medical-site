export default function FiltersPanel({ filters, setFilters, setCurrentPage, setShowFilters }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="filter-group">
          <label className="block text-white font-semibold mb-2">Specialty</label>
          <select
            value={filters.specialty}
            onChange={(e) => setFilters({...filters, specialty: e.target.value})}
            className="w-full bg-white/20 border border-white/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-white/50"
          >
            <option value="All">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="block text-white font-semibold mb-2">Minimum Rating</label>
          <select
            value={filters.minRating}
            onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value)})}
            className="w-full bg-white/20 border border-white/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-white/50"
          >
            <option value={0}>Any Rating</option>
            <option value={4.0}>4.0+ Stars</option>
            <option value={4.5}>4.5+ Stars</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="block text-white font-semibold mb-2">Language</label>
          <select
            value={filters.language}
            onChange={(e) => setFilters({...filters, language: e.target.value})}
            className="w-full bg-white/20 border border-white/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-white/50"
          >
            <option value="Any">Any Language</option>
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
            <option value="French">French</option>
            <option value="Chinese">Chinese</option>
            <option value="German">German</option>
            <option value="Korean">Korean</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="block text-white font-semibold mb-2">Gender</label>
          <select
            value={filters.gender}
            onChange={(e) => setFilters({...filters, gender: e.target.value})}
            className="w-full bg-white/20 border border-white/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-white/50"
          >
            <option value="Any">Any Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="filter-group flex items-center">
          <input
            type="checkbox"
            id="availability-filter"
            checked={filters.availability}
            onChange={(e) => setFilters({...filters, availability: e.target.checked})}
            className="w-4 h-4 mr-2"
          />
          <label htmlFor="availability-filter" className="text-white">Available Today</label>
        </div>

        <div className="filter-group lg:col-span-3 flex justify-end">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            onClick={() => {
              setCurrentPage(1);
              setShowFilters(false);
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
} 