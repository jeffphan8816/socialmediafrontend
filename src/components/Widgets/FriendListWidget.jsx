import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend/Friend";
import WidgetWrapper from "components/WidgetWrapper/WidgetWrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const friends = useSelector((state) => state.user.friends);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const getFriends = async () => {
    const res = await fetch(`http://localhost:3001/users/${userId}/friends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!friends) {
    return null;
  }

  return (
    <WidgetWrapper>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant='h4' sx={{ color: dark }}>
          Friends
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              userPicturePath={friend.picturePath}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
            />
          ))}
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
