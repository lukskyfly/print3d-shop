import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Koszyk jest pusty</h2>
          <p className="text-gray-500 mb-6">Dodaj produkty z katalogu lub wgraj własny model</p>
          <div className="flex gap-3 justify-center">
            <Link to="/catalog" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Przeglądaj katalog
            </Link>
            <Link to="/upload" className="border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:border-blue-300 transition-colors">
              Wgraj model
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Koszyk ({items.length})</h1>

        <div className="space-y-4 mb-8">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4 items-start">
              <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {item.uploadedFileName ? '📁' : '🔷'}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{item.product.name}</h3>
                {item.uploadedFileName && (
                  <p className="text-xs text-gray-400 mt-0.5">Plik: {item.uploadedFileName}</p>
                )}
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                    {item.material}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full inline-block border border-gray-300" style={{ backgroundColor: item.color.hex }} />
                    {item.color.name}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                    {item.infill}% wypełnienia
                  </span>
                  {item.quality && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                      {item.quality}
                    </span>
                  )}
                  {item.finish && item.finish !== 'Surowy' && (
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                      {item.finish}
                    </span>
                  )}
                  {item.rush && (
                    <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                      ⚡ Ekspres 24h
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <span className="text-lg font-bold text-blue-600">{item.price * item.quantity} zł</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 text-sm">−</button>
                  <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 text-sm">+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Podsumowanie */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Suma częściowa</span>
            <span className="font-semibold">{total()} zł</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Dostawa</span>
            <span className="text-green-500 font-medium">Bezpłatna</span>
          </div>
          <div className="flex justify-between items-center py-4 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">Razem</span>
            <span className="text-2xl font-bold text-blue-600">{total()} zł</span>
          </div>
          <Link to="/checkout"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition-colors mt-2">
            Zamów teraz →
          </Link>
          <Link to="/catalog" className="block w-full text-center text-gray-500 hover:text-gray-700 text-sm mt-3 transition-colors">
            ← Kontynuuj zakupy
          </Link>
        </div>
      </div>
    </div>
  )
}
