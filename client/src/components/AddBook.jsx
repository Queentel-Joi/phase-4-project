import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddBook() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
    description: Yup.string(),
  });

  const handleSubmit = (values) => {
    fetch('/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(r => r.json())
      .then(() => navigate('/books'));
  };

  return (
    <div className="card">
      <h2>Add Book</h2>
      <Formik
        initialValues={{ title: '', author: '', description: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label>Title</label>
            <Field name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>Author</label>
            <Field name="author" />
            <ErrorMessage name="author" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <Field name="description" as="textarea" />
          </div>
          <button type="submit" className="btn">Add Book</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddBook;