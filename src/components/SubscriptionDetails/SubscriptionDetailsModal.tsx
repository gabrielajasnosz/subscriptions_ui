import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { BlockchainService } from "../../ethereum/BlockchainService";

type SubscriptionDetailsModalType = {
  isOpened: boolean;
  handleClose: () => void;
};

export type SubscriptionDetails = {
  isActive: boolean;
  firstName: string;
  lastName: string;
  subscriptionDue: {
    _hex: string;
  };
  email: string;
};

export const SubscriptionDetailsModal = ({
  isOpened,
  handleClose,
}: SubscriptionDetailsModalType) => {
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionDetails | null>(null);
  useEffect(() => {
    const service = new BlockchainService();
    service
      .getSubscriberData()
      .then((data) => {
        console.log(data);
        setSubscriptionData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Dialog onClose={handleClose} open={isOpened}>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Your subscription details:
      </DialogTitle>
      {subscriptionData ? (
        <div
          style={{
            width: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "start",
            margin: "0 0 30px 30px",
          }}
        >
          <span>
            {" "}
            First name:{" "}
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {subscriptionData.firstName}{" "}
            </span>
          </span>
          <span>
            {" "}
            Last name:{" "}
            <span style={{ fontWeight: "bold" }}>
              {subscriptionData.lastName}
            </span>
          </span>
          <span>
            {" "}
            Email:{" "}
            <span style={{ fontWeight: "bold" }}>{subscriptionData.email}</span>
          </span>
          <span>
            {" "}
            Subscription is{" "}
            {subscriptionData.isActive ? (
              <span style={{ fontWeight: "bold", color: "green" }}>ACTIVE</span>
            ) : (
              <span style={{ fontWeight: "bold", color: "red" }}>INACTIVE</span>
            )}
          </span>
          <span>
            {" "}
            Validity date:{" "}
            <span style={{ fontWeight: "bold" }}>
              {new Date(
                Number(subscriptionData.subscriptionDue._hex) * 1000,
              ).toLocaleString()}
            </span>
          </span>
        </div>
      ) : (
        <span> ni ma</span>
      )}
    </Dialog>
  );
};
