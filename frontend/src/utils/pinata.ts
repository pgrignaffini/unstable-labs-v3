const pinataGateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY
const jwt = process.env.NEXT_PUBLIC_PINATA_JWT;
import axios from 'axios'
import FormData from 'form-data'

export type Metadata = {
    name: string;
    description?: string | undefined;
    image: string;
}

export const uploadMetadataToIPFS = async ({ ...props }: Metadata) => {
    const nftJSON = {
        name: props?.name,
        description: props?.description,
        image: props?.image,
    }
    console.log(nftJSON)
    try {
        const response = await uploadJSONToIPFS(nftJSON);
        if (response.status === 200) {
            const pinataURL = pinataGateway + "/" + response.data.IpfsHash
            console.log("Uploaded metadata to Pinata: ", pinataURL);
            return pinataURL;
        }
    } catch (error) {
        console.log("Error uploading metadata to Pinata: ", error);
        throw new Error();
    }
}

export const uploadJSONToIPFS = async (JSONBody: Metadata) => {
    const data = JSON.stringify({
        "pinataContent": {
            "name": JSONBody.name,
            "description": JSONBody.description,
            "image": JSONBody.image,
        }
    })

    const config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        data: data
    };

    const res = await axios(config);
    return res
};

export const uploadFileToIPFS = async (file: any) => {
    //making axios POST request to Pinata ⬇️
    const data = new FormData();
    data.append('file', file);

    const config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        headers: {
            'Authorization': `Bearer ${jwt}`,
        },
        data: data
    };

    const res = await axios(config);
    console.log(res.data);
    return res.data;
};