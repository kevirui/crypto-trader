import { z } from 'zod'
import { CurrencySchema, CryptoCurrencyResponseSchema, PairSchema, CryptoPriceSchema, CryptoPriceResponseSchema } from '../schema/crypto-schema'

export type Currency = z.infer<typeof CurrencySchema>
export type Cryptocurrency = z.infer<typeof CryptoCurrencyResponseSchema>
export type Pair = z.infer<typeof PairSchema>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>
export type CryptoPriceRAW = z.infer<typeof CryptoPriceResponseSchema>
