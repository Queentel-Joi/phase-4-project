import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Books from './components/Books';
import BookDetail from './components/BookDetail';
import AddBook from './components/AddBook';
import "./App.css";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/check_session')
      .then(r => r.json())
      .then(data => {
        if (data.id) setUser(data);
      });
  }, []);

  const handleLogout = () => {
    fetch('/logout', { method: 'POST' })
      .then(() => setUser(null))
      .then(() => window.location.href = '/');
  };

  return (
    <Router>
      <NavBar user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail user={user} />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;