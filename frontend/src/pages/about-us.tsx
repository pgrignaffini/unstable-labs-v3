import Link from "next/link"

function AboutUsPage() {
    return (
        <main className="container mx-auto flex min-h-screen flex-col items-center mt-10 p-4">
            <h1 className="text-4xl font-bold text-acid">About Us</h1>
            <div className="flex flex-col space-y-24 w-full lg:w-2/3 mt-24">
                <div className="flex flex-col space-y-4 lg:flex-row items-center lg:space-x-10">
                    <img src="/Ian.png" alt="avatar" className="w-32 h-32" />
                    <p className="text-sm lg:text-md flex-1 text-justify">
                        Hi, I am Ian McCann and I have been a Data Scientist for 7 years. <br />
                        I have been working in web3 for the past year and was very excited to get the chance to blend together my data science and web3 skills for this hackathon. <br />
                        Feel free to reach out to me on Discord at Pokey#7986 if you&apos;d like to chat.<br />
                    </p>
                </div>
                <div className="flex flex-col space-y-4 lg:flex-row items-center lg:space-x-10">
                    <img src="/Paolo.jpeg" alt="avatar" className="w-32 h-32" />
                    <p className="text-sm lg:text-md flex-1 text-justify">
                        Hi! My name is Paolo, I am a freelance full-stack Web3 dev.<br />
                        I&apos;ve been working on the frontend and smart contracts for <span className="text-acid">Unstable</span>Labs, it was a lot of fun!<br />
                        I am an outgoing guy who loves <span className="text-acid">BUIDLING</span> and Web3.<br />
                        Check out my <Link href="https://pulesdev.vercel.app/" target="_blank" className="text-acid underline"> website</Link> to learn more about my work
                    </p>
                </div>
            </div>
        </main>
    )
}

export default AboutUsPage