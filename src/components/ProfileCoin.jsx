import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center } from '@react-three/drei'

import './ProfileCoin.css'

import {
    clamp,
    defaultImagePath,
    dragSpinSensitivity,
    frontFacingRotation,
    getAdvancedSequenceState,
    getFrameSource,
    getInitialSequenceState,
    getSequenceFrameCount,
    hiddenFaceThreshold,
    maxSpinVelocity,
} from './profileCoin/profileCoinConfig'
import CoinModel from './profileCoin/CoinModel'

function ProfileCoinScene({
    ariaLabel,
    backImagePath,
    className,
    frontImagePath,
    imageMode,
    modelScale,
    size,
    source,
    stageBleed,
}) {
    const frameCount = getSequenceFrameCount(source)
    const hasSequence = frameCount > 0 && imageMode !== 'faces'
    const dragRotationDeltaRef = useRef(0)
    const isDraggingRef = useRef(false)
    const lastPointerXRef = useRef(0)
    const lastPointerTimeRef = useRef(0)
    const spinVelocityRef = useRef(0)
    const frontWasVisibleRef = useRef(true)
    const backWasVisibleRef = useRef(false)
    const frontSwappedWhileHiddenRef = useRef(false)
    const backSwappedWhileHiddenRef = useRef(false)
    const [sequenceState, setSequenceState] = useState(() => {
        return getInitialSequenceState(frameCount)
    })

    const classNames = ['profile-coin', className].filter(Boolean).join(' ')

    const frontFrameSource = hasSequence
        ? getFrameSource(source, sequenceState.frontFrameIndex, frontImagePath)
        : {
            type: 'image',
            src: frontImagePath,
        }

    const backFrameSource = hasSequence
        ? getFrameSource(source, sequenceState.backFrameIndex, backImagePath)
        : {
            type: 'image',
            src: backImagePath,
        }

    const style = {
        '--profile-coin-size': size,
        '--profile-coin-stage-bleed': stageBleed,
    }

    function handleRotationChange(rotation) {
        if (!hasSequence || frameCount < 2) return

        const frontVisibility = Math.cos(rotation - frontFacingRotation)
        const frontIsVisible = frontVisibility > hiddenFaceThreshold
        const frontIsHidden = frontVisibility < -hiddenFaceThreshold
        const backIsVisible = frontVisibility < -hiddenFaceThreshold
        const backIsHidden = frontVisibility > hiddenFaceThreshold

        if (frontIsVisible) {
            frontWasVisibleRef.current = true
            frontSwappedWhileHiddenRef.current = false
        }

        if (backIsVisible) {
            backWasVisibleRef.current = true
            backSwappedWhileHiddenRef.current = false
        }

        if (
            frontIsHidden
            && frontWasVisibleRef.current
            && !frontSwappedWhileHiddenRef.current
        ) {
            setSequenceState((currentState) => {
                return getAdvancedSequenceState(
                    currentState,
                    'front',
                    frameCount,
                    imageMode,
                )
            })
            frontWasVisibleRef.current = false
            frontSwappedWhileHiddenRef.current = true
        }

        if (
            backIsHidden
            && backWasVisibleRef.current
            && !backSwappedWhileHiddenRef.current
        ) {
            setSequenceState((currentState) => {
                return getAdvancedSequenceState(
                    currentState,
                    'back',
                    frameCount,
                    imageMode,
                )
            })
            backWasVisibleRef.current = false
            backSwappedWhileHiddenRef.current = true
        }
    }

    function handlePointerDown(event) {
        isDraggingRef.current = true
        lastPointerXRef.current = event.clientX
        lastPointerTimeRef.current = performance.now()
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    function handlePointerMove(event) {
        if (!isDraggingRef.current) return

        const now = performance.now()
        const deltaX = event.clientX - lastPointerXRef.current
        const deltaTime = Math.max((now - lastPointerTimeRef.current) / 1000, 1 / 60)

        dragRotationDeltaRef.current += deltaX * dragSpinSensitivity

        spinVelocityRef.current = clamp(
            deltaX * dragSpinSensitivity / deltaTime,
            -maxSpinVelocity,
            maxSpinVelocity,
        )
        lastPointerXRef.current = event.clientX
        lastPointerTimeRef.current = now
    }

    function handlePointerUp(event) {
        isDraggingRef.current = false

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }
    }

    return (
        <div
            className={classNames}
            style={style}
            role="img"
            aria-label={ariaLabel}
            data-image-mode={imageMode}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
        >
            <div className="profile-coin__stage">
                <Canvas camera={{ position: [0, 0, 5.2], fov: 35 }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[2, 3, 4]} intensity={2} />

                    <Suspense fallback={null}>
                        <Center>
                            <CoinModel
                                backFrameSource={backFrameSource}
                                dragRotationDeltaRef={dragRotationDeltaRef}
                                frontFrameSource={frontFrameSource}
                                isDraggingRef={isDraggingRef}
                                modelScale={modelScale}
                                onRotationChange={handleRotationChange}
                                spinVelocityRef={spinVelocityRef}
                            />
                        </Center>
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}

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