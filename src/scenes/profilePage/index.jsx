import FriendListWidget from "components/Widgets/FriendListWidget";
import MyPostWidget from "components/Widgets/MyPostWidget";
import PostsWidget from "components/Widgets/PostsWidget";
import UserWidget from "components/Widgets/UserWidget";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "components/NavBar/NavBar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
    const {userId} = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobile = useMediaQuery("(min-width: 1000px)");

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }



  return (
    <Box>
      <NavBar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobile ? "flex" : "block"}
        gap='2rem'
        justifyContent='center'
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <FriendListWidget userId={userId} sx={{margin: "2rem 0"}} />
        </Box>
        <Box
          flexBasis={isNonMobile ? "42%" : undefined}
          marginTop={isNonMobile ? "undefined" : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget loggedInUserId={userId} isProfile />
        </Box>

      </Box>
    </Box>
  );
};

export default ProfilePage;
