import React from "react";
import "./MainPage.scss";
import { useMetaMask } from "../../hooks/useMetaMask";
import { ConnectToMetaMask } from "./ConnectToMetaMask/ConnectToMetaMask";
import { UserPage } from "../UserPage/UserPage";

export const MainPage = () => {
  const {
    wallet: { accounts },
    hasProvider,
  } = useMetaMask();

  const isConnected = React.useMemo(
    () => hasProvider && accounts.length > 0,
    [hasProvider, accounts],
  );

  return (
    <div className={"page-layout"}>
      {!isConnected ? <ConnectToMetaMask /> : <UserPage />}
    </div>
  );
};
