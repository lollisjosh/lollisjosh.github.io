import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, useGLTF, useTexture } from '@react-three/drei'
import { MeshStandardMaterial, SRGBColorSpace } from 'three'

import './ProfileCoin.css'

const coinModelPath = '/assets/models/pfp-coin.glb'
const defaultImagePath = '/assets/images/pfp.png'
const frontFacingRotation = Math.PI
const fullTurn = Math.PI * 2
const hiddenFaceThreshold = 0.28
const dragSpinSensitivity = 0.016
const maxSpinVelocity = 42
const spinDecayPerSecond = 0.48
const snapVelocityThreshold = 0.18
const snapStrength = 7

/**
 * @typedef {'faces' | 'sequence-loop' | 'sequence-march'} ProfileCoinImageMode
 */

/**
 * @typedef {'atlas' | 'images'} ProfileCoinSourceType
 */

/**
 * @typedef {object} ProfileCoinAtlasSource
 * @property {'atlas'} type
 * @property {string} src
 * @property {number} columns
 * @property {number} rows
 * @property {number} frameCount
 */

/**
 * @typedef {object} ProfileCoinImageSequenceSource
 * @property {'images'} type
 * @property {string[]} frames
 */

/**
 * @typedef {ProfileCoinAtlasSource | ProfileCoinImageSequenceSource} ProfileCoinSource
 */

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

function getNearestFrontRotation(rotation) {
    return frontFacingRotation
        + Math.round((rotation - frontFacingRotation) / fullTurn) * fullTurn
}

function getSequenceFrameCount(source) {
    if (!source) return 0

    if (source.type === 'atlas') {
        return source.frameCount
    }

    if (source.type === 'images') {
        return source.frames.length
    }

    return 0
}

function getInitialSequenceState(frameCount) {
    return {
        frontFrameIndex: 0,
        backFrameIndex: frameCount > 1 ? 1 : 0,
        nextFrameIndex: frameCount > 2 ? 2 : 0,
    }
}

function getAdvancedSequenceState(currentState, faceName, frameCount, imageMode) {
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

function getFrameSource(source, frameIndex, fallbackImagePath) {
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

function applyFrameToTexture(texture, frameSource) {
    texture.colorSpace = SRGBColorSpace
    texture.flipY = false
    texture.repeat.set(1, 1)
    texture.offset.set(0, 0)

    if (frameSource.type === 'atlas') {
        const column = frameSource.frameIndex % frameSource.columns
        const row = Math.floor(frameSource.frameIndex / frameSource.columns)

        texture.repeat.set(1 / frameSource.columns, 1 / frameSource.rows)
        texture.offset.set(
            column / frameSource.columns,
            row / frameSource.rows,
        )
    }

}

function CoinModel({
    backFrameSource,
    dragRotationDeltaRef,
    frontFrameSource,
    isDraggingRef,
    modelScale,
    onRotationChange,
    spinVelocityRef,
}) {
    const groupRef = useRef(null)
    const { scene } = useGLTF(coinModelPath)

    const texturePaths = useMemo(() => {
        return [
            frontFrameSource.src,
            backFrameSource.src,
        ]
    }, [backFrameSource.src, frontFrameSource.src])

    const [frontTextureSource, backTextureSource] = useTexture(texturePaths)

    const frontDisplayTexture = useMemo(() => {
        return frontTextureSource.clone()
    }, [frontTextureSource])

    const backDisplayTexture = useMemo(() => {
        return backTextureSource.clone()
    }, [backTextureSource])

    const frontMaterial = useMemo(() => {
        return new MeshStandardMaterial({
            map: frontDisplayTexture,
            roughness: 0.65,
            metalness: 0.05,
        })
    }, [frontDisplayTexture])

    const backMaterial = useMemo(() => {
        return new MeshStandardMaterial({
            map: backDisplayTexture,
            roughness: 0.65,
            metalness: 0.05,
        })
    }, [backDisplayTexture])

    const rimMaterial = useMemo(() => {
        return new MeshStandardMaterial({
            color: '#181986',
            roughness: 0.45,
            metalness: 0.25,
        })
    }, [])

    useLayoutEffect(() => {
        applyFrameToTexture(frontDisplayTexture, frontFrameSource)
        applyFrameToTexture(backDisplayTexture, backFrameSource)
    }, [
        backDisplayTexture,
        backFrameSource,
        frontDisplayTexture,
        frontFrameSource,
    ])

    useEffect(() => {
        return () => {
            frontDisplayTexture.dispose()
            backDisplayTexture.dispose()
        }
    }, [backDisplayTexture, frontDisplayTexture])

    useEffect(() => {
        return () => {
            frontMaterial.dispose()
            backMaterial.dispose()
            rimMaterial.dispose()
        }
    }, [backMaterial, frontMaterial, rimMaterial])

    const texturedScene = useMemo(() => {
        const clone = scene.clone(true)

        clone.traverse((object) => {
            if (!object.isMesh) return

            const materialName = Array.isArray(object.material)
                ? object.material[0]?.name
                : object.material?.name

            if (materialName === 'Coin_Front_Material') {
                object.material = frontMaterial
            }

            if (materialName === 'Coin_Back_Material') {
                object.material = backMaterial
            }

            if (materialName === 'Coin_Rim_Material') {
                object.material = rimMaterial
            }
        })

        return clone
    }, [backMaterial, frontMaterial, rimMaterial, scene])

    useFrame((_, delta) => {
        const group = groupRef.current

        if (!group) return

        group.rotation.y += dragRotationDeltaRef.current
        dragRotationDeltaRef.current = 0

        if (!isDraggingRef.current) {
            group.rotation.y += spinVelocityRef.current * delta
            spinVelocityRef.current *= Math.pow(spinDecayPerSecond, delta)

            if (Math.abs(spinVelocityRef.current) <= snapVelocityThreshold) {
                const targetRotation = getNearestFrontRotation(group.rotation.y)
                const rotationDifference = targetRotation - group.rotation.y
                const snapAmount = Math.min(delta * snapStrength, 1)

                group.rotation.y += rotationDifference * snapAmount

                if (Math.abs(rotationDifference) < 0.002) {
                    group.rotation.y = targetRotation
                    spinVelocityRef.current = 0
                }
            }
        }

        onRotationChange(group.rotation.y)
    })

    return (
        <group
            ref={groupRef}
            rotation={[0, frontFacingRotation, 0]}
            scale={modelScale}
        >
            <primitive object={texturedScene} />
        </group>
    )
}

useGLTF.preload(coinModelPath)
useTexture.preload(defaultImagePath)

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