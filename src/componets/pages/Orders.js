import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const TrackingProgress = () => {
  const [status, setStatus] = useState("In Transit"); // Change this to test different statuses
  const [orders, setOrders] = useState([
    { id: 1, status: "Processing" },
    { id: 2, status: "Shipped" },
    { id: 3, status: "In Transit" },
    { id: 4, status: "Delivered" },
    { id: 5, status: "Processing" },
  ]);

  const steps = [
    { label: "Processing", icon: "bi bi-clipboard-check" },
    { label: "Shipped", icon: "bi bi-box-seam" },
    { label: "In Transit", icon: "bi bi-truck" },
    { label: "Delivered", icon: "bi bi-house-door" },
  ];

  // Function to determine the class for the step based on the current status
  const getStatusClass = (step) => {
    const currentIndex = steps.findIndex((s) => s.label === status);
    const stepIndex = steps.findIndex((s) => s.label === step);
    return stepIndex <= currentIndex ? "bg-success text-white" : "bg-secondary text-light";
  };

  // Function to count orders by status
  const getOrderCountByStatus = (status) => {
    return orders.filter((order) => order.status === status).length;
  };

  // Function to animate the icon based on status
  const getIconAnimation = (step) => {
    if (step === status) {
      switch (step) {
        case "Processing":
          return "animate-bounce"; // Bounce animation for processing
        case "Shipped":
          return "animate-pulse"; // Pulse animation for shipped
        case "In Transit":
          return "animate-move"; // Custom move animation for in transit
        case "Delivered":
          return "animate-spin"; // Spin animation for delivered
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <div className="container mt-5">
      {/* Tracking Progress Bar */}
      <div className="d-flex justify-content-center">
        <div className="d-flex align-items-center">
          {steps.map((step, index) => (
            <div key={index} className="d-flex align-items-center">
              <div className="text-center">
                {/* Circle Icon with Animation */}
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center ${getStatusClass(
                    step.label
                  )}`}
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className={`${step.icon} fs-4 ${getIconAnimation(step.label)}`}></i>
                </div>
                <p className="mt-2 small">{step.label}</p>
              </div>

              {/* Line Connector */}
              {index !== steps.length - 1 && (
                <div
                  className={`flex-grow-1 mx-2 ${getStatusClass(steps[index + 1].label)}`}
                  style={{ height: "6px", width: "50px" }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order History Table */}
      <div className="mt-5">
        <h3>Order History</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Status Count */}
      <div className="mt-4">
        <h3>Order Status Count</h3>
        <ul className="list-group">
          {steps.map((step, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {step.label}
              <span className="badge bg-primary rounded-pill">{getOrderCountByStatus(step.label)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackingProgress;