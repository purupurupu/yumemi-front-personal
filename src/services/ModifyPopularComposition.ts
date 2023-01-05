import { GetPopularComposition } from '@/repositories/Resas'
import { map } from 'highcharts'

export default async function ModifyPopularComposition(prefCode: any) {
  //   const prefCodes = selectedPrefectures.map((e: any) => {
  //     return e.prefCode
  //   })//   console.log(prefCodes)

  const result = await GetPopularComposition(prefCode)
  // 総人口のみを取得
  const popular = result.data[0].data

  const values = popular.map((item: any) => item.value)
  // console.log(values)
  return values
}
