import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import ModifyPrefecture from '@/services/ModifyPrefecture'
import ModifyPopularComposition from '@/services/ModifyPopularComposition'
import { Prefecture, PopularComposition } from '@/types/type'

export const Prefectures: any = () => {
  const [items, setItems] = useState<Prefecture[]>([])
  const [selectedPrefectures, setSelectedPrefectures] = useState<any[]>([])
  // const [series, setSeries] = useState<any>([])

  useEffect(() => {
    async function fetchData() {
      const response = await ModifyPrefecture()
      setItems(response.map((item) => ({ ...item, checked: false })))
    }
    fetchData()
  }, [])

  const options: Highcharts.Options = {
    title: {
      text: 'Popular Composition',
    },
    // legend: {
    //   layout: 'vertical',
    //   align: 'right',
    //   verticalAlign: 'middle',
    // },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointInterval: 5,
        pointStart: 1960,
      },
    },
    // TODO
    // highchartsの仕様上、以下の構造に整形する必要あり。
    // series: [
    //   {
    //     name: 'Installation & Developers',
    //     data: [43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157, 161454, 154610],
    //   },
    //   {
    //     name: 'Manufacturing',
    //     data: [24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243, 31050],
    //   },
    //   {
    //     name: 'Sales & Distribution',
    //     data: [11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213, 25663],
    //   },
    //   {
    //     name: 'Operations & Maintenance',
    //     data: [null, null, null, null, null, null, null, null, 11164, 11218, 10077],
    //   },
    //   {
    //     name: 'Other',
    //     data: [21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906, 10073],
    //   },
    // ],
    series: selectedPrefectures,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  }

  const toggleChecked = async (prefCode: number, prefName?: string) => {
    // 人口構成APIのGETシーケンス
    const popularComposition = await ModifyPopularComposition(prefCode)
    // console.log(popularComposition)

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.prefCode === prefCode ? { ...item, checked: !item.checked } : item,
      ),
    )

    setSelectedPrefectures((prevSelectedPrefectures) => {
      const selectedItem = {
        // For highchart format
        name: items.find((item) => item.prefName === prefName)?.prefName,
        data: popularComposition,
      }
      const checkFlag = !prevSelectedPrefectures.find((item) => item.name === prefName)
      // console.log(checkFlag)

      return checkFlag
        ? [...prevSelectedPrefectures, selectedItem]
        : prevSelectedPrefectures.filter((item) => item.name !== prefName)
    })
  }

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.prefCode}>
            <input
              type='checkbox'
              checked={item.checked}
              onChange={() => toggleChecked(item.prefCode, item.prefName)}
            />
            {item.prefName}
          </li>
        ))}
      </ul>
      {/* selectedPrefectureを表示する */}
      {/* <div>
        {selectedPrefectures.map((item) => (
          <div key={item.prefCode}>
            {item.prefCode} {item.prefName}
          </div>
        ))}
      </div> */}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
