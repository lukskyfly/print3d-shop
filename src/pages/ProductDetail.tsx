import { useState, lazy, Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { useCartStore } from '../store/cartStore'
import type { Material, Color, Quality, Finish } from '../types'
import { MATERIAL_MULTIPLIER, QUALITY_MULTIPLIER, QUALITY_LAYER, FINISH_MULTIPLIER } from '../types'

const ModelViewer = lazy(() => import('../components/three/ModelViewer'))

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addItem = useCartStore(s => s.addItem)

  const product = PRODUCTS.find(p => p.id === id)
  if (!product) return <div className="p-20 text-center text-gray-400">Produkt nie istnieje</div>

  const [material, setMaterial] = useState<Material>(product.materials[0])
  const [color, setColor] = useState<Color>(product.colors[0])
  const [infill, setInfill] = useState(20)
  const [quality, setQuality] = useState<Quality>('Standard')
  const [finish, setFinish] = useState<Finish>('Surowy')
  const [rush, setRush] = useState(false)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const price = Math.round(
    product.basePrice
    * MATERIAL_MULTIPLIER[material]
    * QUALITY_MULTIPLIER[quality]
    * FINISH_MULTIPLIER[finish]
    * (1 + infill / 200)
    * (rush ? 1.5 : 1)
  )

  const estimatedHours = Math.max(1, Math.round(product.basePrice / 8 * QUALITY_MULTIPLIER[quality] * (1 + infill / 100)))
  const estimatedGrams = Math.round(product.basePrice * 2.5 * (infill / 100 + 0.3))

  const handleAdd = () => {
    addItem({
      id: `${product.id}-${material}-${color.hex}-${infill}-${quality}-${finish}-${rush}-${Date.now()}`,
      product,
      quantity: qty,
      material,
      color,
      infill,
      quality,
      finish,
      rush,
      price,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-blue-600 mb-6 flex items-center gap-1">
          ← Powrót do katalogu
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Podgląd 3D */}
            <div className="p-6 bg-gray-900">
              <Suspense fallback={<div className="h-72 flex items-center justify-center text-gray-400">Ładowanie podglądu...</div>}>
                <ModelViewer color={color.hex} height="320px" />
              </Suspense>
              <p className="text-center text-xs text-gray-400 mt-3">Obróć model myszką • Podgląd poglądowy</p>

              {/* Estymaty */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Czas druku</div>
                  <div className="text-white font-bold">~{estimatedHours}h</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Zużycie filamentu</div>
                  <div className="text-white font-bold">~{estimatedGrams}g</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Grubość warstwy</div>
                  <div className="text-white font-bold">{QUALITY_LAYER[quality]}</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Dostawa</div>
                  <div className={`font-bold ${rush ? 'text-yellow-400' : 'text-green-400'}`}>{rush ? '24h' : '48–72h'}</div>
                </div>
              </div>
            </div>

            {/* Konfiguracja */}
            <div className="p-8 overflow-y-auto max-h-[700px]">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{product.category}</span>
              <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{product.description}</p>

              {/* Materiał */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Materiał</label>
                <div className="flex gap-2 flex-wrap">
                  {product.materials.map(m => (
                    <button key={m} onClick={() => setMaterial(m)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        material === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                      }`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jakość */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Jakość druku</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Szkic', 'Standard', 'Wysoka', 'Ultra'] as Quality[]).map(q => (
                    <button key={q} onClick={() => setQuality(q)}
                      className={`px-3 py-2 rounded-lg text-sm border transition-colors text-left ${
                        quality === q ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                      }`}>
                      <div className="font-medium">{q}</div>
                      <div className={`text-xs ${quality === q ? 'text-blue-200' : 'text-gray-400'}`}>{QUALITY_LAYER[q]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wykończenie */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Wykończenie powierzchni</label>
                <div className="flex gap-2 flex-wrap">
                  {(['Surowy', 'Szlifowany', 'Malowany'] as Finish[]).map(f => (
                    <button key={f} onClick={() => setFinish(f)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        finish === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                      }`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kolor */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Kolor: <span className="font-normal text-gray-500">{color.name}</span></label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(c => (
                    <button key={c.hex} onClick={() => setColor(c)} title={c.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        color.hex === c.hex ? 'border-blue-600 scale-110' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
              </div>

              {/* Wypełnienie */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Wypełnienie: <span className="font-normal text-gray-500">{infill}%</span>
                  <span className="ml-2 text-xs text-gray-400">
                    ({infill <= 15 ? 'Lekkie' : infill <= 30 ? 'Standardowe' : infill <= 60 ? 'Mocne' : 'Pełne'})
                  </span>
                </label>
                <input type="range" min={5} max={100} step={5} value={infill}
                  onChange={e => setInfill(Number(e.target.value))}
                  className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5%</span><span>50%</span><span>100%</span>
                </div>
              </div>

              {/* Ekspres */}
              <div className="mb-5">
                <button onClick={() => setRush(!rush)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                    rush ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white hover:border-yellow-300'
                  }`}>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-gray-800">⚡ Ekspresowa realizacja 24h</div>
                    <div className="text-xs text-gray-500">Priorytetowy druk, wysyłka następnego dnia</div>
                  </div>
                  <div className={`text-sm font-bold ${rush ? 'text-yellow-600' : 'text-gray-400'}`}>+50%</div>
                </button>
              </div>

              {/* Ilość i cena */}
              <div className="flex items-center gap-4 mb-5">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Ilość</label>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-gray-500 hover:bg-gray-50">−</button>
                    <span className="px-4 py-2 font-medium">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-gray-500 hover:bg-gray-50">+</button>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">Cena za sztukę</div>
                  <div className="text-3xl font-bold text-blue-600">{price} zł</div>
                  {qty > 1 && <div className="text-xs text-gray-500">Razem: {price * qty} zł</div>}
                </div>
              </div>

              <button onClick={handleAdd}
                className={`w-full py-3 rounded-xl font-semibold text-lg transition-all ${
                  added ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}>
                {added ? '✓ Dodano do koszyka!' : 'Dodaj do koszyka'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
