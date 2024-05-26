import React from "react";
import {Button,  Paper, Typography} from "@mui/material";
import { useMetaMask } from "../../../hooks/useMetaMask";
import "./ConnectToMetaMask.scss";

export const ConnectToMetaMask: React.FC = () => {
  const { connectMetaMask, isConnecting } = useMetaMask();
  return (
    <div className="connect-to-meta-mask">
        <Paper elevation={24} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '20px', gap: '20px', width: '500px', opacity: 0.8}} >
            <img src={'/SubHUB.png'} style={{ width: '200px'}}/>
            <div className={"connect-to-meta-mask__info"}>
                Too see and manage your subscriptions connect to your wallet
            </div>
            <Button
                color={"primary"}
                variant={"outlined"}
                disabled={isConnecting}
                onClick={() => connectMetaMask()}
                size={"medium"}
                sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                }}
            >
                Connect
            </Button>
        </Paper>
    </div>
  );
};
