import React, {useState} from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia, CircularProgress,
  Typography,
} from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {BlockchainService} from "../ethereum/BlockchainService";
import {useMetaMask} from "../hooks/useMetaMask";
import {SnackbarType} from "./Subscribe/Subscribe";
import {CustomSnackbar} from "./CustomSnackbar/CustomSnackbar";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";

export const RenewYourSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: '',
    messageType: 'success',
  });

  const openSuccessSnackbar = () => {
    setSnackbar({
      opened: true,
      message: 'Subscription renewed',
      messageType: 'success'
    });
  };

  const openErrorSnackbar = () => {
    setSnackbar({
      opened: true,
      message: 'Error while unsubscribing',
      messageType: 'error'
    });
    setIsLoading(false);
  }

  const { subscriptionFee } = useMetaMask();

  const onSuccess = () => {
        openSuccessSnackbar();
    setIsLoading(false);

  }
  const renewSubscription = () => {
    setIsLoading(true);
    const service = new BlockchainService();
    service.renewSubscription(subscriptionFee!).then((data) => {
      //@ts-ignore
      service.subscribeTransaction(data.hash, onSuccess)
    }).catch((e) => {
      openErrorSnackbar();
    })
  }
  return (
  <Card sx={{ width: 300, backgroundColor: "#0c2741", padding: '15px 10px', display: 'flex', alignItems: 'center' }}>
    <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onClick={renewSubscription}>
      {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
      ) : (
          <>
            <AutorenewIcon sx={{ color: 'white', fontSize: '60px'}} />
            <CardContent>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white'}}>
                Renew your subscription
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
