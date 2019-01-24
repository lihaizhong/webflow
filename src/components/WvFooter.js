export default class WvFooter extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'closed' })
    const template = `
      <footer class="footer">
        <slot></slot>
      </footer>
    `
    const style = `
      <style>
        .footer {
          height: 30px;
        }
      </style>
    `

    shadowRoot.innerHTML = style + template
  }
}
