import { Controller } from "@hotwired/stimulus"

const CHURN_STATUSES = ["cancelled", "churned"]

export default class extends Controller {
  static values = { userRole: String }

  dragStart(event) {
    const card = event.currentTarget
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("clientId",    card.dataset.clientId)
    event.dataTransfer.setData("fromStatus",  card.dataset.clientStatus)
    card.classList.add("kanban-card--dragging")
  }

  dragEnd(event) {
    event.currentTarget.classList.remove("kanban-card--dragging")
    this.element.querySelectorAll(".kanban-column").forEach(col => {
      col.classList.remove("kanban-column--over", "kanban-column--forbidden")
    })
  }

  dragOver(event) {
    event.preventDefault()
    const col        = event.currentTarget
    const toStatus   = col.dataset.status
    const allowed    = this.userRoleValue === "admin" || toStatus === "churned"
    col.classList.toggle("kanban-column--over",      allowed)
    col.classList.toggle("kanban-column--forbidden", !allowed)
    event.dataTransfer.dropEffect = allowed ? "move" : "none"
  }

  dragLeave(event) {
    const col = event.currentTarget
    if (!col.contains(event.relatedTarget)) {
      col.classList.remove("kanban-column--over", "kanban-column--forbidden")
    }
  }

  drop(event) {
    event.preventDefault()
    const col = event.currentTarget
    col.classList.remove("kanban-column--over", "kanban-column--forbidden")

    const clientId   = event.dataTransfer.getData("clientId")
    const fromStatus = event.dataTransfer.getData("fromStatus")
    const toStatus   = col.dataset.status

    if (toStatus === fromStatus) return

    const isAdmin = this.userRoleValue === "admin"
    if (!isAdmin && toStatus !== "churned") {
      this._toast("Você só pode mover clientes para 'Desistiu'.", "alert")
      return
    }

    const card = this.element.querySelector(`[data-client-id="${clientId}"]`)
    if (!card) return

    // Se movendo para status de cancelamento, abre modal de motivo
    if (CHURN_STATUSES.includes(toStatus) && typeof window.openChurnModal === "function") {
      const clientName = card.querySelector(".kanban-card__name")?.textContent?.trim() || ""
      window.openChurnModal(clientId, clientName, "callback", (reason, notes) => {
        this._doUpdateStatus(clientId, toStatus, card, col, reason, notes)
      })
    } else {
      this._doUpdateStatus(clientId, toStatus, card, col, null, null)
    }
  }

  _doUpdateStatus(clientId, toStatus, card, col, churnReason, churnNotes) {
    const csrf = document.querySelector("meta[name='csrf-token']")?.content
    const body = { status: toStatus }
    if (churnReason) body.churn_reason = churnReason
    if (churnNotes)  body.churn_notes  = churnNotes

    fetch(`/clients/${clientId}/update_status`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
      body:    JSON.stringify(body)
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          card.dataset.clientStatus = toStatus
          const badge = card.querySelector(".kanban-card__status")
          if (badge) {
            badge.textContent      = data.label
            badge.style.color      = data.color
            badge.style.background = data.bg
          }
          col.querySelector(".kanban-cards").appendChild(card)
          this._updateCounts()
          this._toast(`Movido para "${data.label}".`, "notice")
        } else {
          this._toast(data.error || "Erro ao mover cliente.", "alert")
        }
      })
      .catch(() => this._toast("Erro de conexão.", "alert"))
  }

  _updateCounts() {
    this.element.querySelectorAll(".kanban-column").forEach(col => {
      const badge = col.querySelector(".kanban-col__count")
      if (badge) badge.textContent = col.querySelectorAll(".kanban-card").length
    })
  }

  _toast(msg, type) {
    document.querySelector(".kanban-toast")?.remove()
    const toast = document.createElement("div")
    toast.className = `kanban-toast kanban-toast--${type}`
    toast.textContent = msg
    document.body.appendChild(toast)
    requestAnimationFrame(() => toast.classList.add("kanban-toast--visible"))
    setTimeout(() => {
      toast.classList.remove("kanban-toast--visible")
      setTimeout(() => toast.remove(), 300)
    }, 3000)
  }
}
