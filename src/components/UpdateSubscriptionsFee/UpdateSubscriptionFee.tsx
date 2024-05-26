import React, {useState} from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {UpdateFeeModal} from "./UpdateFeeModal";
import {CustomSnackbar} from "../CustomSnackbar/CustomSnackbar";
import {SnackbarType} from "../Subscribe/Subscribe";

export const UpdateSubscriptionFee = () => {
    const [isModalOpened, setModalOpened] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarType>({
        opened: false,
        message: '',
        messageType: 'success',
    });

    const onSuccess = () => {
        setSnackbar({
            opened: true,
            message: 'Fee changed successfully',
            messageType: 'success'
        });
        setModalOpened(false);
        setTimeout(() => {
            window.location.reload();
            // @ts-ignore
        }, "2000");
    }

    const onError = () => {
        setSnackbar({
            opened: true,
            message: 'Fee change failed',
            messageType: 'error'
        });
        setModalOpened(false);
    }

  return (
      <Card sx={{ width: 300, backgroundColor: "#0c2741", padding: '15px 10px', display: 'flex', alignItems: 'center' }}>
        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onClick={() => setModalOpened(true)}>
          <ChangeCircleIcon sx={{ color: 'white', fontSize: '60px'}} />
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white'}}>
              Update subscriptions fee
            </Typography>
          </CardContent>
        </CardActionArea>
          <UpdateFeeModal isModalOpened={isModalOpened} handleClose={() => setModalOpened(false)} onSuccess={onSuccess} onError={onError} />
          <CustomSnackbar
              snackbarValues={snackbar}
              setSnackbarValues={setSnackbar}
          />
      </Card>
  );
};
