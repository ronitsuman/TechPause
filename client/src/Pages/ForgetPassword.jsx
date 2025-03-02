import { useState } from "react";
import SideBAr from "../Components/SideBAr";
import { Route, Routes, useNavigate } from "react-router-dom";
import VerifyEmail from "../Components/VerifyEmail";
import EnterOTP from "../Components/EnterOTP";
import NewPassword from "../Components/NewPassword";

const ForgetPassword = () => {
  // ✅ State to track current step
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // ✅ Click handle function to navigate steps
  const handleStepClick = (clickedStep) => {
    if (clickedStep > step) {
      alert("Please complete the Process in order!");
    } else {
      if (clickedStep === 1) navigate("/forgetPassword"); 
      if (clickedStep === 2) navigate("/forgetPassword/enter-otp");
      if (clickedStep === 3) navigate("/forgetPassword/new-password");
    }
  };

  return (
    <div className="flex justify-normal gap-0  bg-[#fcebf3] lg:h-[100vh] md:h-[80vh] ">
      <SideBAr step={step} handleStepClick={handleStepClick} />
      <div className="ml-[]">
        {/* ✅ Routing Define */}
        <Routes>
          <Route path="/" element={<VerifyEmail setStep={setStep} />} />
          <Route path="/enter-otp" element={<EnterOTP setStep={setStep} />} />
          <Route path="/new-password" element={<NewPassword setStep={setStep} />} />
        </Routes>
      </div>
    </div>
  );
};

export default ForgetPassword;
