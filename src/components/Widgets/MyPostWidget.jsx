import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

import {
  Box,
  useTheme,
  Divider,
  Typography,
  IconButton,
  Button,
  InputBase,
  useMediaQuery,
} from "@mui/material";

import FlexBetween from "components/FlexBetween/FlexBetween";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserImage from "components/UserImage/UserImage";
import WidgetWrapper from "components/WidgetWrapper/WidgetWrapper";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath, token }) => {
    return (
        <div></div>
    )
}

export default MyPostWidget;