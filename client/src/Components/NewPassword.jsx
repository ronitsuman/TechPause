import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NewPassword = ({ setStep }) => {
  const [email, setEmail] = useState("");  
  const [newPassword, setNewPassword] = useState("");  
  const [confirmPassword, setConfirmPassword] = useState("");  // Confirm Password for validation
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Validate: Passwords should match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      
      const response = await axios.post("http://localhost:3000/api/reset-password", {
        email,
        newPassword  
      });

      toast.success(response.data.message || "Password changed successfully!");
      setStep(1); // Wapas Reset Step
      navigate("/auth?type=login");  //  Redirect to Login Page
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="ml-64 p-4">
      <h2 className="text-2xl font-bold">Set New Password</h2>
      <form onSubmit={handleSubmit}>
        
        {/* ✅ Email Field (Backend Demand ke according) */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 mt-2 w-full"
        />

        {/* ✅ New Password Field */}
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="border p-2 mt-2 w-full"
        />

        {/* ✅ Confirm Password Field */}
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border p-2 mt-2 w-full"
        />

        {/* ✅ Submit Button */}
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 mt-4"
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
