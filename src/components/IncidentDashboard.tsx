import React, { useState } from 'react';
import { Incident, SeverityLevel } from '../types/Incident';
import { mockIncidents } from '../data/mockIncidents';
import IncidentItem from './IncidentItem';
import IncidentForm from './IncidentForm';
import '../styles/IncidentDashboard.css';

const IncidentDashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [severityFilter, setSeverityFilter] = useState<'All' | SeverityLevel>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [showForm, setShowForm] = useState(false);

  const filteredIncidents = incidents.filter(incident => 
    severityFilter === 'All' || incident.severity === severityFilter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handleAddIncident = (newIncident: Omit<Incident, 'id'>) => {
    const incidentWithId: Incident = {
      ...newIncident,
      id: incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1
    };
    
    setIncidents([...incidents, incidentWithId]);
    setShowForm(false);
  };

  return (
    <div className="incident-dashboard">
      <header className="dashboard-header">
        <h1>AI Safety Incident Dashboard</h1>
        <button 
          className="toggle-form-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Report New Incident'}
        </button>
      </header>

      {showForm && (
        <IncidentForm onSubmit={handleAddIncident} />
      )}

      <div className="dashboard-controls">
        <div className="filter-control">
          <label htmlFor="severity-filter">Filter by Severity:</label>
          <select
            id="severity-filter"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as 'All' | SeverityLevel)}
          >
            <option value="All">All Severities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="sort-control">
          <label htmlFor="date-sort">Sort by Date:</label>
          <select
            id="date-sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="incidents-list">
        {sortedIncidents.length > 0 ? (
          sortedIncidents.map(incident => (
            <IncidentItem key={incident.id} incident={incident} />
          ))
        ) : (
          <p className="no-incidents">No incidents found matching the current filters.</p>
        )}
      </div>
    </div>
  );
};

export default IncidentDashboard; 