import axios from 'axios'

const baseUrl: any = process.env.RESAS_ENDPOINT
const apiKey: any = process.env.RESAS_API_KEY
const config = {
  headers: {
    'X-API-KEY': apiKey,
  },
}

export default async function GetPrefectures(): Promise<Prefecture[]> {
  const response = await axios.get(`${baseUrl}/prefectures`, config).catch((error) => {
    if (error.response) {
      // レスポンスありのエラーハンドリング（実際には必要に応じた例外処理を実装する）
      console.log(`Error! code: ${error.response.status}, message: ${error.message}`)
      return error.response
    } else {
      // レスポンスなしのエラーハンドリング（実際には必要に応じた例外処理を実装する）
      throw new Error(`No response! ${error.message}`)
    }
  })
  const json = response.data
  return json.result
}

interface Prefecture {
  prefCode: number
  prefName: string
  prefNameEng: string
}
