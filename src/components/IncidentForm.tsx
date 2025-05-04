import React, { useState } from 'react';
import { Incident, SeverityLevel } from '../types/Incident';
import '../styles/IncidentForm.css';

interface FormProps {
  onSubmit: (inc: Omit<Incident, 'id'>) => void;
}

const IncidentForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [ttl, setTtl] = useState('');
  const [desc, setDesc] = useState('');
  const [sev, setSev] = useState<SeverityLevel>('Medium');
  const [err, setErr] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErr: { [key: string]: string } = {};

    if (!ttl.trim()) {
      newErr.ttl = 'Title is required';
    }

    if (!desc.trim()) {
      newErr.desc = 'Description is required';
    }

    setErr(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const newInc: Omit<Incident, 'id'> = {
        title: ttl,
        description: desc,
        severity: sev,
        reported_at: new Date().toISOString(),
      };

      onSubmit(newInc);

      // Reset form
      setTtl('');
      setDesc('');
      setSev('Medium');
      setErr({});
    }
  };

  return (
    <div className="incident-form-container">
      <h2>Report New Incident</h2>
      <form onSubmit={handleSubmit} className="incident-form">
        <div className="form-group">
          <label htmlFor="ttl">Title:</label>
          <input
            type="text"
            id="ttl"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
            className={err.ttl ? 'error' : ''}
          />
          {err.ttl && <span className="error-message">{err.ttl}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className={err.desc ? 'error' : ''}
          />
          {err.desc && <span className="error-message">{err.desc}</span>}
        </div>

        <div className="form-group">
          <label>Severity:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="sev"
                value="Low"
                checked={sev === 'Low'}
                onChange={() => setSev('Low')}
              />
              Low
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sev"
                value="Medium"
                checked={sev === 'Medium'}
                onChange={() => setSev('Medium')}
              />
              Medium
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sev"
                value="High"
                checked={sev === 'High'}
                onChange={() => setSev('High')}
              />
              High
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit Incident</button>
      </form>
    </div>
  );
};

export default IncidentForm;
