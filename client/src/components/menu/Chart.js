import React, { useEffect, useState, useContext } from 'react';
import '../../styles/home.css'

import { UpdateChartContext } from '../../contexts/update';
import RadarChart from './RadarChart';
import { LoginContext } from '../../contexts/login';
import LineChart from './LineChart';
import catchError from '../../errors/error'
import { SuggestGout, SuggestLX, SuggestVP, SuggestVPXN } from '../suggestion/suggest';
import { TreatmentLXNang, TreatmentLXNhe } from '../treatment/treatmentLX';
import { TreatmentGoutAnUong, TreatmentGoutNgoaiKhoa, TreatmentGoutNoiKhoa } from '../treatment/treatmentGout';
import { TreatmentVPNang, TreatmentVPTB } from '../treatment/treatmentVP';
import { ExplicateGout, ExplicateLX, ExplicateVP } from '../explication/explication'

const axios = require('axios')

const Chart = () => {
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
      }
    })
    .catch((err) => {
      console.log(err);
      catchError(err);
    })
  }
  
  useEffect( () => {
    getData()
  }, [updateChart])
  
  return (
    <div>
      
      {
        Object.keys(dataIndexes).length !== 0 ? dataIndexes.message !== "Viem Phoi" ?
          <div>
            {
              !dataIndexes.firstTime ? 
              <div className="chart-line-radar">
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
              </div>
              :
              <div className="chart-line-radar">
                <RadarChart
                  dataIndex={dataIndexes.resultsRadar}
                  options={options}
                  message={dataIndexes.message}
                  labels={labels}
                />
              </div>
            }
            {
              dataIndexes.message === "Loang Xuong" ?
              <div>
                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px"}}>
                  <ExplicateLX />
                  <SuggestLX />
                </div>
                
                <hr />
                <h3 style={{ textAlign: "center", marginTop: "2rem", fontWeight: "bold"}}>Phác đồ điều trị tham khảo</h3>
                <div style={{ display: "flex", justifyContent: "space-evenly"}}>
                  <TreatmentLXNhe />
                  <TreatmentLXNang />
                </div>
              </div>
              :
              <div>
                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px"}}>
                  <ExplicateGout />
                  <SuggestGout />
                </div>
                <hr />
                <h3 style={{ textAlign: "center", marginTop: "2rem", fontWeight: "bold"}}>Phác đồ điều trị tham khảo</h3>
                <div style={{ display: "flex", justifyContent: "space-evenly"}}>
                  <TreatmentGoutAnUong />
                  <TreatmentGoutNoiKhoa />
                  <TreatmentGoutNgoaiKhoa />
                </div>
              </div>
            }
          </div>
          :
          <div>
            <div className="chart-radar-two">
              <RadarChart
                dataIndex={dataIndexes.resultVP}
                options={options}
                message={"Viem Phoi"}
                labels={labels[0]}
              />
              <RadarChart
                dataIndex={dataIndexes.resultVPXN}
                options={options}
                message={"Viem Phoi - Xet nghiem Mau"}
                labels={labels[1]}
              />
            </div>
            <div >
              <div style={{ display: "flex", justifyContent: "space-evenly"}}>
                {/* <SuggestVP /> */}
                <ExplicateVP />
                <SuggestVPXN />
              </div>
              <hr />
              <h3 style={{ textAlign: "center", marginTop: "2rem", fontWeight: "bold"}}>Phác đồ điều trị tham khảo</h3>
              <div style={{ display: "flex", justifyContent: "space-evenly"}}>
                <TreatmentVPTB />
                <TreatmentVPNang />
              </div>
            </div>
          </div>
          : null
      }
    </div>
  );
}

export default Chart;