import { useCryptoStore } from "../store"
import { currencies } from "../data"
import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"
import Spinner from "./Spinner"

export default function CriptoSearchForm() {
    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
    const fetchData = useCryptoStore((state) => state.fetchData)
    const cryptoPrice = useCryptoStore((state) => state.rawPrice)
    const loading = useCryptoStore((state) => state.loading)
    
    const [pair, setPair] = useState<Pair>({
        currency: '',
        criptocurrency: '',
        price: 0
    })

    const [error, setError] = useState('')

    const precio = Math.round(cryptoPrice * pair.price)
    const precioFormateado = precio.toLocaleString('es-AR', {
         minimumFractionDigits: 2, // Número mínimo de decimales
         maximumFractionDigits: 2, // Número máximo de decimales
         useGrouping: true, // Usar separador de miles
    })

    const [showPrices, setShowPrices] = useState(false)
    
    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        setPair((prev) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value // Convertir a 'price' a número
        }))
    }

    const validateFields = () => {
        if (Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios')
            return false
        }
        setError('')
        return true
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateFields()) {
            fetchData(pair)
            setShowPrices(true)
        }
    }

    return (
        <form
            className='form'
            onSubmit={handleSubmit}
        >

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className='field'>
                <label htmlFor="currency">Moneda:</label>
                <select 
                    name="currency" 
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency}
                >
                    <option value="">-- Seleccione --</option>
                    {currencies.map( currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                    ))}
                </select>
            </div>

            <div className='field'>
                <label htmlFor="criptocurrency">Criptomoneda:</label>
                <select 
                    name="criptocurrency" 
                    id="criptocurrency"
                    onChange={handleChange}
                    value={pair.criptocurrency}
                >
                    <option value="">-- Seleccione --</option>
                    {cryptocurrencies.map( crypto => (
                        <option
                            key={crypto.CoinInfo.FullName}
                            value={crypto.CoinInfo.Name}
                        >{crypto.CoinInfo.FullName}</option>
                    ))}
                </select>
            </div>

            <div className="field">
                <label htmlFor="price">Cantidad a convertir</label>
                <p>$ <input type="number" name="price" id="price" placeholder="Cantidad: " min="1" onChange={handleChange} value={pair.price} /></p>
            </div>
            
            {loading ? <Spinner /> : (showPrices) && (
                <div className="field">
                    <div className="form">
                        <p>El precio en {pair.currency} es: <span>${ precioFormateado }</span></p>
                        <p>El precio en {pair.criptocurrency} es: <span>${ (pair.price / cryptoPrice) }</span></p>
                    </div>
                </div>
            )}

            <input type='submit' value='Cotizar' />
        </form>
    )
}
