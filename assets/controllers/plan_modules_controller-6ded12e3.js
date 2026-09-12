import { Controller } from "@hotwired/stimulus"

const DIVISORS = { mensal: 1, trimestral: 3, semestral: 6, anual: 12 }
const CONTRACT_LABELS = {
  mensal:     "Mensalidade",
  trimestral: "Valor Trimestral",
  semestral:  "Valor Semestral",
  anual:      "Valor Anual"
}

export default class extends Controller {
  static targets = [
    "planRadio", "addonCheck", "totemQty",
    "planCardPrice",
    "planType",
    "contractValue", "contractValueLabel",
    "planValueField", "planNameField", "contractedAddonsField",
    "monthlyInfo", "monthlyAmount"
  ]

  connect() {
    const storedMonthly = parseFloat(this.element.dataset.planModulesInitialMonthly || 0) || 0

    if (storedMonthly > 0) {
      // Edição: restaura valor armazenado sem sobrescrever com preço de tabela
      if (this.hasPlanValueFieldTarget) this.planValueFieldTarget.value = storedMonthly.toFixed(2)
      if (this.hasContractValueTarget) {
        this.contractValueTarget.value = (storedMonthly * this._getDivisor()).toFixed(2)
      }
      this._updateInfo()
      // Destaca o card selecionado e atualiza os hidden fields a partir dos elementos pré-marcados
      this._highlightCards()
      this._savePlanName()
      this._saveAddonList()
    } else {
      // Novo registro: calcula a partir dos cards
      this._recalcFromCards()
    }
  }

  // Acionado quando um card de plano é clicado
  selectPlan(e) {
    const radio = e.currentTarget.querySelector("input[type=radio]")
    if (radio) radio.checked = true
    this._recalcFromCards()
  }

  // Acionado quando um addon ou totem qty muda
  update() {
    this._recalcFromCards()
  }

  // Acionado quando o tipo de plano muda
  planTypeChange() {
    // Mantém o valor mensal atual e atualiza o contrato = mensal × novo divisor
    const monthly = parseFloat(this.hasPlanValueFieldTarget ? this.planValueFieldTarget.value : 0) || 0
    if (this.hasContractValueTarget) {
      this.contractValueTarget.value = (monthly * this._getDivisor()).toFixed(2)
    }
    this._updateInfo()
  }

  // Acionado quando o usuário edita manualmente o valor do contrato
  contractValueChanged() {
    const contractVal = parseFloat(this.hasContractValueTarget ? this.contractValueTarget.value : 0) || 0
    const monthly = contractVal / this._getDivisor()
    if (this.hasPlanValueFieldTarget) {
      this.planValueFieldTarget.value = monthly.toFixed(2)
    }
    this._updateInfo()
  }

  // ── Privado ───────────────────────────────────────────────

  _recalcFromCards() {
    const monthly = this._getPlanMonthly() + this._getAddonsMonthly()
    const contractVal = monthly * this._getDivisor()

    if (this.hasContractValueTarget) {
      this.contractValueTarget.value = contractVal > 0 ? contractVal.toFixed(2) : ""
    }
    if (this.hasPlanValueFieldTarget) {
      this.planValueFieldTarget.value = monthly.toFixed(2)
    }
    this._savePlanName()
    this._saveAddonList()
    this._updateInfo()
    this._highlightCards()
  }

  // Retorna o preço mensal do plano para o período selecionado
  _getPlanMonthly() {
    const checked = this.planRadioTargets.find(r => r.checked)
    if (!checked) return 0

    const card = checked.closest("[data-prices]")
    if (card) {
      try {
        const prices = JSON.parse(card.dataset.prices)
        const type = this.hasPlanTypeTarget ? this.planTypeTarget.value : "mensal"
        const price = prices[type]
        if (price != null) return price
      } catch (e) { /* fallback */ }
    }
    return parseFloat(checked.value) || 0
  }

  // Retorna a soma mensal de todos os módulos selecionados (sem desconto por período)
  _getAddonsMonthly() {
    let total = 0
    this.addonCheckTargets.forEach(c => {
      if (!c.checked) return
      const val = parseFloat(c.value) || 0
      if (c.dataset.isTotem === "true") {
        const qty = this.hasTotemQtyTarget ? (parseInt(this.totemQtyTarget.value) || 1) : 1
        total += val * qty
      } else {
        total += val
      }
    })
    return total
  }

