import React from "react";
import { useNavigate } from "react-router-dom";
import { baseApiInstance } from "../apis";
/**
 *
 * CS-5356-TODO Login Page
 *
 * We're going to use a "mock" login system, so
 * all we need the user to provide is a username.
 *
 * Once they've filled in the username, they should
 * click Submit, at which point, we log the user in and
 * redirect them
 */
const LoginPage = (props) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * CS-5356-TODO
     *
     * Log the user in. Grab the value from the username input element
     * and send it in an object to POST /api/login
     *
     * When it responds with a 200 OK, call `props.onLogin()` to have App
     * update your sign-in status, and then call `navigate('/instructor-home')`
     * to go to the /instructor-home page
     */
    const data = { username: e.target.username.value };
    baseApiInstance.post("login", data).then((response) => {
      props.onLogin();
      navigate("/instructor-home");
    });
  };

  return (
    <section className="hero">
      <div className="box mt-5 container hero-body">
        <h1 className="title">Login to Class Questions</h1>
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className="input mb-3"
            type="text"
            name="username"
            placeholder="Username"
            required
          />
          <label className="label" htmlFor="password">
            Password
          </label>
          <div>Anonymous access while in prototype mode</div>
          <div className="control mt-2">
            <input className="button is-dark" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
