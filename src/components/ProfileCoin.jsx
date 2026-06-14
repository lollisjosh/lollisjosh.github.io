import './ProfileCoin.css'

import { defaultImagePath } from './profileCoin/profileCoinConfig'
import ProfileCoinScene from './profileCoin/ProfileCoinScene'

/**
 * @param {object} props
 * @param {string} [props.ariaLabel] - Accessible label for the interactive coin.
 * @param {string} [props.backImagePath] - Back face image used in faces mode.
 * @param {string} [props.className] - Optional extra class name.
 * @param {string} [props.frontImagePath] - Front face image used in faces mode.
 * @param {ProfileCoinImageMode} [props.imageMode='faces'] - Controls how coin face images are selected.
 * @param {number} [props.modelScale] - Scale applied to the loaded coin model.
 * @param {string} [props.size] - CSS size for the interactive coin area.
 * @param {ProfileCoinSource} [props.source] - Image sequence source for sequence modes.
 * @param {string} [props.stageBleed] - Extra invisible canvas area around the coin to prevent clipping.
 */
function ProfileCoin({
    ariaLabel = 'Profile picture rendered on an interactive 3D coin',
    backImagePath = defaultImagePath,
    className = '',
    frontImagePath = defaultImagePath,
    imageMode = 'faces',
    modelScale = 0.95,
    size = '14rem',
    source = null,
    stageBleed = '4rem',
}) {
    const sceneKey = [
        imageMode,
        frontImagePath,
        backImagePath,
        source?.type,
        source?.src,
        source?.frameCount,
        source?.frames?.join('|'),
    ].filter(Boolean).join('::')

    return (
        <ProfileCoinScene
            key={sceneKey}
            ariaLabel={ariaLabel}
            backImagePath={backImagePath}
            className={className}
            frontImagePath={frontImagePath}
            imageMode={imageMode}
            modelScale={modelScale}
            size={size}
            source={source}
            stageBleed={stageBleed}
        />
    )
}

export default ProfileCoin