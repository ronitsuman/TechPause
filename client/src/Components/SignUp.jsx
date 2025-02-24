import { useState } from "react";
import axios from "axios"; // Axios import

const SignUp = () => {
  const [showCatInstr, setShowCatInstr] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // API request ke time button disable karne ke liye

  // Regex Patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Form Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is Required";
    }
    if (!formData.category.trim()) {
      newErrors.category = "Select any one category is Required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is Required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number should be 10 digits long";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include 1 Uppercase, 1 number, and 1 special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API Call to Add User
  const handleAddSubmit = async () => {
    if (!validateForm()) return; // Agar form valid nahi hai to API call na kare

    setIsSubmitting(true); // 🔹 Button disable karne ke liye

    try {
      // API End pont Karo
      const response = 
      await axios.post(
        // "http://localhost:3000/api/products/add",
        formData
      );

      alert("User Registered Successfully!");
      console.log("Server Response:", response.data);

      // ✅ Form Reset
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false); //  Button wapas enable karne ke liye
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddSubmit();
  };

  return (
    <div className="p-4  w-[470px] md:w-[420px] md:gap-1 md:mt-[-45px] md:p-16 md:item-center md:justify-center md:flex md:flex-col text-black">
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
    </div>
  );
};

export default SignUp;
