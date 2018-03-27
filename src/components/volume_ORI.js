export default {
  backgroundColor: '#21202D',
  grid: {
    left: 80,
    top: 40,
    right: 30
  },
  dataZoom: [
    {
      type: 'inside',
      start: 80,
      end: 100
    }
  ],
  xAxis: {
    type: 'category',
    show: false,
    splitLine: {
      show: false
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
    splitLine: {
      show: false
    }
  },
  series: [{
    data: [],
    type: 'bar'
  }],
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
      return obj;
    },
    formatter: function(params) {
      let time = params[0].name
      let title = params[0].seriesName
      let v = params[0].value
      let idx = +params[0].dataIndex

      let html = `
      \<div>
        \<div style="display:inline-block; width: 200px"><span style="color:#FFB300">Volume</span>  ${v}</div>
      \</div>
      `
      return html
    }.bind(this)
  }
}
