import PLATFORMS from 'constants/platforms'

declare namespace Data {
  interface PlayerGlobalSearched {
    platform: PLATFORMS.PC
    name: string
    urlName: string
    level: number
    portrait: string
    isPublic: boolean
  }
}

export = Data
export as namespace Data
