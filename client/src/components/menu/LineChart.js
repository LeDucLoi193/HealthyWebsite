import React from 'react'

import { Line } from "react-chartjs-2";

function LineChart(props) {
  const { resultsLine, labels, message } = props;
  let lablesLine = [], datasets = [], nextDatasets = [];

  for (let i = 1; i <= resultsLine[0].length; ++i) {
    lablesLine.push("Lan " + i)
  }

  if (message === "Loang Xuong") {
    datasets = resultsLine.map((dataIndex, key) => {
      return {
        data: dataIndex,
        label: labels[key],
        borderColor: "#" + Math.floor(Math.random()*16777215).toString(16),
        fill: false
      }
    })
  }
  else {
    datasets = resultsLine.slice(0, 4).map((dataIndex, key) => {
      return {
        data: dataIndex,
        label: labels[key],
        borderColor: "#" + Math.floor(Math.random()*16777215).toString(16),
        fill: false
      }
    })
    nextDatasets = resultsLine.slice(4).map((dataIndex, key) => {
      return {
        data: dataIndex,
        label: labels[key+4],
        borderColor: "#" + Math.floor(Math.random()*16777215).toString(16),
        fill: false
      }
    })
  }

  return (
    <div>
      {
        message === "Loang Xuong" ?
        <div className="chart-line-one chart-lx">
          <Line
            data={{
              labels: lablesLine,
              datasets: datasets
            }}
            options={{
              title: {
                display: true,
                text: message
              },
              legend: {
                display: true,
                position: "bottom"
              }
            }}
          />
        </div>
        :
        <div className="chart-line-two">
          <div className="chart-line-one">
            <Line
              data={{
                labels: lablesLine,
                datasets: datasets
              }}
              options={{
                title: {
                  display: true,
                  text: message
                },
                legend: {
                  display: true,
                  position: "bottom"
                }
              }}
            />
          </div>
          <div className="chart-line-one">
            <Line
              data={{
                labels: lablesLine,
                datasets: nextDatasets
              }}
              options={{
                title: {
                  display: true,
                  text: message
                },
                legend: {
                  display: true,
                  position: "bottom"
                }
              }}
            />
          </div>
        </div>
      }
    </div>
  )
}


export default LineChart


