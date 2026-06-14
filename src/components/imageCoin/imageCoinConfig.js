export const coinModelPath = '/assets/models/pfp-coin.glb'
export const defaultImagePath = '/assets/images/pfp.png'
export const frontFacingRotation = Math.PI
export const fullTurn = Math.PI * 2
export const hiddenFaceThreshold = 0.28
export const dragSpinSensitivity = 0.016
export const maxSpinVelocity = 42
export const spinDecayPerSecond = 0.48
export const snapVelocityThreshold = 0.18
export const snapStrength = 7
export const hoverLiftRotationY = 0.75
export const hoverLiftEasePerSecond = 10
export const hoverHitAreaScale = 0.86

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

export function getNearestFrontRotation(rotation) {
    return frontFacingRotation
        + Math.round((rotation - frontFacingRotation) / fullTurn) * fullTurn
}

export function getSequenceFrameCount(source) {
    if (!source) return 0

    if (source.type === 'atlas') {
        return source.frameCount
    }

    if (source.type === 'images') {
        return source.frames.length
    }

    return 0
}

export function getInitialSequenceState(frameCount) {
    return {
        frontFrameIndex: 0,
        backFrameIndex: frameCount > 1 ? 1 : 0,
        nextFrameIndex: frameCount > 2 ? 2 : 0,
    }
}

export function getAdvancedSequenceState(currentState, faceName, frameCount, imageMode) {
    if (frameCount < 1) return currentState

    const selectedFrameIndex = imageMode === 'sequence-loop'
        ? currentState.nextFrameIndex % frameCount
        : Math.min(currentState.nextFrameIndex, frameCount - 1)

    const nextFrameIndex = imageMode === 'sequence-loop'
        ? currentState.nextFrameIndex + 1
        : Math.min(currentState.nextFrameIndex + 1, frameCount - 1)

    return {
        ...currentState,
        [`${faceName}FrameIndex`]: selectedFrameIndex,
        nextFrameIndex,
    }
}

export function getFrameSource(source, frameIndex, fallbackImagePath) {
    if (!source) {
        return {
            type: 'image',
            src: fallbackImagePath,
        }
    }

    if (source.type === 'atlas') {
        return {
            type: 'atlas',
            src: source.src,
            columns: source.columns,
            rows: source.rows,
            frameIndex: Math.min(frameIndex, source.frameCount - 1),
        }
    }

    if (source.type === 'images') {
        return {
            type: 'image',
            src: source.frames[Math.min(frameIndex, source.frames.length - 1)],
        }
    }

    return {
        type: 'image',
        src: fallbackImagePath,
    }
}
