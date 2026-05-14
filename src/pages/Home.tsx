import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero — ciemne tło jak mapi-tech */}
      <section
        className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1e1b4b 100%)',
        }}
      >
        {/* Dekoracyjna siatka */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto w-full pt-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Druk 3D na zamówienie · Realizacja 24–72h
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Najwygodniejsza<br />
              <span className="text-blue-400">usługa druku 3D</span><br />
              w Polsce
            </h1>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Automatyczna wycena, szybkie zamówienia i realizacja w jednym miejscu.
              Wgraj model STL lub OBJ i uzyskaj cenę w kilka sekund.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50">
                Wyceń i zamów teraz
              </Link>
              <Link to="/catalog"
                className="bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-colors border border-white/10">
                Przeglądaj katalog
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative max-w-5xl mx-auto w-full mt-20 pb-16">
          <div className="grid grid-cols-3 gap-8 max-w-lg">
            {[
              { val: '500+', label: 'zrealizowanych projektów' },
              { val: '24h', label: 'ekspresowa realizacja' },
              { val: '4', label: 'materiały druku' },
            ].map(s => (
              <div key={s.val}>
                <div className="text-2xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload CTA — kluczowa sekcja jak mapi-tech */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Wyceń i zamów druk 3D<br />w kilku kliknięciach!</h2>
          <p className="text-gray-500 mb-12">Wrzuć modele 3D i uzyskaj natychmiastową wycenę</p>

          <Link to="/upload" className="block group">
            <div className="border-2 border-dashed border-blue-400 rounded-2xl p-16 hover:border-blue-600 hover:bg-blue-50/50 transition-all cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <svg className="w-16 h-16 text-blue-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium text-lg">Przeciągnij i upuść plik tutaj</p>
                  <p className="text-gray-400 text-sm mt-1">STL, OBJ — maks. 50 MB</p>
                </div>
                <div className="flex items-center gap-4 w-full max-w-xs">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium">LUB</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <span className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-medium text-sm transition-colors">
                  Wybierz plik
                </span>
              </div>
            </div>
          </Link>

          <p className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Wszystkie Twoje pliki są u nas w pełni bezpieczne
          </p>
        </div>
      </section>

      {/* Cechy */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Ekspresowa realizacja',
                desc: 'Zamówienia gotowe w 24–72h w zależności od rozmiaru i materiału.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Automatyczna wycena',
                desc: 'Wgraj plik i otrzymaj cenę natychmiast. Bez oczekiwania na ofertę.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: 'Wybór materiału',
                desc: 'PLA, ABS, PETG, Resin — każdy projekt wymaga innych właściwości.',
              },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materiały */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Dostępne materiały i technologie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'PLA', tech: 'FDM', badge: 'Najpopularniejszy', desc: 'Ekologiczny, łatwy w druku', price: 'od 5 zł/h' },
              { name: 'ABS', tech: 'FDM', badge: 'Techniczny', desc: 'Odporny na temperaturę', price: 'od 6 zł/h' },
              { name: 'PETG', tech: 'FDM', badge: 'Wszechstronny', desc: 'Odporny na uderzenia', price: 'od 5.5 zł/h' },
              { name: 'Resin', tech: 'SLA', badge: 'Premium', desc: 'Najwyższa szczegółowość', price: 'od 12 zł/h' },
            ].map(m => (
              <div key={m.name} className="border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900">{m.name}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{m.tech}</span>
                </div>
                <span className="text-xs text-blue-600 font-medium">{m.badge}</span>
                <p className="text-xs text-gray-500 mt-1 mb-3">{m.desc}</p>
                <p className="text-sm font-semibold text-gray-900">{m.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Zacznij Drukować Dziś</h2>
          <p className="text-gray-400 mb-8 text-sm">Pierwsza wycena jest zawsze bezpłatna</p>
          <div className="flex gap-3 justify-center">
            <Link to="/upload" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors">
              Wyceń projekt
            </Link>
            <Link to="/catalog" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors border border-white/10">
              Katalog produktów
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
