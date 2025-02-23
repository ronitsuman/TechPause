

const Login = () => {
  return (
    <div className="p-4  w-[470px]  border-2 md:h-[350px] md:p-6 md:item-center md:flex md:flex-col text-white  ">
      <h1 className="text-3xl text-center ">Login Form </h1>
      <form action="" className="mt-2 ">
       
        <div className=" md:flex md:flex-row gap-4  "> 
        <label htmlFor="name">Name : </label>
        <input type="text" name="name" id="name" className="border rounded-2xl placeholder:p-6   "placeholder="Enter Your Name " />
        </div>
        <div className=" md:flex md:flex-row gap-4  "> 
        <label htmlFor="name">Name : </label>
        <input type="text" name="name" id="name" className="border rounded-2xl placeholder:p-6   "placeholder="Enter Your Name " />
        </div>
        <div className=" md:flex md:flex-row gap-4  "> 
        <label htmlFor="name">Name : </label>
        <input type="text" name="name" id="name" className="border rounded-2xl placeholder:p-6   "placeholder="Enter Your Name " />
        </div>
        <div className=" md:flex md:flex-row gap-4  "> 
        <label htmlFor="name">Name : </label>
        <input type="text" name="name" id="name" className="border rounded-2xl placeholder:p-6   "placeholder="Enter Your Name " />
        </div>
        <div className=" md:flex md:flex-row gap-4  "> 
        <label htmlFor="name">Name : </label>
        <input type="text" name="name" id="name" className="border rounded-2xl placeholder:p-6   "placeholder="Enter Your Name " />
        </div>
        <button>Submit</button>

      </form>
    </div>
  )
}

export default Login