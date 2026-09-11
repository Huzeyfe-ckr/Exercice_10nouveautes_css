const toggleBtn = document.getElementById("toggle-btn");
const outputContainer = document.getElementById("affichage-nouveautes");

let isVisible = false;

function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}



const nouveautes = [
  {
    numero: 1,
    titre: "Container Queries — styles adaptatifs au conteneur",
    principe:
      "Les media queries ciblent la fenêtre. Les container queries ciblent le conteneur parent. Un composant peut désormais adapter son apparence selon l'espace qu'on lui alloue, indépendamment de la taille de l'écran.",
    css: `/* Déclarer le conteneur parent */
.card-container {
  container-type: inline-size;
}

/* Style conditionnel selon la largeur du conteneur */
@container (min-width: 400px) {
  .demo-card {
    display: flex;
    background-color: #e0f2fe;
  }
}`,
    html: `<div class="card-container">
  <div class="demo-card">Composant réactif</div>
</div>`,
    renduHTML: `
      <div class="demo-card-container">
        <div class="demo-card">
          Redimensionnez ce conteneur — passez 400px pour changer de couleur
        </div>
      </div>
      <p class="resize-hint">↔ Tirez le coin inférieur droit pour redimensionner</p>
    `
  },
  {
    numero: 2,
    titre: ":has() — le sélecteur parent conditionnel",
    principe:
      "Le premier sélecteur CSS qui remonte dans le DOM. Il permet de cibler un élément parent selon l'état de ses enfants — sans JavaScript. Coché, survol, focus, présence d'un élément : tout devient stylable.",
    css: `/* Style du label si sa checkbox est cochée */
.demo-has-item:has(input:checked) {
  background-color: #dcfce7;
  border-color: #16a34a;
  color: #15803d;
}

/* Un formulaire avec une image enfant */
form:has(img) {
  display: grid;
  grid-template-columns: auto 1fr;
}`,
    html: `<label class="demo-has-item">
  <input type="checkbox">
  Cocher pour modifier le style du parent
</label>`,
    renduHTML: `
      <label class="demo-has-item">
        <input type="checkbox">
        Cocher pour changer le style de ce label parent
      </label>
    `
  },
  {
    numero: 3,
    titre: "color-mix() — mélange de couleurs natif",
    principe:
      "Fini les préprocesseurs pour interpoler des couleurs. color-mix() permet de mélanger deux valeurs avec un ratio précis, dans n'importe quel espace colorimétrique (sRGB, oklch, oklab…). oklch produit des mélanges perceptuellement uniformes.",
    date: "2024-06",
    css: `/* Dégradé de teintes d'une même couleur */
li:nth-child(1) { 
  background: color-mix(in oklab, #a71e14 10%, white); 
}
li:nth-child(3) { 
  background: color-mix(in oklab, #a71e14 50%, white); 
}
li:nth-child(5) { 
  background: color-mix(in oklab, #a71e14 90%, white); 
}

/* Avec oklch pour un rendu plus naturel */
.accent-light {
  color: color-mix(in oklch, var(--accent) 30%, white);
}`,
    html: `<div class="color-strip">
  <span>10%</span>
  <span>25%</span>
  <span>50%</span>
  <span>75%</span>
  <span>90%</span>
</div>`,
    renduHTML: `
      <div class="color-strip">
        <span>10%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>90%</span>
      </div>
    `
  },
  {
    numero: 4,
    titre: "animation-composition — combiner des animations",
    principe:
      "Définit comment plusieurs animations appliquées à la même propriété se combinent : replace (écrasement, défaut), add (accumulation des effets) ou accumulate (fusion des valeurs). add permet enfin de composer des transformations CSS sans les conflits habituels.",
    date: "2023-05",
    css: `.box-animated {
  animation: 
    move   2.5s ease-in-out infinite alternate,
    rotate 5s   linear    infinite;

  /* add : les transformations s'additionnent */
  animation-composition: add;
}

/* Sans animation-composition: add, rotate
   écraserait translateX — avec add, les deux s'appliquent */`,
    html: `<div class="box-animated">Animation combinée</div>`,
    renduHTML: `
      <div class="demo-anim-box">
        <div class="box-animated">translateX + rotate (composition: add)</div>
      </div>
    `
  },
  {
    numero: 5,
    titre: "@property — variables CSS typées et animables",
    principe:
      "Déclarez vos propriétés personnalisées avec un type, une valeur initiale et un comportement d'héritage. Le navigateur peut alors les animer nativement — impossible avec les var() classiques. Ouvre la porte aux transitions sur des dégradés, angles, longueurs et bien plus.",
    date: "2024-03",
    css: `@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.gradient-box {
  background: conic-gradient(
    from var(--angle), 
    #7B6FFF, #00D4AA, #FF6B6B, #7B6FFF
  );
  /* L'animation fonctionne car --angle est typé <angle> */
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  to { --angle: 360deg; }
}`,
    html: `<div class="gradient-box">Dégradé animé via @property</div>`,
    renduHTML: `
      <div class="gradient-box">Dégradé conico-gradient animé nativement</div>
    `
  },
  {
    numero: 6,
    titre: ":is() et :where() — sélecteurs groupés sans répétition",
    principe:
      ":is() regroupe plusieurs sélecteurs en un seul, avec la spécificité du plus fort d'entre eux. :where() fait la même chose mais avec une spécificité zéro — idéal pour les styles de base facilement surchargables.",
    date: "2023-03",
    css: `/* Avant : répétition fastidieuse */
h1 a, h2 a, h3 a, h4 a { color: inherit; }

/* Avec :is() — spécificité du sélecteur le plus fort */
:is(h1, h2, h3, h4) a { color: inherit; }

/* Avec :where() — spécificité = 0, facile à surcharger */
:where(header, main, footer) p {
  line-height: 1.7;
}

/* Combinaison puissante */
:is(article, section):where(.featured) h2 {
  font-size: 2rem;
}`,
    html: `<div class="demo-is-where">
  <h2 class="demo-is-h">Titre ciblé par :is()</h2>
  <h3 class="demo-is-h">Sous-titre aussi ciblé</h3>
  <p class="demo-where-p">Paragraphe stylé via :where()</p>
</div>`,
    renduHTML: `
      <div class="demo-is-where">
        <h2 class="demo-is-h">Titre h2 — ciblé par :is(h2, h3)</h2>
        <h3 class="demo-is-h">Titre h3 — même règle, même style</h3>
        <p class="demo-where-p">Paragraphe stylé via :where() — spécificité zéro</p>
      </div>
    `
  },
  {
    numero: 7,
    titre: "Subgrid — grilles imbriquées alignées",
    principe:
      "Avec subgrid, un enfant de grille peut hériter des colonnes ou rangées de son parent et y aligner ses propres enfants. Fini les colonnes qui ne s'alignent pas entre cartes — c'est la solution native au problème de grilles imbriquées.",
    date: "2023-08",
    css: `/* Grille parente : 3 colonnes */
.grid-parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* L'enfant s'étend sur 3 colonnes et hérite la grille */
.grid-child {
  grid-column: span 3;
  display: grid;
  grid-template-columns: subgrid; /* hérite les 3 colonnes */
}

/* Les petits-enfants s'alignent sur la grille parente */
.grid-grandchild {
  grid-column: 2; /* colonne 2 de la grille PARENTE */
}`,
    html: `<div class="grid-parent">
  <div class="grid-child">
    <span class="grid-grandchild">Aligné sur col. 2</span>
  </div>
</div>`,
    renduHTML: `
      <div class="demo-subgrid-parent">
        <div class="demo-subgrid-card">
          <div class="demo-subgrid-label">Label</div>
          <div class="demo-subgrid-title">Titre de la carte</div>
          <div class="demo-subgrid-desc">Description alignée parfaitement</div>
        </div>
        <div class="demo-subgrid-card">
          <div class="demo-subgrid-label">Label</div>
          <div class="demo-subgrid-title">Titre plus long qui prend plus de place</div>
          <div class="demo-subgrid-desc">Description qui s'aligne avec la carte voisine</div>
        </div>
        <div class="demo-subgrid-card">
          <div class="demo-subgrid-label">Label</div>
          <div class="demo-subgrid-title">Court</div>
          <div class="demo-subgrid-desc">Alignement parfait sur toutes les cartes grâce à subgrid</div>
        </div>
      </div>
    `
  },
  {
    numero: 8,
    titre: "Cascade Layers (@layer) — contrôle de la cascade",
    principe:
      "Les couches (@layer) permettent de définir explicitement l'ordre de priorité entre vos feuilles de styles — reset, base, composants, utilitaires — sans bricoler la spécificité. Un style de couche prioritaire écrase toujours une couche inférieure, peu importe la spécificité.",
    date: "2023-01",
    css: `/* Déclaration de l'ordre des couches (du moins au plus prioritaire) */
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; }
}

@layer base {
  a { color: blue; text-decoration: underline; }
}

@layer components {
  /* Écrase "base" même avec une spécificité plus faible */
  a { color: inherit; text-decoration: none; }
}

@layer utilities {
  /* Toujours prioritaire sur tout */
  .text-red { color: red !important; }
}`,
    html: `<!-- Les styles s'appliquent selon l'ordre des @layer -->
<a href="#" class="demo-layer-link">Lien normal (base)</a>
<a href="#" class="demo-layer-link component">Lien composant</a>`,
    renduHTML: `
      <div class="demo-layer-demo">
        <a href="#" class="demo-layer-base" onclick="return false">Lien — couche base (bleu souligné)</a>
        <a href="#" class="demo-layer-component" onclick="return false">Lien — couche components (hérite, sans soulignement)</a>
        <a href="#" class="demo-layer-utility" onclick="return false">Lien — couche utilities (rouge, toujours gagne)</a>
      </div>
    `
  },
  {
    numero: 9,
    titre: "text-wrap: balance et pretty — meilleurs retours à la ligne",
    principe:
      "text-wrap: balance répartit les lignes d'un titre pour éviter les orphelins disgracieux. text-wrap: pretty fait la même chose pour les paragraphes. Fini les titres avec une seule word sur la dernière ligne — le navigateur optimise ça nativement.",
    date: "2024-01",
    css: `/* Titres : répartition équilibrée des lignes */
h1, h2, h3 {
  text-wrap: balance;
  /* Le navigateur rééquilibre les lignes automatiquement */
}

/* Paragraphes : évite les orphelins en fin de bloc */
p {
  text-wrap: pretty;
}

/* Exemple de ce que ça évite :
   AVANT balance :
   "Un titre assez long qui se retrouve avec
   un mot"
   
   APRÈS balance :
   "Un titre assez long qui
   se retrouve équilibré" */`,
    html: `<h2 style="text-wrap: balance">Titre équilibré</h2>
<h2 style="text-wrap: nowrap">Titre sans équilibre</h2>`,
    renduHTML: `
      <div class="demo-textwrap">
        <div class="demo-tw-col">
          <p class="demo-tw-label">Sans balance</p>
          <h3 class="demo-tw-no-balance">Un titre de section qui finit avec un seul mot orphelin</h3>
        </div>
        <div class="demo-tw-col">
          <p class="demo-tw-label">Avec text-wrap: balance</p>
          <h3 class="demo-tw-balance">Un titre de section qui finit avec un seul mot orphelin</h3>
        </div>
      </div>
    `
  },
  {
    numero: 10,
    titre: "Scroll-driven animations — animations liées au scroll",
    principe:
      "Liez une animation CSS directement à la progression du scroll, sans JavaScript ni IntersectionObserver. animation-timeline: scroll() pilote l'animation selon la position dans la page ; view() la déclenche quand l'élément entre dans le viewport.",
    date: "2024-09",
    css: `/* Barre de progression en haut de page */
@keyframes progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 3px;
  background: #00D4AA;
  transform-origin: left;
  animation: progress linear;
  animation-timeline: scroll(root); /* pilotée par le scroll */
}

/* Apparition au scroll d'un élément */
@keyframes fadeUp {
  from { opacity: 0; translate: 0 40px; }
  to   { opacity: 1; translate: 0 0; }
}

.reveal {
  animation: fadeUp ease-out;
  animation-timeline: view();        /* déclenché à l'entrée dans le viewport */
  animation-range: entry 0% entry 40%;
}`,
    html: `<div class="scroll-progress"></div>
<section class="reveal">
  <h2>Apparaît au scroll</h2>
</section>`,
    renduHTML: `
      <div class="demo-scroll-anim">
        <div class="demo-scroll-bar-wrap">
          <p class="demo-tw-label">Barre de progression (simulée)</p>
          <div class="demo-scroll-track">
            <div class="demo-scroll-fill"></div>
          </div>
        </div>
        <div class="demo-scroll-items">
          <div class="demo-scroll-item">Élément 1 — entre dans la vue</div>
          <div class="demo-scroll-item">Élément 2 — animation au scroll</div>
          <div class="demo-scroll-item">Élément 3 — piloté par view()</div>
        </div>
      </div>
    `
  }
];

