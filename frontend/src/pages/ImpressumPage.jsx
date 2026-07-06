export default function ImpressumPage() {
  return (
    <article className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Impressum</h1>
      <p className="mt-4 text-slate-600">Angaben gemäß § 5 TMG</p>

      <section className="mt-6 space-y-6 text-slate-700">
        <div>
          <p>
            Mela Heß
            <br />
            Tarostr.
            <br />
            Leipzig
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Kontakt</h2>
          <p className="mt-2 text-slate-700">
            E-Mail:{" "}
            <a
              className="text-slate-900 underline transition hover:text-slate-700"
              href="mailto:[melaniehe@t-online.de]"
            >
              melaniehe@t-online.de
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Haftung für Inhalte</h2>
          <p className="mt-2 text-slate-700">
            Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
            Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch
            keine Gewähr übernommen.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Haftung für Links</h2>
          <p className="mt-2 text-slate-700">
            Diese Website enthält Links zu externen Websites Dritter, auf deren
            Inhalte kein Einfluss besteht. Deshalb kann für diese fremden Inhalte
            auch keine Gewähr übernommen werden. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Urheberrecht</h2>
          <p className="mt-2 text-slate-700">
            Die auf dieser Website veröffentlichten Inhalte unterliegen dem
            deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Streitschlichtung</h2>
          <p className="mt-2 text-slate-700">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              className="text-slate-900 underline transition hover:text-slate-700"
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            .
          </p>
          <p className="mt-4 text-slate-700">
            Ich bin nicht verpflichtet und nicht bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </div>
      </section>
    </article>
  );
}
