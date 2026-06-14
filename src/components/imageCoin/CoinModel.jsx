import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'

import {
    coinModelPath,
    defaultImagePath,
    frontFacingRotation,
    hoverLiftEasePerSecond,
    hoverLiftRotationY,
    getNearestFrontRotation,
    snapStrength,
    snapVelocityThreshold,
    spinDecayPerSecond,
} from './imageCoinConfig'
import { applyFrameToTexture } from './imageCoinTextures'

export default function CoinModel({
    backFrameSource,
    dragRotationDeltaRef,
    frontFrameSource,
    isDraggingRef,
    isHovered = false,
    modelScale,
    motionHints = {},
    onRotationChange,
    spinVelocityRef,
}) {
    const presentationGroupRef = useRef(null)
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
        const presentationGroup = presentationGroupRef.current
        const group = groupRef.current

        if (!presentationGroup || !group) return

        const hoverLiftIsActive = motionHints.hoverLift
            && isHovered
            && !isDraggingRef.current
        const hoverLiftEase = Math.min(delta * hoverLiftEasePerSecond, 1)
        const targetRotationY = hoverLiftIsActive ? hoverLiftRotationY : 0

        presentationGroup.rotation.y += (
            targetRotationY - presentationGroup.rotation.y
        ) * hoverLiftEase

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
            ref={presentationGroupRef}
            scale={modelScale}
        >
            <group
                ref={groupRef}
                rotation={[0, frontFacingRotation, 0]}
            >
                <primitive object={texturedScene} />
            </group>
        </group>
    )
}

useGLTF.preload(coinModelPath)
useTexture.preload(defaultImagePath)
