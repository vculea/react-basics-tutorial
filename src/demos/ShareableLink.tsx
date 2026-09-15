// Pas 13 — URL ca sursă de adevăr (React Router — doar notiță).
// De ce: activeId trăiește azi în useState (ActiveStepProvider), adică doar
// în memoria acestui tab de browser. Un link trimis altcuiva sau deschis pe
// alt calculator pornește mereu de la primul pas — starea nu e nicăieri în
// URL, deci nimeni nu o poate "relua".
// Capcana: react-router-dom nu e instalat — e planificat abia la pasul 19
// (vezi docs/requirements.md, §6). Codul de mai jos NU rulează în aplicație,
// e doar exemplul de reținut pentru ziua în care ajungem acolo.

import { CopyButton } from "@/components/CopyButton";

// Fișierul care rămâne aproape neschimbat: doar învelește tot cu router-ul.
const mainSnippet = `import { BrowserRouter } from "react-router-dom";

<BrowserRouter>
  <App />
</BrowserRouter>`;

// Aici e mutarea reală: URL-ul, nu useState, decide ce pas e activ.
const appSnippet = `import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";

function AppContent() {
  const navigate = useNavigate();
  const { stepId } = useParams();
  const active = demos.find(d => d.id === stepId) ?? demos[0];

  return (
    <>
      <nav>
        {demos.map(d => (
          <button key={d.id} onClick={() => navigate(\`/pas/\${d.id}\`)}>
            {d.title}
          </button>
        ))}
      </nav>
      {active.element}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/pas/:stepId" element={<AppContent />} />
      <Route path="*" element={<Navigate to={\`/pas/\${demos[0].id}\`} replace />} />
    </Routes>
  );
}`;

const futureSessionPrompt = `
Implementează sincronizarea pas activ <-> URL cu react-router-dom, conform
notiței din pasul 13 (demo ShareableLink). Cerințe:
- adaugă react-router-dom ca dependință nouă (discutată explicit)
- învelește App cu <BrowserRouter>
- fiecare pas e accesibil la /pas/:stepId, unde stepId e id-ul din registrul demos
- click pe un tab navighează cu useNavigate în loc să schimbe doar un useState
- o cale necunoscută sau "/" redirectează la primul pas din registru
- ActiveStepProvider trece de la useState la citirea lui stepId din useParams
- restul aplicației (registrul demos, DemoTab, ThemeToggle) rămâne neschimbat
- acesta e pasul 19 din docs/requirements.md, nu o modificare a pasului 13
- scoate animatia de la pasul implementat`;

// text-left: #root are text-align: center global, care altfel centrează
// fiecare linie din <pre> și distruge indentarea codului.
const codeBlockClass = "border-border bg-muted text-foreground overflow-x-auto rounded-lg border p-4 text-left font-mono text-sm leading-6";

export function ShareableLink() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <p>
          Un link trimis pe alt calculator sau browser ar trebui să deschidă direct pasul potrivit. Azi nu se întâmplă asta: <code>activeId</code> stă doar în <code>useState</code>, în memoria acelei file de browser.
        </p>
        <p>
          Analogie: e ca rutarea din ASP.NET MVC / <code>@RequestMapping</code> din Spring — o cale de URL e mapată explicit la un conținut, iar oricine primește URL-ul primește automat conținutul corect, fără nicio stare partajată în prealabil.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2>Cod de referință — react-router-dom (neinstalat încă)</h2>

        <div className="border-border bg-card text-card-foreground flex flex-col gap-2 rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">
            <code>main.tsx</code> — <code>BrowserRouter</code> învelește aplicația o singură dată, la vârf.
          </p>
          <pre className={codeBlockClass}>{mainSnippet}</pre>
        </div>

        <div className="border-border bg-card text-card-foreground flex flex-col gap-2 rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">
            <code>App.tsx</code> — <code>useParams</code> citește pasul din URL, <code>useNavigate</code> îl schimbă la click.
          </p>
          <pre className={codeBlockClass}>{appSnippet}</pre>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2>Prompt pentru o sesiune viitoare (nu se execută acum)</h2>
        <div className="relative">
          {/* whitespace-pre-wrap: promptul e text simplu, nu cod cu indentare
              de pastrat — se citeste mai bine cu linii care se ruped, nu cu
              scroll orizontal. */}
          <pre className="border-border bg-card text-card-foreground rounded-lg border p-4 pr-28 text-left font-mono text-sm leading-6 whitespace-pre-wrap">{futureSessionPrompt}</pre>
          <CopyButton text={futureSessionPrompt} />
        </div>
      </section>
    </div>
  );
}
