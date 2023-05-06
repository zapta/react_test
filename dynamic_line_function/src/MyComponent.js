import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts, { lastDate, data, XAXISRANGE, getNewSeries } from "apexcharts";
import { useState, useEffect, useRef } from "react";



// class ApexChart extends React.Component {


//   constructor(props) {
//     console.log("constructor called")
//     super(props);

//     this.state = {
//       series: [{
//         name: 'mySeries',
//         data: [[1, 34], [3, 54], [5, 23], [15, 43]]
//       }],
//       options: {
//         chart: {
//           id: 'realtime',
//           height: 350,
//           type: 'line',
//           animations: {
//             enabled: true,
//             easing: 'linear',
//             dynamicAnimation: {
//               speed: 1000
//             }
//           },
//           toolbar: {
//             show: false
//           },
//           zoom: {
//             enabled: false
//           }
//         },
//         dataLabels: {
//           enabled: false
//         },
//         stroke: {
//           curve: 'smooth'
//         },
//         title: {
//           text: 'Dynamic Updating Chart',
//           align: 'left'
//         },
//         markers: {
//           size: 0
//         },
//         xaxis: {
//           type: 'numeric'
//         },
//         yaxis: {
//           max: 100
//         },
//         legend: {
//           show: false
//         },
//       },
//     };

//     console.log("constructor() exit")
//   }


//   componentDidMount = () => {
//     window.setInterval(() => {
//       console.log("Timer called")
//       // getNewSeries(lastDate, {
//       //   min: 10,
//       //   max: 90
//       // })
//       // ApexCharts.exec('realtime', 'updateSeries', [{
//       //   data: data
//       // }])
//       // 'realtime' is the id of the chart as we set above.
//       ApexCharts.exec('realtime', 'updateSeries',
//         [{
//           name: 'mySeries',
//           data: [[32, 44], [31, 90]]
//         }]
//       )
//     }, 3000)
//   }
// }

// const initial_state = {
//   series: [{
//     name: 'mySeries',
//     data: [[1, 34], [3, 54], [5, 23], [15, 43]]
//   }],
//   options: {
//     chart: {
//       id: 'realtime',
//       height: 350,
//       type: 'line',
//       animations: {
//         enabled: true,
//         easing: 'linear',
//         dynamicAnimation: {
//           speed: 1000
//         }
//       },
//       toolbar: {
//         show: false
//       },
//       zoom: {
//         enabled: false
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'smooth'
//     },
//     title: {
//       text: 'Dynamic Updating Chart',
//       align: 'left'
//     },
//     markers: {
//       size: 0
//     },
//     xaxis: {
//       type: 'numeric'
//     },
//     yaxis: {
//       max: 100
//     },
//     legend: {
//       show: false
//     },
//   },
// };

const emptyData = () => {
  let result = []
  for (let i = 0; i < 250; i++) {
    result.push([i, null]);
  }
  return result
}

const kSeries =
  [{
    name: 'mySeries',
    data: emptyData(),
  }];




const kOptions = {
  chart: {
    id: 'realtime',
    height: 350,
    type: 'line',
    animations: {
      enabled: false,
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
  legend: {
    show: false
  },
};

const ApexChart = (props) => {

  const [options, setOptions] = useState(kOptions);
  const [series, setSeries] = useState(kSeries);
  const [counter, setCounter] = useState(5);

  useInterval(() => {
    // Your custom logic here
    // console.log(`Interval callback called: ${counter}`)
    setCounter(counter + 1)
    let data = series[0].data
    let y = counter * 4
    // //data.push([n + 1, n * 4])
    let n = data.length
    // console.log("n = " + n)
    console.log(`counter ${counter}`)
    for (let i = 1; i < n; i++) {

      // console.log(` data ${i} : ${data[i][0]}, ${data[i][1]}`)
      data[i - 1][1] = data[i][1]
      // data[i][1] = 7 //data[i][1]
    }
    data[n-1][1] = y
    setSeries(series);
     ApexCharts.exec('realtime', 'updateSeries', series)

    // console.log(`Interval callback called: ${counter}`)
    // setCount(count + 1);
  }, 1);

  // useInterval(() => {
  //   console.log("useEffect called")
  //   // const id = setInterval(() => {
  //     // let data = series[0].data
  //     // let y = counter * 4
  //     // //data.push([n + 1, n * 4])
  //     // let n = data.length
  //     // console.log("n = " + n)
  //     // for (let i = 1; i < n; i++) {
  //     //   data[i-1][1] = data[i][1]
  //     // }
  //     // data[n-1][1] = y
  //     // setSeries(series);
  //     console.log(`Interval callback called: ${counter}`)

  //     setCounter(counter + 1)
  //     // console.log("Timer series: " + series, ", n=" + n + ", counter=" + counter)
  //     // ApexCharts.exec('realtime', 'updateSeries', series)

  //   }, 
  //   3000)
  //   // return () => clearInterval(id);
  // });

  // Per the blog at 
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}



export default ApexChart;



