import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Blog from './Blog'

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const id = localStorage.getItem('userId');

  const sendRequest = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data?.blogs?.blogs));
  }, [sendRequest]);

  console.log(blogs);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            location={blog.location}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
            cost={blog.cost}
            placesToVisit={blog.places_to_visit} 
          />
        ))}
    </div>
  );
};

export default UserBlogs;
