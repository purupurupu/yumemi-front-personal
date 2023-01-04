import { GetPrefectures } from '@/repositories/Resas'

export default async function ModifyPrefecture() {
  const prefectures = await GetPrefectures()
  // console.log(prefectures)
  return prefectures
}
