import ModifyPrefecture from '@/services/ModifyPrefecture'

// export const PrefecturesList = () => {
//   // ModifyPrefecture().then((prefecture) => console.log(prefecture))
//   const tmp = ModifyPrefecture()
//   console.log(tmp)

//   return (
//     <div>
//       <div>aaaaaaa</div>
//       <div>aaaaaaa</div>
//       <div>aaaaaaa</div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'

export const PrefecturesList: any = () => {
  const [items, setItems] = useState<Prefecture[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await ModifyPrefecture()
      setItems(response)
    }
    fetchData()
  }, [])

  return (
    <ul>
      {items.map((item) => (
        <li key={item.prefCode}>{item.prefName}</li>
      ))}
    </ul>
  )
}
