<template>
<v-app dark>
  <v-navigation-drawer persistent v-model="drawer" enable-resize-watcher app>
    <v-list>
      <v-list-tile value="true" v-for="(item, i) in items" :key="i">
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <router-link :to="item.url">
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </router-link>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app :clipped-left="clipped" :flat="true" dark class="blue-grey darken-4">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-select @input="go"
      solo
      flat
      dense
      :items="symbols"
      :filter="customFilter"
      v-model="symbol"
      item-text="string"
      item-value="symbol"
      append-icon="search"
      autocomplete
      max-height="200"
      color="orange lighten-2"
    ></v-select>
  </v-toolbar>
  <v-content>
    <router-view/>
  </v-content>
</v-app>
</template>

<script>
import axios from 'axios'

export default {
  mounted() {
    this.fetchTickers()
  },
  methods: {
    fetchTickers() {
      axios.get('http://207.246.113.77:5000/binance/tickers')
        .then(res => this.symbols = res.data)
    },

    go(e) {
      this.$router.replace({ name: 'Chart', params: { exchange: 'binance', symbol: e, interval: '1h' }})
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '',
      symbol: null,
      symbols: [],
      customFilter (item, queryText, itemText) {
          const hasValue = val => val != null ? val : ''
          const text = hasValue(item.baseAsset)
          const query = hasValue(queryText)
          return text.toString()
            .toLowerCase()
            .startsWith(query.toString().toLowerCase())
      },
      items: [
        {
          icon: 'home',
          title: 'Home',
          url: '/'
        },
        {
          icon: 'grade',
          title: 'Top Signal',
          url: '/topsignal'
        },
        {
          icon: 'insert_chart',
          title: 'Analysis Chart',
          url: '/chart/binance/BTCUSDT/1h'
        }
      ],
    }
  },
  name: 'App'
}
</script>
