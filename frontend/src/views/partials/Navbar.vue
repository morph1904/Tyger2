<template>
    <div>
        <v-navigation-drawer class="orange darken-1" clipped fixed v-model="drawer" app>
            <v-toolbar flat class="grey darken-3">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="white--text">Welcome, Administrator</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
            <v-list class="white--text" dense>
                <v-list-tile router to="/">
                <v-list-tile-action>
                    <v-icon class="white--text">home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title to="Home">Home</v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>
                <v-list-tile router to="about">
                <v-list-tile-action>
                    <v-icon class="white--text">contact_mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>About</v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar color="orange darken-1" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Tyger 2</v-toolbar-title>
            <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
      <v-btn flat>Link Three</v-btn>
    </v-toolbar-items>
        </v-toolbar>
    </div>
</template>
<script>

export default {
    data: () => ({
    drawer: false
  })
}
</script>
