export default {
  backgroundColor: '#303030',
  color: '#b5bec9',
  grid: {
    left: 60,
    top: 35,
    right: 30,
    bottom: 10
  },
  dataZoom: [{
    type: 'inside',
    start: 80,
    end: 100
  }],
  xAxis: {
    type: 'category',
    show: false,
    splitLine: {
      show: true,
      interval: 10,
      lineStyle: {
        type: 'dashed',
        color: '#b2b5c1',
        opacity: 0.1
      }
    },
    data: []
  },
  yAxis: {
    scale: true,
    axisLine: {
      lineStyle: {
        color: '#8392A5'
      }
    },
    axisLabel: {
      fontSize: 9
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
    }
  },
  series: [{
    data: [],
    type: 'bar'
  }],
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#303030',
    axisPointer: {
      animation: false,
      type: 'line',
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
        top: 0,
        left: 5
      }
      return obj;
    },
    formatter: function(params) {
      let time = params[0].name
      let title = params[0].seriesName
      let v = params[0].value
      let idx = +params[0].dataIndex

      let html = `
      \<div>
        \<div style="display:inline-block; width: 200px"><span style="color:#FFB300">Volume  </span><span style="color:#b5bec9">${v}</span></div>
      \</div>
      `
      return html
    }.bind(this)
  }
}
