import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { items, total, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', zip: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Wymagane'
    if (!form.email.includes('@')) e.email = 'Nieprawidłowy email'
    if (!form.address.trim()) e.address = 'Wymagane'
    if (!form.city.trim()) e.city = 'Wymagane'
    if (!/^\d{2}-\d{3}$/.test(form.zip)) e.zip = 'Format: 00-000'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
    clearCart()
  }

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 ${
          errors[key] ? 'border-red-400' : 'border-gray-200'
        }`}
      />
      {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
    </div>
  )

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Zamówienie przyjęte!</h2>
          <p className="text-gray-500 mb-2">Potwierdzenie wysłaliśmy na <strong>{form.email}</strong></p>
          <p className="text-gray-400 text-sm mb-6">Czas realizacji: 24–72h w zależności od produktu i materiału</p>
          <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Wróć na stronę główną
          </button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizacja zamówienia</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formularz */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Dane kontaktowe</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('name', 'Imię i nazwisko', 'text', 'Jan Kowalski')}
                {field('email', 'Email', 'email', 'jan@example.com')}
                {field('phone', 'Telefon (opcjonalnie)', 'tel', '+48 000 000 000')}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Adres dostawy</h2>
              <div className="space-y-4">
                {field('address', 'Ulica i numer', 'text', 'ul. Przykładowa 1/2')}
                <div className="grid grid-cols-2 gap-4">
                  {field('zip', 'Kod pocztowy', 'text', '00-001')}
                  {field('city', 'Miasto', 'text', 'Warszawa')}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Uwagi do zamówienia</h2>
              <textarea
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                rows={3}
                placeholder="Dodatkowe informacje dla drukarki..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>
          </div>

          {/* Podsumowanie */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-20">
              <h2 className="font-bold text-gray-900 mb-4">Podsumowanie</h2>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate mr-2">{item.product.name} ×{item.quantity}</span>
                    <span className="font-medium flex-shrink-0">{item.price * item.quantity} zł</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Razem</span>
                  <span className="text-blue-600">{total()} zł</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Dostawa bezpłatna</p>
              </div>
              <button type="submit" className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors">
                Złóż zamówienie
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                Płatność przy odbiorze lub przelewem po potwierdzeniu
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
