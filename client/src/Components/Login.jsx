import { useState } from "react";

const Login = () => {
  // 🔹 Form Data State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 🔹 Error Messages State
  const [errors, setErrors] = useState({});

  // 🔹 Regex Patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // ✅ **Validation Function**
  const validateForm = () => {
    let newErrors = {};

    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format!";
    if (!passwordRegex.test(formData.password)) newErrors.password = "Min 6 chars, 1 letter, 1 number & 1 special char!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ **Handle Form Submission**
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("✅ Login Successful:", formData);

      // 🔹 **Future API Integration**
      /*
      try {
        const response = await fetch("https://your-api-endpoint.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log("Response from API:", data);
      } catch (error) {
        console.error("Error while logging in:", error);
      }
      */
    } else {
      console.log("❌ Validation Errors:", errors);
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
          <p className="text-red-500">{errors.email}</p>
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
          <p className="text-red-500">{errors.password}</p>
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

        <button type="submit" className="bg-blue-500  w-[280px] sm:w-[397px] text-white rounded-2xl p-2">Sign In</button>

        {/* 🔹 OR Section */}
        <div className="invisible md:visible w-[397px] mt-[-30px]">
          <div className="flex items-center w-full max-w-xl my-4">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-2 text-gray-500 font-semibold">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          {/* 🔹 Social Login Buttons */}
          <div className="flex item-center gap-4 justify-center mt-[-16px]">
            <button className="border w-[116px] bg-white flex item-center justify-center border-gray-300 p-2 rounded-lg shadow-sm">
              <img src="google.png" className="w-6 h-6" alt="Google"/>
            </button>
            <button className="border w-[116px] bg-white flex item-center justify-center border-gray-300 p-2 rounded-lg shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" className="w-6 h-6" alt="Facebook"/>
            </button>
            <button className="border w-[116px] bg-white flex item-center justify-center border-gray-300 p-2 rounded-lg shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-6 h-6" alt="Apple"/>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
