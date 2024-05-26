import React, { useEffect, ReactElement, useRef } from "react";
import { useMetaMask } from "../../hooks/useMetaMask";

type Permission = "TrustedIssuer" | "Admin" | "Owner";

type ConnectionCheckerProps = {
  permission?: Permission;
  children: ReactElement;
};

export const ConnectionChecker = ({ children }: ConnectionCheckerProps) => {
  const {
    wallet: { accounts },
    hasProvider,
  } = useMetaMask();

  const isConnected = React.useMemo(
    () => hasProvider && accounts.length > 0,
    [hasProvider, accounts],
  );

  const prevValue = useRef<boolean>(isConnected);
  useEffect(() => {
    if (prevValue.current && isConnected === false) {
      window.location.href = "/";
    }
    //@ts-ignore
    prevValue.current = isConnected;
  }, [isConnected]);

  return <>{children}</>;
};
