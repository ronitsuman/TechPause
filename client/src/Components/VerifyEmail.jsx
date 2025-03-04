import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const VerifyEmail = ({ setStep }) => {
   const {email,setEmail}=useAuth()  // ✅ User Email store karne ke liye state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/check-email-otp", { email});

      toast.success("OTP sent successfully!");
    
      setStep(2);  // ✅ Step 2 Unlock
      navigate("/forgetPassword/enter-otp");  // ✅ OTP Page par le jao
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="ml-6 mt-24 backdrop-blur-2xl bg-[#fcebf3] p-4 md:ml-20 md:rounded-2xl md:p-10 md:w-full md:bg-white lg:ml-44 lg:rounded-2xl lg:p-10 lg:w-full lg:bg-white  ">
      <h2 className="text-2xl font-bold text-center  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Verify Your Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 mt-12 w-full"
        />
        <button 
          type="submit" 
          className="border  p-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border text-white hover:opacity-80 mt-12"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email & Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
