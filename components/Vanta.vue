<script setup>
import p5 from 'p5'
import * as THREE from 'three'
import TRUNK from 'vanta/src/vanta.net'
import { onMounted, onUnmounted, ref } from 'vue'

const vantaRef = ref()

let vantaEffect
const Effect = TRUNK

onMounted(() => {
  vantaEffect = Effect({
    el: vantaRef.value,
    THREE,
    p5,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
  })
})

onUnmounted(() => {
  vantaEffect?.destroy()
})
</script>

<template>
  <div ref="vantaRef" class="vanta" />
</template>

<style lang="scss" scoped>
.vanta {
  width: 100vw;
  height: 100vh;
}
</style>
