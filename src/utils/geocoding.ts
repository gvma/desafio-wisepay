const axios = require('axios');

export async function getReverseGeocoding(latitude: number, longitude: number): Promise<any> {
    let res = null;
    await axios.get(`http://api.positionstack.com/v1/reverse?access_key=${process.env.GEO_ACCESS_KEY}&query=${latitude},${longitude}`)
        .then((response: { data: any; }) => {
            res = response.data;
        }).catch((error: any) => {
            console.log(error);
            return Promise.reject(new Error('Internal Server Error'));
        });

    return res;
}