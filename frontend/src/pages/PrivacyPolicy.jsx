import React from "react";

export default function PrivacyPolicy() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1>Datenschutzerklärung</h1>

      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          <strong>Mela Heß</strong>
          <br />
          Tarostr. 15
          <br />
          04103 Leipzig
          <br />
          E-Mail: melanie@t-online.de
        </p>
        <p>Diese Website wird als Privatprojekt betrieben.</p>
      </section>

      <section>
        <h2>2. Zweck der Verarbeitung</h2>
        <p>Diese Website ermöglicht registrierten Nutzern:</p>
        <ul>
          <li>Bücher aus dem Project-Gutenberg-Archiv zu lesen</li>
          <li>den eigenen Lesefortschritt zu speichern</li>
          <li>mit anderen Nutzern im Websocket-Livechat zu kommunizieren</li>
          <li>einen geplanten KI-Chat zu nutzen</li>
        </ul>
      </section>

      <section>
        <h2>3. Verarbeitete personenbezogene Daten</h2>

        <h3>3.1 Daten bei Registrierung</h3>
        <ul>
          <li>Benutzername</li>
          <li>E-Mail-Adresse</li>
          <li>Passwort (gehasht mit bcrypt)</li>
        </ul>

        <h3>3.2 Nutzungsdaten</h3>
        <ul>
          <li>Lesefortschritt</li>
          <li>Session-Cookie zur Anmeldung</li>
          <li>Cookie mit Nutzer-ID für Websocket-Chat</li>
          <li>
            technische Daten wie IP-Adresse, Browserinformationen, Server-Logs
          </li>
        </ul>

        <h3>3.3 Chat</h3>
        <p>Chat-Nachrichten werden nicht dauerhaft gespeichert.</p>
      </section>

      <section>
        <h2>4. Cookies</h2>
        <p>Es werden ausschließlich technisch notwendige Cookies verwendet:</p>
        <ul>
          <li>Session-Cookie (Login)</li>
          <li>Cookie mit User-ID für Websocket-Chat</li>
        </ul>
        <p>
          Diese Cookies sind erforderlich, damit die Website funktioniert. Es
          erfolgt kein Tracking oder Einsatz von Marketing-Cookies.
        </p>
      </section>

      <section>
        <h2>5. Hosting & technische Infrastruktur</h2>

        <h3>5.1 Render.com</h3>
        <p>
          Die Website wird bei Render.com gehostet, Standort Frankfurt (EU).
          Render verarbeitet technische Daten wie IP-Adresse,
          Browserinformationen und Server-Logs.
        </p>

        <h3>5.2 Supabase</h3>
        <p>
          Die Datenbank wird über Supabase betrieben, ebenfalls in der EU
          (Frankfurt). Dort werden gespeichert:
        </p>
        <ul>
          <li>Benutzername</li>
          <li>E-Mail-Adresse</li>
          <li>Passwort-Hash</li>
          <li>Lesefortschritt</li>
        </ul>
        <p>Supabase ist ein Auftragsverarbeiter gemäß Art. 28 DSGVO.</p>
      </section>

      <section>
        <h2>6. Project Gutenberg API</h2>
        <p>
          Beim Abruf von Büchern werden Inhalte über das Backend von Project
          Gutenberg geladen. Dabei werden keine personenbezogenen Daten der
          Nutzer an Project Gutenberg übertragen.
        </p>
      </section>

      <section>
        <h2>7. KI-Chat (Groq)</h2>
        <p>
          Für den geplanten KI-Chat werden Nutzereingaben an den Anbieter Groq
          Inc. (USA) übertragen. Groq verarbeitet:
        </p>
        <ul>
          <li>Texteingaben der Nutzer</li>
          <li>technische Daten wie IP-Adresse</li>
        </ul>
        <p>
          Die Übertragung erfolgt auf Grundlage der Standardvertragsklauseln
          (SCC) gemäß Art. 46 DSGVO.
        </p>
      </section>

      <section>
        <h2>8. Rechtsgrundlagen</h2>
        <ul>
          <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
          <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</li>
          <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung für KI-Chat)</li>
        </ul>
      </section>

      <section>
        <h2>9. Speicherdauer</h2>
        <ul>
          <li>Daten werden gespeichert, bis der Nutzer sein Konto löscht.</li>
          <li>
            Server-Logs werden nach Vorgaben des Hosters automatisch gelöscht.
          </li>
          <li>Chat-Nachrichten werden nicht dauerhaft gespeichert.</li>
        </ul>
      </section>

      <section>
        <h2>10. Sicherheit</h2>
        <ul>
          <li>HTTPS-Verschlüsselung</li>
          <li>Passwort-Hashing mit bcrypt</li>
          <li>Zugriffsbeschränkungen über Supabase Policies</li>
          <li>Serverstandort EU</li>
          <li>Keine Speicherung von Klartext-Passwörtern</li>
        </ul>
      </section>

      <section>
        <h2>11. Weitergabe von Daten</h2>
        <p>Eine Weitergabe erfolgt ausschließlich an:</p>
        <ul>
          <li>Render.com (Hosting)</li>
          <li>Supabase (Datenbank)</li>
          <li>Groq (KI-Chat, USA)</li>
        </ul>
        <p>Es erfolgt keine Weitergabe an Dritte zu Werbezwecken.</p>
      </section>

      <section>
        <h2>12. Drittlandtransfer</h2>
        <p>
          Für den KI-Chat werden Daten in die USA übertragen. Dies erfolgt auf
          Grundlage der Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO.
        </p>
      </section>

      <section>
        <h2>13. Rechte der betroffenen Personen</h2>
        <p>Nutzer haben folgende Rechte:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch (Art. 21 DSGVO)</li>
        </ul>
        <p>Kontakt über die oben genannte Adresse.</p>
      </section>

      <section>
        <h2>14. Profiling / Tracking</h2>
        <p>
          Es findet kein Profiling, Tracking oder Analyse des Nutzerverhaltens
          statt.
        </p>
      </section>

      <section>
        <h2>15. Änderungen der Datenschutzerklärung</h2>
        <p>
          Diese Datenschutzerklärung kann bei technischen oder rechtlichen
          Änderungen aktualisiert werden.
        </p>
      </section>
    </main>
  );
}
