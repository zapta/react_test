import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts, { lastDate, data, XAXISRANGE, getNewSeries } from "apexcharts";


class ApexChart extends React.Component {
  constructor(props) {
    console.log("constructor called")
    super(props);

    this.state = {
      series: [{
        name: 'mySeries',
        data: [[1, 34], [3, 54], [5, 23], [15, 43]]
      }],
      options: {
        chart: {
          id: 'realtime',
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Dynamic Updating Chart',
          align: 'left'
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'numeric'
        },
        yaxis: {
          max: 100
        },
        legend: {
          show: false
        },
      },
    };

    console.log("constructor() exit")
  }


  componentDidMount = ()=> {
    window.setInterval(() => {
      console.log("Timer called")
      // getNewSeries(lastDate, {
      //   min: 10,
      //   max: 90
      // })
      // ApexCharts.exec('realtime', 'updateSeries', [{
      //   data: data
      // }])
      // 'realtime' is the id of the chart as we set above.
      ApexCharts.exec('realtime', 'updateSeries',
        [{
          name: 'mySeries',
          data: [[32, 44], [31, 90]]
        }]
      )
    }, 3000)
  }


  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
      </div>
    );
  }
}


export default ApexChart;



