import React, { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { SubscriptionsModal } from "./SubscriptionsModal";

export const SubscriptionsList = () => {
  const [isModalOpened, setModalOpened] = useState(false);

  const handleModalClose = () => {
    setModalOpened(false);
  };

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
        <ListIcon sx={{ color: "white", fontSize: "60px" }} />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            Subscriptions
          </Typography>
        </CardContent>
        <SubscriptionsModal
          isOpened={isModalOpened}
          handleClose={handleModalClose}
        />
      </CardActionArea>
    </Card>
  );
};
