import axios from 'axios';

export const fetchAbi = async () => {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/qs/665a324de41b4d34e4fc9bac');
        console.log(response.data.record);
        return response.data.record;
    } catch (error) {
        console.error('Error fetching ABI:', error);
        return [];
    }
};

export const fetchAddress = async () => {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/qs/665a4d48acd3cb34a850d6c3');
        console.log(response.data.record.value)
        return response.data.record.value;
    } catch (error) {
        console.error('Error fetching address:', error);
        return '';
    }
};