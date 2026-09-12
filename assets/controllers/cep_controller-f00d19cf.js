import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "cep", "address", "neighborhood", "city", "state",
    "streetNumber", "loading"
  ]

  async lookup() {
    const raw = this.cepTarget.value.replace(/\D/g, "")
    if (raw.length !== 8) return

    this.setLoading(true)
    this.clearError()

    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
      const data = await res.json()

      if (data.erro) {
        this.showError("CEP não encontrado.")
        return
      }

      if (this.hasAddressTarget)     this.addressTarget.value     = data.logradouro || ""
      if (this.hasNeighborhoodTarget) this.neighborhoodTarget.value = data.bairro     || ""
      if (this.hasCityTarget)        this.cityTarget.value        = data.localidade  || ""
      if (this.hasStateTarget)       this.stateTarget.value       = data.uf          || ""

      // Focus on street number after auto-fill
      if (this.hasStreetNumberTarget) this.streetNumberTarget.focus()
    } catch {
      this.showError("Erro ao consultar CEP.")
    } finally {
      this.setLoading(false)
    }
  }

  format() {
    let v = this.cepTarget.value.replace(/\D/g, "").slice(0, 8)
    if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5)
    this.cepTarget.value = v
  }

  setLoading(on) {
    if (this.hasLoadingTarget) {
      this.loadingTarget.style.display = on ? "inline-flex" : "none"
    }
    this.cepTarget.classList.toggle("cep-loading", on)
  }

  showError(msg) {
    let err = this.element.querySelector(".cep-error")
    if (!err) {
      err = document.createElement("span")
      err.className = "cep-error"
      this.cepTarget.parentNode.appendChild(err)
    }
    err.textContent = msg
  }

  clearError() {
    const err = this.element.querySelector(".cep-error")
    if (err) err.remove()
  }
}
