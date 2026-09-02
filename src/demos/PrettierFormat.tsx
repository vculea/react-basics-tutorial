// Pas 4 — Prettier (formatare automată).
// De ce: formatarea manuală e subiectivă și devine sursă de fricțiune la code review.
// Un formatter automat aplică același stil peste tot, fără discuție.

export function PrettierFormat() {
  return (
    <div className="flex max-w-4xl flex-col gap-5 font-mono leading-7">
      <h2>Configurație Prettier</h2>

      <p>
        Prettier este un <strong>formatter de cod</strong> — rescrie fișierele respectând un set fix de reguli, fără să schimbe ce face codul. Rulează automat la salvare și poate fi rulat și din terminal.
      </p>

      <h3>Setările din .prettierrc</h3>
      <div className="border-border overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border-border bg-muted border-b px-3 py-2 font-semibold">Opțiune</th>
              <th className="border-border bg-muted border-b px-3 py-2 font-semibold">Valoare</th>
              <th className="border-border bg-muted border-b px-3 py-2 font-semibold">Ce înseamnă</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2">
                <code>semi</code>
              </td>
              <td className="px-3 py-2">
                <code>true</code>
              </td>
              <td className="px-3 py-2">pune punct-și-virgulă la sfârșitul fiecărei instrucțiuni</td>
            </tr>
            <tr>
              <td className="px-3 py-2">
                <code>singleQuote</code>
              </td>
              <td className="px-3 py-2">
                <code>false</code>
              </td>
              <td className="px-3 py-2">folosește ghilimele duble, nu simple</td>
            </tr>
            <tr>
              <td className="px-3 py-2">
                <code>printWidth</code>
              </td>
              <td className="px-3 py-2">
                <code>120</code>
              </td>
              <td className="px-3 py-2">lungimea maximă a unui rând înainte de a-l rupe pe linii separate</td>
            </tr>
            <tr>
              <td className="px-3 py-2">
                <code>arrowParens</code>
              </td>
              <td className="px-3 py-2">
                <code>"avoid"</code>
              </td>
              <td className="px-3 py-2">
                omite parantezele la arrow functions cu un singur parametru: <code>x =&gt; x + 1</code> în loc de <code>(x) =&gt; x + 1</code>
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2">
                <code>plugins</code>
              </td>
              <td className="px-3 py-2">
                <code>prettier-plugin-tailwindcss</code>
              </td>
              <td className="px-3 py-2">sortează automat clasele Tailwind CSS — nu are efect acum, intră în joc când adăugăm Tailwind</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Comenzi de terminal</h3>
      <pre className="border-border bg-muted text-foreground overflow-x-auto rounded-lg border p-4 text-sm">
        {`npm run format        # rescrie fișierele în loc
npm run format:check  # verifică fără să modifice — util în CI`}
      </pre>

      <h3>Formatare automată la salvare</h3>
      <p>
        Fișierul <code>.vscode/settings.json</code> este comis în proiect, deci toți membrii echipei primesc aceleași setări de editor fără să configureze nimic manual:
      </p>
      <pre className="border-border bg-muted text-foreground overflow-x-auto rounded-lg border p-4 text-sm">
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
      <pre className="border-border bg-muted text-foreground overflow-x-auto rounded-lg border p-4 text-sm">
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
        <strong>Important:</strong> directiva afectează <em>doar nodul imediat următor</em> — nu există „ignoră de aici până aici" în JS/TS. Variantele <code>prettier-ignore-start</code> / <code>prettier-ignore-end</code> funcționează doar în Markdown, YAML și
        HTML.
      </p>
      <p>
        <strong>Folosit rar și motivat</strong> — pentru matrice, tabele de valori aliniate în coloane — nu ca să ocolim convenția de formatare.
      </p>
    </div>
  );
}
