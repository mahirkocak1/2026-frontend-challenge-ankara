export default function RecordDetails(props) {
  return (
    <div>
      <button 
        onClick={props.handleGoBack}
        style={{ padding: "10px 15px", marginBottom: "20px", cursor: "pointer", background: "#f3f4f6", border: "none", borderRadius: "8px", fontWeight: "bold" }}
      >
        ⬅ Go back
      </button>

      <div style={{ border: "2px solid #4f46e5", padding: "20px", borderRadius: "12px", background: "#fff" }}>
        <h2>{props.record.typeIcon} {props.record.typeName} Details</h2>
        <p><strong>System ID:</strong> {props.record.rawData.id}</p>
        <p><strong>Created At:</strong> {props.record.rawData.created_at}</p>
        
        <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginTop: "20px" }}>Raw Submission Data:</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {Object.values(props.record.rawData.answers).map((ans, idx) => (
              <li key={idx} style={{ marginBottom: "10px", background: "#f9fafb", padding: "10px", borderRadius: "6px" }}>
                <span style={{ color: "#6b7280", display: "block", fontSize: "12px" }}>{ans.text}</span>
                <strong>{ans.answer || "N/A"}</strong>
              </li>
          ))}
        </ul>
      </div>
    </div>
  )
}