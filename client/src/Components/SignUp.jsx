import { useState } from "react";
import axios from "axios"; // Axios import
import { toast } from "react-toastify";

const SignUp = ( { onSignupSuccess }) => {
  const [showCatInstr, setShowCatInstr] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup,setShowPopup]=useState(false)
   // API request ke time button disable karne ke liye

  // Regex Patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Form Validation
  const validateForm = () => {
   

    if (!formData.name.trim()) {
      toast.warning("name is so small ")
      return false;
      
    }
    if (!formData.category.trim()) {
      toast.warning("Select any one category is Required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.warning("Email is Required");
      false ;
      
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Email is not valid");
      return false
    }
    if (!formData.phone.trim()) {
      toast.warning("Phone is required");
      
    } else if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number should be 10 digits long");
      return false ;
    }
    if (!formData.password.trim()) {
      toast.warning("Password is required");
      false ;
    } else if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters long, include 1 Uppercase, 1 number, and 1 special character");
      return false 
    }

  };

  // API Call to Add User
  const handleAddSubmit = async () => {
    if (!validateForm())  // Agar form valid nahi hai to API call na kare

    setIsSubmitting(true); // 🔹 Button disable karne ke liye

    try {
      // API End pont Karo
      const response = 
      await axios.post(
        "http://localhost:3000/api/signup",
        formData
      );

      toast.success(response.data.message)
      setShowPopup(true)


      // ✅ Form Reset
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        category: "",
      });

    } 
    catch (error) {
      if (error.response) {
        // **🔹 Email Already Exists Error**
        if (error.response.status === 400 && error.response.data.message === "Email already exists!") {
          toast.error("❌ This email is already registered. Try logging in.");
        } else {
          // ❌ Other Errors
          toast.error("❌ " + (error.response.data.message || "Something went wrong!"));
        }
      } else {
        toast.error("❌ Server error. Try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddSubmit();
  };

  return (
    <div className="p-4 bg-[#fcf2f8] w-[470px] md:w-[420px] md:gap-1 md:mt-[-45px] md:p-16 md:item-center md:justify-center md:flex md:flex-col text-black">
      <h1 className="text-3xl">Create an account</h1>
      <p className="">Provide your details.</p>
      <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="md:flex md:flex-col gap-1 md:w-[307px] lg:w-[397px]">
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="placeholder:p-6 bg-white"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="md:flex md:flex-col gap-1 md:w-[307px] lg:w-[397px]">
          <label htmlFor="email">Email:</label>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="email"
            name="email"
            id="email"
            className="placeholder:p-6 bg-white"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* Phone */}
        <div className="md:flex md:flex-col gap-1 md:w-[307px] lg:w-[397px]">
          <label htmlFor="phone">Phone:</label>
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          <input
            type="tel"
            name="phone"
            id="phone"
            maxLength="10"
            className="placeholder:p-6 bg-white"
            placeholder="Phone No."
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        {/* Category */}
        <div className="md:flex md:flex-col gap-1 md:w-[307px] lg:w-[397px]">
          <label htmlFor="Category">Category:</label>
          {errors.category && <p className="text-red-500">{errors.category}</p>}
          <select
            name="category"
            id="category"
            className="bg-white"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="" disabled>
              Choose Any One
            </option>
            <option value="Digital Detox Techniques">
              Digital Detox Techniques
            </option>
            <option value="Mindfulness & Minimalism">
              Mindfulness & Minimalism
            </option>
            <option value="Tech-Life Balance">Tech-Life Balance</option>
            <option value="others">Other</option>
          </select>
        </div>
           {/* Collapsible instruction button */}
           <button
            type="button"
            className="text-sm text-blue-500 underline w-fit mt-1"
            onClick={() => setShowCatInstr(!showCatInstr)}
          >
            Need help selecting a category?
          </button>

          {/* Collapsible instruction text */}
          {showCatInstr && (
            <p className="text-gray-600 text-sm mt-1">
              This category is your main writing focus. You can see all blog
              posts, but can only post in your chosen category for now.
              You can change it later in your profile settings.
            </p>
          )}

        {/* Password */}
        <div className="md:flex md:flex-col gap-1 md:w-[307px] lg:w-[397px]">
          <label htmlFor="password">Password:</label>
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <input
            type="password"
            name="password"
            id="password"
            className="placeholder:p-6 bg-white"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        {/* Privacy Policy */}
        <p className="text-sm">
          By signing up I agree to the{" "}
          <a className="text-blue-500" href="#">
            terms & conditions and privacy policy
          </a>
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-blue-500 w-[280px] sm:w-[397px] md:w-[307px] lg:w-[397px] p-1 rounded-2xl text-white ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Create an Account"}
        </button>
      </form>
      {/* email confirmation pop up  */}
      {showPopup && (
         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-6 rounded-lg text-center">
           <h2 className="text-lg font-bold">Confirm Your Email</h2>
           <p>Please check your email for a confirmation link.</p>
           <button
             onClick={() => 
              {setShowPopup(false);
              onSignupSuccess();}}
             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
           >
             OK
           </button>
         </div>
       </div>
     )}

      
    </div>
  );
};

export default SignUp;
