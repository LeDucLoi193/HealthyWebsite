import React from 'react';

import { Radar } from "react-chartjs-2";

const RadarChart = (props) => {
  const { key, dataIndex, options, labels, message } = props;

  return (
    <div className="chart-radar-one">
      <Radar
        key={key}
        data={{
          labels: labels,
          datasets: [
            {
              label: `${message} (%)`,
              backgroundColor: 'rgba(54,162,235,0.4)',
              borderColor: 'rgba(54,162,235,1)',
              pointBackgroundColor: 'rgba(54,162,235,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(54,162,235,1)',
              data: dataIndex[0]
            },
            {
              label: "Min (%)",
              backgroundColor: 'rgba(255,99,131,0.4)',
              borderColor: 'rgba(255,99,131,1)',
              pointBackgroundColor: 'rgba(255,99,131,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,131,1)',
              data: dataIndex[1]
            }
          ]
        }}
        options={options}
      />
      <div style={{ textAlign: "center" }}>
        Xet nghiem lan cuoi cung
      </div>
    </div>
  );
}

export default RadarChart;