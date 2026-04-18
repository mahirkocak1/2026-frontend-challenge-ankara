export default function RecordDetail(props) {
  const coordAnswer = Object.values(props.record.rawData.answers).find(
    (ans) => ans.text && ans.text.toLowerCase().includes("coordinate")
  )?.answer;

  return (
    <div>
      <button 
        onClick={props.handleGoBack}
        style={{ padding: "10px 15px", marginBottom: "20px", cursor: "pointer", background: "#f3f4f6", border: "none", borderRadius: "8px", fontWeight: "bold" }}
      >
        ⬅ Go back
      </button>

      <div style={{ border: "2px solid #4f46e5", padding: "20px", borderRadius: "12px", background: "#fff" }}>
        <h2 style={{ marginTop: 0 }}>{props.record.typeIcon} {props.record.typeName} Details</h2>
        <div style={{ fontSize: "13px", color: "#666", marginBottom: "20px" }}>
          <span><strong>System ID:</strong> {props.record.rawData.id}</span>
          <span style={{ marginLeft: "20px" }}><strong>Created At:</strong> {props.record.rawData.created_at}</span>
        </div>
        
        <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Submission Data:</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {Object.values(props.record.rawData.answers)
            .filter(ans => ans.answer && ans.type !== "control_button" && ans.type !== "control_head")
            .map((ans, idx) => (
                <li key={idx} style={{ marginBottom: "10px", background: "#f9fafb", padding: "12px", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
                  <span style={{ color: "#4f46e5", display: "block", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "4px" }}>
                    {ans.text}
                  </span>
                  <strong style={{ fontSize: "15px", color: "#1f2937" }}>{ans.answer}</strong>
                </li>
            ))
          }
        </ul>

        {coordAnswer && (
          <div style={{ marginTop: "25px" }}>
            <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>📍 Investigation Map</h3>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #ddd", marginTop: "10px" }}>
              <iframe
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${coordAnswer}&z=15&output=embed`}
              ></iframe>
            </div>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "8px", textAlign: "center" }}>
              Precise coordinates found: {coordAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}