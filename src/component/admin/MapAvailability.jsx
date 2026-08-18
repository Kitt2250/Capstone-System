import { useState } from "react";
import "./admin-navigation.css";

// A mock data representation of the cemetery map sections
const MOCK_SECTIONS = [
  { id: "A", name: "Section A (Lawn)", total: 100, occupied: 80, reserved: 10, available: 10 },
  { id: "B", name: "Section B (Lawn)", total: 100, occupied: 60, reserved: 20, available: 20 },
  { id: "C", name: "Section C (Mausoleum)", total: 50, occupied: 45, reserved: 2, available: 3 },
  { id: "D", name: "Section D (Columbarium)", total: 200, occupied: 150, reserved: 10, available: 40 },
];

function MapAvailability() {
  const [activeSection, setActiveSection] = useState(MOCK_SECTIONS[0]);

  // Generate a mock grid based on the active section's stats
  const generateGrid = () => {
    let plots = [];
    for (let i = 0; i < activeSection.occupied; i++) plots.push("occupied");
    for (let i = 0; i < activeSection.reserved; i++) plots.push("reserved");
    for (let i = 0; i < activeSection.available; i++) plots.push("available");
    return plots;
  };

  const grid = generateGrid();

  return (
    <div className="admin-page-wrapper" style={{ padding: "2rem" }}>
      <div className="admin-header-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", color: "#1a3d5c", marginBottom: "0.5rem" }}>
            <i className="fas fa-map" style={{ color: "#3670AF", marginRight: "10px" }}></i>
            Map Availability
          </h1>
          <p style={{ color: "#6a8aaa" }}>Manage and view the real-time availability of cemetery plots.</p>
        </div>
        <div>
          <button className="admin-btn-primary" style={{ padding: "0.6rem 1.2rem", background: "#3670AF", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
            <i className="fas fa-print" style={{ marginRight: "8px" }}></i> Print Map
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Sidebar for Sections */}
        <div style={{ width: "280px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "1.1rem", color: "#1a3d5c", marginBottom: "1rem" }}>Sections</h3>
            {MOCK_SECTIONS.map((sec) => (
              <div 
                key={sec.id}
                onClick={() => setActiveSection(sec)}
                style={{
                  padding: "1rem",
                  borderRadius: "8px",
                  border: `1px solid ${activeSection.id === sec.id ? "#3670AF" : "#e8edf4"}`,
                  background: activeSection.id === sec.id ? "#f0f7ff" : "white",
                  cursor: "pointer",
                  marginBottom: "0.8rem",
                  transition: "0.2s"
                }}
              >
                <div style={{ fontWeight: "600", color: "#1a3d5c", marginBottom: "4px" }}>{sec.name}</div>
                <div style={{ fontSize: "0.85rem", color: "#6a8aaa" }}>{sec.available} available plots</div>
              </div>
            ))}
          </div>

          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "1.1rem", color: "#1a3d5c", marginBottom: "1rem" }}>Legend</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <div style={{ width: 16, height: 16, background: "#e8edf4", borderRadius: "4px", border: "1px solid #cbd5e1" }}></div>
              <span style={{ fontSize: "0.9rem", color: "#475569" }}>Available</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <div style={{ width: 16, height: 16, background: "#fef08a", borderRadius: "4px", border: "1px solid #fde047" }}></div>
              <span style={{ fontSize: "0.9rem", color: "#475569" }}>Reserved</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: 16, height: 16, background: "#fca5a5", borderRadius: "4px", border: "1px solid #f87171" }}></div>
              <span style={{ fontSize: "0.9rem", color: "#475569" }}>Occupied</span>
            </div>
          </div>
        </div>

        {/* Map Grid Area */}
        <div style={{ flex: 1, background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.4rem", color: "#1a3d5c" }}>Interactive Map: {activeSection.name}</h2>
            <div style={{ fontSize: "0.95rem", color: "#6a8aaa" }}>
              Total Capacity: <strong>{activeSection.total}</strong>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(35px, 1fr))",
            gap: "8px",
            background: "#f8fafc",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #e8edf4",
            minHeight: "400px"
          }}>
            {grid.map((status, index) => {
              let bg = "#e8edf4";
              let border = "#cbd5e1";
              if (status === "occupied") {
                bg = "#fca5a5";
                border = "#f87171";
              } else if (status === "reserved") {
                bg = "#fef08a";
                border = "#fde047";
              }

              return (
                <div 
                  key={index} 
                  title={`Plot ${activeSection.id}-${101 + index} (${status})`}
                  style={{
                    aspectRatio: "1",
                    background: bg,
                    border: `1px solid ${border}`,
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                />
              );
            })}
          </div>
          
          <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#94a3b8", textAlign: "center" }}>
            Hover over a plot to see details. Click a plot to view or assign ownership records.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MapAvailability;
