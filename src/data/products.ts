import type { Product } from '../types'

export const COLORS = [
  { name: 'Biały', hex: '#FFFFFF' },
  { name: 'Czarny', hex: '#1a1a1a' },
  { name: 'Szary', hex: '#6B7280' },
  { name: 'Czerwony', hex: '#EF4444' },
  { name: 'Niebieski', hex: '#3B82F6' },
  { name: 'Zielony', hex: '#10B981' },
  { name: 'Żółty', hex: '#F59E0B' },
  { name: 'Pomarańczowy', hex: '#F97316' },
]

export const PRODUCTS: Product[] = [
  {
    id: 'brelok-customowy',
    name: 'Brelok customowy',
    description: 'Spersonalizowany brelok z własnym tekstem lub kształtem. Idealny prezent lub gadżet firmowy.',
    basePrice: 15,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'Gadżety',
    colors: COLORS,
    materials: ['PLA', 'PETG', 'Resin'],
  },
  {
    id: 'figurka-rpg',
    name: 'Figurka RPG / miniatura',
    description: 'Szczegółowa miniatura do gier planszowych lub RPG. Wysoka rozdzielczość wydruku.',
    basePrice: 35,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&h=300&fit=crop',
    category: 'Figurki',
    colors: COLORS,
    materials: ['Resin', 'PLA'],
  },
  {
    id: 'uchwyt-biurkowy',
    name: 'Uchwyt / organizer biurkowy',
    description: 'Funkcjonalny organizer na biurko — miejsce na długopisy, kable, telefon.',
    basePrice: 25,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop',
    category: 'Dom i biuro',
    colors: COLORS,
    materials: ['PLA', 'PETG', 'ABS'],
  },
  {
    id: 'wazon-dekoracyjny',
    name: 'Wazon dekoracyjny',
    description: 'Nowoczesny wazon o geometrycznym kształcie. Unikalny dodatek do każdego wnętrza.',
    basePrice: 45,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=300&fit=crop',
    category: 'Dom i biuro',
    colors: COLORS,
    materials: ['PLA', 'PETG'],
  },
  {
    id: 'prototyp-techniczny',
    name: 'Prototyp techniczny',
    description: 'Wydruk techniczny do celów inżynieryjnych. Precyzja wymiarowa ±0.2mm.',
    basePrice: 60,
    image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&h=300&fit=crop',
    category: 'Techniczne',
    colors: [{ name: 'Naturalny', hex: '#F5F0E8' }, { name: 'Czarny', hex: '#1a1a1a' }],
    materials: ['ABS', 'PETG'],
  },
  {
    id: 'etui-na-telefon',
    name: 'Etui na telefon',
    description: 'Spersonalizowane etui na telefon z własnym wzorem lub inicjałami.',
    basePrice: 30,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop',
    category: 'Gadżety',
    colors: COLORS,
    materials: ['PLA', 'PETG', 'Resin'],
  },
]

export const CATEGORIES = ['Wszystkie', ...Array.from(new Set(PRODUCTS.map(p => p.category)))]
