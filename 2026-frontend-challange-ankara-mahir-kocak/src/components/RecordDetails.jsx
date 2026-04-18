import '../styles/RecordDetails.css';
export default function RecordDetails({ record, handleGoBack }) {
  const coordAnswer = Object.values(record.rawData.answers).find(
    (ans) => ans.text && ans.text.toLowerCase().includes("coordinate")
  )?.answer;

  return (
    <div>
      <button className="back-button" onClick={handleGoBack}>
        ⬅ Go back
      </button>

      <div className="detail-container">
        <h2 className="detail-title">{record.typeIcon} {record.typeName} Details</h2>
        <div className="detail-meta">
          <span><strong>System ID:</strong> {record.rawData.id}</span>
          <span className="meta-item-right"><strong>Created At:</strong> {record.rawData.created_at}</span>
        </div>
        
        <h3 className="section-title">Submission Data:</h3>
        <ul className="raw-data-list">
          {Object.values(record.rawData.answers)
            .filter(ans => ans.answer && ans.type !== "control_button" && ans.type !== "control_head")
            .map((ans, idx) => (
                <li key={idx} className="raw-data-item">
                  <span className="raw-label">{ans.text}</span>
                  <strong className="raw-value">{ans.answer}</strong>
                </li>
            ))
          }
        </ul>

        {coordAnswer && (
          <div className="map-section">
            <h3 className="section-title spaced">📍 Investigation Map</h3>
            <div className="map-wrapper">
              <iframe
                width="100%"
                height="300"
                style={{ border: 0 }} 
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${coordAnswer}&z=15&output=embed`}
              ></iframe>
            </div>
            <p className="map-caption">
               Coordinates found: {coordAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}