function createTabSystem(cssCode, htmlCode) {
  return `
    <div class="code-section">
      <div class="code-tabs" role="tablist">
        <button class="tab-btn active" role="tab" aria-selected="true" data-tab="css">CSS</button>
        ${htmlCode ? `<button class="tab-btn" role="tab" aria-selected="false" data-tab="html">HTML</button>` : ""}
      </div>
      <div class="tab-panel active" data-panel="css">
        <pre><code>${escapeHTML(cssCode)}</code></pre>
      </div>
      ${htmlCode ? `
      <div class="tab-panel" data-panel="html">
        <pre><code>${escapeHTML(htmlCode)}</code></pre>
      </div>` : ""}
    </div>
  `;
}

function buildCards() {
  outputContainer.innerHTML = "";

  nouveautes.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-stripe"></div>
      <div class="card-body">
        <header class="card-header">
          <span class="badge">#${item.numero}</span>
          <div class="card-meta">
            <h3>${escapeHTML(item.titre)}</h3>
          </div>
        </header>

        <p class="principe">${escapeHTML(item.principe)}</p>

        ${createTabSystem(item.css, item.html)}

        ${item.renduHTML ? `
          <div class="preview-section">
            <p class="preview-label">Rendu en direct</p>
            ${item.renduHTML}
          </div>
        ` : ""}
      </div>
    `;

    outputContainer.appendChild(card);
  });


  outputContainer.querySelectorAll(".code-tabs").forEach((tabGroup) => {
    tabGroup.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const section = tabGroup.closest(".code-section");
        const target = btn.dataset.tab;

        tabGroup.querySelectorAll(".tab-btn").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        section.querySelectorAll(".tab-panel").forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.panel === target);
        });
      });
    });
  });
}

toggleBtn.addEventListener("click", () => {
  isVisible = !isVisible;

  if (isVisible) {
    buildCards();
    toggleBtn.querySelector(".btn-inner").textContent = "Masquer les fonctionnalités";
    toggleBtn.classList.add("active");
    outputContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else {
    outputContainer.innerHTML = "";
    toggleBtn.querySelector(".btn-inner").textContent = "Afficher les fonctionnalités";
    toggleBtn.classList.remove("active");
  }
});