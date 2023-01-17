import React from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography variant='h5' sx={{ color: dark }} fontWeight='500'>
          Sponsored
        </Typography>

        <Typography color={medium}>Create Ads</Typography>
      </FlexBetween>
      <img
        src='http://localhost:3001/assets/info4.jpeg'
        alt='Advert'
        width='100%'
        height='auto'
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />

      <FlexBetween>
        <Typography color={main}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </Typography>
        <Typography color={medium}>Learn More</Typography>
      </FlexBetween>
      
    </WidgetWrapper>
  );
};

export default AdvertWidget;
