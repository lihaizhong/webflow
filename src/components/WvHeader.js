export default class WvHeader extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'closed' })
    const template = `
      <header class="header">
        <slot></slot>
      </header>
    `
    const style = `
      <style>
        .header {
          height: 30px;
          padding: 0 50px;
          line-height: 30px;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          user-select: none;
        }
      </style>
    `

    shadowRoot.innerHTML = style + template
  }
}
