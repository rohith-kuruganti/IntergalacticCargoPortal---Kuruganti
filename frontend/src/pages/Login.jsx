import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <Link to="/signup">Create Account</Link>
    </div>
  );
}

export default Login;
