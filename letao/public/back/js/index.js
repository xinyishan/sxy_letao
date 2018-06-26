/**
 * Created by sxy on 2018/6/26.
 */


$(function(){
  var echart_1 = echarts.init(document.querySelector('.echart-1'));
  var echart_2 = echarts.init(document.querySelector('.echart-2'));

// 指定图表的配置项和数据
  var option = {
    title: {
      text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1200, 1300, 1600, 2000, 2500]
    }]
  };

// 使用刚指定的配置项和数据显示图表。
  echart_1.setOption(option);

  option = {
    title : {
      text: '热门品牌销售',
      subtext: '2018年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Nike','Air-jordan','Adida','Newbalance','Puma']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:1200, name:'Nike'},
          {value:2000, name:'Air-jordan'},
          {value:1200, name:'Adida'},
          {value:600, name:'Newbalance'},
          {value:400, name:'Puma'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  echart_2.setOption(option);
})




