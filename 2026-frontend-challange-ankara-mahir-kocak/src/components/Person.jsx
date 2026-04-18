import Record from './Record'

export default function Person(props) {
  return (
    <div>
      <button 
        onClick={props.handleGoBack}
        style={{ padding: "10px 15px", marginBottom: "20px", cursor: "pointer", background: "#f3f4f6", border: "none", borderRadius: "8px", fontWeight: "bold" }}
      >
        ⬅ Go back to home page
      </button>

      <div style={{ background: "#eff6ff", padding: "20px", borderRadius: "12px", border: "1px solid #bfdbfe", marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 10px 0", color: "#1e3a8a" }}>📁 Suspect / Witness Profile: {props.personName}</h2>
        <p style={{ margin: 0, color: "#3b82f6" }}>Found <strong>{props.records.length}</strong> linked interactions.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {props.records.map(record => (
          <Record 
            key={record.id} 
            record={record} 
            onSelectRecord={props.onSelectRecord} 
          />
        ))}
      </div>
    </div>
  ) 
}