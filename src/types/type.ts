export interface Prefecture {
  prefCode: number
  prefName?: string
  checked?: boolean
  value?: number
}

export interface SelectedPrefectures {
  name: string
  data: number
}

export interface PopularComposition {
  boundaryYear: number
  data: Array<{
    label: string
    data: Array<{
      year: number
      value: number
    }>
  }>
}

export interface TotalPopular {
  year: number
  value: number
}
