<template>
    <v-layout row>
        <v-flex xs4>
            <panel title="Song Metadata">
                <v-text-field label="Title" v-model="song.title" required :rules="[rules.required]"></v-text-field>
                <v-text-field label="Artist" v-model="song.artist" required :rules="[rules.required]"></v-text-field>
                <v-text-field label="Genre" v-model="song.genre" required :rules="[rules.required]"></v-text-field>
                <v-text-field label="Album" v-model="song.album" required :rules="[rules.required]"></v-text-field>
                <v-text-field label="Album Image URL" v-model="song.albumImageUrl" required :rules="[rules.required]"></v-text-field>
                <v-text-field label="Youtube ID" v-model="song.youtubeId" required :rules="[rules.required]"></v-text-field>
            </panel>
            <v-alert class="mt-4" :value="error" transition="scale-transition" error>{{error}}</v-alert>
            <v-btn block color="cyan" dark @click="save" class="mt-4">Save Song</v-btn>
    </v-flex>
    <v-flex xs8 class="ml-4">
        <panel title="Song Structure">
          <v-textarea label="Tab" v-model="song.tab" required :rules="[rules.required]"></v-textarea>
          <v-textarea label="Lyrics" v-model="song.lyrics" required :rules="[rules.required]"></v-textarea>
        </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SongService from '@/services/SongService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      rules: {
        required: (value) => !!value || 'Required'
      }
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      const songId = this.$store.state.route.params.songId
      try {
        await SongService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>
