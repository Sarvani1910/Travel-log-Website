import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Box, InputLabel, TextField, Typography,Button } from "@mui/material";

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const labelStyles = {mb:1,mt:2,fontSize:'24px', fontWeight:'bold'}
  const [inputs, setInputs] = useState({

    });
  const handleChange = (e) => {
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
        const data = response.data;
        setBlog(data.blog);
        setInputs({location:data.blog.location,description:data.blog.description,cost:data.blog.cost,places_to_visit:data.blog.places_to_visit})
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [id]);
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      location : inputs.location,
      description: inputs.description,
      cost: inputs.cost,
      places_to_visit: inputs.places_to_visit
    }).catch(err => console.log(err));
    const data = await res.data;
    return data
  }
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data)=> console.log(data)).then(()=>navigate("/myBlogs/"));
  }
  return (
    <div>
      {inputs && 
      <form onSubmit={handleSubmit}>
    <Box 
      border={3} 
      borderColor='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,24,121,1) 35%, rgba(0,212,255,1) 100%)' 
      borderRadius={10} 
      boxShadow="10px 10px 20px #ccc" 
      padding={3} 
      margin={"auto"} 
      marginTop={3}
      display='flex' 
      flexDirection={'column'} 
      width={"85%"}
    >
      <Typography fontWeight={'bold'} padding={3} color="black" variant="h2" textAlign={"center"}> Post Your Blog</Typography>
      <InputLabel sx={labelStyles}>Location</InputLabel>
      <TextField name= "location" onChange={handleChange} value={inputs.location} margin='auto' variant="outlined"/>
      <InputLabel sx={labelStyles}>Description</InputLabel>
      <TextField name= "description" onChange={handleChange} value={inputs.description} margin='auto' variant="outlined" />
      <InputLabel sx={labelStyles}>Cost</InputLabel>
      <TextField name= "cost" onChange={handleChange} value={inputs.cost} margin='auto' variant="outlined" />
      <InputLabel sx={labelStyles}>PlacesToVisit</InputLabel>
      <TextField name= "places_to_visit" onChange={handleChange} value={inputs.places_to_visit}margin='auto' variant="outlined" />
      <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
    </Box>
  </form>
  }</div>
  )
}

export default BlogDetail