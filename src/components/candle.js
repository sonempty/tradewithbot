export default {
  title: {
    text: 'BTC/USDT',
    show: false
  },
  backgroundColor: '#303030',
  legend: {
    data: ['Kline'],
    inactiveColor: '#777',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#303030',
    axisPointer: {
      animation: false,
      type: 'cross',
      label: {
        fontSize: 8
      },
      lineStyle: {
        type: 'solid',
        color: '#b2b5c1',
        opacity: 0.2
      }
    },
    textStyle: {
      fontSize: 10
    },
    position: function(pos, params, el, elRect, size) {
      let obj = {
        top: 5,
        left: 5
      }
      //obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
      return obj;
    },
    formatter: function(params) {
      function check(x) {
        let green = '#4CAF50',
          red = '#f44336',
          normal = '#b5bec9'
        return x > 0 ? green : x == 0 ? normal : red
      }
      let time = params[0].name
      let [exchange, symbol, interval] = params[0].seriesName.split('--')
      let kd = params[0].data
      let rate = (100 * (kd[2] - kd[1]) / kd[1]).toFixed(2)
      //rate = +rate > 0 ? '+' + rate + '%' : rate + '%'
      let html = `
      \<div id="candle_id">
      \<div>
        \<div style="display:inline-block; width: 70px"><span style="color:#b5bec9">${exchange}</span></div>
        \<div style="display:inline-block; width: 70px"><span style="color:#b5bec9">${symbol}</span></div>
        \<div style="display:inline-block; width: 70px"><span style="color:#b5bec9">${interval}</span></div>
      \</div>
      \<div>
        \<div style="display:inline-block; width: 70px"><span style="color:#FFB300">O </span><span style="color:#b5bec9">${kd[1]}</span></div>
        \<div style="display:inline-block; width: 70px"><span style="color:#FFB300">H </span><span style="color:#b5bec9">${kd[4]}</span></div>
        \<div style="display:inline-block; width: 70px"><span style="color:#FFB300">L </span><span style="color:#b5bec9">${kd[3]}</span></div>
        \<div style="display:inline-block; width: 70px"><span style="color:#FFB300">C </span><span style="color:#b5bec9">${kd[2]}</span></div>
      \</div>
      \<div>
        \<div style="display:inline-block; width: 170px"><span style="color:#FFB300">Time: </span><span style="color:#b5bec9">${time}</span></div>
        \<div style="display:inline-block; width: 70px"><span style="color:#FFB300">Rate: </span><span style="color:${check(+rate)}">${rate}%</span></div>
      \</div>
      \<div>
      `
      return html
    }.bind(this)
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      lineStyle: {
        color: '#8392A5'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      interval: 10,
      lineStyle: {
        type: 'dashed',
        color: '#b2b5c1',
        opacity: 0.1
      }
    },
    axisLabel: {
      fontSize: 9,
      formatter: function(value, index) {
        // Formatted to be month/day; display year only in the first label
        let date = new Date(value);
        let h = date.getHours()
        let m = date.getMinutes()
        h = h < 10 ? '0' + h : h
        m = m < 10 ? '0' + m : m
        return h + ':' + m
      }
    }
  },
  yAxis: {
    scale: true,
    axisLine: {
      lineStyle: {
        color: '#8392A5'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#b2b5c1',
        opacity: 0.1
      }
    },
    axisLabel: {
      fontSize: 9
    },
    axisPointer: {
      lineStyle: {
        type: 'solid',
        color: '#b2b5c1',
        opacity: 0.2
      }
    }
  },
  grid: {
    left: 60,
    top: 70,
    right: 30,
    bottom: 20
  },
  dataZoom: [{
    type: 'inside',
    start: 80,
    end: 100,
  }],
  animation: false,
  series: [{
    type: 'candlestick',
    name: 'BTC/USDT',
    data: [],
    barWidth: '65%',
    itemStyle: {
      normal: {
        color: '#4CAF50',
        color0: '#c23531',
        borderColor: '#4CAF50',
        borderColor0: '#c23531'
      }
    },
    markArea: {
      itemStyle: {
        opacity: 0.2
      },
      data: [
        [{
          xAxis: 190,
          itemStyle: {
            color: 'red',
            opacity: 0.15
          }
        }, {
          xAxis: 192,
        }],
        [{
          xAxis: 194,
          itemStyle: {
            color: 'green',
            opacity: 0.15
          }
        }, {
          xAxis: 196,
        }],
        [{
          xAxis: 198,
          itemStyle: {
            color: 'green',
            opacity: 0.05
          }
        }, {
          xAxis: 200,
        }]
      ]
    }
  }]
}
