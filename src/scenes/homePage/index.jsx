import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "../../components/Widgets/UserWidget"; 
import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar"; 
import MyPostWidget from "../../components/Widgets/MyPostWidget";
import PostsWidget from "../../components/Widgets/PostsWidget";
import AdvertWidget from "../../components/Widgets/AdvertWidget";
import FriendListWidget from "../../components/Widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <NavBar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobile ? "flex" : "block"}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobile ? "42%" : undefined}
          marginTop={isNonMobile ? "undefined" : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>

        {isNonMobile && (
          <Box flexBasis='26%'>
            <AdvertWidget />

            <Box margin='2rem 0' />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
