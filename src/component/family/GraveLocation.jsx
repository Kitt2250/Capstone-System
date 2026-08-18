import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, doc, writeBatch } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import "./grave-location.css";
import FamilyTopbar from "./FamilyTopbar";

const INITIAL_GRAVE = {
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
  const [grave, setGrave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(collection(db, "family_grave_locations"), where("userId", "==", uid));

    const unsubscribe = onSnapshot(q, async (snap) => {
      if (snap.empty) {
        try {
          const docRef = doc(collection(db, "family_grave_locations"));
          const batch = writeBatch(db);
          batch.set(docRef, { ...INITIAL_GRAVE, userId: uid });
          await batch.commit();
        } catch (err) {
          console.error("Failed to seed grave location:", err);
        }
      } else {
        setGrave(snap.docs[0].data());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fam-page-wrapper">
      {/* Top Bar */}
      <FamilyTopbar title="Grave Location" greeting="View the location of your loved one's resting place" />

      {loading ? (
        <p style={{ color: "#6a8aaa", padding: "20px 0" }}>
          <i className="fas fa-spinner fa-spin"></i> Loading grave location...
        </p>
      ) : !grave ? (
        <div className="fmp-empty" style={{ padding: "4rem 2rem", textAlign: "center" }}>
          <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a3d5c" }}>No grave location found.</p>
        </div>
      ) : (
        <div className="fgl-container-stack">
          {/* Info Card */}
          <div className="fam-container fgl-info-card">
            <div className="fgl-info-left">
              <div className="fgl-info-avatar">
                <i className="fas fa-cross"></i>
              </div>
              <div>
                <h2 className="fgl-info-name">{grave.name}</h2>
                <p className="fgl-info-grave"><i className="fas fa-map-pin" style={{ color: "#d4af37", marginRight: "6px" }}></i> {grave.grave}</p>
              </div>
            </div>

            <div className="fgl-info-divider" />

            <div className="fgl-info-stats">
              <div className="fgl-stat">
                <span className="fgl-stat-label">Section</span>
                <span className="fgl-stat-value">{grave.section}</span>
              </div>
              <div className="fgl-stat">
                <span className="fgl-stat-label">Block</span>
                <span className="fgl-stat-value">{grave.block}</span>
              </div>
              <div className="fgl-stat">
                <span className="fgl-stat-label">Lot</span>
                <span className="fgl-stat-value">{grave.lot}</span>
              </div>
              <div className="fgl-stat">
                <span className="fgl-stat-label">Type</span>
                <span className="fgl-stat-value">{grave.type}</span>
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="fam-container fgl-map-card">
            <div className="fgl-map-header">
              <span className="fgl-map-title">
                <i className="fas fa-map" style={{ color: "#3670AF", marginRight: "8px" }}></i> 
                Section {grave.section} — Block {grave.block}
              </span>
              <button className="fam-btn-primary">
                <i className="fas fa-location-arrow"></i> Get Directions
              </button>
            </div>

            <div className="fgl-map-wrap">
              {/* North indicator */}
              <div className="fgl-compass">
                <i className="fas fa-compass" style={{ marginBottom: "2px", fontSize: "1.2rem", color: "#d4af37" }}></i>
                <span>N</span>
              </div>

              {/* Entrance */}
              <div className="fgl-entrance">
                <span><i className="fas fa-arrow-left"></i> Entrance</span>
              </div>

              {/* Grid */}
              <div className="fgl-grid">
                {PLOTS.map((plot) => (
                  <div
                    key={plot}
                    className={`fgl-plot ${plot === grave.highlighted ? "fgl-plot--active" : ""}`}
                  >
                    {plot}
                  </div>
                ))}
              </div>

              {/* Road */}
              <div className="fgl-road">
                <span>Main Road <i className="fas fa-arrow-right"></i></span>
              </div>
            </div>

            {/* Legend */}
            <div className="fgl-legend-bar">
              <div className="fgl-legend">
                <div className="fgl-legend-item">
                  <span className="fgl-legend-dot fgl-legend-dot--active" />
                  <span>Your loved one's plot</span>
                </div>
                <div className="fgl-legend-item">
                  <span className="fgl-legend-dot" />
                  <span>Other plots</span>
                </div>
              </div>
              <p className="fgl-map-note">
                <i className="fas fa-info-circle"></i> Need assistance? Contact our staff at (044) 123-4567
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GraveLocation;