import React, {useState} from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent, CircularProgress,
  Typography,
} from "@mui/material";
import {BlockchainService} from "../ethereum/BlockchainService";
import {CustomSnackbar} from "./CustomSnackbar/CustomSnackbar";
import {SnackbarType} from "./Subscribe/Subscribe";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export const WithdrawFunds = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: '',
    messageType: 'success',
  });

  const openSuccessSnackbar = () => {
    setSnackbar({
      opened: true,
      message: 'Funds withdraw was successful',
      messageType: 'success'
    });
    setIsLoading(false);
  };

  const openErrorSnackbar = () => {
    setSnackbar({
      opened: true,
      message: 'Error while withdrawing funds',
      messageType: 'error'
    });
    setIsLoading(false);
  }
  const unsubscribe = () => {
    setIsLoading(true);
    const service = new BlockchainService();
    service.withdrawFunds().then((data) => {
      //@ts-ignore
      service.subscribeTransaction(data.hash, openSuccessSnackbar)
    }).catch((e) => {
      console.log(e);
      openErrorSnackbar();
    })
  };

  return (
  <Card sx={{ width: 300, backgroundColor: "#0c2741", padding: '15px 10px', display: 'flex', alignItems: 'center', height: '124px' }}>
    <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onClick={unsubscribe} disabled={isLoading}>
      {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
      ) : (
          <>
            <CurrencyExchangeIcon sx={{ color: 'white', fontSize: '60px'}} />
            <CardContent>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white'}}>
               Withdraw funds
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
