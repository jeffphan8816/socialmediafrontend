import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, useTheme, Divider, Typography } from "@mui/material";
import UserImage from "../UserImage"; 
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from "../FlexBetween/FlexBetween"; 
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../state"; 

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    // console.log(token)
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUser(data);
    
    
  };

  const getFriends = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/users/${userId}/friends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getUser();
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;
  return (
    <WidgetWrapper>
      {/*First row*/}
      <FlexBetween
        gap='0.5rem'
        paddingBottom='1.1rem'
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap='1rem'>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant='h4'
              fontWeight='500'
              color={dark}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friend(s)</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/*Second row*/}
      <Box
        display='flex'
        alignContent='center'
        gap='1rem'
        marginBottom='0.5rem'
        marginTop="0.5rem"
      >
        <LocationOnOutlined fontSize='large' sx={{ color: main }} />
        <Typography paddingTop="0.25rem" color={medium}>{location}</Typography>
      </Box>
      <Box
        display='flex'
        alignContent='center'
        gap='1rem'
        marginBottom='0.5rem'
      >
        <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
        <Typography paddingTop="0.25rem" color={medium}>{occupation}</Typography>
      </Box>

      <Divider />
      {/*Third row*/}
      <Box padding='0.75rem 0'>
        <FlexBetween marginBottom='0.5rem'>
          <Typography color={medium}>Who's viewed your profile:</Typography>
          <Typography color={main} fontWeight='500'>
            {Math.ceil(viewedProfile)}
          </Typography>
        </FlexBetween>

        <FlexBetween>
          <Typography color={medium}>Impressions of your posts</Typography>
          <Typography color={main} fontWeight='500'>
            {Math.ceil(impressions)}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />
      {/*Fourth row*/}

      <Box padding='0.75rem 0'>
        <Typography
          fontSize='1rem'
          color={main}
          fontWeight='500'
          marginBottom='1rem'
        >
          Social Profile
        </Typography>
        <FlexBetween marginBottom='0.5rem' gap='1rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/twitter.png' alt='twitter' />
            <Box>
              <Typography color={main}>Twitter</Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween marginBottom='0.5rem' gap='1rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/linkedin.png' alt='linkedin' />
            <Box>
              <Typography color={main}>Linkedin</Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
