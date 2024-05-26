import React, { Dispatch, SetStateAction } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

export type SnackbarType = {
  opened: boolean;
  message: string;
  messageType: AlertColor;
};

export type SnackbarProps = {
  snackbarValues: SnackbarType;
  setSnackbarValues: Dispatch<SetStateAction<SnackbarType>>;
};

export const CustomSnackbar = ({
  snackbarValues,
  setSnackbarValues,
}: SnackbarProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={snackbarValues.opened}
      onClose={() => setSnackbarValues({ ...snackbarValues, opened: false })}
      autoHideDuration={6000}
      sx={{ marginTop: '20px' }}
    >
      <Alert
        onClose={() => setSnackbarValues({ ...snackbarValues, opened: false })}
        severity={snackbarValues.messageType}
        sx={{ width: '100%' }}
      >
        {snackbarValues.message}
      </Alert>
    </Snackbar>
  );
};
