import ModifyPrefecture from '@/services/ModifyPrefecture'
import ModifyPopularComposition from '@/services/ModifyPopularComposition'

import React, { useState, useEffect } from 'react'
import { Prefecture, PopularComposition } from '@/types/type'

export const Prefectures: any = () => {
  const [items, setItems] = useState<Prefecture[]>([])
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await ModifyPrefecture()
      setItems(response.map((item) => ({ ...item, checked: false })))
    }
    fetchData()
  }, [])

  const toggleChecked = (prefCode: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.prefCode === prefCode ? { ...item, checked: !item.checked } : item,
      ),
    )

    setSelectedPrefectures((prevSelectedPrefectures) => {
      const selectedItem = {
        prefCode,
        prefName: items.find((item) => item.prefCode === prefCode)?.prefName,
        //TODO
        //setItemsで変更したstateが反映されなかったので、暫定で再処理している。
        checked: !prevSelectedPrefectures.find((item) => item.prefCode === prefCode)?.checked,
      }
      if (selectedItem.checked) {
        // チェックされた場合は、selectedPrefectureに追加する
        return [...prevSelectedPrefectures, selectedItem]
      } else {
        // チェックが外された場合は、selectedPrefectureから削除する
        return prevSelectedPrefectures.filter((item) => item.prefCode !== prefCode)
      }
    })

    // 人口構成APIのGETシーケンス
    const popularCompositionJson = ModifyPopularComposition(prefCode)
  }

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.prefCode}>
            <input
              type='checkbox'
              checked={item.checked}
              onChange={() => toggleChecked(item.prefCode)}
            />
            {item.prefName}
          </li>
        ))}
      </ul>
      {/* selectedPrefectureを表示する */}
      <div>
        {selectedPrefectures.map((item) => (
          <div key={item.prefCode}>
            {item.prefCode} {item.prefName}
          </div>
        ))}
      </div>
    </div>
  )
}
