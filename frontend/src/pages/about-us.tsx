import Link from "next/link"

function AboutUsPage() {
    return (
        <main className="container mx-auto flex min-h-screen flex-col items-center mt-10 p-4">
            <h1 className="text-4xl font-bold text-acid">About Us</h1>
            <div className="flex flex-col space-y-24 w-2/3 mt-24">
                <div className="flex items-center space-x-10">
                    <img src="/Ian.png" alt="avatar" className="w-32 h-32" />
                    <p className="text-md flex-1 text-justify">
                        Hello
                    </p>
                </div>
                <div className="flex items-center space-x-10">
                    <img src="/Paolo.jpeg" alt="avatar" className="w-32 h-32" />
                    <p className="text-md flex-1">
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