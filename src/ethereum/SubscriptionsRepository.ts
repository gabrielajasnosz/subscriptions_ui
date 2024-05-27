import { BaseContract, BigNumber } from "ethers";

export interface SubscriptionsRepository extends BaseContract {
  owner(): Promise<string>;
  subscriptionFee(): Promise<BigNumber>;
  subscriptionPeriod(): Promise<BigNumber>;

  subscribers(_subscriber: string): Promise<{
    subscriptionDue: BigNumber;
    isSubscribed: boolean;
    email: string;
    firstName: string;
    lastName: string;
  }>;

  subscribe(
    email: string,
    firstName: string,
    lastName: string,
    options?: { value: BigNumber },
  ): Promise<void>;
  unsubscribe(): Promise<void>;
  makePayment(options?: { value: BigNumber }): Promise<void>;
  checkSubscription(_subscriber: string): Promise<{
    isActive: boolean;
    subscriptionDue: BigNumber;
    email: string;
    firstName: string;
    lastName: string;
  }>;

  getAllSubscribers(): Promise<
    {
      subscriberAddress: string;
      subscriptionDue: BigNumber;
      isSubscribed: boolean;
      email: string;
      firstName: string;
      lastName: string;
      isSubscriptionActive: boolean;
    }[]
  >;

  withdrawFunds(): Promise<void>;
  updateSubscriptionFee(_newFee: BigNumber): Promise<void>;
  isOwner(): Promise<boolean>;

  isSubscribedUser(user: string): Promise<boolean>;
}
