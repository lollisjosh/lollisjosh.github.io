import ProfileCoin from './ProfileCoin'
import {
    imageCoinImageModes,
    waterDragonHandSignAtlas,
} from '../data/imageCoinSources'

function ProfileImage() {
    return (
        <ProfileCoin
            imageMode={imageCoinImageModes.sequenceMarch}
            source={waterDragonHandSignAtlas}
            size="14rem"
            modelScale={0.95}
            ariaLabel="Interactive 3D profile coin showing the Water Dragon hand-sign sequence"
        />
    )
}

export default ProfileImage