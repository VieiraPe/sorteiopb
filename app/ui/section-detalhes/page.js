import Image from "next/image";

export default function SectionDetalhes() {
  return (
    <section
      id="detalhes"
      className="w-full min-h-screen py-24 px-4 sm:px-6 bg-gradient-to-r from-black to-blue-700 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h3 className="text-5xl font-extrabold text-slate-200 mb-20 text-center">
          Como <span className="text-blue-300">Funciona?</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Passo 01 */}
          <div className="relative group">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-64 h-64 z-10">
              <Image
                src="/award.png"
                width={256}
                height={256}
                alt="award"
                className="object-contain hover:scale-105 transition-transform duration-300 drop-shadow-2xl"
                quality={100}
                priority
              />
            </div>
            <div className="pt-40 pb-12 px-10 bg-slate-800/80 border-2 border-blue-400/40 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 h-full backdrop-blur-sm text-center">
              <h3 className="font-extrabold text-3xl mb-8 text-blue-300">
                Passo 01
              </h3>
              <p className="text-slate-200 text-xl leading-relaxed">
                Garanta sua chance de ganhar! Clique em{" "}
                <span className="font-semibold text-white">
                  Participar Agora
                </span>{" "}
                e escolha seus números antes que acabem!
              </p>
            </div>
          </div>

          {/* Passo 02 */}
          <div className="relative group">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-64 h-64 z-10">
              <Image
                src="/bilhete.png"
                width={256}
                height={256}
                alt="bilhete"
                className="object-contain hover:scale-105 transition-transform duration-300 drop-shadow-2xl"
                quality={100}
                priority
              />
            </div>
            <div className="pt-40 pb-12 px-10 bg-slate-800/80 border-2 border-blue-400/40 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 h-full backdrop-blur-sm text-center">
              <h3 className="font-extrabold text-3xl mb-8 text-blue-300">
                Passo 02
              </h3>
              <p className="text-slate-200 text-xl leading-relaxed">
                Compre cotas do sorteio e leve um eBook exclusivo! Quanto mais
                números, maiores suas chances de ganhar um iPhone.
              </p>
            </div>
          </div>

          {/* Passo 03 */}
          <div className="relative group">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-64 h-64 z-10">
              <Image
                src="/trofeu.png"
                width={256}
                height={256}
                alt="Trofeu"
                className="object-contain hover:scale-105 transition-transform duration-300 drop-shadow-2xl"
                quality={100}
                priority
              />
            </div>
            <div className="pt-40 pb-12 px-10 bg-slate-800/80 border-2 border-blue-400/40 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 h-full backdrop-blur-sm text-center">
              <h3 className="font-extrabold text-3xl mb-8 text-blue-300">
                Passo 03
              </h3>
              <p className="text-slate-200 text-xl leading-relaxed">
                Pronto! Anote seus números e fique atento ao seu e-mail! Em
                breve, informaremos a data do sorteio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
