import FlexBetween from "../FlexBetween/FlexBetween";
import {
  Box,
  IconButton,
  InputBase,
  Select,
  Typography,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  LightMode,
  DarkMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const neutralDark = theme.palette.neutral.dark;
  const primaryLight = theme.palette.primary.light;
  const primaryDark = theme.palette.primary.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  //   const fullName = `${user.firstName} ${user.lastName}`;
  const fullName = "John Doe";

  return (
    <FlexBetween padding='1rem 6%' backgroundColor={alt}>
      <FlexBetween gap='1.75rem'>
        <Typography
          fontWeight={"bold"}
          fontSize='clamp(1rem, 2rem, 2.25rem)'
          color={"primary"}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: primaryLight,
            },
          }}
        >
          Social Media
        </Typography>
        {isNonMobile && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius='9px'
            gap='3rem'
            padding='0.1rem 1.5rem'
          >
            <InputBase placeholder='Search' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/*  Desktop Nav */}
      {isNonMobile ? (
        
        <FlexBetween gap='2rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant='standard' value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem value='Logout' onClick={() => dispatch(setLogout())}>
                {" "}
                Log Out{" "}
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu sx={{ fontSize: "25px" }} />
        </IconButton>
      )}

      {/* Mobile Nav */}
      {!isNonMobile && isMobileMenuToggled && (
        <Box
          position={"fixed"}
          right={"0"}
          top={"0"}
          height={"100%"}
          zIndex={"10"}
          maxWidth={"500px"}
          minWidth={"300px"}
          backgroundColor={background}
        >
          {/* Close Button */}
          <Box display={"flex"} justifyContent={"flex-end"} padding={"1rem"}>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close sx={{ fontSize: "25px" }} />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <FlexBetween
            display={"flex"}
            flexDirection='column'
            justifyContent={"center"}
            gap='3rem'
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "light" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant='standard' value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem value='Logout' onClick={() => dispatch(setLogout())}>
                  {" "}
                  Log Out{" "}
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default NavBar;
