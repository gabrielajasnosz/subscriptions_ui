import React, { useEffect, useState } from 'react';
import {Dialog, DialogTitle, styled, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import { BlockchainService } from "../../ethereum/BlockchainService";
import { BigNumber, ethers } from "ethers";
import Table from '@mui/material/Table';

type SubscriptionsModalType = {
    isOpened: boolean;
    handleClose: () => void;
};

export type SubscriberListElement = {
    subscriberAddress: string;
    nextPaymentDue: BigNumber;
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


export const SubscriptionsModal = ({ isOpened, handleClose }: SubscriptionsModalType) => {
    const [subscribers, setSubscribers] = useState<SubscriberListElement[] | []>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const service = new BlockchainService();
        service.getAllSubscribers().then((data) => {
            console.log(data);
            setSubscribers(data);
        }).catch((e) => console.log(e));
    }, []);

    return (
        <Dialog onClose={handleClose} open={isOpened} PaperProps={{
            sx: {
                width: '1400px', // Ustawienie szerokości
                maxWidth: 'unset',
                padding: '20px'
            },
        }} >
            <DialogTitle sx={{ fontWeight: 'bold' }}>Subscriptions list:</DialogTitle>
            <TextField
                label="Search…"
                required={false}
                sx={{ width: '200px', height: '50px', margin: '0px 20px' }}
                onChange={(v) => setSearchQuery(v.target.value)}
            />
            <div>
                <Table
                    size="medium"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ maxWidth: '30px', textOverflow: 'scroll', fontWeight: 'bold'}}>
                                Address
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                First name
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                Last name
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                E-mail
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                Is subscribed now?
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                Expiration date
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                Is subscription active?
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subscribers
                            .filter(includesQuery(searchQuery))
                            .map((sub) => (
                                <TableRow
                                    key={sub.subscriberAddress}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        height: '50px !important',
                                    }}
                                >
                                    <TableCell align="center" sx={{ maxWidth: '30px', overflow: 'scroll'}} >
                                        {sub.subscriberAddress}
                                    </TableCell>
                                    <TableCell align="center">
                                        {sub.firstName}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                    >
                                        {sub.lastName}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                    >
                                        {sub.email}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                    >
                                        {sub.isSubscribed ? 'Yes' : 'No'}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                    >
                                        {new Date(Number(sub.nextPaymentDue._hex) * 1000).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                    >
                                        {sub.isSubscriptionActive ? 'Active' : 'Inactive'}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </Dialog>
    );
};
