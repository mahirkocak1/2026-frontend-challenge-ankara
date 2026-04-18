export default function Record({ record }) {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "15px", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
        <span style={{ fontWeight: "bold", color: "#4f46e5" }}>{record.typeIcon} {record.typeName}</span>
        <span style={{ color: "#6b7280", fontSize: "14px" }}>🕒 {record.time}</span>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
        <div><strong>👤 Person:</strong> {record.person}</div>
        <div><strong>📌 Location:</strong> {record.location}</div>
      </div>
      
      <div style={{ backgroundColor: "#f3f4f6", padding: "10px", borderRadius: "6px", fontStyle: "italic" }}>
        "{record.details}"
      </div>
    </div>
  );
}