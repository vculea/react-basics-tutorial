// Pas 4 — Prettier (formatare automată).
// De ce: formatarea manuală e subiectivă și devine sursă de fricțiune la code review.
// Un formatter automat aplică același stil peste tot, fără discuție.

export function PrettierFormat() {
  return (
    <div style={{ fontFamily: "monospace", lineHeight: 1.7, maxWidth: 800 }}>
      <h2>Configurație Prettier</h2>

      <p>
        Prettier este un <strong>formatter de cod</strong> — rescrie fișierele respectând un set fix de reguli, fără să schimbe ce face codul. Rulează automat
        la salvare și poate fi rulat și din terminal.
      </p>

      <h3>Setările din .prettierrc</h3>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "4px 12px", borderBottom: "1px solid #ccc" }}>Opțiune</th>
            <th style={{ textAlign: "left", padding: "4px 12px", borderBottom: "1px solid #ccc" }}>Valoare</th>
            <th style={{ textAlign: "left", padding: "4px 12px", borderBottom: "1px solid #ccc" }}>Ce înseamnă</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "4px 12px" }}>
              <code>semi</code>
            </td>
            <td style={{ padding: "4px 12px" }}>
              <code>true</code>
            </td>
            <td style={{ padding: "4px 12px" }}>pune punct-și-virgulă la sfârșitul fiecărei instrucțiuni</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 12px" }}>
              <code>singleQuote</code>
            </td>
            <td style={{ padding: "4px 12px" }}>
              <code>false</code>
            </td>
            <td style={{ padding: "4px 12px" }}>folosește ghilimele duble, nu simple</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 12px" }}>
              <code>printWidth</code>
            </td>
            <td style={{ padding: "4px 12px" }}>
              <code>120</code>
            </td>
            <td style={{ padding: "4px 12px" }}>lungimea maximă a unui rând înainte de a-l rupe pe linii separate</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 12px" }}>
              <code>arrowParens</code>
            </td>
            <td style={{ padding: "4px 12px" }}>
              <code>"avoid"</code>
            </td>
            <td style={{ padding: "4px 12px" }}>
              omite parantezele la arrow functions cu un singur parametru: <code>x =&gt; x + 1</code> în loc de <code>(x) =&gt; x + 1</code>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "4px 12px" }}>
              <code>plugins</code>
            </td>
            <td style={{ padding: "4px 12px" }}>
              <code>prettier-plugin-tailwindcss</code>
            </td>
            <td style={{ padding: "4px 12px" }}>sortează automat clasele Tailwind CSS — nu are efect acum, intră în joc când adăugăm Tailwind</td>
          </tr>
        </tbody>
      </table>

      <h3>Comenzi de terminal</h3>
      <pre style={{ background: "#f4f4f4", padding: "0.75rem 1rem", borderRadius: 4 }}>
        {`npm run format        # rescrie fișierele în loc
npm run format:check  # verifică fără să modifice — util în CI`}
      </pre>

      <h3>Formatare automată la salvare</h3>
      <p>
        Fișierul <code>.vscode/settings.json</code> este comis în proiect, deci toți membrii echipei primesc aceleași setări de editor fără să configureze nimic
        manual:
      </p>
      <pre style={{ background: "#f4f4f4", padding: "0.75rem 1rem", borderRadius: 4 }}>
        {`{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}`}
      </pre>
      <p>
        Extensia necesară în VS Code: <strong>Prettier - Code formatter</strong> (<code>esbenp.prettier-vscode</code>).
      </p>

      <h3>Cum îi spui formatter-ului să lase un bloc în pace</h3>
      <p>
        Comentariul <code>// prettier-ignore</code> pus imediat înainte de o declarație îi spune lui Prettier să lase exact acel nod neatins:
      </p>
      <pre style={{ background: "#f4f4f4", padding: "0.75rem 1rem", borderRadius: 4 }}>
        {`// prettier-ignore
const matrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];`}
      </pre>
      <p>
        În JSX, forma echivalentă este <code>{"{/* prettier-ignore */}"}</code> și se aplică elementului următor din arbore.
      </p>
      <p>
        <strong>Important:</strong> directiva afectează <em>doar nodul imediat următor</em> — nu există „ignoră de aici până aici" în JS/TS. Variantele{" "}
        <code>prettier-ignore-start</code> / <code>prettier-ignore-end</code> funcționează doar în Markdown, YAML și HTML.
      </p>
      <p>
        <strong>Folosit rar și motivat</strong> — pentru matrice, tabele de valori aliniate în coloane — nu ca să ocolim convenția de formatare.
      </p>
    </div>
  );
}
