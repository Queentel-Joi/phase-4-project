import { Link } from 'react-router-dom';

function NavBar({ user, onLogout }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/books">Books</Link>
          <Link to="/add-book">Add Book</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;