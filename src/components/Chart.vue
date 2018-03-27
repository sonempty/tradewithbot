<template>
<v-container fluid class="mx-0 px-0 pt-0 pb-0">
  <v-layout row wrap>
    <v-flex xs12 sm12 md12 id="candle"></v-flex>
    <v-flex xs12 sm12 md12 id="volume"></v-flex>
    <v-flex text-xs-center xs2 class="mt-1 blue-grey darken-4">
      <v-btn flat icon @click.native.stop="interval_dialog = true">
        <v-icon color="orange lighten-2">mdi-clock</v-icon>
      </v-btn>
      <v-dialog v-model="interval_dialog" max-width="220">
        <v-card>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex xs6 v-for="i in intervals" :key="i">
                <v-btn outline @click.native.stop="changeInterval(i)">{{i}}</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-flex>
    <v-flex text-xs-center xs4 class="mt-1 blue-grey darken-4"></v-flex>
    <v-flex text-xs-center xs2 fill-height class="mt-1 blue-grey darken-4">
      <v-btn flat icon @click.native.stop="indicator_dialog = true">
        <v-icon color="orange lighten-2">mdi-chart-line</v-icon>
      </v-btn>
      <v-dialog v-model="indicator_dialog" max-width="600">
        <v-toolbar dark class="blue-grey darken-1">
          <v-btn icon @click.native="indicator_dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="indicator_dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs6>
                <v-card color="blue-grey darken-2" class="px-4 pt-2 white--text">
                  <v-switch label="Candlestick Chart" v-model="candle_settings.show"></v-switch>
                </v-card>
              </v-flex>
              <v-flex xs6>
                <v-card color="blue-grey darken-2" class="px-4 pt-2 white--text">
                  <v-switch label="Candlestick Chart" v-model="candle_settings.show"></v-switch>
                  <v-slider label="Period" class="pa-0" :max="100" v-model="candle_settings.value" thumb-label step="10" ticks></v-slider>
                  <v-slider label="Period" class="pa-0" :max="100" v-model="candle_settings.value" thumb-label step="10" ticks></v-slider>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-flex>
    <v-flex text-xs-center xs2 class="mt-1 blue-grey darken-4">
      <v-btn flat icon>
        <v-icon color="orange lighten-2">mdi-chart-bar</v-icon>
      </v-btn>
    </v-flex>
    <v-flex text-xs-center xs2 class="mt-1 blue-grey darken-4">
      <v-btn flat icon>
        <v-icon color="orange lighten-2">mdi-candle</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/candlestick')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/graphic');
require('echarts/lib/component/markPoint');
require("echarts/lib/component/markLine");
require("echarts/lib/component/markArea");

import axios from 'axios'
import candle_option from './candle.js'
import volume_option from './volume.js'

export default {
  name: 'Chart',
  data() {
    return {
      candle_option,
      volume_option,
      symbols: [],
      e1: 'xxx',
      interval_dialog: false,
      indicator_dialog: false,
      candle_settings: {
        show: false,
        value: 10
      },
      volume_settings: {
        show: false,
        value: 10
      },
      intervals: ['15m', '1h', '4h', '1d']
    }
  },
  created() {

  },
  watch: {
    '$route': 'fetchData'
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    drawLine(id, options) {
      let myChart = echarts.init(document.getElementById(id))
      myChart.setOption(options)
      return myChart
    },

    changeInterval(i) {
      this.interval_dialog = false
      this.$router.push({
        name: 'Chart',
        params: {
          exchange: this.$route.params.exchange,
          symbol: this.$route.params.symbol,
          interval: i,
        }
      })
    },

    fetchData() {
      let that = this
      let y = this.drawLine('volume', this.volume_option)
      let x = this.drawLine('candle', this.candle_option)
      x.showLoading()
      y.showLoading()
      axios.get('https://telepot.xyz:5000/' + this.$route.params.exchange + '/ohlc/' + this.$route.params.symbol + '/' + this.$route.params.interval)
        .then((datas) => {
          let data = datas.data

          let startTime = data.t.map(x => new Date(+x).toLocaleString('en-US'))

          let volume = data.v.map(x => +x)

          let open = data.o.map(x => +x)
          let high = data.h.map(x => +x)
          let low = data.l.map(x => +x)
          let close = data.c.map(x => +x)
          let ohlc = open.map((item, i) => [open[i], close[i], low[i], high[i]])
          let score = data.score

          if(score.type == 'BUY') {
            this.candle_option.series[0].markArea.data[0][0].xAxis = +score.pre_pre - 1
            this.candle_option.series[0].markArea.data[0][1].xAxis = +score.pre_pre + 1
            this.candle_option.series[0].markArea.data[0][0].itemStyle.color = 'green'

            this.candle_option.series[0].markArea.data[1][0].xAxis = +score.pre_index - 1
            this.candle_option.series[0].markArea.data[1][1].xAxis = +score.pre_index + 1
            this.candle_option.series[0].markArea.data[1][0].itemStyle.color = 'red'

            this.candle_option.series[0].markArea.data[2][0].xAxis = +score.index - 1
            this.candle_option.series[0].markArea.data[2][1].xAxis = +score.index + 1
            this.candle_option.series[0].markArea.data[2][0].itemStyle.color = 'green'

          } else {
            this.candle_option.series[0].markArea.data[0][0].xAxis = +score.pre_pre - 1
            this.candle_option.series[0].markArea.data[0][1].xAxis = +score.pre_pre + 1
            this.candle_option.series[0].markArea.data[0][0].itemStyle.color = 'red'

            this.candle_option.series[0].markArea.data[1][0].xAxis = +score.pre_index - 1
            this.candle_option.series[0].markArea.data[1][1].xAxis = +score.pre_index + 1
            this.candle_option.series[0].markArea.data[1][0].itemStyle.color = 'green'


            this.candle_option.series[0].markArea.data[2][0].xAxis = +score.index - 1
            this.candle_option.series[0].markArea.data[2][1].xAxis = +score.index + 1
            this.candle_option.series[0].markArea.data[2][0].itemStyle.color = 'red'
          }

          //candle, volume data
          this.candle_option.series[0].name = [this.$route.params.exchange.toUpperCase(), data.symbol.toUpperCase(), data.interval].join('--')
          this.candle_option.xAxis.data = startTime
          this.candle_option.series[0].data = ohlc

          this.volume_option.xAxis.data = startTime
          this.volume_option.series[0].data = volume

          //draw charts
          x.hideLoading()
          y.hideLoading()
          this.drawLine('volume', this.volume_option)
          this.drawLine('candle', this.candle_option)
          x.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 199
          });
          y.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 199
          });
          echarts.connect([x, y])

        })
        .catch((err) => {
          console.log(err)
        })
    },

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media only screen and (max-width: 600px) {
  #candle {
    height: 59.5vh;
    z-index: 0;
  }
  #volume {
    height: 25vh;
  }
  #bot {
    height: 15vh;
  }
}

@media screen and (min-width: 600px) {
  #candle {
    height: 65vh;
  }

  #volume {
    height: 25vh;
  }

  #bot {
    height: 15vh;
  }
}
</style>
