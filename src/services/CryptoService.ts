import axios from 'axios'
import { CryptoCurrenciesResponseSchema, CryptoPriceResponseSchema, CryptoPriceSchema } from '../schema/crypto-schema'
import { Pair } from '../types'

export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const { data: { Data } } = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)
    
    if(result.success) {
        return result.data
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`
    const { data: { DISPLAY, RAW } } = await axios(url)
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])
    const resultRaw = CryptoPriceResponseSchema.safeParse(RAW[pair.criptocurrency][pair.currency])

    if (resultRaw.success) {
        return resultRaw.data.PRICE
    } else {
        console.error('Failed to parse RAW data:', resultRaw.error)
    }
 
    if(result.success ) {
        return result.data
    }
    
}