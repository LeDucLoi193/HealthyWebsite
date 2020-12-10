import React, { useEffect, useState } from 'react';

import Navbar from '../menu/Navbar';

import '../../styles/home.css'
import { Radar } from "react-chartjs-2";

const axios = require('axios')

const options = {
  legend: {
    display: true
  },
  scale: {
    ticks: {
      suggestedMin: 0,
      suggestedMax: 200
    }
  },
  title: {
    display: true,
    fontSize: 14,
    text: `Loang Xuong chart
    Neu chi so > 100%, ban bi loang xuong
    Neu chi so nam trong khoang 40-100%, ban bi thieu xuong
    Neu chi so < 40%, chuc mung, ban van khoe :v`
  }
}

const Chart = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get('http://localhost:8080/chart/loang-xuong', 
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        setData(res.data.data)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect( () => {
    getData()
  }, [])

  return (
    <div>
      <Navbar />
      <Radar
        data={{
          labels: ["L1", "L2", "L3", "L4", "Total"],
          datasets: [
            {
              label: "T-Score (%)",
              backgroundColor: 'rgba(179,181,198,0.4)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: data
            }]
        }}
        options={options}
      />
    </div>
  );
}

export default Chart;