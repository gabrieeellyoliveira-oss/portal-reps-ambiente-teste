import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel", "btn"]
  static values  = { key: String, default: String }

  connect() {
    const saved = localStorage.getItem(this.keyValue) || this.defaultValue || "table"
    this.activate(saved)
  }

  switch(event) {
    const view = event.currentTarget.dataset.view
    this.activate(view)
    localStorage.setItem(this.keyValue, view)
  }

  activate(view) {
    this.panelTargets.forEach(panel => {
      panel.style.display = panel.dataset.panel === view ? "" : "none"
    })
    this.btnTargets.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === view)
    })
  }
}
