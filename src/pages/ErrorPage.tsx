import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="auth-page">
      <h1>Error 404: Not Found</h1>
      <p>Sorry, could not find the link.</p>
      <Link to='/'>Back to Homepage</Link>
    </div>
  );
}

export default ErrorPage;
