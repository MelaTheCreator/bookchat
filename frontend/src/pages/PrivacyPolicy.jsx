import React from "react";

export default function PrivacyPolicy() {
  return (
    <article className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
        Datenschutzerklärung
      </h1>
      <p className="mt-4 text-slate-600">
        Diese Datenschutzerklärung informiert über die Art und den Umfang der
        Verarbeitung personenbezogener Daten in diesem Projekt.
      </p>

      <section className="mt-6 space-y-6 text-slate-700">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            1. Verantwortlicher
          </h2>
          <p className="mt-2">
            <strong>Mela Heß</strong>
            <br />
            Tarostr. 15
            <br />
            04103 Leipzig
            <br />
            E-Mail: melaniehe@t-online.de
          </p>
          <p className="mt-2">
            Diese Website wird als Privatprojekt betrieben.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            2. Zweck der Verarbeitung
          </h2>
          <p className="mt-2">
            Diese Website ermöglicht registrierten Nutzern:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Bücher aus dem Project-Gutenberg-Archiv zu lesen</li>
            <li>den eigenen Lesefortschritt zu speichern</li>
            <li>mit anderen Nutzern im Websocket-Livechat zu kommunizieren</li>
            <li>einen KI-Chat zu nutzen</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            3. Verarbeitete personenbezogene Daten
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                3.1 Daten bei Registrierung
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Benutzername</li>
                <li>E-Mail-Adresse</li>
                <li>Passwort (gehasht mit bcrypt)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                3.2 Nutzungsdaten
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Lesefortschritt</li>
                <li>Session-Cookie zur Anmeldung</li>
                <li>Cookie mit Nutzer-ID für Websocket-Chat</li>
                <li>
                  technische Daten wie IP-Adresse, Browserinformationen,
                  Server-Logs
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">3.3 Chat</h3>
              <p className="mt-2">
                Chat-Nachrichten werden nicht dauerhaft gespeichert.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">4. Cookies</h2>
          <p className="mt-2">
            Es werden ausschließlich technisch notwendige Cookies verwendet:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Session-Cookie (Login)</li>
            <li>Cookie mit Nutzer-ID für Websocket-Chat</li>
          </ul>
          <p className="mt-2">
            Diese Cookies sind erforderlich, damit die Website funktioniert. Es
            erfolgt kein Tracking oder Einsatz von Marketing-Cookies.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            5. Hosting & technische Infrastruktur
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                5.1 Hosting
              </h3>
              <p className="mt-2">
                Die Website wird bei Render gehostet, Standort Frankfurt (EU).
                Render verarbeitet technische Daten wie IP-Adresse,
                Browserinformationen und Server-Logs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                5.2 Supabase
              </h3>
              <p className="mt-2">
                Die Datenbank wird über Supabase betrieben, ebenfalls in der EU
                (Frankfurt). Dort werden gespeichert:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Benutzername</li>
                <li>E-Mail-Adresse</li>
                <li>Passwort-Hash</li>
                <li>Lesefortschritt</li>
              </ul>
              <p className="mt-2">
                Supabase ist ein Auftragsverarbeiter gemäß Art. 28 DSGVO.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            6. Project Gutenberg
          </h2>
          <p className="mt-2">
            Beim Abruf von Büchern werden Inhalte über das Backend von Project
            Gutenberg geladen. Dabei werden keine personenbezogenen Daten der
            Nutzer an Project Gutenberg übertragen.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            7. KI-Chat (Mistral AI)
          </h2>
          <p className="mt-2">
            Für den KI-Chat werden Nutzereingaben an den Anbieter Mistral AI
            übertragen.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Texteingaben der Nutzer</li>
            <li>technisch notwendige Metadaten (z. B. IP-Adresse)</li>
          </ul>
          <p className="mt-2">
            Die Verarbeitung erfolgt ausschließlich innerhalb der Europäischen
            Union. Eine Nutzung der Daten zu Trainingszwecken findet nicht
            statt, sofern dies nicht ausdrücklich vom Nutzer erlaubt wurde.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            8. Rechtsgrundlagen
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
            <li>
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Betrieb und
              Sicherheit der Website)
            </li>
            <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung für den KI-Chat)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            9. Speicherdauer
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Daten werden gespeichert, bis der Nutzer sein Konto löscht.</li>
            <li>
              Server-Logs werden nach Vorgaben des Hosters automatisch gelöscht.
            </li>
            <li>Chat-Nachrichten werden nicht dauerhaft gespeichert.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            10. Sicherheit
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>HTTPS-Verschlüsselung</li>
            <li>Passwort-Hashing mit bcrypt</li>
            <li>Zugriffsbeschränkungen über Supabase Policies</li>
            <li>Serverstandort EU</li>
            <li>Keine Speicherung von Klartext-Passwörtern</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            11. Weitergabe von Daten
          </h2>
          <p className="mt-2">Eine Weitergabe erfolgt ausschließlich an:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Render (Hosting)</li>
            <li>Supabase (Datenbank)</li>
            <li>Mistral AI (KI-Chat)</li>
          </ul>
          <p className="mt-2">
            Es erfolgt keine Weitergabe an Dritte zu Werbezwecken.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            12. Drittlandtransfer
          </h2>
          <p className="mt-2">
            Ein Drittlandtransfer findet nicht statt. Die Verarbeitung erfolgt
            ausschließlich innerhalb der Europäischen Union.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            13. Rechte der betroffenen Personen
          </h2>
          <p className="mt-2">Nutzer haben folgende Rechte:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch (Art. 21 DSGVO)</li>
          </ul>
          <p className="mt-2">Kontakt über die oben genannte Adresse.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            14. Profiling / Tracking
          </h2>
          <p className="mt-2">
            Es findet kein Profiling, Tracking oder Analyse des Nutzerverhaltens
            statt.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            15. Änderungen der Datenschutzerklärung
          </h2>
          <p className="mt-2">
            Diese Datenschutzerklärung kann bei technischen oder rechtlichen
            Änderungen aktualisiert werden.
          </p>
        </div>
      </section>
    </article>
  );
}
