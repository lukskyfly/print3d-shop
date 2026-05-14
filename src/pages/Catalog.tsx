import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../data/products'

export default function Catalog() {
  const [category, setCategory] = useState('Wszystkie')
  const [search, setSearch] = useState('')

  const filtered = PRODUCTS.filter(p => {
    const matchCat = category === 'Wszystkie' || p.category === category
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Katalog produktów</h1>
        <p className="text-gray-500 mb-8">Wybierz produkt i skonfiguruj swój wydruk</p>

        {/* Filtry */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Szukaj produktu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm flex-1 min-w-48 outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Siatka produktów */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Brak produktów spełniających kryteria</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 text-xs font-medium px-2 py-1 rounded-full text-gray-600">
                    {product.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1 text-lg">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400">od</span>
                      <span className="text-xl font-bold text-blue-600 ml-1">{product.basePrice} zł</span>
                    </div>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 5).map(c => (
                        <div
                          key={c.hex}
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                      {product.colors.length > 5 && (
                        <span className="text-xs text-gray-400 ml-1">+{product.colors.length - 5}</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {product.materials.map(m => (
                      <span key={m} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