  _getDivisor() {
    const type = this.hasPlanTypeTarget ? this.planTypeTarget.value : "mensal"
    return DIVISORS[type] || 1
  }

  _updateInfo() {
    const type    = this.hasPlanTypeTarget ? this.planTypeTarget.value : "mensal"
    const divisor = DIVISORS[type] || 1
    const contractVal = parseFloat(this.hasContractValueTarget ? this.contractValueTarget.value : 0) || 0
    const monthly = contractVal / divisor

    // Label do campo de valor
    if (this.hasContractValueLabelTarget) {
      this.contractValueLabelTarget.textContent = CONTRACT_LABELS[type] || "Mensalidade"
    }

    // Atualiza preço exibido em cada módulo/addon
    const SUFFIX = { mensal: "/mês", trimestral: "/trim.", semestral: "/sem.", anual: "/ano" }
    const suffix = SUFFIX[type] || "/mês"
    this.addonCheckTargets.forEach(c => {
      const monthly   = parseFloat(c.value) || 0
      const isTotem   = c.dataset.isTotem === "true"
      const container = c.closest(".calc-addon-card") || c.closest(".calc-addon-totem")
      if (!container) return
      const priceEl = container.querySelector(".calc-addon-price")
      if (!priceEl) return

      if (isTotem) {
        const periodUnit = monthly * divisor
        priceEl.textContent = divisor === 1
          ? `+ ${this._formatCurrency(monthly)}/unid.`
          : `+ ${this._formatCurrency(periodUnit)}/unid.`
      } else {
        const total = monthly * divisor
        priceEl.textContent = divisor === 1
          ? `+ ${this._formatCurrency(monthly)}/mês`
          : `+ ${this._formatCurrency(total)}${suffix}`
      }
    })

    // Atualiza preço exibido em cada card de plano (preço mensal do período selecionado)
    this.planCardPriceTargets.forEach(el => {
      const card = el.closest("[data-prices]")
      if (!card) return
      try {
        const prices = JSON.parse(card.dataset.prices)
        const price = prices[type]
        if (price != null) el.textContent = this._formatCurrency(price)
      } catch (e) { /* ignore */ }
    })

    // Box mensalizado (só para planos não-mensais)
    const showInfo = divisor > 1
    if (this.hasMonthlyInfoTarget) {
      this.monthlyInfoTarget.style.display = showInfo ? "" : "none"
    }
    if (showInfo && this.hasMonthlyAmountTarget) {
      this.monthlyAmountTarget.textContent = this._formatCurrency(monthly)
    }
  }

  _highlightCards() {
    this.element.querySelectorAll(".pm-plan-card").forEach(card => {
      const radio = card.querySelector("input[type=radio]")
      card.classList.toggle("selected", radio != null && radio.checked)
    })
  }

  _savePlanName() {
    if (!this.hasPlanNameFieldTarget) return
    const checked = this.planRadioTargets.find(r => r.checked)
    if (!checked) { this.planNameFieldTarget.value = ""; return }
    const card  = checked.closest(".pm-plan-card")
    const nameEl = card ? card.querySelector(".calc-plan-name") : null
    this.planNameFieldTarget.value = nameEl ? nameEl.textContent.trim() : ""
  }

  _saveAddonList() {
    if (!this.hasContractedAddonsFieldTarget) return
    const addons = []
    this.addonCheckTargets.forEach(c => {
      if (!c.checked) return
      const container = c.closest(".calc-addon-card") || c.closest(".calc-addon-totem-label") || c.closest(".calc-addon-totem")
      const nameEl = container ? container.querySelector(".calc-addon-name") : null
      let name = nameEl ? nameEl.textContent.trim() : ""
      if (c.dataset.isTotem === "true" && this.hasTotemQtyTarget) {
        const qty = parseInt(this.totemQtyTarget.value) || 1
        if (qty > 1) name += ` x${qty}`
      }
      if (name) addons.push(name)
    })
    this.contractedAddonsFieldTarget.value = JSON.stringify(addons)
  }

  _formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }
}
