import React, { useState } from 'react';
import { Incident, SeverityLevel } from '../types/Incident';
import '../styles/IncidentForm.css';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id'>) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('Medium');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const newIncident: Omit<Incident, 'id'> = {
        title,
        description,
        severity,
        reported_at: new Date().toISOString()
      };
      
      onSubmit(newIncident);
      
      // Reset form
      setTitle('');
      setDescription('');
      setSeverity('Medium');
      setErrors({});
    }
  };

  return (
    <div className="incident-form-container">
      <h2>Report New Incident</h2>
      <form onSubmit={handleSubmit} className="incident-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        
        <div className="form-group">
          <label>Severity:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="severity"
                value="Low"
                checked={severity === 'Low'}
                onChange={() => setSeverity('Low')}
              />
              Low
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="severity"
                value="Medium"
                checked={severity === 'Medium'}
                onChange={() => setSeverity('Medium')}
              />
              Medium
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="severity"
                value="High"
                checked={severity === 'High'}
                onChange={() => setSeverity('High')}
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