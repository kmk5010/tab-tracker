<template>
    <v-layout column>
    <v-flex xs6 pt-4>
      <song-search-panel />
      <songs-panel class="mt-4"/>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel'
import SongSearchPanel from './SongSearchPanel'
import SongService from '@/services/SongService'
export default {
  components: {
    SongsPanel,
    SongSearchPanel
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongService.index()).data
  },
  methods: {
    nagivateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
  .song {
    padding: 20px;
    height: 330px;
    overflow: hidden;
  }
  .song-title {
    font-size: 30px;
  }
  .song-artist {
    font-size: 24px;
  }
  .song-genre {
    font-size: 18px;
  }
  .album-image {
    width: 70%;
    margin: 0 auto;
  }
</style>
