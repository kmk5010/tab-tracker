<template>
  <div>
    <v-layout>
        <panel title="Video">
          <youtube :video-id="youtubeId" :player-width="400" :player-height="400"></youtube>
        </panel>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<style scoped>
</style>
