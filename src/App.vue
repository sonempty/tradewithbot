<template>
<v-app dark>
  <v-navigation-drawer temporary v-model="drawer" app>
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="./assets/telegram.png">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>TradeWithBot.com</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list>
      <v-divider></v-divider>
      <v-list-tile value="true" v-for="(item, i) in items" :key="item.url" @click="drawer = false; $router.push(item.url)">
        <v-list-tile-action class="white--text">
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title" class="white--text"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app :clipped-left="clipped" :flat="true" dark class="blue-grey darken-4">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-select @input="go" solo flat dense :items="symbols" :filter="customFilter" v-model="symbol" item-text="string" item-value="string" append-icon="search" autocomplete max-height="200" color="orange lighten-2"></v-select>
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
      axios.get('https://telepot.xyz:5000/binance/tickers')
        .then(res => this.symbols = res.data)
    },

    go(e) {
      //this.$router.replace({ name: 'Chart', params: { exchange: 'binance', symbol: e, interval: '1h' }})
      let [ex, s] = e.split(':  ')
      ex = ex.toLowerCase()
      s = s.split('/').join('')
      this.$router.push({
        name: 'Chart',
        params: {
          symbol: s,
          exchange: ex,
          interval: '1h'
        }
      })
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
      customFilter(item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.baseAsset)
        const query = hasValue(queryText)
        return text.toString()
          .toLowerCase()
          .startsWith(query.toString().toLowerCase())
      },
      items: [{
          icon: 'dashboard',
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
        },
        {
          icon: 'question_answer',
          title: 'About',
          url: '/about'
        }
      ],
    }
  },
  name: 'App'
}
</script>
<style scoped>
router-link {
  text-decoration: none;
}
</style>
