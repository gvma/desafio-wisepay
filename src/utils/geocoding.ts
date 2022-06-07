const axios = require('axios');

export const isValidCountry = async (latitude: number, longitude: number): Promise<boolean> => {
    const { data } = await getReverseGeocoding(latitude, longitude);

    if (data?.[0].country === 'Brazil' || data?.[0].country === 'Angola') {
        return true;
    }

    return false;
}

export const getReverseGeocoding = (latitude: number, longitude: number): Promise<any> => {
    return axios.get(`http://api.positionstack.com/v1/reverse?access_key=${process.env.GEO_ACCESS_KEY}&query=${latitude},${longitude}`)
        .then((response: { data: any; }) => {
            return Promise.resolve(response.data);
        }).catch((error: any) => {
            console.log(error);
            return Promise.reject(new Error('Internal Server Error'));
        });

}