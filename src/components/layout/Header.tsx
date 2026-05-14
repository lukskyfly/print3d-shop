import { Link, useLocation } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'

export default function Header() {
  const items = useCartStore(s => s.items)
  const count = items.reduce((n, i) => n + i.quantity, 0)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors ${
        isHome
          ? `hover:text-white ${pathname === to ? 'text-white' : 'text-gray-400'}`
          : `hover:text-blue-600 ${pathname === to ? 'text-blue-600' : 'text-gray-600'}`
      }`}
    >
      {label}
    </Link>
  )

  return (
    <header className={`sticky top-0 z-50 ${isHome ? 'bg-transparent absolute w-full' : 'bg-white border-b border-gray-100 shadow-sm'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className={`text-lg font-bold ${isHome ? 'text-white' : 'text-gray-900'}`}>
            Print<span className="text-blue-500">3D</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLink('/', 'Start')}
          {navLink('/catalog', 'Katalog')}
          {navLink('/upload', 'Wycena & Zamówienie')}
        </nav>

        <Link
          to="/cart"
          className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            isHome
              ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Zamówienia
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
