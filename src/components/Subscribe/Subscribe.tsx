import React, {useState} from "react";
import {
  AlertColor,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import {SubscribeModal} from "./SubscribeModal";
import {CustomSnackbar} from "../CustomSnackbar/CustomSnackbar";

export type SnackbarType = {
  opened: boolean;
  message: string;
  messageType: AlertColor;
};

export const Subscribe = () => {
  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: '',
    messageType: 'success',
  });

  const onSuccess = () => {
    setSnackbar({
      opened: true,
      message: 'Subscription successful',
      messageType: 'success'
    });
    setModalOpened(false);
    setTimeout(() => {
      window.location.reload();
      // @ts-ignore
    }, "1000");
  }

  const onError = () => {
    setSnackbar({
      opened: true,
      message: 'Subscription failed',
      messageType: 'error'
    });
    setModalOpened(false);
  }

  return (
    <Card sx={{ width: 300, backgroundColor: "#0c2741", padding: '15px 10px', display: 'flex', alignItems: 'center' }}>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onClick={() => {
        setModalOpened(true)
      }}>
        <CardMembershipIcon sx={{ color: 'white', fontSize: '60px'}} />
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white'}}>
            Subscribe to our services
          </Typography>
        </CardContent>
      </CardActionArea>
      <SubscribeModal isOpened={isModalOpened} handleClose={() => setModalOpened(false)} onSuccess={onSuccess} onError={onError} />
      <CustomSnackbar
          snackbarValues={snackbar}
          setSnackbarValues={setSnackbar}
      />
    </Card>
  );
};
