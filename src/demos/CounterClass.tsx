// Pas 2b — Component bazat pe clasă (stilul vechi, dinainte de React 16.8).
//
// De ce exists acest fișier:
//   Hooks (useState, useEffect) au apărut în React 16.8 (2019). Înainte de
//   aceea, starea putea fi gestionată DOAR prin clase. Vei întâlni cod vechi
//   scris astfel; acest fișier îți arată cum să-l citești.
//
// Ce e DIFERIT față de varianta cu hooks (Counter.tsx):
//   - componenta este o CLASĂ care extinde Component, nu o funcție simplă
//   - starea trăiește în `this.state`, nu în variabile locale create de useState
//   - pentru a schimba starea folosești `this.setState(...)`, nu un setter
//   - React reapelează EXPLICIT metoda `render()` — în OOP e evident: schimbi
//     starea obiectului, apoi React îți spune "acum redesenează-te"
//   - în varianta cu funcții + hooks mecanismul e același, dar mai implicit
//
// Ce să folosești în COD NOU: FUNCȚII + HOOKS (useState, useEffect etc.)
//   - mai puțin cod, fără probleme cu `this`, mai ușor de testat
//   - clasele nu mai primesc îmbunătățiri din 2019; Concurent Mode și viitoarele
//     funcționalități React sunt proiectate NUMAI pentru componente-funcție

import { Component } from "react";
import { Button } from "@/components/ui/button";

// Tipul stării — echivalent cu câmpurile unui obiect Java/C#.
// Nu există props la acest demo, deci primul parametru generic este {}.
type CounterClassState = { count: number };

export class CounterClass extends Component<{}, CounterClassState> {
  state: CounterClassState = { count: 0 };

  increment = () => {
    this.setState(s => ({ count: s.count + 1 }));
  };

  decrement = () => {
    this.setState(s => ({ count: s.count - 1 }));
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  // render() este metoda pe care React o apelează ori de câte ori starea
  // sau props-urile se schimbă — echivalentul direct al render() din Java/C#
  // MVC. Diferența față de hooks: aici e EXPLICIT în cod că există o metodă
  // separată de redesenare. La funcții, întreaga funcție joacă rolul lui render().
  render() {
    return (
      <div>
        <p style={{ fontSize: "5rem", margin: "0.5rem 0" }}>{this.state.count}</p>
        <Button variant="outline" size="sm" onClick={() => this.increment()}>
          +1
        </Button>
        <Button variant="outline" size="sm" onClick={this.decrement}>
          -1
        </Button>
        <Button variant="secondary" size="sm" onClick={this.reset}>
          Reset
        </Button>
      </div>
    );
  }
}
