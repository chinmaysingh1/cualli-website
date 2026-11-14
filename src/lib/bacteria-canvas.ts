// Original conceptual bacteria, with irregular cell walls, a translucent inner
// membrane, nucleoid-like strands and ribosome-like inclusions; not a validated model.
export function drawBacterium(c: CanvasRenderingContext2D, variant: number, dark: boolean) {
  const membrane = dark ? '#B8D2D8' : '#102A43'
  c.strokeStyle = membrane
  c.lineWidth = 1.35
  c.lineCap = 'round'
  c.lineJoin = 'round'
  c.save()
  c.globalAlpha *= 0.7
  // Slightly varied pili and two gently curved flagella.
  for (const [x, y, direction] of [[-22, -17, -1], [-8, -18, -1], [9, -18, -1], [25, -15, -1], [-20, 17, 1], [0, 18, 1], [19, 17, 1]]) {
    c.beginPath()
    c.moveTo(x, y)
    c.quadraticCurveTo(x + 3, y + direction * 4, x + 1, y + direction * (6 + variant % 2))
    c.stroke()
  }
  c.beginPath()
  c.moveTo(-36, 1)
  c.bezierCurveTo(-47, -4, -43, 14, -55, 9)
  c.bezierCurveTo(-61, 7, -59, 15, -65, 12)
  c.moveTo(-34, 7)
  c.bezierCurveTo(-40, 16, -49, 10, -52, 20)
  c.stroke()
  c.restore()

  const wall = new Path2D()
  wall.moveTo(-37, -2)
  wall.bezierCurveTo(-39, -14, -29, -20, -16, -18)
  wall.bezierCurveTo(1, -20 - variant, 18, -16, 24, -17)
  wall.bezierCurveTo(43, -15, 43, 13, 25, 17)
  wall.bezierCurveTo(8, 20, -8, 16, -22, 18)
  wall.bezierCurveTo(-32, 17, -38, 10, -37, -2)
  wall.closePath()
  c.fillStyle = dark ? '#36556A' : variant % 2 ? '#759CAD' : '#7BA7A0'
  c.fill(wall)
  c.stroke(wall)

  // Clipped, soft cellular volume without shadows, glow or heavy gradients.
  c.save()
  c.clip(wall)
  c.globalAlpha *= 0.2
  c.fillStyle = '#DDEEF0'
  c.beginPath()
  c.ellipse(-2, -8, 34, 10, 0, 0, Math.PI * 2)
  c.fill()
  c.fillStyle = '#102A43'
  c.beginPath()
  c.ellipse(3, 16, 35, 8, 0, 0, Math.PI * 2)
  c.fill()
  c.restore()
  c.save()
  c.scale(0.87, 0.76)
  c.globalAlpha *= 0.4
  c.strokeStyle = '#B8D2D8'
  c.lineWidth = 1
  c.stroke(wall)
  c.restore()

  c.save()
  c.strokeStyle = dark ? '#DDEEF0' : '#C3D8DF'
  c.lineWidth = 1.15
  c.beginPath()
  c.moveTo(-19, 2)
  c.bezierCurveTo(-13, -12, -3, 13, 5, -2)
  c.bezierCurveTo(12, -12, 15, 12, 22, 1)
  c.moveTo(-17, 6)
  c.bezierCurveTo(-11, -6, -3, 16, 7, 2)
  c.bezierCurveTo(14, -6, 16, 10, 21, 5)
  c.stroke()
  c.globalAlpha *= 0.65
  c.fillStyle = '#DDEEF0'
  // Stable, deterministic texture: never generate random points on each frame.
  for (let i = 0; i < 18; i++) {
    const x = -28 + ((i * 17 + variant * 7) % 55)
    const y = Math.sin(i * 2.4 + variant) * 11
    c.beginPath()
    c.ellipse(x, y, i % 3 === 0 ? 1.5 : 0.85, 0.8, i, 0, Math.PI * 2)
    c.fill()
  }
  c.restore()
}

export function drawBubbles(c: CanvasRenderingContext2D, variant: number, dark: boolean, time: number, fade = false) {
  c.save()
  c.strokeStyle = dark ? '#C5E7EF' : '#477B94'
  c.fillStyle = dark ? '#B8D2D8' : '#DDEEF0'
  c.lineWidth = 1.6
  const bubbles = [[-51, -24, 6.5], [48, -21, 8], [22, 32, 5], [-21, -32, 4.5]]
  bubbles.forEach(([x, y, radius], index) => {
    // Local circulation stays attached to the organism's wave position/tangent.
    const phase = (time * 0.08 + index * 0.23 + variant * 0.17) % 1
    const lift = (phase - 0.5) * 10
    c.save()
    c.globalAlpha *= fade
      ? Math.sin(phase * Math.PI) ** 2
      : 0.82 + Math.sin(phase * Math.PI) * 0.18
    c.beginPath()
    c.arc(x, y - lift, radius, 0, Math.PI * 2)
    c.save()
    c.globalAlpha *= 0.24
    c.fill()
    c.restore()
    c.stroke()
    // Small reflected rim keeps each bubble light rather than a solid particle.
    c.beginPath()
    c.arc(x, y - lift, radius * 0.65, Math.PI * 1.08, Math.PI * 1.5)
    c.stroke()
    c.restore()
  })
  c.restore()
}
