import Link from "next/link"


function VisionPage() {
    return (
        <main className="container mx-auto flex min-h-screen flex-col items-center space-y-10 mt-10 p-4">
            <h1 className="text-4xl font-bold">Our Vision</h1>
            <p className="text-justify">
                Welcome to <span className="text-acid">Unstable</span> Labs! The first and only AI text-to-image NFT generator on the blockchain.<br />
                Here at <span className="text-acid">Unstable</span> Labs, we want to provide you with a toolset to produce one-of-a-kind art and maintain ownership of it using NFT technology.<br />
                We are utilizing the new state-of-the-art deep learning model, known as <Link href="https://huggingface.co/spaces/stabilityai/stable-diffusion" target="_blank" className="text-acid underline"> stable diffusion</Link>, to allow you to create your own works of art and mint them to the blockchain.<br />
                Stable diffusion uses a new technology that allows you to submit text to a model that will produce an image associated with that text. The first of its kind model, Dall-e 2 was released by OpenAI earlier this year and the technology has experienced exponential growth. The community has developed numerous resources for using the model, and we took advantage of one repo and forked it to have an API that exposes the necessary parts of the model for us. This, along with all the models we need, are hosted on a GPU instance on runpod.io. This server is quite expensive, so please take advantage of our hosting of it and go make some NFTs!<br />
                To get started head over to the <Link href="/collections" className="text-acid underline">brewery</Link> and pick up some vials. Then, make your way to the  <Link href="/" className="text-acid underline">lab</Link> and start brewing something beautiful.<br />
                We offer a one-time airdrop on our home page for users who sign in with their Discord.<br />
                If you need some testnet eth, please go to the <Link href="https://aurora.dev/faucet" target="_blank" className="text-acid underline">faucet</Link>.<br />
                We are looking forward to engaging the community with a variety of specialty Vials already created and ready to release. Our goal is to build a strong community that can view, interact, and trade each other&apos;s artwork. We look forward to releasing on mainnet soon after the hackathon ends. We will also be applying for grants to hopefully get some funding to continue our building (and paying for the server).
            </p>
        </main>
    )
}

export default VisionPage