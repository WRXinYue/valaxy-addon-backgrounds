<script setup lang="ts">
// https://github.com/qrohlf/trianglify

import trianglify from 'trianglify'

const defaultOptions: trianglify.Options = {
  width: window.innerWidth,
  height: window.innerHeight,
  cellSize: 75,
  variance: 0.75,
  seed: null,
  xColors: ['random'],
  yColors: ['match'],
  fill: true,
  // palette: trianglify.colorbrewer,
  colorSpace: 'lab' as const,
  colorFunction: trianglify.colorFunctions.interpolateLinear(0.5),
  strokeWidth: 0,
  // points: null,
}

const pattern = trianglify(defaultOptions)

document.body.appendChild(pattern.toCanvas())
</script>

<template>
  <div />
</template>
