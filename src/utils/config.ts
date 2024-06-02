import { fetchAbi, fetchAddress } from './fetchConfig';

let config: {
    contractAddress: string;
    contractAbi: any[];
} = {
    contractAddress: '',
    contractAbi: []
};

const initializeConfig = async () => {
    try {
        const [abi, address] = await Promise.all([fetchAbi(), fetchAddress()]);
        config.contractAbi = abi;
        config.contractAddress = address;
    } catch (error) {
        console.error('Error initializing config:', error);
    }
};

initializeConfig();

export default config;