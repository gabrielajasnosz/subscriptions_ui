import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { BlockchainService } from "../../ethereum/BlockchainService";

type SubscribeModalType = {
  isOpened: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  onError: () => void;
};

export type Subscription = {
  email: string;
  name: string;
  surname: string;
};
export const SubscribeModal = ({
  isOpened,
  handleClose,
  onSuccess,
  onError,
}: SubscribeModalType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState<Subscription>({
    email: "",
    name: "",
    surname: "",
  });

  const success = () => {
    setIsLoading(false);
    onSuccess();
  };

  const submitForm = async (): Promise<void> => {
    setIsLoading(true);
    const service = new BlockchainService();
    const subscriberFee = await service.getSubscriberFee();
    service
      .subscribe(values, subscriberFee)
      .then((data) => {
        //@ts-ignore
        service.subscribeTransaction(data.hash, success);
      })
      .catch((e) => {
        console.log(e);
        onError();
      });
  };

  return (
    <Dialog onClose={handleClose} open={isOpened}>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Enter subscription info:
      </DialogTitle>
      <div
        style={{
          width: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <TextField
          type={"email"}
          variant={"outlined"}
          label={"E-mail"}
          sx={{ width: "300px" }}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <TextField
          type={"email"}
          variant={"outlined"}
          label={"Name"}
          sx={{ width: "300px" }}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <TextField
          type={"email"}
          variant={"outlined"}
          label={"Surname"}
          sx={{ width: "300px" }}
          onChange={(e) => setValues({ ...values, surname: e.target.value })}
        />
        {isLoading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <Button
            variant={"contained"}
            sx={{ marginTop: "10px" }}
            onClick={submitForm}
          >
            {" "}
            Subscribe and pay{" "}
          </Button>
        )}
      </div>
    </Dialog>
  );
};
