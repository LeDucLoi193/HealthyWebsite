import React, { useEffect, useState, useContext } from 'react';
import { Skeleton } from 'antd';

import '../../styles/home.css'

import { UpdateChartContext } from '../../contexts/update';
import RadarChart from './RadarChart';
import { LoginContext } from '../../contexts/login';
import LineChart from './LineChart';

const axios = require('axios')

const Chart = () => {
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [dataIndexes, setDataIndexes] = useState({});
  const [labels, setLables] = useState([]);
  const serverAddress = window.location.href.replace(3000, 8080)

  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [updateChart, setUpdateChart] = useContext(UpdateChartContext);

  let options = {}

  const getData = () => {
    setDataIndexes({})
    axios.get(`${serverAddress}`, 
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        setIsLogin(true);
        
        options = {
          legend: {
            display: true
          },
          scale: {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 120
            }
          },
          title: {
            display: true,
            fontSize: 14,
            text: res.data.message
          },
          responsive: true
        }
        if (res.data.message === "Loang Xuong") {
          setLables(["L1", "L2", "L3", "L4", "Total"])
          setDataIndexes({...res.data})
        } 
        else if (res.data.message === "Gout") {
          setLables(["Axit uric", "CRP.hs", "WBC", "NEUT", "LYM", "pH", "Glucose", "Cortisol"])
          setDataIndexes({...res.data})
        }
        else {
          setLables([
            ["Huyet ap tam thu", "Huyet ap tam truong", "BMI", "Nhip Tim", "Nhip Tho"], 
            ["RBC", "WBC", "PLT", "Ure", "Glucose", "Creatinin", "proBNP"]
          ])
          const newData = {
            resultVP: res.data.data.slice(0, 2),
            resultVPXN: res.data.data.slice(2),
            message: res.data.message
          }
          setDataIndexes({...newData})
        }
        setLoadingSkeleton(false)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

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
        Object.keys(dataIndexes).length !== 0 ? dataIndexes.message !== "Viem Phoi" ?
          <div className="chart-line-radar">
            <Skeleton loading={loadingSkeleton} active>
              <LineChart 
                labels={labels}
                resultsLine={dataIndexes.resultsLine}
                message={dataIndexes.message}
              />
              <RadarChart
                dataIndex={dataIndexes.resultsRadar}
                options={options}
                message={dataIndexes.message}
                labels={labels}
              />
            </Skeleton>
          </div>
          :
          <div className="chart-radar-two">
            <Skeleton loading={loadingSkeleton} active>
              <RadarChart
                dataIndex={dataIndexes.resultVP}
                options={options}
                message={"Viem Phoi"}
                labels={labels[0]}
              />
              <RadarChart
                dataIndex={dataIndexes.resultVPXN}
                options={options}
                message={"Viem Phoi - Xet Nghiem"}
                labels={labels[1]}
              />
            </Skeleton>  
          </div>
          : null
      }
    </div>
  );
}

export default Chart;