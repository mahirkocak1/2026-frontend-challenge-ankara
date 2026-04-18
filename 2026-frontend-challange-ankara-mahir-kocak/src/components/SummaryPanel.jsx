export default function SummaryPanel({ records }) {
  if (!records || records.length === 0) return null;

  const totalClues = records.length;

  const personCounts = records.reduce((acc, rec) => {
    const name = rec.person.trim();
    if (name !== "Unknown Person" && name.toLowerCase() !== "podo") {
      acc[name] = (acc[name] || 0) + 1;
    }
    return acc;
  }, {});

  const suspects = Object.keys(personCounts);
  const mostSuspicious = suspects.length > 0 
    ? suspects.reduce((a, b) => personCounts[a] > personCounts[b] ? a : b)
    : "No suspects yet";

  const lastSeenLocation = records[0]?.location || "Unknown";

  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
      gap: "15px", 
      marginBottom: "25px" 
    }}>
      <div style={panelStyle("#fef3c7", "#fcd34d")}>
        <div style={labelStyle("#92400e")}>MOST SUSPICIOUS</div>
        {/* Artık burada Podo değil, onunla en çok iletişimi olan kişi çıkacak */}
        <div style={valueStyle()}>{mostSuspicious}</div>
      </div>
      
      <div style={panelStyle("#dcfce7", "#86efac")}>
        <div style={labelStyle("#166534")}>TOTAL CLUES</div>
        <div style={valueStyle()}>{totalClues} Items</div>
      </div>
      
      <div style={panelStyle("#fee2e2", "#fecaca")}>
        <div style={labelStyle("#991b1b")}>LAST SEEN AT</div>
        <div style={valueStyle()}>{lastSeenLocation}</div>
      </div>
    </div>
  );
}

const panelStyle = (bg, border) => ({
  background: bg,
  padding: "15px",
  borderRadius: "12px",
  textAlign: "center",
  border: `1px solid ${border}`,
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
});

const labelStyle = (color) => ({
  fontSize: "11px",
  fontWeight: "bold",
  color: color,
  letterSpacing: "0.5px",
  marginBottom: "5px"
});

const valueStyle = () => ({
  fontSize: "16px",
  fontWeight: "bold",
  color: "#1f2937"
});