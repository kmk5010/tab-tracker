<template>
    <v-toolbar fixed class="cyan" dark>
        <v-toolbar-title class="mr-4">
            <router-link class="home" tag="span" to='/'>TabTracker</router-link>
        </v-toolbar-title>
        <v-toolbar-items>
            <v-btn flat dark to='/songs'>
                Browse
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn flat dark to='/login' v-if="!$store.state.isUserLoggedIn">
                Login
            </v-btn>
            <v-btn flat dark to='/register' v-if="!$store.state.isUserLoggedIn">
                <!-- <router-link to="register">Register</router-link> -->
                Register
            </v-btn>
            <v-btn flat dark @click="logout" v-if="$store.state.isUserLoggedIn">
                Logout
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'songs'
      })
    }
  }
}
</script>

<style scoped>
.home {
    cursor: pointer;
}
.home:hover{
    color:black;
}
</style>
