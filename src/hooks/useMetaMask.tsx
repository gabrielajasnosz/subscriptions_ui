import React, {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
  useCallback,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { BlockchainService } from "../ethereum/BlockchainService";
import { BigNumber } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface WalletState {
  accounts: any[];
  balance: string;
  chainId: string;
}

interface MetaMaskContextData {
  wallet: WalletState;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  connectMetaMask: () => void;
  clearError: () => void;
  isUserContractOwner: boolean;
  isInfoLoaded: boolean;
  isSubscriber: boolean;
  subscriptionFee: BigNumber | null;
}

const disconnectedState: WalletState = {
  accounts: [],
  balance: "",
  chainId: "",
};

const MetaMaskContext = createContext<MetaMaskContextData>(
  {} as MetaMaskContextData,
);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [wallet, setWallet] = useState(disconnectedState);
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUserContractOwner, setIsUserContractOwner] = useState(false);
  const [isInfoLoaded, setInfoLoaded] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [subscriptionFee, setSubscriptionFee] = useState<BigNumber | null>(
    null,
  );

  const clearError = () => setErrorMessage("");

  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts =
      providedAccounts ||
      (await window.ethereum.request({ method: "eth_accounts" }));

    if (!accounts.length) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      setInfoLoaded(true);
      return;
    }

    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      }),
    );

    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    setWallet({ accounts, balance, chainId });
  }, []);

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet],
  );
  const updateWallet = useCallback(
    (accounts: any) => _updateWallet(accounts),
    [_updateWallet],
  );

  useEffect(() => {
    if (wallet.accounts.length > 0) {
      getUserInfo();
    }
  }, [wallet]);
  /**
   * This logic checks if MetaMask is installed. If it is, some event handlers are set up
   * to update the wallet state when MetaMask changes. The function returned by useEffect
   * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
   * is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      setInfoLoaded(false);
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        await updateWalletAndAccounts();
        window.ethereum.on("accountsChanged", updateWallet);
        window.ethereum.on("chainChanged", updateWalletAndAccounts);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateWallet);
      window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
    };
  }, [updateWallet, updateWalletAndAccounts]);

  const getUserInfo = () => {
    const service = new BlockchainService();
    const isContractOwner = service
      .isOwner()
      .then((r) => {
        setIsUserContractOwner(Boolean(r));
      })
      .catch((e) => console.log(e));

    const isSubscriber = service
      .isSubscriber()
      .then((r) => {
        setIsSubscriber(r);
      })
      .catch((e) => console.log(e));

    const subscriberFee = service
      .getSubscriberFee()
      .then((r) => {
        setSubscriptionFee(r);
      })
      .catch((e) => console.log(e));

    Promise.allSettled([isContractOwner, isSubscriber, subscriberFee]).finally(
      () => {
        setInfoLoaded(true);
      },
    );
  };

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask,
        clearError,
        isUserContractOwner,
        isInfoLoaded,
        isSubscriber,
        subscriptionFee,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error(
      'useMetaMask must be used within a "MetaMaskContextProvider"',
    );
  }
  return context;
};

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};
