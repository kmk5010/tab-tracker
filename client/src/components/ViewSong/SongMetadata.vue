<template>
  <div>
        <panel title="Song Metadata">
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
              <v-btn block color="cyan" dark @click="nagivateTo({name: 'song-edit', params: {songId: song.id}})">Edit</v-btn>
              <v-btn v-if="isUserLoggedIn && !bookmark" block color="cyan" dark @click="setAsBookmark">Set As Bookmark</v-btn>
              <v-btn v-if="isUserLoggedIn && bookmark" block color="cyan" dark @click="unsetAsBookmark">Unset Bookmark</v-btn>
            </v-flex>
            <v-flex xs6>
              <img class="album-image" :src="song.albumImageUrl" />
              <br />
              {{song.album}}
            </v-flex>
          </v-layout>
        </panel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BookmarkService from '@/services/BookmarkService'
export default {
  props: [
    'song'
  ],
  methods: {
    nagivateTo (route) {
      this.$router.push(route)
    },
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarkService.post({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log('err')
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarkService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log('err')
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        this.bookmark = (await BookmarkService.index({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
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
  textarea {
    width: 90%;
    font-family: monospace;
    border: none;
    height: 600px;
    border-style: none;
    border-color: transparent;
    overflow: auto;
    padding: 20px;
  }
</style>
