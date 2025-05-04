import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import ColorTheory from './pages/modules/ColorTheory';
import GestaltLaws from './pages/modules/GestaltLaws';
import NielsenPrinciples from './pages/modules/NielsenPrinciples';
import DataCollection from './pages/modules/DataCollection';
import Wireframes from './pages/modules/Wireframes';
import ColorActivity from './pages/activities/ColorActivity';
import GestaltActivity from './pages/activities/GestaltActivity';
import NielsenActivity from './pages/activities/NielsenActivity';
import DataCollectionActivity from './pages/activities/DataCollectionActivity';
import WireframeActivity from './pages/activities/WireframeActivity';
import Certificates from './pages/Certificates';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedModules = localStorage.getItem('completedModules');

    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }

    if (storedModules) {
      setCompletedModules(JSON.parse(storedModules));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = useCallback((username) => {
    setIsLoggedIn(true);
    setUser(username);
    localStorage.setItem('user', username);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setCompletedModules([]);
    localStorage.removeItem('user');
    localStorage.removeItem('completedModules');
  }, []);

  const completeModule = useCallback((moduleName) => {
    if (!completedModules.includes(moduleName)) {
      const newCompletedModules = [...completedModules, moduleName];
      setCompletedModules(newCompletedModules);
      localStorage.setItem('completedModules', JSON.stringify(newCompletedModules));
    }
  }, [completedModules]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-base-100">
        <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
            />

            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
              <Route path="/color-theory" element={<ColorTheory />} />
              <Route path="/gestalt-laws" element={<GestaltLaws />} />
              <Route path="/nielsen-principles" element={<NielsenPrinciples />} />
              <Route path="/data-collection" element={<DataCollection />} />
              <Route path="/wireframes" element={<Wireframes />} />

              <Route path="/color-activity" element={<ColorActivity user={user} completeModule={completeModule} />} />
              <Route path="/gestalt-activity" element={<GestaltActivity user={user} completeModule={completeModule} />} />
              <Route path="/nielsen-activity" element={<NielsenActivity user={user} completeModule={completeModule} />} />
              <Route path="/data-activity" element={<DataCollectionActivity user={user} completeModule={completeModule} />} />
              <Route path="/wireframe-activity" element={<WireframeActivity user={user} completeModule={completeModule} />} />

              <Route path="/certificates" element={<Certificates user={user} completedModules={completedModules} />} />
            </Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
