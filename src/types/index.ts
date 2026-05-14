export type Material = 'PLA' | 'ABS' | 'PETG' | 'Resin'
export type Color = { name: string; hex: string }

export interface Product {
  id: string
  name: string
  description: string
  basePrice: number
  image: string
  category: string
  colors: Color[]
  materials: Material[]
  modelUrl?: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  material: Material
  color: Color
  infill: number
  uploadedFile?: File
  uploadedFileName?: string
  price: number
}

export const MATERIAL_MULTIPLIER: Record<Material, number> = {
  PLA: 1.0,
  ABS: 1.2,
  PETG: 1.15,
  Resin: 2.0,
}
