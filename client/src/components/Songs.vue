<template>
    <v-layout column>
    <v-flex xs6 pt-4>
      <panel title="Songs">
          <v-btn to="/songs/create" slot="action" class="cyan accent-1" fab medium absolute right middle light>
            <v-icon>library_add</v-icon>
          </v-btn>
          <div class="song" v-for="song in songs" :key="song.id">
              <v-layout>
                <v-flex xs6>
                  <div class="song-title">
                    {{song.title}}
                  </div>
                  <div class="song-artist">
                    {{song.artist}}
                  </div>
                  <div class="song-genre">
                    {{song.genre}}
                  </div>
                    <v-btn block color="cyan" dark @click="nagivateTo({name: 'song', params: {songId: song.id}})">View</v-btn>
                </v-flex>
                <v-flex xs6>
                  <img class="album-image" :src="song.albumImageUrl" />
                </v-flex>
              </v-layout>
          </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SongService from '@/services/SongService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
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
