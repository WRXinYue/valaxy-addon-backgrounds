<script setup lang="ts">
import { tsParticles } from '@tsparticles/engine'
import { loadFull } from 'tsparticles'
import { onMounted } from 'vue'
import { defaultOptions } from '../constants/tsparticles'

// tsparticles
// https://github.com/VincentGarreau/particles.js/
const loadPresets = [loadFull]

onMounted(async () => {
  for (const loadPreset of loadPresets) {
    await loadPreset(tsParticles)
  }

  await tsParticles.load({
    id: 'tsparticles',
    // url: 'presets/default.json',
    options: defaultOptions,
  })

  const particles = tsParticles.domItem(0)

  particles?.play()
})
</script>

<template>
  <div id="tsparticles" />
</template>
