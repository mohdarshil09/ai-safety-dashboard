import React, { useState } from 'react';
import { Incident, SeverityLevel } from '../types/Incident';
import { mockIncidents } from '../data/mockIncidents';
import IncidentItem from './IncidentItem';
import IncidentForm from './IncidentForm';
import '../styles/IncidentDashboard.css';

const IncidentDashboard: React.FC = () => {
  const [inc, setInc] = useState<Incident[]>(mockIncidents);
  const [sevFilter, setSevFilter] = useState<'All' | SeverityLevel>('All');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [showForm, setShowForm] = useState(false);

  const filteredInc = inc.filter((i) => sevFilter === 'All' || i.severity === sevFilter);

  const sortedInc = [...filteredInc].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sort === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handleAddInc = (newInc: Omit<Incident, 'id'>) => {
    const incWithId: Incident = {
      ...newInc,
      id: inc.length > 0 ? Math.max(...inc.map((i) => i.id)) + 1 : 1,
    };

    setInc([...inc, incWithId]);
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

      {showForm && <IncidentForm onSubmit={handleAddInc} />}

      <div className="dashboard-controls">
        <div className="filter-control">
          <label htmlFor="sev-filter">Filter by Severity:</label>
          <select
            id="sev-filter"
            value={sevFilter}
            onChange={(e) => setSevFilter(e.target.value as 'All' | SeverityLevel)}
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
            value={sort}
            onChange={(e) => setSort(e.target.value as 'newest' | 'oldest')}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="incidents-list">
        {sortedInc.length > 0 ? (
          sortedInc.map((i) => <IncidentItem key={i.id} incident={i} />)
        ) : (
          <p className="no-incidents">No incidents found matching the current filters.</p>
        )}
      </div>
    </div>
  );
};

export default IncidentDashboard; 
