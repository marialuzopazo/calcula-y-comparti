import { useContext } from 'react'
import { CalculoContext } from '../context/calculoContext'

export function useCalculo() {
  const contexto = useContext(CalculoContext)
  if (!contexto) {
    throw new Error('useCalculo debe usarse dentro de un CalculoProvider')
  }
  return contexto
}
