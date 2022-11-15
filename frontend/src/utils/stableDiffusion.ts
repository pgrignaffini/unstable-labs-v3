import axios from 'axios'
import type { Progress, Request } from "../types/types"

export const text2Image = async (prompt: string, selectedStyle: string) => {
    const response = await axios.post("/api/stable-diffusion/txt2img", {
        prompt,
        style: selectedStyle,
    }).catch((err) => {
        console.log(err)
    })
    return response?.data
}

export const image2Image = async (prompt: string, selectedStyle: string, selectedImage: string) => {
    const response = await axios.post("/api/stable-diffusion/img2img", {
        prompt,
        style: selectedStyle,
        image: selectedImage,
    }).catch((err) => {
        console.log(err)
    })
    console.log(response)
    return response?.data
}

export const checkProgress = async (req: Request) => {
    const response = await axios.get("/api/stable-diffusion/check-progress")
        .catch((err) => {
            console.log(err)
        })
    const progress: Progress = response?.data
    progress.state.done = false
    console.log("Progress", progress)
    if (progress.state.job_no === req.job_no &&
        progress.state.job !== req.job_hash) progress.state.done = true
    if (progress.state.job_no === 0 &&
        progress.state.job_count === 0) progress.state.done = true
    return progress
}

export const getImages = async (req: Request) => {
    const response = await axios.get("/api/stable-diffusion/get-images", {
        params: { job_hash: req?.job_hash },
    }).catch((err) => {
        console.log(err)
    })
    const images = response?.data.split("\n")
    return images
}