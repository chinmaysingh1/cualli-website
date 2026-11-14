// Geometry for the conceptual Technology animation, in section-local CSS pixels.
export type JourneyPoint = { x: number; y: number }
export type JourneyGeometry = {
  centers: JourneyPoint[]
  mobile: boolean
  laneX: number
}
export const clampUnit = (value: number) => Math.max(0, Math.min(1, value))
export const smoothUnit = (value: number) => {
  const t = clampUnit(value)
  return t * t * (3 - 2 * t)
}

function bezier(a: JourneyPoint, b: JourneyPoint, c: JourneyPoint, d: JourneyPoint, t: number): JourneyPoint {
  const u = 1 - t
  return {
    x: u ** 3 * a.x + 3 * u ** 2 * t * b.x + 3 * u * t ** 2 * c.x + t ** 3 * d.x,
    y: u ** 3 * a.y + 3 * u ** 2 * t * b.y + 3 * u * t ** 2 * c.y + t ** 3 * d.y,
  }
}

function transfer(a: JourneyPoint, b: JourneyPoint, t: number, geometry: JourneyGeometry) {
  if (!geometry.mobile) {
    const dx = (b.x - a.x) * 0.32
    return bezier(a, { x: a.x + dx, y: a.y - 10 }, { x: b.x - dx, y: b.y - 10 }, b, t)
  }
  // Travel beside the mobile cards, crossing them only at the illustration row.
  // The 24px existing left gutter keeps the route away from every description.
  const lane = geometry.laneX
  const first = { x: lane, y: a.y + 18 }
  const last = { x: lane, y: b.y - 18 }
  if (t < 0.22) return bezier(a, { x: lane + 18, y: a.y }, { x: lane, y: a.y }, first, t / 0.22)
  if (t < 0.78) return bezier(first, { x: lane, y: first.y + 24 }, { x: lane, y: last.y - 24 }, last, (t - 0.22) / 0.56)
  return bezier(last, { x: lane, y: b.y }, { x: lane + 18, y: b.y }, b, (t - 0.78) / 0.22)
}

export function sampleJourney(value: number, geometry: JourneyGeometry): JourneyPoint {
  const [capsule, gut, capture, exit] = geometry.centers
  if (!capsule || !gut || !capture || !exit) return { x: 0, y: 0 }
  const point = (center: JourneyPoint, x: number, y: number) => ({ x: center.x + x, y: center.y + y })
  const start = point(capsule, -3, 0)
  const released = point(capsule, 24, 1)
  const arrived = point(gut, -12, -12)
  const settled = point(gut, 12, 10)
  const approach = point(capture, -12, 0)
  const loaded = point(capture, 10, 0)
  const final = point(exit, -18, -5)
  if (value < 0.45) return bezier(start, point(capsule, 0, -10), point(capsule, 15, -7), released, smoothUnit(value / 0.45))
  if (value < 1) return transfer(released, arrived, (value - 0.45) / 0.55, geometry)
  if (value < 1.45) return bezier(arrived, point(gut, -24, 4), point(gut, 26, -8), settled, (value - 1) / 0.45)
  if (value < 2) return transfer(settled, approach, (value - 1.45) / 0.55, geometry)
  if (value < 2.62) return bezier(approach, point(capture, -5, -5), point(capture, 4, 5), loaded, (value - 2) / 0.62)
  if (value < 3) return transfer(loaded, final, (value - 2.62) / 0.38, geometry)
  return bezier(final, point(exit, 0, -12), point(exit, 28, 10), point(exit, 48, 0), clampUnit(value - 3))
}
