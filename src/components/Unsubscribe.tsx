import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import { BlockchainService } from "../ethereum/BlockchainService";
import { CustomSnackbar } from "./CustomSnackbar/CustomSnackbar";
import { SnackbarType } from "./Subscribe/Subscribe";

export const Unsubscribe = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: "",
    messageType: "success",
  });

  const openSuccessSnackbar = () => {
    setSnackbar({
      opened: true,
      message: "Services unsubscribed",
      messageType: "success",
    });
    setIsLoading(false);
    setTimeout(() => {
      window.location.reload();
      // @ts-ignore
    }, "1000");
  };

  const openErrorSnackbar = () => {
    setSnackbar({
      opened: true,
      message: "Error while unsubscribing",
      messageType: "error",
    });
    setIsLoading(false);
  };
  const unsubscribe = () => {
    setIsLoading(true);
    const service = new BlockchainService();
    service
      .unsubscribe()
      .then((data) => {
        //@ts-ignore
        service.subscribeTransaction(data.hash, openSuccessSnackbar);
      })
      .catch((e) => {
        console.log(e);
        openErrorSnackbar();
      });
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
        onClick={unsubscribe}
        disabled={isLoading}
      >
        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <UnsubscribeIcon sx={{ color: "white", fontSize: "60px" }} />
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Unsubscribe
              </Typography>
            </CardContent>
          </>
        )}
      </CardActionArea>
      <CustomSnackbar
        snackbarValues={snackbar}
        setSnackbarValues={setSnackbar}
      />
    </Card>
  );
};
