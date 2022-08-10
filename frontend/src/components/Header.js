import React, { useState } from "react";

import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useStyles } from "./utils";

//HEADER FILE
const Header = () => {

  const classes = useStyles();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  
  const dispath = useDispatch();
  
  const [value, setValue] = useState();
  
  return (
    <AppBar position="sticky" sx={{ background: "#4db6ac" }}>
    
    <Toolbar>

      <Typography className={classes.font} variant="h4" >COLLEGE ENGAGEMENT APP</Typography>

      {isLoggedIn && (<Box display="flex" marginLeft={"auto"} marginRight="auto">

        <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
          
          <Tab
              className={classes.font}
              LinkComponent={Link}
              to="/blogs"
              label="All Blogs"/>
          
          <Tab
              className={classes.font}
              LinkComponent={Link}
              to="/myBlogs"
              label="My Blogs"/>
          
          <Tab
              className={classes.font}
              LinkComponent={Link}
              to="/blogs/add"
            label="Add New Blog" />
        </Tabs>


      </Box>
      )}
      
      <Box display="flex" marginLeft="auto">
        
        {!isLoggedIn && (
          <>
            {" "}
            <Button
              LinkComponent={Link}
              to="/auth"
              sx={{ margin: 1, borderRadius: 3 }}
              variant="contained">
              LOGIN
            </Button>
            <Button
              LinkComponent={Link}
              to="/auth"
              sx={{ margin: 1, borderRadius: 3 }}
              variant="contained">
              SIGN UP
            </Button>
          </>
        )}

        {isLoggedIn && (
          <Button
            onClick={() => dispath(authActions.logout())}
            LinkComponent={Link}
            to="/auth"
            sx={{ margin: 1, borderRadius: 3 }}
            variant="contained">
            LOG OUT
          </Button>
        )}
        
      </Box>
    
    </Toolbar>
  
    </AppBar>
  );
};

export default Header;