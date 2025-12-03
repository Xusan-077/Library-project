export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Biz haqimizda
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              O'zbekistonning eng yirik kutubxona tarmog'i. 2010-yildan beri
              bilim va ma'rifat yo'lida xizmat qilamiz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              Bizning missiyamiz
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center mb-12">
              Har bir kishi uchun bilimga erkin kirish imkoniyatini yaratish va
              o'qish madaniyatini rivojlantirish orqali jamiyatni boy qilish.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-slate-800">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  50,000+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Kitoblar
                </div>
              </div>

              <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-slate-800">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  15
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Filiallar
                </div>
              </div>

              <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-slate-800">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  100,000+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  A'zolar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              Bizning tariximiz
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    2010
                  </span>
                </div>
                <div className="flex-1 border-l-2 border-blue-600 dark:border-blue-400 pl-6 pb-8">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Kutubxona tashkil etildi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Toshkent shahrida birinchi filial ochildi va 5,000 ta kitob
                    bilan faoliyat boshlandi.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    2015
                  </span>
                </div>
                <div className="flex-1 border-l-2 border-blue-600 dark:border-blue-400 pl-6 pb-8">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Raqamli kutubxona
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Onlayn platforma ishga tushirildi va elektron kitoblar
                    to'plami yaratildi.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    2020
                  </span>
                </div>
                <div className="flex-1 border-l-2 border-blue-600 dark:border-blue-400 pl-6 pb-8">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Kengayish davri
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    O'zbekiston bo'ylab 15 ta filial ochildi va 50,000+ kitob
                    to'plamiga erishildi.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    2024
                  </span>
                </div>
                <div className="flex-1 border-l-2 border-blue-600 dark:border-blue-400 pl-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Zamonaviy xizmatlar
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    AI asosida kitob tavsiyalari, virtual tadbirlar va mobil
                    ilova ishga tushirildi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Bizning qadriyatlarimiz
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Ochiqlik
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Biz har bir inson uchun bilimga erkin kirish huquqiga
                  ishonamiz va bu imkoniyatni yaratishga intilamiz.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Sifat
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yuqori sifatli kitoblar va xizmatlar taqdim etish orqali
                  o'quvchilarimizning ehtiyojlarini qondiramiz.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Jamiyat
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Biz o'quvchilar, mualliflar va nashriyotchilar uchun yagona
                  jamiyat yaratamiz.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Innovatsiya
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Zamonaviy texnologiyalardan foydalanib, kutubxona xizmatlarini
                  doimiy ravishda takomillashtiramiz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Bizning jamoa
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 dark:bg-slate-700 rounded-full"></div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                  Aziza Karimova
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Direktor
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  20 yillik tajriba
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 dark:bg-slate-700 rounded-full"></div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                  Rustam Tursunov
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Bosh kutubxonachi
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  15 yillik tajriba
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 dark:bg-slate-700 rounded-full"></div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                  Nigora Rashidova
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Raqamli xizmatlar
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  10 yillik tajriba
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Bizga qo'shiling
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              100,000+ o'quvchi jamoasiga qo'shiling va cheksiz bilim dunyosini
              kashf eting.
            </p>
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              A'zo bo'lish
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
