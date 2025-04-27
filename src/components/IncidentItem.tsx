import React, { useState } from 'react';
import { Incident } from '../types/Incident';
import '../styles/IncidentItem.css';

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'severity-low';
      case 'Medium':
        return 'severity-medium';
      case 'High':
        return 'severity-high';
      default:
        return '';
    }
  };

  return (
    <div className="incident-item">
      <div className="incident-header">
        <h3 className="incident-title">{incident.title}</h3>
        <div className="incident-meta">
          <span className={`incident-severity ${getSeverityClass(incident.severity)}`}>
            {incident.severity}
          </span>
          <span className="incident-date">{formatDate(incident.reported_at)}</span>
        </div>
      </div>
      <div className="incident-actions">
        <button 
          className="view-details-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>
      {expanded && (
        <div className="incident-description">
          <p>{incident.description}</p>
        </div>
      )}
    </div>
  );
};

export default IncidentItem; 