import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center } from '@react-three/drei'

import {
    clamp,
    dragSpinSensitivity,
    frontFacingRotation,
    getAdvancedSequenceState,
    getFrameSource,
    getInitialSequenceState,
    getSequenceFrameCount,
    hiddenFaceThreshold,
    maxSpinVelocity,
    hoverHitAreaScale,
} from './imageCoinConfig'
import CoinModel from './CoinModel'

export default function ImageCoinScene({
    ariaLabel,
    backImagePath,
    className,
    frontImagePath,
    imageMode,
    modelScale,
    motionHints,
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
    const [isDragging, setIsDragging] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [sequenceState, setSequenceState] = useState(() => {
        return getInitialSequenceState(frameCount)
    })

    const classNames = ['image-coin', className].filter(Boolean).join(' ')

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
        '--image-coin-size': size,
        '--image-coin-stage-bleed': stageBleed,
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

    function getPointerIsInsideCoin(event) {
        const bounds = event.currentTarget.getBoundingClientRect()
        const centerX = bounds.left + bounds.width / 2
        const centerY = bounds.top + bounds.height / 2
        const deltaX = event.clientX - centerX
        const deltaY = event.clientY - centerY
        const radius = Math.min(bounds.width, bounds.height) / 2
        const hitRadius = radius * hoverHitAreaScale

        return Math.hypot(deltaX, deltaY) <= hitRadius
    }

    function handlePointerEnter(event) {
        setIsHovered(getPointerIsInsideCoin(event))
    }

    function handlePointerLeave() {
        setIsHovered(false)
    }

    function handlePointerDown(event) {
        if (!getPointerIsInsideCoin(event)) return

        isDraggingRef.current = true
        setIsDragging(true)
        lastPointerXRef.current = event.clientX
        lastPointerTimeRef.current = performance.now()
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    function handlePointerMove(event) {
        setIsHovered(getPointerIsInsideCoin(event))

        if (!isDraggingRef.current) return

        const now = performance.now()
        const deltaX = event.clientX - lastPointerXRef.current
        const deltaTime = Math.max((now - lastPointerTimeRef.current) / 1000, 1 / 60)

        dragRotationDeltaRef.current += deltaX * dragSpinSensitivity

        spinVelocityRef.current = clamp(
            deltaX * dragSpinSensitivity / deltaTime,
            -maxSpinVelocity,
            maxSpinVelocity,
    hoverHitAreaScale,
        )
        lastPointerXRef.current = event.clientX
        lastPointerTimeRef.current = now
    }

    function handlePointerUp(event) {
        isDraggingRef.current = false
        setIsDragging(false)

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
            data-is-dragging={isDragging}
            data-is-hovered={isHovered}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
        >
            <div className="image-coin__stage">
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
                                isHovered={isHovered}
                                modelScale={modelScale}
                                motionHints={motionHints}
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
