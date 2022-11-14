import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import nc from "next-connect";
import cors from "cors";

const body = {
    prompt: "",
    style: "",
    image: "",
    vial: "vary"
}

const handler = nc()
    .use(cors())
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        const { prompt, style, image } = req.body
        body.prompt = prompt as string
        body.style = style as string
        body.image = image as string
        // console.log({ ...body })
        axios.post(`${process.env.API_BASE_URL}/sdapi/v1/img2imgLab`, {
            timeout: 1000 * 60 * 10,
            ...body,
            headers: { 'accept': 'application/json' }
        }).then((response) => {
            res.status(200).json(response.data)
        }).catch((error) => {
            if (axios.isAxiosError(error)) {
                res.status(500).json(error.message)
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' })
            }
        })
    })

export default handler