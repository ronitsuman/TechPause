import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  // 🔹 Form Data State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 Regex Patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // ✅ **Validation Function (Now Only Uses Toast)**
  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.warning("⚠️ Email is required!");
      return false;
    } else if (!emailRegex.test(formData.email)) {
      toast.error("❌ Invalid email format!");
      return false;
    }

    if (!formData.password.trim()) {
      toast.warning("⚠️ Password is required!");
      return false;
    } else if (!passwordRegex.test(formData.password)) {
      toast.error("❌ Password must be at least 6 characters long, include 1 letter, 1 number & 1 special character!");
      return false;
    }

    return true; // ✅ Form is valid
  };

  // ✅ **Handle Form Submission**
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.warning("⚠️ Please correct the errors and try again.");
      return;
    }

    setIsSubmitting(true); // ✅ Disable button while submitting

    try {
      // ✅ **Send API request to correct login route**
      const response = await axios.post("http://localhost:3000/api/login", formData);

      // ✅ **Success Response Handling**
      toast.success("✅ Login Successful!");
      console.log("Response from API:", response.data);

      // ✅ **Reset Form after successful login**
      setFormData({ email: "", password: "" });

    } catch (error) {
      // ❌ **Handle API Errors**
      let errorMessage = "Something went wrong!";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      toast.error("❌ " + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="p-4 w-[370px] md:h-[550px] md:w-[397px] md:gap-2 md:p-6 md:item-center md:justify-center md:flex md:flex-col text-black">
      <h1 className="text-3xl">Welcome Back!</h1>
      <p>Pause screens, live fully with <strong>TechPause</strong></p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 🔹 Email Input */}
        <div className="md:flex md:flex-col gap-2 md:w-[397px] h-[76px]">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="md:h-[76px]  placeholder:p-6 bg-white"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
         
        </div>

        {/* 🔹 Password Input */}
        <div className="md:flex md:flex-col gap-2 md:w-[397px] h-[76px]">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="md:h-[76px]  placeholder:p-6 bg-white"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          
        </div>

        {/* 🔹 Remember Me & Forgot Password */}
        <div className="flex-row sm:flex justify-between w-[397px]">
          <div className="flex gap-1">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div>
            <a className="text-blue-600" href="/forgetPassword">Forgot Password?</a>
          </div>
        </div>

        <button type="submit"  className={`bg-blue-500 w-[280px] sm:w-[397px] text-white rounded-2xl p-2 ${
    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
  }`}
  disabled={isSubmitting} > {isSubmitting ? "Processing..." : "Sign In"}</button>

        {/* 🔹 OR Section */}
       
      </form>
    </div>
  );
};

export default Login;
