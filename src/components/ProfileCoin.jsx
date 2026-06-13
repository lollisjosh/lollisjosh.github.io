import { Suspense, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, useGLTF, useTexture } from '@react-three/drei'
import { MeshStandardMaterial, SRGBColorSpace } from 'three'

import './ProfileCoin.css'

const coinModelPath = '/assets/models/pfp-coin.glb'
const profileImagePath = '/assets/images/pfp.png'

function CoinModel() {
    const { scene } = useGLTF(coinModelPath)
    const profileTexture = useTexture(profileImagePath)

    const profileFaceTexture = useMemo(() => {
        const texture = profileTexture.clone()

        texture.colorSpace = SRGBColorSpace
        texture.flipY = false
        texture.needsUpdate = true

        return texture
    }, [profileTexture])

    useEffect(() => {
        return () => {
            profileFaceTexture.dispose()
        }
    }, [profileFaceTexture])

    const texturedScene = useMemo(() => {
        const clone = scene.clone(true)

        clone.traverse((object) => {
            if (!object.isMesh) return

            const materialName = Array.isArray(object.material)
                ? object.material[0]?.name
                : object.material?.name

            if (materialName === 'Coin_Front_Material') {
                object.material = new MeshStandardMaterial({
                    map: profileFaceTexture,
                    roughness: 0.65,
                    metalness: 0.05,
                })
            }

            if (materialName === 'Coin_Back_Material') {
                object.material = new MeshStandardMaterial({
                    color: '#321047',
                    roughness: 0.55,
                    metalness: 0.15,
                })
            }

            if (materialName === 'Coin_Rim_Material') {
                object.material = new MeshStandardMaterial({
                    color: '#181986',
                    roughness: 0.45,
                    metalness: 0.25,
                })
            }
        })

        return clone
    }, [profileFaceTexture, scene])

    return <primitive object={texturedScene} rotation={[0, Math.PI, 0]} />
}

useGLTF.preload(coinModelPath)
useTexture.preload(profileImagePath)

function ProfileCoin() {
    return (
        <div className="profile-coin" aria-label="Interactive profile coin preview">
            <Canvas camera={{ position: [0, 0, 3], fov: 35 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[2, 3, 4]} intensity={2} />

                <Suspense fallback={null}>
                    <Center>
                        <CoinModel />
                    </Center>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default ProfileCoin
