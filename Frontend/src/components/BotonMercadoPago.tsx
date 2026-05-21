import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

initMercadoPago('TEST-tu-public-key-aca')

interface BotonProps {
  preferenceId: string
}

const BotonMercadoPago = ({ preferenceId }: BotonProps) => {
  return (
    <div className="w-full sm:w-auto">
      <Wallet initialization={{ preferenceId: preferenceId }} />
    </div>
  )
}

export default BotonMercadoPago