export default function ImpressumPage() {
  return (
    <div className="page-wrapper">
      <h1 className="page-title">Impressum</h1>
      <p className="page-text">Angaben gemäß § 5 TMG</p>

      <p className="page-text">
        Mela Heß
        <br />
        Tarostr.
        <br />
        Leipzig
      </p>

      <h2 className="page-subtitle">Kontakt</h2>
      <p className="page-text">
        E-Mail:{" "}
        <a className="page-link" href="mailto:[melaniehe@t-online.de]">
          melaniehe@t-online.de
        </a>
      </p>

      <h2 className="page-subtitle">Haftung für Inhalte</h2>
      <p className="page-text">
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch
        keine Gewähr übernommen.
      </p>

      <h2 className="page-subtitle">Haftung für Links</h2>
      <p className="page-text">
        Diese Website enthält Links zu externen Websites Dritter, auf deren
        Inhalte kein Einfluss besteht. Deshalb kann für diese fremden Inhalte
        auch keine Gewähr übernommen werden. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich.
      </p>

      <h2 className="page-subtitle">Urheberrecht</h2>
      <p className="page-text">
        Die auf dieser Website veröffentlichten Inhalte unterliegen dem
        deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
        Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
        schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>

      <h2 className="page-subtitle">Streitschlichtung</h2>
      <p className="page-text">
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:
        <a
          className="page-link"
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr
        </a>
        .
      </p>
      <p className="page-text">
        Ich bin nicht verpflichtet und nicht bereit, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>
    </div>
  );
}
