import './ImageCoin.css'

import { defaultImagePath } from './imageCoin/imageCoinConfig'
import ImageCoinScene from './imageCoin/ImageCoinScene'

const defaultMotionHints = Object.freeze({
    hoverLift: true,
    idleNudge: false,
})

/**
 * @param {object} props
 * @param {string} [props.ariaLabel] - Accessible label for the interactive coin.
 * @param {string} [props.backImagePath] - Back face image used in faces mode.
 * @param {string} [props.className] - Optional extra class name.
 * @param {string} [props.frontImagePath] - Front face image used in faces mode.
 * @param {ImageCoinImageMode} [props.imageMode='faces'] - Controls how coin face images are selected.
 * @param {number} [props.modelScale] - Scale applied to the loaded coin model.
 * @param {object} [props.motionHints] - Optional visual hints that suggest the coin is interactive.
 * @param {boolean} [props.motionHints.hoverLift=true] - Lift/tilt the coin while hovered.
 * @param {boolean} [props.motionHints.idleNudge=false] - Occasionally nudge the coin while idle.
 * @param {string} [props.size] - CSS size for the interactive coin area.
 * @param {ImageCoinAtlasSource} [props.source] - Image sequence source for sequence modes.
 * @param {string} [props.stageBleed] - Extra invisible canvas area around the coin to prevent clipping.
 */
function ImageCoin({
    ariaLabel = 'Interactive 3D image coin',
    backImagePath = defaultImagePath,
    className = '',
    frontImagePath = defaultImagePath,
    imageMode = 'faces',
    modelScale = 0.95,
    motionHints = {},
    size = '14rem',
    source = null,
    stageBleed = '4rem',
}) {
    const resolvedMotionHints = {
        ...defaultMotionHints,
        ...motionHints,
    }

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
        <ImageCoinScene
            key={sceneKey}
            ariaLabel={ariaLabel}
            backImagePath={backImagePath}
            className={className}
            frontImagePath={frontImagePath}
            imageMode={imageMode}
            modelScale={modelScale}
            motionHints={resolvedMotionHints}
            size={size}
            source={source}
            stageBleed={stageBleed}
        />
    )
}

export default ImageCoin