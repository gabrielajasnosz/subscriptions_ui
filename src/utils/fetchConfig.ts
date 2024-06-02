import axios from 'axios';

const fetchAbi = async () => {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/qs/665a2354ad19ca34f872528d');
        console.log(response.data.record)
        return response.data.record;
    } catch (error) {
        console.error('Error fetching ABI:', error);
        return [];
    }
};

const fetchAddress = async () => {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/qs/665a233ae41b4d34e4fc9658');

        console.log(response.data.record.value)
        return response.data.record.value;
    } catch (error) {
        console.error('Error fetching address:', error);
        return '';
    }
};

export { fetchAbi, fetchAddress };