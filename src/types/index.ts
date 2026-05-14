export type Material = 'PLA' | 'ABS' | 'PETG' | 'Resin'
export type Color = { name: string; hex: string }
export type Quality = 'Szkic' | 'Standard' | 'Wysoka' | 'Ultra'
export type Finish = 'Surowy' | 'Szlifowany' | 'Malowany'

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
  quality: Quality
  finish: Finish
  rush: boolean
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

export const QUALITY_MULTIPLIER: Record<Quality, number> = {
  Szkic: 0.8,
  Standard: 1.0,
  Wysoka: 1.5,
  Ultra: 2.2,
}

export const QUALITY_LAYER: Record<Quality, string> = {
  Szkic: '0.3 mm',
  Standard: '0.2 mm',
  Wysoka: '0.1 mm',
  Ultra: '0.05 mm',
}

export const FINISH_MULTIPLIER: Record<Finish, number> = {
  Surowy: 1.0,
  Szlifowany: 1.4,
  Malowany: 2.0,
}
