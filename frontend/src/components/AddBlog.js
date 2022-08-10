import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

//ADD BLOG HERE
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId")
      }).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(() => navigate("/blogs"));
  };


  return (
    <div >

      <form onSubmit={handleSubmit}>

        <Box
          border={3}
          borderColor="#004d40"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={4}
          display="flex"
          flexDirection={"column"}
          width={"45%"}
        >
          
          <Typography
            className={classes.font}
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h4"
            textAlign={"center"}
          >
            Ready, Steady, Blog!!
          </Typography>


          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>

          <TextField
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />

          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>

          <TextField
            className={classes.font}
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="normal"
            variant="outlined"
          />

          <InputLabel className={classes.font} sx={labelStyles}>
            Image for your Blog
          </InputLabel>

          <TextField
            className={classes.font}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="normal"
            variant="outlined"
          />

          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="primary"
            type="submit"
          >
            +Add Now!
          </Button>
          
        </Box>
      </form>
    </div>
  );
};

export default AddBlog; 