import React, {useEffect, useState} from 'react';
import {Dialog, DialogTitle } from "@mui/material";
import {BlockchainService} from "../../ethereum/BlockchainService";

type SubscriptionDetailsModalType = {
    isOpened: boolean,
    handleClose: () => void
}

export type SubscriptionDetails = {
    isActive: boolean,
    firstName: string,
    lastName: string,
    nextPaymentDue: {
        "_hex": string
    },
    email: string
}

export const SubscriptionDetailsModal = ({ isOpened, handleClose} : SubscriptionDetailsModalType) => {
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionDetails | null>(null);
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
    }, [])

    return (
        <Dialog onClose={handleClose} open={isOpened} >
            <DialogTitle sx={{ fontWeight: 'bold'}}>Your subscription data:</DialogTitle>
            {subscriptionData ? (
                <div style={{ width: '600px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', padding: '10px'}}>
                    <span> First name: {subscriptionData.firstName}</span>
                    <span> Last name: {subscriptionData.lastName}</span>
                    <span> Email: {subscriptionData.email}</span>
                    <span> Subscription is {subscriptionData.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                    <span> Next payment due: {new Date(Number(subscriptionData.nextPaymentDue._hex) * 1000).toLocaleDateString()}</span>
                </div>
            ): (
                <span> ni ma</span>
            )}
        </Dialog>
    )
}