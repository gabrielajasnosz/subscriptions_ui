import React, { useState } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { SubscriptionDetailsModal } from "./SubscriptionDetailsModal";

export const SeeYourSubscriptionDetails = () => {
  const [isModalOpened, setModalOpened] = useState(false);

  return (
    <Card
      sx={{
        width: 300,
        backgroundColor: "#0c2741",
        padding: "15px 10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        onClick={() => setModalOpened(true)}
      >
        <InfoIcon sx={{ color: "white", fontSize: "60px" }} />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            Subscription details
          </Typography>
        </CardContent>
      </CardActionArea>
      <SubscriptionDetailsModal
        isOpened={isModalOpened}
        handleClose={() => setModalOpened(false)}
      />
    </Card>
  );
};
