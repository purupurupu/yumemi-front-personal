import { GetPopularComposition } from '@/repositories/Resas'
import { PopularComposition, TotalPopular } from '@/types/type'

export default async function ModifyPopularComposition(prefCode: number) {
  const result: PopularComposition = await GetPopularComposition(prefCode)
  // 総人口のみを取得
  const popular: TotalPopular[] = result.data[0].data
  const values: number[] = popular.map((item: TotalPopular) => item.value)
  return values
}
