class ProjectCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "img", "description", "link"];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "Project";
    const imgSrc = this.getAttribute("img") || "images/default.png";
    const description = this.getAttribute("description") || "Description";
    const link = this.getAttribute("link") || "#";
    const imgAlt = title;

    this.shadow.innerHTML = `
      <style>
        :host {
          --card-bg: #fff;
          --card-border: #ccc;
          --card-radius: 10px;
          --card-padding: 16px;
          display: block;
          font-family: Arial, sans-serif;
        }
        .card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: var(--card-radius);
          padding: var(--card-padding);
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 300px;
        }
        h2 { margin: 0; font-size: 1.3rem; }
        img { width: 100%; border-radius: 8px; }
        .desc { font-size: 0.9rem; line-height: 1.4; }
        a.more { color: #0066cc; text-decoration: none; font-weight: bold; margin-top: auto; }
      </style>
      <article class="card">
        <h2>${title}</h2>
        <picture>
          <img src="${imgSrc}" alt="${imgAlt}">
        </picture>
        <p class="desc">${description}</p>
        <a class="more" href="${link}" target="_blank" rel="noopener">Learn more →</a>
      </article>
    `;
  }
}

customElements.define("project-card", ProjectCard);