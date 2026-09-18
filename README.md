#  CSS Moderne — Référence interactive

Un site de référence pour découvrir **10 fonctionnalités CSS récentes** (2023–2025), avec exemples de code et démos visuelles interactives en direct.


## 🗂 Fonctionnalités documentées

| # | Fonctionnalité | Disponible depuis |
|---|----------------|:-----------------:|
| 1 | [Container Queries](#1--container-queries) | Chrome 105 / 2023 |
| 2 | [:has()](#2--has) | Chrome 105 / 2023 |
| 3 | [color-mix()](#3--color-mix) | Chrome 111 / 2024 |
| 4 | [animation-composition](#4--animation-composition) | Chrome 112 / 2023 |
| 5 | [@property](#5--property) | Chrome 85 / 2024 |
| 6 | [:is() et :where()](#6--is-et-where) | Chrome 88 / 2023 |
| 7 | [Subgrid](#7--subgrid) | Chrome 117 / 2023 |
| 8 | [@layer](#8--layer) | Chrome 99 / 2023 |
| 9 | [text-wrap: balance](#9--text-wrap-balance) | Chrome 114 / 2024 |
| 10 | [Scroll-driven animations](#10--scroll-driven-animations) | Chrome 115 / 2024 |

---

## 📖 Documentation des fonctionnalités

### 1 — Container Queries

**Fichier :** `style.css` → `.demo-card-container`, `@container`
**Date :** Février 2023

Contrairement aux media queries qui réagissent à la taille de la **fenêtre**, les container queries réagissent à la taille du **conteneur parent** d'un composant.

```css
/* 1. Déclarer le conteneur */
.card-container {
  container-type: inline-size;
}

/* 2. Appliquer des styles selon la largeur du conteneur */
@container (min-width: 400px) {
  .demo-card {
    display: flex;
    background-color: #e0f2fe;
  }
}
```

**Pourquoi c'est utile :** un même composant (carte, bouton, nav) peut s'adapter selon qu'il est placé dans une sidebar étroite ou un contenu large — sans dupliquer le CSS.

---

### 2 — :has()

**Fichier :** `style.css` → `.demo-has-item:has(input:checked)`
**Date :** Décembre 2023

Le premier sélecteur CSS capable de **remonter dans le DOM**. Il cible un élément selon l'état ou la présence de ses enfants.

```css
/* Style du label parent si sa checkbox est cochée */
.demo-has-item:has(input:checked) {
  background-color: #dcfce7;
  border-color: #16a34a;
}

/* Autres cas d'usage */
nav:has(a:hover)        { background: rgba(0,0,0,0.05); }
form:has(input:invalid) { border-color: red; }
section:has(> img)      { display: grid; }
```

**Pourquoi c'est utile :** remplace de nombreux écouteurs JavaScript sur les états d'éléments parents.

---

### 3 — color-mix()

**Fichier :** `style.css` → `.color-strip`
**Date :** Juin 2024

Mélange deux couleurs avec un ratio précis, directement en CSS. Supporte plusieurs espaces colorimétriques — `oklab` et `oklch` donnent des mélanges **perceptuellement uniformes** (pas de gris sale au milieu).

```css
/* Syntaxe : color-mix(in espace, couleur1 ratio%, couleur2) */

.btn-hover {
  background: color-mix(in oklab, #2563eb 80%, white);
}

/* Générer une palette de teintes */
.tint-light  { background: color-mix(in oklch, var(--brand) 20%, white); }
.tint-medium { background: color-mix(in oklch, var(--brand) 50%, white); }
.tint-dark   { background: color-mix(in oklch, var(--brand) 80%, white); }
```

**Pourquoi c'est utile :** plus besoin de Sass ou de JS pour générer des variantes de couleurs.

---

### 4 — animation-composition

**Fichier :** `style.css` → `.box-animated`
**Date :** Mai 2023

Définit comment plusieurs animations portant sur la **même propriété CSS** (ex. `transform`) se combinent entre elles.

| Valeur | Comportement |
|--------|-------------|
| `replace` | La dernière animation écrase les autres (défaut) |
| `add` | Les effets s'**accumulent** (translateX + rotate = les deux) |
| `accumulate` | Les valeurs numériques se fusionnent |

```css
.box {
  animation:
    move   2.5s ease-in-out infinite alternate,
    rotate 5s   linear    infinite;

  animation-composition: add;
  /* Sans add : rotate écraserait translateX */
}
```

**Pourquoi c'est utile :** composer des animations complexes sans les conflits habituels sur `transform`.

---

### 5 — @property

**Fichier :** `style.css` → `@property --angle`, `.gradient-box`
**Date :** Mars 2024

Déclare une propriété CSS personnalisée avec un **type explicite**, une valeur initiale, et un comportement d'héritage. Le navigateur peut alors l'**animer nativement** — impossible avec les `var()` classiques non typées.

```css
@property --progress {
  syntax: '<number>';    /* type : number, angle, color, length… */
  initial-value: 0;
  inherits: false;
}

/* La transition fonctionne car --progress est typé */
.bar {
  width: calc(var(--progress) * 1%);
  transition: --progress 0.5s ease;
}

/* Animer un dégradé (impossible sans @property) */
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.spinning-gradient {
  background: conic-gradient(from var(--angle), blue, red);
  animation: spin 3s linear infinite;
}
@keyframes spin { to { --angle: 360deg; } }
```

---

### 6 — :is() et :where()

**Fichier :** `style.css` → `.demo-is-h`, `.demo-where-p`
**Date :** Mars 2023

Deux sélecteurs qui **groupent des cibles** sans répétition. La différence est la spécificité :

- `:is()` → spécificité du **sélecteur le plus fort** du groupe
- `:where()` → spécificité **zéro** (toujours surchargeable)

```css
/* Avant */
h1 a, h2 a, h3 a, h4 a, h5 a, h6 a { color: inherit; }

/* Avec :is() */
:is(h1, h2, h3, h4, h5, h6) a { color: inherit; }

/* Styles de base avec :where() — facilement surchargés */
:where(article, section, aside) p {
  margin-bottom: 1em;
  line-height: 1.7;
}

/* Combinaison */
:is(nav, header):where(.sticky) {
  position: sticky;
  top: 0;
}
```

**Règle pratique :** utilisez `:is()` pour vos composants, `:where()` pour vos resets et styles de base.

---

### 7 — Subgrid

**Fichier :** `style.css` → `.demo-subgrid-parent`, `.demo-subgrid-card`
**Date :** Août 2023

Permet à un enfant de grille d'**hériter les colonnes ou rangées de son parent** et d'y aligner ses propres enfants. Résout enfin le problème classique des cartes en grille dont les titres ne s'alignent pas.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* La carte s'étend sur toutes les rangées internes */
.card {
  display: grid;
  grid-template-rows: subgrid; /* hérite les rows de .grid */
  grid-row: span 3;            /* occupe 3 rangées de la grille parente */
}

/* Les éléments de la carte s'alignent sur la grille parente */
.card-label, .card-title, .card-desc { /* chacun sur sa rangée */ }
```

**Pourquoi c'est utile :** les hauteurs de titre, description et footer de chaque carte s'alignent automatiquement entre cartes voisines, sans JavaScript.

---

### 8 — @layer (Cascade Layers)

**Fichier :** `style.css` → `@layer demo-reset, demo-base, demo-components, demo-utilities`
**Date :** Janvier 2023

Déclare des couches de styles avec un **ordre de priorité explicite**. Une couche plus haute dans l'ordre gagne toujours, peu importe la spécificité des sélecteurs à l'intérieur.

```css
/* Ordre déclaré une fois (du moins au plus prioritaire) */
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}

@layer base {
  a { color: blue; text-decoration: underline; }
}

@layer components {
  /* Gagne sur "base" même avec un sélecteur moins spécifique */
  .btn { color: white; text-decoration: none; }
}

@layer utilities {
  /* Gagne sur tout — mais reste surchargeable par du CSS hors layer */
  .text-center { text-align: center; }
}

/* Du CSS sans @layer gagne toujours sur les layers */
a { color: red; } /* prioritaire sur tout ce qui est dans un layer */
```

**Pourquoi c'est utile :** plus besoin de bricoler la spécificité ou d'abuser de `!important` pour gérer les priorités entre bibliothèques, resets et styles maison.

---

### 9 — text-wrap: balance

**Fichier :** `style.css` → `.demo-tw-balance`, `.demo-tw-no-balance`
**Date :** Janvier 2024

Demande au navigateur de **rééquilibrer la répartition des lignes** d'un bloc de texte pour éviter les orphelins (un seul mot sur la dernière ligne).

```css
/* Pour les titres : répartition équilibrée */
h1, h2, h3 {
  text-wrap: balance;
}

/* Pour les paragraphes : évite les orphelins en fin de bloc */
p {
  text-wrap: pretty;
}

/* Exemple :
   SANS balance → "Un titre assez long avec un seul
                   mot"
   AVEC balance → "Un titre assez long
                   avec un seul mot"            */
```

> `text-wrap: balance` est limité aux blocs de **6 lignes maximum** (pour des raisons de performance). Au-delà, il n'a pas d'effet.

---

### 10 — Scroll-driven animations

**Fichier :** `style.css` → `.demo-scroll-fill`, `.demo-scroll-item`
**Date :** Septembre 2024

Lie une animation CSS à la **progression du scroll**, sans JavaScript ni `IntersectionObserver`.

```css
/* Barre de progression liée au scroll de la page */
@keyframes progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.scroll-progress {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: #00D4AA;
  transform-origin: left;
  animation: progress linear;
  animation-timeline: scroll(root); /* pilotée par le scroll du <html> */
}

/* Apparition d'un élément quand il entre dans le viewport */
@keyframes fadeUp {
  from { opacity: 0; translate: 0 40px; }
  to   { opacity: 1; translate: 0 0; }
}

.reveal {
  animation: fadeUp ease-out;
  animation-timeline: view();               /* déclenché à l'entrée dans la vue */
  animation-range: entry 0% entry 40%;      /* sur les 40 premiers % de l'entrée */
}
```

**Valeurs de `animation-timeline` :**

| Valeur | Déclencheur |
|--------|-------------|
| `scroll()` | Scroll du conteneur (défaut : plus proche ancêtre scrollable) |
| `scroll(root)` | Scroll de la page entière |
| `view()` | Position de l'élément dans le viewport |
# Nouveautes_css
