export default {
  title: {
    text: 'BTC/USDT',
    show: false
  },
  backgroundColor: '#21202D',
  legend: {
    data: ['Kline'],
    inactiveColor: '#777',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#21202D',
    axisPointer: {
      animation: false,
      type: 'cross',
      axisPointer: {
        lineStyle: {
          type: 'solid',
          color: '#b2b5c1'
        }
      }
    },
    textStyle: {
      fontSize: '.24rem'
    },
    position: function(pos, params, el, elRect, size) {
      let obj = {
        top: 0,
        left: 5
      }
      //obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
      return obj;
    },
    formatter: function(params) {
      function check(x) {
        let green = '#4CAF50', red = '#f44336', normal = '#FFF'
        return x > 0 ? green : x == 0 ? normal : red
      }
      let time = params[0].name
      let title = params[0].seriesName
      let kd = params[0].data
      let rate = (100 * (kd[2] - kd[1]) / kd[1]).toFixed(2)
      //rate = +rate > 0 ? '+' + rate + '%' : rate + '%'
      let html = `
      \<div>
        \<div style="display:inline-block; width: 200px"><span style="color:#FFB300">Time: </span>${time}</div>
        \<div style="display:inline-block; width: 100px"><span style="color:#FFB300">Rate: </span><span style="color:${check(+rate)}">${rate}%</span></div>
      \</div>
      \<div>
        \<div style="display:inline-block; width: 90px"><span style="color:#FFB300">O</span> ${kd[1]}</div>
        \<div style="display:inline-block; width: 90px"><span style="color:#FFB300">H</span> ${kd[4]}</div>
        \<div style="display:inline-block; width: 90px"><span style="color:#FFB300">L</span> ${kd[3]}</div>
        \<div style="display:inline-block; width: 90px"><span style="color:#FFB300">C</span> ${kd[2]}</div>
      \</div>
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
    axisLabel: {
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
    splitLine: {
      show: false
    }
  },
  grid: {
    left: 80,
    top: 80,
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
        color: '#0CF49B',
        color0: '#FD1050',
        borderColor: '#0CF49B',
        borderColor0: '#FD1050'
      }
    }
  }]
}
