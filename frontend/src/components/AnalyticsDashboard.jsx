import React, { useState, useEffect } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

const DashboardContainer = styled.div`
  background: var(--surface-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }

  h3 {
    font-size: 2rem;
    margin: 0;
    font-weight: 700;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const WarningBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border-left: 4px solid #ef4444;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1.5rem;
  
  h4 {
    color: #ef4444;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
  }
  ul {
    margin: 0;
    padding-left: 1.5rem;
    color: var(--text-primary);
  }
`;

function AnalyticsDashboard({ tasks }) {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [tasks]); // Re-fetch whenever the tasks list changes!

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  if (!analytics) return null;

  return (
    <DashboardContainer>
      <h4 className="mb-4" style={{ fontWeight: 600 }}>Analytics Overview</h4>
      <Row className="g-3 mb-4">
        <Col xs={6} md={3}>
          <StatCard>
            <h3 style={{ color: 'var(--primary-color)' }}>{analytics.totalTasks}</h3>
            <p>Total Tasks</p>
          </StatCard>
        </Col>
        <Col xs={6} md={3}>
          <StatCard>
            <h3 style={{ color: '#10b981' }}>{analytics.statusCounts?.Completed || 0}</h3>
            <p>Completed</p>
          </StatCard>
        </Col>
        <Col xs={6} md={3}>
          <StatCard>
            <h3 style={{ color: '#f59e0b' }}>{analytics.statusCounts?.['In Progress'] || 0}</h3>
            <p>In Progress</p>
          </StatCard>
        </Col>
        <Col xs={6} md={3}>
          <StatCard>
            <h3 style={{ color: '#6366f1' }}>{analytics.statusCounts?.Pending || 0}</h3>
            <p>Pending</p>
          </StatCard>
        </Col>
      </Row>

      <div>
        <div className="d-flex justify-content-between mb-2">
          <span style={{ color: 'var(--text-secondary)' }}>Completion Rate</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            {analytics.completionRate.toFixed(1)}%
          </span>
        </div>
        <ProgressBar 
          now={analytics.completionRate} 
          variant="success" 
          style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)' }}
        />
      </div>

      {analytics.highPriorityPending && analytics.highPriorityPending.length > 0 && (
        <WarningBox>
          <h4>⚠️ Action Required: High Priority Pending</h4>
          <ul>
            {analytics.highPriorityPending.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        </WarningBox>
      )}
    </DashboardContainer>
  );
}

export default AnalyticsDashboard;
