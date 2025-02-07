import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { isStrongPassword } from "validator";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.name || !formdata.email || !formdata.password || !formdata.role) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isStrongPassword(formdata.password)) {
      setError("Password must be strong! (Use uppercase, lowercase, number, and special character)");
      return;
    }

    try {
      const response = await fetch("http://localhost:7000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration Successful!");
        setError("");
        setformdata({ name: "", email: "", password: "", role: "" }); // Clear form

        // Navigate to home after successful registration
        navigate("/home");
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch (err) {
      setError("Something went wrong! Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h2 className="text-center">Register</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formdata.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formdata.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter a strong password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={formdata.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
