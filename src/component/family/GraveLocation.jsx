import "./grave-location.css";

const GRAVE = {
  name: "Alejandro Reyes Sr.",
  grave: "Grave A-142",
  section: "A",
  block: "3",
  lot: "15",
  type: "Ground Burial",
  highlighted: "A-142",
};

// Generate grid: A-101 to A-160 (6 rows x 10 cols)
const PLOTS = Array.from({ length: 60 }, (_, i) => {
  const num = 101 + i;
  return `A-${num}`;
});

function GraveLocation() {
  return (
    <div className="gl-main">
      <div className="gl-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="gl-header">
        <h1 className="gl-title">Grave Location</h1>
        <p className="gl-subtitle">View the location of your loved one's resting place</p>
      </div>

      {/* Info Card */}
      <div className="gl-info-card">
        <div className="gl-info-left">
          <div className="gl-info-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <h2 className="gl-info-name">{GRAVE.name}</h2>
            <p className="gl-info-grave">{GRAVE.grave}</p>
          </div>
        </div>

        <div className="gl-info-divider" />

        <div className="gl-info-stats">
          <div className="gl-stat">
            <span className="gl-stat-label">Section</span>
            <span className="gl-stat-value">{GRAVE.section}</span>
          </div>
          <div className="gl-stat">
            <span className="gl-stat-label">Block</span>
            <span className="gl-stat-value">{GRAVE.block}</span>
          </div>
          <div className="gl-stat">
            <span className="gl-stat-label">Lot</span>
            <span className="gl-stat-value">{GRAVE.lot}</span>
          </div>
          <div className="gl-stat">
            <span className="gl-stat-label">Type</span>
            <span className="gl-stat-value">{GRAVE.type}</span>
          </div>
        </div>
      </div>

      {/* Map Card */}
      <div className="gl-map-card">
        <div className="gl-map-header">
          <span className="gl-map-title">Section A — Block 3</span>
          <button className="gl-plot-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Plot Map
          </button>
        </div>

        <div className="gl-map-wrap">
          {/* North indicator */}
          <div className="gl-compass">N</div>

          {/* Entrance */}
          <div className="gl-entrance">
            <span>← Entrance</span>
          </div>

          {/* Grid */}
          <div className="gl-grid">
            {PLOTS.map((plot) => (
              <div
                key={plot}
                className={`gl-plot ${plot === GRAVE.highlighted ? "gl-plot--active" : ""}`}
              >
                {plot}
              </div>
            ))}
          </div>

          {/* Road */}
          <div className="gl-road">
            <span>Road →</span>
          </div>
        </div>

        {/* Legend */}
        <div className="gl-legend">
          <div className="gl-legend-item">
            <span className="gl-legend-dot gl-legend-dot--active" />
            <span>Your loved one's plot</span>
          </div>
          <div className="gl-legend-item">
            <span className="gl-legend-dot" />
            <span>Other plots</span>
          </div>
        </div>

        <p className="gl-map-note">
          Need assistance locating the grave? Contact our staff at (044) 123-4567
        </p>
      </div>
    </div>
  );
}

export default GraveLocation;