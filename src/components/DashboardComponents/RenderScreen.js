import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-charts'
import DropDown from './DropDown'

function RenderScreen() {
  const [data1, setData1] = useState(null)
  const [data2, setData2] = useState(null)
  const [data3, setData3] = useState(null)
  const [graph1, setGraph1] = useState(1)
  const [graph2, setGraph2] = useState(2)
  const [data, setData] = useState(null)

  const dropdownOptions = ['Bitcoin', 'Ethereum', 'Litecoin']

  useEffect(() => {
    const fetchData = () => {
        const options = {
          method: 'GET',
          url: 'https://coinranking1.p.rapidapi.com/coin/1/history/7d',
          headers: {
            'x-rapidapi-key': 'b3bdb530acmsha777171e97dd90ep199712jsn1c204b6d3108',
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
          }
        };
    }
    fetchData()
    const timer = setTimeout(fetchData, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])
  useEffect(() => {
    const fetchData = () => {
      const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coin/2/history/7d',
        headers: {
          'x-rapidapi-key': 'b3bdb530acmsha777171e97dd90ep199712jsn1c204b6d3108',
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
        }
      };
    }
    fetchData()
    const timer = setTimeout(fetchData, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])
  useEffect(() => {
    const fetchData = () => {
        const options = {
          method: 'GET',
          url: 'https://coinranking1.p.rapidapi.com/coin/5/history/7d',
          headers: {
            'x-rapidapi-key': 'b3bdb530acmsha777171e97dd90ep199712jsn1c204b6d3108',
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
          }
      };
    }
    fetchData()
    const timer = setTimeout(fetchData, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])

  useEffect(() => {
    if (graph1 === 1) {
      switch (graph2) {
        case 1:
          if (data1) setData([data1, data1]);
          break;
        case 2:
          if (data1 && data2) setData([data1, data2]);
          break;
        case 3:
          if (data1 && data3) setData([data1, data3]);
          break;

        default:
          setData(null)
          console.log("data", data)
          break;
      }
    }
    else if (graph1 === 2) {

      switch (graph2) {
        case 1:
          if (data2 && data1) setData([data2, data1]);
          break;
        case 2:
          if (data2) setData([data2, data2]);
          break;
        case 3:
          if (data2 && data3) setData([data2, data3]);
          break;

        default:
          setData(null)
          console.log("data", data)
          break;
      }
    }
    else if (graph1 === 3) {
      switch (graph2) {
        case 1:
          if (data3 && data1) setData([data3, data1]);
          break;
        case 2:
          if (data3 && data2) setData([data3, data2]);
          break;
        case 3:
          if (data3) setData([data3, data3]);
          break;

        default:
          setData(null)
          console.log("data", data)
          break;
      }
    }


    else { setData(null) }
  }, [data1, data2, data3, graph1, graph2])

  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "time",
        position: "bottom",
      },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <div className="RenderScreen">
      <div className="Graph_header">
        <h1 className="PurpleText">Real-Time Bitcoin Graph</h1>
        <DropDown options={dropdownOptions} color='rgb(126,181,243)' displayText='Commodity1' set={setGraph1} />
        <DropDown options={dropdownOptions} color='rgb(201,104,127)' displayText='Commodity2' set={setGraph2} />
      </div>
      <div
        className='Chart_box'
        style={{
          height: '70vh',
          width: '95%',
          padding: '0vw 0vw 1vw 1vw'
        }}
      >
        {
          data && series && axes && <Chart data={data} series={series} axes={axes} tooltip />
        }
      </div>
    </div>
  )
}

export default RenderScreen
