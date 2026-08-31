export function wrapIndex(index, length) {
  if (length <= 0) return 0
  return ((index % length) + length) % length
}

export function nearestSlideIndex(positions, scrollLeft) {
  if (!positions.length) return 0
  return positions.reduce((nearest, position, index) => (
    Math.abs(position - scrollLeft) < Math.abs(positions[nearest] - scrollLeft) ? index : nearest
  ), 0)
}
