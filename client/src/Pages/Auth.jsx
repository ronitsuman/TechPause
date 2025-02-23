import { motion } from "framer-motion";
import { useState } from "react";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";

const Auth = () => {
  // State to track whether user is on the login page or sign-up page
  const [isLogin, setIsLogin] = useState(true);

  // Function to switch between login and sign-up pages
  const switchPages = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      {/* Main container for the authentication box */}
      <motion.div 
        className={`sm:h-[600px] relative bg-gray-800 rounded-lg shadow-lg overflow-hidden flex w-full max-w-[1280px] lg:max-h-[1032px] transition-all duration-500 ${isLogin ? "flex-row" : "flex-row-reverse"}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.005 }} // Overall box animation speed
      >
        {/* Image Section (Only visible on larger screens) */}
        <motion.div
          className="hidden sm:flex w-1/2 bg-blue-600 items-center justify-center"
          initial={{ opacity: 0, x: isLogin ? 100 : -200 }} // Start position farther for smoother effect
          animate={{ opacity: 1, x: 0 }} // Move to center slowly
          transition={{ duration: 3.5, ease: "easeInOut" }} // VERY SMOOTH transition
        >
          {/* Image that swaps sides */}
          <img
            src={isLogin ? "/png1.png" : "/png1.png"} // Change to actual image paths
            alt="Auth Illustrat"
            className="w-full h-auto object-center transition-transform duration-3000 ease-in-out"
          />
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="w-full  bg-[#badeff] sm:w-1/2 p-8 flex flex-col justify-center"
          initial={{ x: isLogin ? -100 : 200 }} // Form moves opposite to image
          animate={{ x: 10 }}
          transition={{ duration: 3.5, ease: "easeInOut" }} // Same smooth effect
        >
          {isLogin ? <Login /> : <SignUp />}
          
          {/* Toggle Login/Sign Up */}
          <p className="text-center mt-4 text-white">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button className="text-blue-400  ml-2 hover:underline" onClick={switchPages}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Auth;
