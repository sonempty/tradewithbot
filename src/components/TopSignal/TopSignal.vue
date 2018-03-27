<template>
<v-container fluid grid-list-md>
  <v-card>
    <v-radio-group v-model="interval_selected" row class="px-2">
      <v-radio color="orange lighten-2" label="15m" value="15m"></v-radio>
      <v-radio color="orange lighten-2" label="1h" value="1h"></v-radio>
      <v-radio color="orange lighten-2" label="4h" value="4h"></v-radio>
      <v-radio color="orange lighten-2" label="1d" value="1d"></v-radio>
    </v-radio-group>
    <v-radio-group v-model="exchange_selected" row class="px-2">
      <v-radio color="orange lighten-2" label="Binance" value="Binance"></v-radio>
      <v-radio color="orange lighten-2" disabled label="Bittrex" value="Bittrex"></v-radio>
      <v-radio color="orange lighten-2" disabled label="Polo" value="Poloniex"></v-radio>
    </v-radio-group>
    <v-text-field class="mb-2"
  prepend-icon="search"
  label="Search"
  solo
  single-line
  hide-details
  v-model="search"
></v-text-field>

    <v-data-table
    :search="search"
    :headers="headers"
    :items="get_interval"
    class="px-2"
    :loading="loading"
    :disable-initial-sort="true"
    :rows-per-page-items="items_per_page"
    :pagination.sync="pagination">
      <v-progress-linear slot="progress" color="orange lighten-2" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td class="px-1">{{ props.item.symbol }}</td>
        <td class="px-1">{{ props.item.type }}</td>
        <td class="px-1">{{ props.item.score }}</td>
        <td class="px-1">{{ props.item.time }}</td>
        <td class="px-1">
          <v-btn icon dark fab class="ma-0" :to="`/chart/binance/${props.item.symbol}/${props.item.interval}`">
            <v-icon color="orange lighten-2">mdi-chart-bar</v-icon>
          </v-btn>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</v-container>
</template>

<script>
import axios from 'axios'
import SelectCom from './Select'

export default {
  components: {
    SelectCom
  },
  data() {
    return {
      interval_selected: '1h',
      exchange_selected: 'Binance',
      pagination: {'sortBy': 'score', 'descending': true},
      search: '',
      loading: true,
      items_per_page: [10, 20, 50, {
        "text": "All",
        "value": -1
      }],
      headers: [{
          text: 'Symbol',
          value: 'symbol',
          align: 'left',
          width: '100px',
          class: 'px-1'
        },
        {
          text: 'Signal',
          value: 'type',
          width: '80px',
          class: 'px-1'
        },
        {
          text: 'Score',
          value: 'score',
          width: '70px',
          class: 'px-1'
        },
        {
          text: 'Time',
          value: 'time',
          width: '220px',
          class: 'px-1'
        },
        {
          text: 'Chart',
          value: 'symbol',
          align: 'left',
          width: '100px',
          class: 'px-1'
        }
      ],
      items_1h: [],
      items_15m: [],
      items_4h: [],
      items_1d: []
    }
  },
  computed: {
    get_interval: function() {
      if (this.interval_selected == '1h') return this.items_1h
      if (this.interval_selected == '15m') return this.items_15m
      if (this.interval_selected == '4h') return this.items_4h
      if (this.interval_selected == '1d') return this.items_1d
    }
  },
  mounted() {
    this.fetchScores()
  },
  methods: {
    fetchScores() {
      axios.get('https://telepot.xyz:5000/binance/scores')
        .then(res => {
          for (let interval in res.data) {
            for (let symbol in res.data[interval]) {
              if (res.data[interval][symbol].index > 197) {
                let x = {
                  symbol: symbol,
                  time: res.data[interval][symbol].time,
                  score: res.data[interval][symbol].score,
                  type: res.data[interval][symbol].type,
                  interval: interval
                }
                if (interval == '15m') this.items_15m.push(x)
                if (interval == '1h') this.items_1h.push(x)
                if (interval == '4h') this.items_4h.push(x)
                if (interval == '1d') this.items_1d.push(x)
              }
            }
          }
          this.loading = false
        })
    },

    sort(items, index, isDescending) {

    }
  },
}
</script>
<style scoped>
</style>
