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
import Panel from '@/components/Panel'
export default {
  props: [
    'youtubeId'
  ],
  components: {
    Panel
  }
}
</script>

<style scoped>
</style>
