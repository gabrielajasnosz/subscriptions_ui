import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { BlockchainService } from "../../ethereum/BlockchainService";
import { BigNumber, ethers } from "ethers";
import Table from "@mui/material/Table";
import "./SubscriptionsModal.scss";

type SubscriptionsModalType = {
  isOpened: boolean;
  handleClose: () => void;
};

export type SubscriberListElement = {
  subscriberAddress: string;
  subscriptionDue: BigNumber;
  isSubscribed: boolean;
  email: string;
  firstName: string;
  lastName: string;
  isSubscriptionActive: boolean;
};

const includesQuery = (query: string) => (sub: SubscriberListElement) =>
  `${sub.firstName} ${sub.lastName}`
    .toLowerCase()
    .includes(query.toLowerCase());

export const SubscriptionsModal = ({
  isOpened,
  handleClose,
}: SubscriptionsModalType) => {
  const [subscribers, setSubscribers] = useState<SubscriberListElement[] | []>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const service = new BlockchainService();
    service
      .getAllSubscribers()
      .then((data) => {
        console.log(data);
        setSubscribers(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      open={isOpened}
      PaperProps={{
        sx: {
          width: "1100px",
          maxWidth: "unset",
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", padding: "10px" }}>
        Subscriptions list:
      </DialogTitle>
      {subscribers.length === 0 ? (
        <span className={"no-subscriptions"}>No subscriptions</span>
      ) : (
        <>
          <TextField
            label="Search…"
            required={false}
            sx={{
              width: "400px",
              height: "50px",
              margin: "0 0 30px 0",
              display: "flex",
              alignSelf: "end",
            }}
            onChange={(v) => setSearchQuery(v.target.value)}
          />
          <Table
            size="medium"
            aria-label="a dense table"
            sx={{ padding: "20px" }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    maxWidth: "30px",
                    textOverflow: "scroll",
                    fontWeight: "bold",
                  }}
                >
                  Address
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  First name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Last name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  E-mail
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Is subscribed?
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Expiration date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Is subscription valid?
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscribers.filter(includesQuery(searchQuery)).map((sub) => (
                <TableRow
                  key={sub.subscriberAddress}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    height: "50px !important",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{ maxWidth: "60px", overflow: "scroll" }}
                  >
                    <Tooltip title={sub.subscriberAddress}>
                      <span>{sub.subscriberAddress}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">{sub.firstName}</TableCell>
                  <TableCell align="center">{sub.lastName}</TableCell>
                  <TableCell align="center">{sub.email}</TableCell>
                  <TableCell align="center">
                    {sub.isSubscribed ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(
                      Number(sub.subscriptionDue._hex) * 1000,
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {sub.isSubscriptionActive ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Dialog>
  );
};
