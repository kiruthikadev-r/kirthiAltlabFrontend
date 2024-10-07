import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketsList from './components/TicketsList';
import TicketDetails from './components/TicketDetails';
import CustomersList from './components/CustomersList';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AddUser from './components/AddUser';
import AddTickets from './components/AddTickets';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/tickets" element={<TicketsList />} /> */}
            <Route 
              path="/tickets" 
              element={<ProtectedRoute><TicketsList /></ProtectedRoute>} 
            />
            <Route 
              path="/tickets/:id" 
              element={<ProtectedRoute><TicketDetails /></ProtectedRoute>} 
            />
            <Route 
              path="/customers" 
              element={<ProtectedRoute><CustomersList /></ProtectedRoute>} 
            />
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/add-user" 
              element={<ProtectedRoute><AddUser /></ProtectedRoute>} 
            />
            <Route 
              path="/add-tickets" 
              element={<ProtectedRoute><AddTickets /></ProtectedRoute>} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
