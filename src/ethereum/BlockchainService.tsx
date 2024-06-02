import { BigNumber, ethers, utils } from "ethers";
import { contractABI } from "./ContractAbi";
import { Subscription } from "../components/Subscribe/SubscribeModal";
import { SubscriptionDetails } from "../components/SubscriptionDetails/SubscriptionDetailsModal";
import { SubscriberListElement } from "../components/Subscriptions/SubscriptionsModal";
import { SubscriptionsRepository } from "./SubscriptionsRepository";
import config from "../utils/config";

// export const CONTRACT_ADDRESS = "0x7eC1e62455eD42053f8de4e45495a722055c3A6d";

export class BlockchainService {
  private readonly provider: ethers.providers.Web3Provider;
  private contractAddress: string;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.contractAddress = config.contractAddress;
  }

  public async isOwner(): Promise<boolean> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).isOwner();
  }

  public async isSubscriber(): Promise<boolean> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).isSubscribedUser(
      await signer.getAddress(),
    );
  }

  public async subscribe(
    subscription: Subscription,
    value: BigNumber,
  ): Promise<void> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).subscribe(
      subscription.email!,
      subscription.name,
      subscription.surname,
      { value },
    );
  }

  public async getSubscriberData(): Promise<SubscriptionDetails> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).checkSubscription(
      await signer.getAddress(),
    );
  }

  public async getSubscriberFee(): Promise<BigNumber> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).subscriptionFee();
  }

  public async unsubscribe(): Promise<void> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).unsubscribe();
  }

  public async renewSubscription(value: BigNumber): Promise<void> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).makePayment({ value });
  }

  public async updateSubscriptionFee(value: BigNumber): Promise<void> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).updateSubscriptionFee(value);
  }

  public async withdrawFunds(): Promise<void> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).withdrawFunds();
  }

  public async getAllSubscribers(): Promise<SubscriberListElement[]> {
    const signer = await this.provider.getSigner();
    return await this.getContract(signer).getAllSubscribers();
  }

  private getContract(signer: ethers.Signer) {
    return new ethers.Contract(
      this.contractAddress,
      config.contractAbi,
      this.provider,
    ).connect(signer) as SubscriptionsRepository;
  }

  public async subscribeTransaction(hash: string, onSuccess: () => void) {
    this.provider.once(hash, (transaction) => {
      onSuccess();
    });
  }
}
