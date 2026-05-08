import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 3rem;
`;

const Header = styled.header`
  padding: 3rem 0;
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-weight: 800;
    font-size: 3rem;
    background: linear-gradient(to right, #a855f7, #6366f1, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
    letter-spacing: -0.05em;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    font-weight: 300;
  }
`;

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:8080/api/tasks', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskUpdated = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/${updatedTask.id}`, updatedTask);
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskDeleted = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContainer>
      <Navbar variant="dark" className="glass-card mb-4 border-0 rounded-0 border-bottom border-top-0 border-start-0 border-end-0 px-4 py-3">
        <Container fluid>
          <Navbar.Brand className="fw-bold d-flex align-items-center gap-3">
             <div style={{
               width: 36, height: 36, 
               borderRadius: '10px', 
               background: 'linear-gradient(135deg, #6366f1, #a855f7)',
               boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
             }}></div>
             <span style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>TaskFlow Pro</span>
          </Navbar.Brand>
          <div className="d-flex align-items-center gap-3">
            <span style={{ color: 'var(--text-secondary)' }}>Welcome, {user.username}</span>
            <Button variant="outline-danger" size="sm" onClick={logout}>Logout</Button>
          </div>
        </Container>
      </Navbar>

      <Container>
        <Header>
          <h1>Organize Your Workflow</h1>
          <p>Experience a premium, dynamic interface to manage your daily tasks.</p>
        </Header>

        <AnalyticsDashboard tasks={tasks} />

        <Row className="g-5">
          <Col lg={4}>
            <div className="glass-card p-4 p-xl-5 position-sticky" style={{ top: '2rem' }}>
              <h4 className="mb-4 fw-semibold" style={{ color: '#fff' }}>Create Task</h4>
              <TaskForm onTaskAdded={handleTaskAdded} />
            </div>
          </Col>
          <Col lg={8}>
            <div className="glass-card p-4 p-xl-5 min-vh-50">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-semibold m-0" style={{ color: '#fff' }}>Your Tasks</h4>
                <div className="badge bg-primary px-3 py-2 rounded-pill shadow-sm">
                  {tasks.length} Tasks
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
                </div>
              ) : (
                <TaskList 
                  tasks={tasks} 
                  onTaskUpdated={handleTaskUpdated} 
                  onTaskDeleted={handleTaskDeleted} 
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </AppContainer>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
