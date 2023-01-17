import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, Typography, useTheme, IconButton } from "@mui/material";
import FlexBetween from "components/FlexBetween/FlexBetween";
import Friend from "components/Friend/Friend";
import WidgetWrapper from "components/WidgetWrapper/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "state";
import { useEffect, useState } from "react";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const commentCount = comments.length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const data = await response.json();
    dispatch(setPost({ post: data }));
  };

  return (
    <WidgetWrapper margin="1rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        userPicturePath={userPicturePath}
        subtitle={location}
      />
      <Typography color={main} sx={{ marginTop: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween sx={{ marginTop: "0.25rem" }}>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.5rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined color={primary} />
              ) : (
                <FavoriteBorderOutlined color={main} />
              )}
            </IconButton>
            <Typography color={main}>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap='0.5rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined color={main} />
            </IconButton>
            <Typography color={main}>{commentCount}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined color={main} />
        </IconButton>
      </FlexBetween>

      {/* <Divider sx={{ marginTop: "0.5rem" }} /> */}

      {isComments && (
        <Box sx={{ marginTop: "0.5rem" }}>
          {comments.map((comment, i) => (
            <Box key={i} sx={{ marginTop: "0.5rem" }}>
              <Divider />
              <Typography color={main} margin='0.5rem' paddingLeft='1rem'>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
