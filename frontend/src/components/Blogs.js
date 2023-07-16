import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from "./Blog";
const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async()=>{
    const res = await axios.get("http://localhost:5000/api/blog").catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    sendRequest().then(data=>setBlogs(data.blogs));
  },[])
  console.log(blogs);
  return (
    <div>
      {blogs && blogs.map((blog,index) => 
      <Blog 
        id = {blog._id}
        isUser={localStorage.getItem("userId")===blog.user._id}
        location={blog.location} 
        description={blog.description} 
        imageURL={ blog.image} 
        userName={blog.user.name} 
        cost={blog.cost} 
        places_to_visit={blog.plases_to_visit}/>
      )}
    </div>
  )
}

export default Blogs