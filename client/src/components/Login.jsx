import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
  });

  const handleSubmit = (values) => {
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(r => r.json())
      .then(data => {
        if (data.id) {
          setUser(data);
          navigate('/books');
        } else {
          setError('User not found');
        }
      });
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <Formik
        initialValues={{ username: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label>Username</label>
            <Field name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <button type="submit" className="btn">Login</button>
        </Form>
      </Formik>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;