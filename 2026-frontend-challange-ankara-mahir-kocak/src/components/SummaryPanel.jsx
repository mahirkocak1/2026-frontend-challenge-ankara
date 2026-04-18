import '../styles/SummaryPanel.css';

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
  const mostSuspicious = suspects.length > 0 ? suspects.reduce((a, b) => personCounts[a] > personCounts[b] ? a : b) : "None";
  const lastSeenLocation = records[0]?.location || "Unknown";

  return (
    <div className="summary-grid">
      <div className="summary-card card-warning">
        <div className="summary-label" style={{color: "#92400e"}}>MOST SUSPICIOUS</div>
        <div className="summary-value">{mostSuspicious}</div>
      </div>
      <div className="summary-card card-success">
        <div className="summary-label" style={{color: "#166534"}}>TOTAL CLUES</div>
        <div className="summary-value">{totalClues} Items</div>
      </div>
      <div className="summary-card card-danger">
        <div className="summary-label" style={{color: "#991b1b"}}>LAST SEEN AT</div>
        <div className="summary-value">{lastSeenLocation}</div>
      </div>
    </div>
  );
}