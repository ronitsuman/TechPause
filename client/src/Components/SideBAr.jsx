

const SideBAr = ({step,handleStepClick}) => {
  return (
    <div className="mt-6 pl-2 lg:p-8">
    <div className=" bg-blue-300 w-[130px] h-[90vh] md:w-[200px] md:h-full   md:bg-white lg:w-[200px] lg:h-auto  border rounded-2xl lg:bg-white ">
    <h1 className=" font-bold uppercase text-center rounded-2xl  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text lg:text-3xl bg-[#fcebf3]   ">reset password </h1>
      <ul className=" mt-4 space-y-4 lg:space-y-10 lg:mt-10 lg:p-2  ">
        <li className={`cursor-pointer${step >=1 ? "text-green-600 font-bold":"text-gray-600 cursor-not-allowed"} lg:text-2xl  `} onClick={()=>handleStepClick(1)}>{step >= 1 && "✅"} Verify Email</li>
        <hr /> 
        <li className={` cursor-pointer${step >=2 ? "text-green-600 font-bold ": "text-gray-600 cursor-not-allowed "}  lg:text-2xl `} onClick={()=>handleStepClick(2)}>{step >= 2 && "✅"} Enter OTP</li>
        <hr />
        <li className={` cursor-pointer${step >=3 ? "text-green-600 font-bold":"text-gray-600 cursor-not-allowed"} lg:text-2xl   `} onClick={()=>handleStepClick(3)}>{step >= 3 && "✅"} New Password</li>
        <hr />
      </ul>
    </div>
    </div>
  )
}

export default SideBAr