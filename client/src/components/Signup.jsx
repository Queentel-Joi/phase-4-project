import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.id) {
          setUser(data);
          navigate('/books');
        } else {
          setError(data.error || 'Signup failed');
        }
      });
  };

  return (
    <div className="card">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Signup</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Signup;