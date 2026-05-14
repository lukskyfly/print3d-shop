import { useState, useCallback, lazy, Suspense } from 'react'
import { useCartStore } from '../store/cartStore'
import type { Material, Color, Quality, Finish } from '../types'
import { MATERIAL_MULTIPLIER, QUALITY_MULTIPLIER, QUALITY_LAYER, FINISH_MULTIPLIER } from '../types'
import { COLORS } from '../data/products'
import { useNavigate } from 'react-router-dom'

const ModelViewer = lazy(() => import('../components/three/ModelViewer'))

type FileType = 'stl' | 'obj' | null

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<FileType>(null)
  const [dragOver, setDragOver] = useState(false)
  const [material, setMaterial] = useState<Material>('PLA')
  const [color, setColor] = useState<Color>(COLORS[0])
  const [infill, setInfill] = useState(20)
  const [quality, setQuality] = useState<Quality>('Standard')
  const [finish, setFinish] = useState<Finish>('Surowy')
  const [rush, setRush] = useState(false)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const addItem = useCartStore(s => s.addItem)
  const navigate = useNavigate()

  const handleFile = (f: File) => {
    const ext = f.name.split('.').pop()?.toLowerCase()
    if (ext !== 'stl' && ext !== 'obj') return alert('Obsługiwane formaty: STL, OBJ')
    setFile(f)
    setFileType(ext as FileType)
    if (fileUrl) URL.revokeObjectURL(fileUrl)
    setFileUrl(URL.createObjectURL(f))
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [])

  const estimatedVolume = file ? Math.max(10, Math.min(500, file.size / 5000)) : 0
  const basePrice = Math.round(estimatedVolume * 0.8)
  const price = file
    ? Math.round(basePrice * MATERIAL_MULTIPLIER[material] * QUALITY_MULTIPLIER[quality] * FINISH_MULTIPLIER[finish] * (1 + infill / 200) * (rush ? 1.5 : 1))
    : 0
  const estimatedHours = file ? Math.max(1, Math.round(estimatedVolume / 30 * QUALITY_MULTIPLIER[quality] * (1 + infill / 100))) : 0
  const estimatedGrams = file ? Math.round(estimatedVolume * 1.2 * (infill / 100 + 0.3)) : 0

  const handleAdd = () => {
    if (!file) return
    addItem({
      id: `upload-${Date.now()}`,
      product: {
        id: 'custom-upload',
        name: `Własny model: ${file.name}`,
        description: 'Wgrany model 3D',
        basePrice,
        image: '',
        category: 'Custom',
        colors: COLORS,
        materials: ['PLA', 'ABS', 'PETG', 'Resin'],
      },
      quantity: qty,
      material,
      color,
      infill,
      quality,
      finish,
      rush,
      uploadedFile: file,
      uploadedFileName: file.name,
      price,
    })
    setAdded(true)
    setTimeout(() => navigate('/cart'), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wgraj własny model</h1>
        <p className="text-gray-500 mb-8">Obsługiwane formaty: <strong>STL</strong>, <strong>OBJ</strong></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload + konfiguracja */}
          <div className="space-y-5">
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors cursor-pointer ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-blue-400'
              }`}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <div className="text-5xl mb-4">📁</div>
              {file ? (
                <div>
                  <p className="font-semibold text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                  <p className="text-xs text-green-500 mt-2">✓ Plik załadowany</p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-gray-700">Przeciągnij plik lub kliknij</p>
                  <p className="text-sm text-gray-400 mt-1">STL lub OBJ, maks. 50 MB</p>
                </div>
              )}
              <input id="file-input" type="file" accept=".stl,.obj" className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>

            {file && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">

                {/* Materiał */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Materiał</label>
                  <div className="flex gap-2 flex-wrap">
                    {(['PLA', 'ABS', 'PETG', 'Resin'] as Material[]).map(m => (
                      <button key={m} onClick={() => setMaterial(m)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                          material === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                        }`}>{m}</button>
                    ))}
                  </div>
                </div>

                {/* Jakość */}
                <div>
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
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Wykończenie powierzchni</label>
                  <div className="flex gap-2 flex-wrap">
                    {(['Surowy', 'Szlifowany', 'Malowany'] as Finish[]).map(f => (
                      <button key={f} onClick={() => setFinish(f)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                          finish === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                        }`}>{f}</button>
                    ))}
                  </div>
                </div>

                {/* Kolor */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Kolor: <span className="font-normal text-gray-500">{color.name}</span></label>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.map(c => (
                      <button key={c.hex} onClick={() => setColor(c)} title={c.name}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${color.hex === c.hex ? 'border-blue-600 scale-110' : 'border-gray-200'}`}
                        style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                </div>

                {/* Wypełnienie */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Wypełnienie: {infill}%</label>
                  <input type="range" min={5} max={100} step={5} value={infill}
                    onChange={e => setInfill(Number(e.target.value))}
                    className="w-full accent-blue-600" />
                  <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                    <span>Lekkie 5%</span><span>Standardowe 20%</span><span>Pełne 100%</span>
                  </div>
                </div>

                {/* Ekspres */}
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

                {/* Estymaty */}
                <div className="grid grid-cols-3 gap-2 py-2 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Czas druku</div>
                    <div className="text-sm font-bold text-gray-800">~{estimatedHours}h</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Filament</div>
                    <div className="text-sm font-bold text-gray-800">~{estimatedGrams}g</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Warstwa</div>
                    <div className="text-sm font-bold text-gray-800">{QUALITY_LAYER[quality]}</div>
                  </div>
                </div>

                {/* Ilość i cena */}
                <div className="flex items-center gap-4 pt-1 border-t border-gray-100">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Ilość</label>
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5 text-gray-500 hover:bg-gray-50">−</button>
                      <span className="px-3 py-1.5 font-medium">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5 text-gray-500 hover:bg-gray-50">+</button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400">Szacowana cena</div>
                    <div className="text-2xl font-bold text-blue-600">{price} zł</div>
                    <div className="text-xs text-gray-400">obj. ~{estimatedVolume.toFixed(0)} cm³</div>
                  </div>
                </div>

                <button onClick={handleAdd}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    added ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}>
                  {added ? '✓ Dodano! Przekierowuję...' : 'Dodaj do koszyka'}
                </button>
              </div>
            )}
          </div>

          {/* Podgląd 3D */}
          <div>
            <div className="bg-gray-900 rounded-2xl overflow-hidden">
              <Suspense fallback={<div className="h-80 flex items-center justify-center text-gray-400 text-sm">Ładowanie podglądu...</div>}>
                <ModelViewer color={color.hex} modelUrl={fileUrl || undefined} modelType={fileType || undefined} height="400px" />
              </Suspense>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              {fileUrl ? 'Podgląd Twojego modelu — obróć myszką' : 'Wgraj plik, aby zobaczyć podgląd 3D'}
            </p>

            <div className="mt-5 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">ℹ️ Jak wyceniamy?</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Cena bazowa zależy od objętości modelu</li>
                <li>• Materiał: Resin ×2.0, ABS ×1.2, PETG ×1.15, PLA ×1.0</li>
                <li>• Jakość: Ultra ×2.2, Wysoka ×1.5, Standard ×1.0, Szkic ×0.8</li>
                <li>• Wykończenie: Malowany ×2.0, Szlifowany ×1.4, Surowy ×1.0</li>
                <li>• Wyższe wypełnienie = więcej materiału = wyższa cena</li>
                <li>• Ekspres 24h = +50% do ceny</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
