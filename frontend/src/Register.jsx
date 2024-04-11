import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8000/contacts", formData)
        .then((res) => {
          console.log(res.data);
        });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log(formData);
  };

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="input-field">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Enter your Name</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <label>Enter your Message</label>
          </div>
          {/* <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div> */}
          <button type="submit">Register</button>
          {/* <div className="register">
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
