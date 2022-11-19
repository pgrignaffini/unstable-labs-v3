Hello and welcome to Unstable Labs, the first and only AI text-to-image NFT generator on the blockchain. Here at Unstable Labs, we want to provide you with a toolset to produce one-of-a-kind art and maintain ownership of it using NFT technology. We are utilizing the new state-of-the-art deep learning model, known as stable diffusion, to allow you to create your own works of art and mint them to the blockchain. To get started head over to the [brewery](https://www.unstablelabs.app/collections) and pick up some vials. Then, make your way to the [lab](https://www.unstablelabs.app) and start brewing something beautiful. We offer a one-time airdrop on our home page for users who sign in with their discord. If you need some testnet eth, please go to the [faucet](https://aurora.dev/faucet).

## How to run
This frontend need to connect to the Stable Diffusion api. You can clone the repo https://github.com/iamianM/stable-diffusion-webui-ian.git
You can use the docker image runpod/stable-diffusion:web-automatic-1.5 and replace the stable-diffusion-webui folder with that repo. We used https://www.runpod.io/ to host our gpu server which uses that docker image in their template with the same name. 
 
## Inspiration
We were inspired by the generative art NFT platform, ArtBlocks. With this platform, artists create a script that randomly generates a work of art using the seed of the minted NFT. This is a perfect use-case for NFT technology, and we hope to do for AI art what ArtBlocks has done for generative art. The fun of ArtBlocks is that users feel they had a part to play in the creation of the art. Here at Unstable Labs, they will play an even bigger role as they get to decide what actually gets generated. 
 
## How we built it
What is stable diffusion? Stable diffusion uses a new technology that allows you to submit text to a model that will produce an image associated with that text. The first of its kind model, Dall-e 2 was released by OpenAI earlier this year and the technology has experienced exponential growth. The community has developed numerous resources for using the model, and we took advantage of one repo and forked it to have an API that exposes the necessary parts of the model for us. This, along with all the models we need, are hosted on a GPU instance on runpod.io. This server is quite expensive, so please take advantage of our hosting of it and go make some NFTs!
 
## What it does
Unstable Labs allows users to create amazing pieces of art with our stable diffusion model. To obtain high-quality results, you basically write an essay that the AI can understand, which can take quite some time. This process has been dubbed “prompt-engineering” and requires a lot of time and understanding of what words the AI likes to see. An example of a prompt for creating an awesome image of a frog I found on the website playgroundai.com is:
`splash art of a (tropical frog:1.1) on a leaf, jungle in the background, (moss:1.2), branches, vivid, colorful, by artist greg rutkowski, bokeh, trending on artstation, highly detailed, volumetric, godrays, beautiful, wallpaper, flowers, plants, (four legs:1.3)`
The user added extra words to improve the quality of the image and it likely took them hours of trying different combinations to generate their image. We improved the user experience by designing what we call “Collection Vials”. We created 18 different prompts, or “Collection Vials”, that are pre-engineered to consistently produce quality images, as well as aesthetically similar ones. We believe this is a better experience, as users can simply type “dog” if they want to get quality results. This Vial creates “sets” of images, all belonging to the collection. We want to release these as curated sets with a limited amount of each, similar to how ArtBlocks curated sets of artwork. We were able to come up with 18 different collection vials.
Similarly, we have “Concept Vials”, which are fine-tuned models on a set of aesthetically similar images, instead of using the pre-made prompts. This training adds a new word to the model and lets us direct the model to produce images with that aesthetic.
Next, we have our “Remix Vial”. This differs from the previous vials in that image-to-image is being used to create variations of the selected image. This Vial will come in handy when a user is close to the design they want, but not quite there yet.
The next few vials are super exciting but will be coming soon, so keep an eye out! First, we have our “Personalize Vial”, which is actually a bit of a pun because it allows you to add a person into the model. I have done this to myself and my dog, which you can see in the presentation. This was made possible with just 20 photos of myself. We plan to allow users to upload photos or link to their Instagram account to be able to create personalized artwork of themselves. We think this will be interesting because you can mix this Via, l with others. Seeing how different Vials react with one-another is going to be very exciting.
For our next vial, the “Alteration Vial”, we use a tool called “in-painting”, which allows the user to erase part of their image and change their prompt to specify the change they would like to see. An example I made was adding a top-hat to one of my dogs, Cooper’s, NFTs.
Lastly, we have the “Stylize Vial”, which allows us to add a style to an existing image. For example, I could turn a regular image of my corgi into a Pixar corgi. I think users can really have a lot of fun with this one since it can be used on their already existing NFTs or their uploaded images.
 
## Challenges we ran into
The stable diffusion technology has been exponentially improving over the past two months of the hackathon. It has been challenging to keep up with all the new features and improvements. We had envisioned a lab where users could create artwork from the very beginning but struggled to find a way to use the technology in the right way. I am very proud of the product we were able to create and believe users will enjoy what we have to offer. There were additional challenges with hosting the model correctly and creating an API that was quick and allowed us to access the features we needed. 
 
## Accomplishments that we're proud of
We are very proud of having a great looking and functioning site. A lot of time went into creating the aesthetic and removing any bugs. We believe anyone can easily sign up and start creating artworks immediately. 
 
We are also very proud of the product we were able to come up with. We think it’s a lot of fun to use our curated Vials and believe it is preferable to just interacting with the base model. 
 
## What we learned
We learned so much about this exciting new technology. We have followed the Stable Diffusion community over the past two months and joined in to help build with them. This is just the beginning of an artistic revolution, and we are very excited to have had the chance to grow with it during this hackathon and be able to make use of it so early.
 
## What's next for Unstable Labs
Unstable Labs has so much more to offer than what we have released during the hackathon. We are looking forward to engaging the community with a variety of specialty Vials already created and ready to release. Our goal is to build a strong community that can view, interact, and trade each other’s artwork. We look forward to releasing on mainnet soon after the hackathon ends. We will also be applying for grants to hopefully get some funding to continue our building (and paying for the server).
