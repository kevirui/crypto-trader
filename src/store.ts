import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CryptoPrice, Cryptocurrency, Pair } from './types'
import { getCryptos, fetchCurrentCryptoPrice } from './services/CryptoService'

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[]
    result: CryptoPrice,
    rawPrice: number,
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {
        IMAGEURL : '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },
    rawPrice: 0,
    loading: false,
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const { rawPrice, displayData} = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            result: displayData || undefined,
            rawPrice: rawPrice || undefined,
            loading: false
        }))
    }
})))