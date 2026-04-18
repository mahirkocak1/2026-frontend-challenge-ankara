import Record from './Record'

export default function Person({ personName, records, handleGoBack, onSelectRecord }) {
  return (
    <div>
      <button className="back-button" onClick={handleGoBack}>⬅ Back to Dashboard</button>
      <div className="profile-card">
        <h2 style={{ margin: 0, color: "#1e3a8a" }}>📁 Suspect Profile: {personName}</h2>
        <p style={{ margin: 0, color: "#3b82f6" }}>Found <strong>{records.length}</strong> linked interactions.</p>
      </div>
      <div className="record-list">
        {records.map(record => (
          <Record key={record.id} record={record} onSelectRecord={onSelectRecord} />
        ))}
      </div>
    </div>
  );
}