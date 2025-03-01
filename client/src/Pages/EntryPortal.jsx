import { useNavigate } from 'react-router-dom';

const EntryPortal = () => {
  const navigate = useNavigate();

  return (
   <>
   {/* header */}
   <nav className="flex justify-between items-center p-5 border fixed w-full  bg-white/60 backdrop-blur shadow-md z-10 " >    
    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">TechPause</h1>
    <ul className="flex gap-5">
        <li><button className="p-4 rounded-2xl bg-white text-black hover:bg-gray-200" onClick={() => navigate('/auth')}>Login</button></li>
        <li><button className="border p-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-border text-white hover:opacity-80" onClick={() => navigate('/auth')}>Sign In</button></li>
    </ul>
   </nav>
   {/* main content */}
   <section className=" bg-[#fcebf3] flex flex-col items-center justify-center h-[80vh] pl-10 pr-10">
    <h2 className="text-2xl "> Welcome To TechPause </h2> 
    <h1 className="text-4xl font-bold text-center  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text  ">Share Your Ideas with the World </h1>
    <p className="text-xl tracking-wide text-center  ">Join the community of writers and readers, Create, Share and discover amazing content.</p>
    <div className="flex gap-4 mt-5">
        <button className="border p-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-border text-white hover:opacity-80" onClick={() => navigate('/auth')}>Get Started</button>
        <button className="p-2 rounded-xl text-black bg-white hover:bg-gray-200" onClick={() => navigate('/auth')}>Login</button>
    </div>
   </section>
   {/* posts */}
   <section className="bg-[#fcf2f8] gap-4  flex flex-col items-center justify-center h-[40vh] pl-10 pr-10">
    <h2 className="text-xl rounded-xl bg-[#f3e8ff] text-[#9e4aed]   p-2 ">Featured Posts</h2>
     <h1 className="text-6xl  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text   ">Latest Stories</h1>
     <p className="text-center text-base">Preview some of our content, sign up or login to read full articles.</p>    
   </section>
   {/* post here  */}
   <section className="bg-[#fcf2f8] flex flex-col gap-4 items-center justify-center h-[40vh]">
    <h2 className="font-semibold ">No post available yet </h2>
    <p className="text-gray-500">Be the first to create content on our platform</p>
    <button className="rounded-2xl p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border text-white hover:opacity-80" onClick={() => navigate('/auth')}>Join Now</button>
   </section>
   {/* join our community today */}
   <section className="bg-[#fcebf3] flex flex-col items-center gap-5 justify-center h-[40vh] pl-10 pr-10">
    <button className="border p-2 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border text-white hover:opacity-80" onClick={() => navigate('/auth')}>Join Us</button>
    <h1 className="font-bold text-3xl text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text  ">Join Our Community Today </h1>
    <p className="text-base text-gray-800 font-semibold text-center ">Create an account to access all our content, write your own posts, and connect with other writers and readers.</p>
    <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border text-white p-2 rounded-2xl hover:opacity-80" onClick={() => navigate('/auth')}>Sign Up Now</button>
   </section>
   {/* content */}
   <section className="bg-[#fcebf3] flex flex-col gap-8 items-center justify-center h-[60vh] pl-10 pr-10">
    <div className="flex gap-4 h-[20vh]">
      <div className="bg-white flex flex-col items-left gap-2 p-4 rounded-2xl">
          <h1 className="text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Read</h1>
          <p className="text-gray-600">Access exclusive content from our community of writers.</p>
      </div>
      <div className="bg-white flex flex-col items-left gap-2 p-4 rounded-2xl">
          <h1 className="text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Write</h1>
          <p className="text-gray-600">Share your knowledge and ideas with our growing audience.</p>
      </div>
    </div>
    <div className="flex gap-4 h-[20vh]">
      <div className="bg-white flex flex-col items-left gap-2 p-4 rounded-2xl">
          <h1 className="text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Connect</h1>
          <p className="text-gray-600">Engage with other readers and writers in our community.</p>
      </div>
      <div className="bg-white flex flex-col items-left gap-2 p-4 rounded-2xl">
          <h1 className="text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Grow</h1>
          <p className="text-gray-600">Build your audience and establish your online presence.</p>
      </div>
    </div>
   </section>
   <footer className="flex justify-center items-center h-20 bg-gray-400">
     <p> &copy; CopyRight 2025</p>
   </footer>
   </>
  )
}
export default EntryPortal;
