import React, { useEffect, useState, useContext } from 'react';

import '../../styles/home.css'

import { UpdateChartContext } from '../../contexts/update';
import RadarChart from './RadarChart';

const axios = require('axios')

const Chart = () => {
  const [dataIndexes, setDataIndexes] = useState([]);
  const [labels, setLables] = useState([]);
  const [benh, setBenh] = useState("");
  const serverAddress = window.location.href.replace(3000, 8080)
  const [updateChart, setUpdateChart] = useContext(UpdateChartContext);

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
      text: benh
    },
    responsive: true
  }

  const getData = () => {
    axios.get(`${serverAddress}`, 
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        setBenh(res.data.message)
        if (res.data.data.length === 2) {
          setDataIndexes([res.data.data])
        }
        else {
          const newData = [res.data.data.slice(0, 2), res.data.data.slice(2)]
          setDataIndexes([newData])
        }
        if (res.data.message === "Loang Xuong") {
          setLables(["L1", "L2", "L3", "L4", "Total"])
        } 
        else if (res.data.message === "Gout") {
          setLables(["Axit uric", "CRP.hs", "WBC", "NEUT", "LYM", "pH", "Glucose", "Cortisol"])
        }
        else {
          setLables([
            ["Huyet ap tam thu", "Huyet ap tam truong", "BMI", "Nhip Tim", "Nhip Tho"], 
            ["RBC", "WBC", "PLT", "Ure", "Glucose", "Creatinin", "proBNP"]
          ])
        }
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // console.log(dataIndexes)

  useEffect( () => {
    getData()
  }, [updateChart])

  return (
    <div>
      <div style={{textAlign: "center"}}>
        <h4>Neu chi so {'>'} 100%, ban bi loang xuong</h4>
        <h4>Neu chi so nam trong khoang 40%-100%, ban bi thieu xuong</h4>
        <h4>Neu chi so {'<'} 40%, chuc mung, ban van khoe :v </h4>
      </div>
      {
        dataIndexes.length !== 0 && (dataIndexes[0][0].length !== 2 ?
          <div style={{position: "relative"}}>
            <RadarChart
              dataIndex={dataIndexes}
              options={options}
              message={benh}
              labels={labels}
            />
          </div>
        :
          <div style={{position: "relative"}}>
            <RadarChart
              dataIndex={dataIndexes[0]}
              options={options}
              message={benh}
              labels={labels[0]}
            />
            <RadarChart
              dataIndex={dataIndexes[0]}
              options={options}
              message={"Viem Phoi - Xet Nghiem"}
              labels={labels[1]}
            />
          </div>
          )
      }
    </div>
  );
}

export default Chart;