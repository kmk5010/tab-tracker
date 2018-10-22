<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>
      <v-flex xs6 class="ml-4">
          <youtube :youtubeId="song.youtubeId" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 class="mt-4">
          <tab :song="song" />
      </v-flex>
      <v-flex xs6 class="ml-4 mt-4">
        <lyrics :song="song" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongService from '@/services/SongService'
import SongMetadata from './SongMetadata'
import youtube from './Youtube'
import Lyrics from './Lyrics'
import Tab from './Tabs'
export default {
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongService.show(songId)).data
  },
  data () {
    return {
      song: {}
    }
  },
  components: {
    SongMetadata,
    youtube,
    Lyrics,
    Tab
  }
}
</script>

<style scoped>

</style>
