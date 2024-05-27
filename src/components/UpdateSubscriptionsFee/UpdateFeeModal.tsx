import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@mui/material";
import { BlockchainService } from "../../ethereum/BlockchainService";
import { ethers } from "ethers";

type UpdateFeeModalType = {
  isModalOpened: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  onError: () => void;
};

export const UpdateFeeModal = ({
  isModalOpened,
  handleClose,
  onSuccess,
  onError,
}: UpdateFeeModalType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newFee, setNewFee] = useState<string>();

  const success = () => {
    setIsLoading(false);
    onSuccess();
  };

  const submitForm = async (): Promise<void> => {
    setIsLoading(true);
    const service = new BlockchainService();
    const feeInWei = ethers.utils.parseUnits(newFee!, "ether");

    service
      .updateSubscriptionFee(feeInWei)
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
    <Dialog onClose={handleClose} open={isModalOpened}>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Enter new subscription fee (in ETH):{" "}
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
          variant={"outlined"}
          label={"New fee"}
          sx={{ width: "300px" }}
          onChange={(e) => setNewFee(e.target.value)}
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
            Submit{" "}
          </Button>
        )}
      </div>
    </Dialog>
  );
};
