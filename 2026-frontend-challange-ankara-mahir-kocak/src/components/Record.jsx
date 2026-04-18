import React from 'react';

export default function Record({ record, onSelectPerson, onSelectRecord }) {
  return (
    <div className="record-card">
      <div className="record-header">
        <span className="record-type">{record.typeIcon} {record.typeName}</span>
        <span className="record-time">🕒 {record.time}</span>
      </div>
      
      <div className="record-grid">
        <div>
          <strong>👤 Person:</strong>{' '}
          <span 
            className="person-link"
            onClick={(e) => { e.stopPropagation(); onSelectPerson && onSelectPerson(record.person); }}
            title="Kişi profiline git"
          >
            {record.person}
          </span>
        </div>
        <div><strong>📌 Location:</strong> {record.location}</div>
      </div>
      
      <div className="record-details">
        "{record.details}"
      </div>

      {onSelectRecord && (
        <button 
          className="view-info-btn"
          onClick={() => onSelectRecord(record)}
        >
          📄 View Full Record Info
        </button>
      )}
    </div>
  );
}