import {ref, computed, onMounted, onUpdated} from 'vue'
import type {CanvasConfig, PrizeConfig, PropsType} from '../types'
import {getStrArray} from '../utils.ts'

const canvasDefaultConfig: CanvasConfig = {
  radius: 250, // Radius of a circle
  textRadius: 190, // The distance between the prize location and the center of the circle
  textLength: 6, // Prize text 1 line of characters, maximum 2 lines
  textDirection: 'horizontal', // Prize Text Direction
  lineHeight: 20, // Text line height
  borderWidth: 0, // Outer border of circle
  borderColor: 'transparent', // The color of the outer border
  btnText: 'Spin', // The text of the start button
  btnWidth: 140, // Button width
  fontSize: 34, // Prize text font size
}

export function useCanvas(props: PropsType) {
  const wheelEl = ref()
  const canvasConfig = computed(() => {
    return Object.assign(canvasDefaultConfig, props.canvas || {}) as CanvasConfig
  })
  let canvasEl: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  // drawing HTML5 canvas
  function drawCanvas(): void {
    canvasEl = wheelEl.value as HTMLCanvasElement
    if (canvasEl.getContext) {

      const {radius, textRadius, borderWidth, borderColor, fontSize} = canvasConfig.value
      if (!radius || !textRadius || !borderWidth || !borderColor || !fontSize)
        throw new Error('radius, textRadius, borderWidth, borderColor, and fontSize are required')
      // Calculate the angle of the circle based on the number of prizes
      const arc = Math.PI / (props.prizes.length / 2)
      ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D
      // Clears a rectangle within the given rectangle
      ctx.clearRect(0, 0, radius * 2, radius * 2)
      // strokeStyle Property sets or returns the color, gradient, or pattern used for the stroke
      ctx.strokeStyle = borderColor
      ctx.lineWidth = borderWidth * 2
      // The font property sets or returns the current font properties of the text content on the canvas
      ctx.font = `${fontSize}px Arial`
      props.prizes.forEach((row: PrizeConfig, i) => {
        drawPrize(row, i, arc, radius, textRadius, borderWidth)
      })
    }
  }

  function drawPrize(row: PrizeConfig, i: number, arc: number, radius: number, textRadius: number, borderWidth: number = 0) {
    const angle = i * arc - Math.PI / 2
    ctx.fillStyle = row.bgColor as string
    ctx.beginPath()
    // arc(x, y, r, start angle, end angle, drawing direction) method creates arcs/curves (used to create circles or partial circles)
    ctx.arc(radius, radius, radius - borderWidth, angle, angle + arc, false)
    ctx.stroke()
    ctx.arc(radius, radius, 0, angle + arc, angle, true)
    ctx.fill()
    // Lock the canvas (to save the previous canvas state)
    ctx.save()
    // ----Name drawing begins----
    ctx.fillStyle = row.color as string
    // The translate method remaps the (0, 0) position on the canvas
    ctx.translate(radius + Math.cos(angle + arc / 2) * textRadius, radius + Math.sin(angle + arc / 2) * textRadius)
    // The rotate method rotates the current drawing
    drawPrizeText(angle, arc, row.name as string)
    // Return (adjust) the current canvas to the state before the last save()
    ctx.restore()
    // ----Name drawing ends----
  }

  // Draw the award text
  function drawPrizeText(angle: number, arc: number, name: string) {
    const {lineHeight, textLength, textDirection} = canvasConfig.value
    if (!lineHeight || !textLength || !textDirection)
      throw new Error('lineHeight, textLength, and textDirection are required')
    // The following code renders different effects according to the prize type and prize name length, such as font, color, and image effects. (Change according to actual situation)
    const content = getStrArray(name, textLength)
    // dont do anything if no content
    if (!content) return
    textDirection === 'vertical' ? ctx.rotate(angle + arc / 2 + Math.PI) : ctx.rotate(angle + arc / 2 + Math.PI / 2)
    content.forEach((text, index) => writePrizeText(text, index, textDirection, lineHeight, content.length))
  }

  function writePrizeText(text: string, index: number, textDirection: string, lineHeight: number, length = 0) {
    let textX = -ctx.measureText(text).width / 2
    let textY = (index + 1) * lineHeight
    if (textDirection === 'vertical') {
      textX = 0
      textY = (index + 1) * lineHeight - length * lineHeight / 2
    }
    ctx.fillText(text, textX, textY)
  }

  onMounted(() => {
    if (props.type === 'canvas') drawCanvas()
  })

  onUpdated(() => {
    if (props.type === 'canvas') drawCanvas()
  })
  return {
    wheelEl,
    canvasConfig,
    drawCanvas,
  }
}
