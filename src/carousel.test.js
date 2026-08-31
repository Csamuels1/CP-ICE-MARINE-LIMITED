import { describe, expect, it } from 'vitest'
import { nearestSlideIndex, wrapIndex } from './carousel.js'

describe('carousel helpers', () => {
  it('wraps forward and backward navigation', () => {
    expect(wrapIndex(8, 8)).toBe(0)
    expect(wrapIndex(-1, 8)).toBe(7)
  })

  it('finds the slide nearest the current scroll position', () => {
    expect(nearestSlideIndex([0, 420, 840], 610)).toBe(1)
    expect(nearestSlideIndex([0, 420, 840], 700)).toBe(2)
  })
})
