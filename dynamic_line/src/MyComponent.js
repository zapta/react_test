import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts, { lastDate, data, XAXISRANGE, getNewSeries } from "apexcharts";


class ApexChart extends React.Component {
  constructor(props) {
    console.log("constructor called")
    super(props);

    this.state = {
      series: [{
        data: data.slice()
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
          type: 'datetime',
          range: XAXISRANGE,
        },
        yaxis: {
          max: 100
        },
        legend: {
          show: false
        },
      },


    };
  }


  componentDidMount() {
    window.setInterval(() => {
      console.log("Timer")
      getNewSeries(lastDate, {
        min: 10,
        max: 90
      })
      ApexCharts.exec('realtime', 'updateSeries', [{
        data: data
      }])
    }, 1000)
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



