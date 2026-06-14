import ProfileCoin from './ProfileCoin'
import {
    profileCoinImageModes,
    waterDragonHandSignAtlas,
} from '../data/profileCoinSources'

function ProfileImage() {
    return (
        <ProfileCoin
            imageMode={profileCoinImageModes.sequenceMarch}
            source={waterDragonHandSignAtlas}
            size="14rem"
            modelScale={0.95}
            ariaLabel="Interactive 3D profile coin showing the Water Dragon hand-sign sequence"
        />
    )
}

export default ProfileImage