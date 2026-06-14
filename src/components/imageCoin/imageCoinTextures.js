import { SRGBColorSpace } from 'three'

export function applyFrameToTexture(texture, frameSource) {
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
