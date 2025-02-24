import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      {/* Main container */}
      <motion.div 
        className={`sm:h-[600px] md:w-auto relative bg-gray-800 rounded-lg shadow-lg overflow-hidden flex w-full max-w-[1280px] lg:max-h-[1032px] transition-all duration-500 ${isLogin ? "flex-row" : "flex-row-reverse"}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.005 }}
      >
        {/* Image Section (Hidden on Mobile) */}
        <motion.div
  className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center"
  initial={{ opacity: 0, x: isLogin ? 100 : -200 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 3.5, ease: "easeInOut" }}
>
  {/* Floating Image Effect */}
  <motion.img
    src={"/new.jpeg"}
    alt="Auth Illustration"
    className="w-full h-auto object-cover"
    animate={{
      y: [0, -15, 0], // 15px upar fir wapas neeche
    }}
    transition={{
      duration: 2.5, // 2.5 sec ka ek loop hoga
      repeat: 1, // Infinite loop me chalega
      repeatType: "mirror", // Forward aur backward dono direction me move karega
      ease: "easeInOut", // Smooth easing effect
    }}
  />
</motion.div>




        {/* Form Section */}
        <motion.div
          className="w-full bg-[#badeff] sm:w-1/2 p-8 flex flex-col justify-center relative"
          initial={{ x: isLogin ? -100 : 200 }}
          animate={{ x: 0 }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Login />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <SignUp />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Login/Sign Up */}
          <p className="ml-28 mt-[-60px] text-black">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button className="text-blue-400 ml-2 hover:underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
