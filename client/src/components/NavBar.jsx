import { Link } from 'react-router-dom';

function NavBar({ user, onLogout }) {
  return (
    <nav className="top-nav">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      {user ? (
        <>
          <Link to="/books">Books</Link>
          <Link to="/add-book">Add Book</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : null}
    </nav>
  );
}

export default NavBar;