<script setup lang="ts">
// https://github.com/hustcc/ribbon.js
import { onMounted, ref } from 'vue'

const canvas = ref()

function attr(node: Element, attr: string, defaultValue: number): number {
  return Number(node.getAttribute(attr)) || defaultValue
}

onMounted(() => {
  const scripts = document.getElementsByTagName('script')
  const script = scripts[scripts.length - 1]
  const config = {
    z: attr(script, 'zIndex', -1),
    a: attr(script, 'alpha', 0.6),
    s: attr(script, 'size', 90),
  }

  const g2d = canvas.value.getContext('2d')
  const pr = window.devicePixelRatio || 1
  const width = window.innerWidth
  const height = window.innerHeight
  const f = config.s

  let q: { x: number, y: number }[], t: number
  const m = Math
  let r = 0
  const pi = m.PI * 2
  const cos = m.cos
  const random = m.random

  canvas.value.width = width * pr
  canvas.value.height = height * pr
  g2d?.scale(pr, pr)
  g2d.globalAlpha = config.a
  canvas.value.style.cssText = `
    opacity: ${config.a};
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${config.z};
    width: 100%;
    height: 100%;
    pointer-events: none;
  `

  function redraw(): void {
    g2d?.clearRect(0, 0, width, height)
    q = [{ x: 0, y: height * 0.7 + f }, { x: 0, y: height * 0.7 - f }]
    while (q[1].x < width + f) draw(q[0], q[1])
  }

  function draw(i: { x: number, y: number }, j: { x: number, y: number }): void {
    g2d?.beginPath()
    g2d?.moveTo(i.x, i.y)
    g2d?.lineTo(j.x, j.y)
    const k = j.x + (random() * 2 - 0.25) * f
    const n = line(j.y)
    g2d?.lineTo(k, n)
    g2d?.closePath()
    r -= pi / -50
    g2d!.fillStyle = `#${((cos(r) * 127 + 128 << 16) | (cos(r + pi / 3) * 127 + 128 << 8) | (cos(r + pi / 3 * 2) * 127 + 128)).toString(16)}`
    g2d?.fill()
    q[0] = q[1]
    q[1] = { x: k, y: n }
  }

  function line(p: number): number {
    t = p + (random() * 2 - 1.1) * f
    return (t > height || t < 0) ? line(p) : t
  }

  document.onclick = redraw
  document.ontouchstart = redraw
  redraw()
})
</script>

<template>
  <canvas ref="canvas" />
</template>
