import { GetPopularComposition } from '@/repositories/Resas'

export default async function ModifyPopularComposition(prefCode: any) {
  //   const prefCodes = selectedPrefectures.map((e: any) => {
  //     return e.prefCode
  //   })//   console.log(prefCodes)

  const result = await GetPopularComposition(prefCode)
  // 総人口のみを取得
  const popular = result.data[0]
  console.log(popular)
  return popular
}
