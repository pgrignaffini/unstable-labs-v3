import Sound from 'react-sound'

const musicURL = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/QmaPnuVtjLeBTiQxM5FfoG5iVF7tvzUVNgC1SVgKSL1Hjq`

function PlayBackgroundMusic() {

    return (
        <Sound
            url={musicURL}
            autoLoad={true}
            loop={true}
            volume={70}
            playStatus="PLAYING"
            playFromPosition={300 /* in milliseconds */}
        />
    )
}

export default PlayBackgroundMusic