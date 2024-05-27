import { useMetaMask } from "../../hooks/useMetaMask";
import React from "react";
import { UpdateSubscriptionFee } from "../../components/UpdateSubscriptionsFee/UpdateSubscriptionFee";
import "./UserPage.scss";
import { SubscriptionsList } from "../../components/Subscriptions/SubscriptionsList";
import { Subscribe } from "../../components/Subscribe/Subscribe";
import { Unsubscribe } from "../../components/Unsubscribe";
import { RenewYourSubscription } from "../../components/RenewYourSubscription";
import { SeeYourSubscriptionDetails } from "../../components/SubscriptionDetails/SeeYourSubscriptionDetails";
import { Paper } from "@mui/material";
import { ethers } from "ethers";
import { WithdrawFunds } from "../../components/WithdrawFunds";

export const UserPage = () => {
  const { isUserContractOwner, isSubscriber, subscriptionFee } = useMetaMask();

  return (
    <div className={"user-page"}>
      <Paper
        elevation={24}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "40px",
          borderRadius: "20px",
          gap: "20px",
          width: "900px",
          opacity: 0.8,
          alignItems: "center",
        }}
      >
        <img src={"/SubHUB.png"} style={{ width: "200px" }} />

        {isUserContractOwner ? (
          <>
            <span className={"user-page__greeting"}>
              Welcome to your administrator panel!
            </span>
            {subscriptionFee && (
              <span className={"user-page__fee-info"}>
                {" "}
                Current subscription fee:{" "}
                {String(ethers.utils.formatEther(subscriptionFee!))} ETH{" "}
              </span>
            )}
            <div className={"user-page__card-list"}>
              <UpdateSubscriptionFee />
              <SubscriptionsList />
              <WithdrawFunds />
            </div>
          </>
        ) : (
          <>
            <span className={"user-page__greeting"}>Welcome!</span>
            {subscriptionFee && (
              <span className={"user-page__fee-info"}>
                {" "}
                Current subscription fee:{" "}
                {String(ethers.utils.formatEther(subscriptionFee!))} ETH{" "}
              </span>
            )}
            {isSubscriber ? (
              <div className={"user-page__card-list"}>
                <Unsubscribe />
                <RenewYourSubscription />
                <SeeYourSubscriptionDetails />
              </div>
            ) : (
              <div className={"user-page__card-list"}>
                <Subscribe />
              </div>
            )}
          </>
        )}
      </Paper>
    </div>
  );
};
