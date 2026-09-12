import { Controller } from "@hotwired/stimulus"

const PLAN_FEATURES = {
  "Plano Mesas": [
    "Cardápio Web para visualização e balcão",
    "Cardápio Web para mesas com pedidos",
    "Controle de mesas e garçons",
    "Adição de pedidos manualmente",
    "Sistema de caixa",
    "Controle de estoque simplificado",
    "Gestão de clientes",
    "Histórico de pedidos e relatórios",
    "Atualização do cardápio",
    "Horários de funcionamento",
    "Taxas de entrega por bairro ou km",
    "Gestão de cupons e avisos",
    "Múltiplos usuários com permissões",
    "Impressão automática de comandas",
    "Múltiplas impressoras",
    "Google Analytics e Tag Manager",
    "Integração com domínio próprio",
    "WhatsFácil — extensão WhatsApp",
    "ChatBot de WhatsApp"
  ],
  "Plano Delivery": [
    "Cardápio Web para delivery, balcão e visualização",
    "Adição de pedidos manualmente",
    "Sistema de caixa",
    "Controle de estoque simplificado",
    "Integração com Facebook Pixels",
    "Gestão de clientes",
    "Histórico de pedidos e relatórios",
    "Atualização do cardápio",
    "Horários de funcionamento",
    "Taxas de entrega por bairro ou km",
    "Gestão de cupons e avisos",
    "Múltiplos usuários com permissões",
    "Impressão automática de comandas",
    "Múltiplas impressoras",
    "Controle de entregadores",
    "Pedidos agendados",
    "Avaliação de pedidos",
    "Pagamento online",
    "Sistema de fidelidade",
    "Google Analytics e Tag Manager",
    "Integração com domínio próprio",
    "WhatsFácil — extensão WhatsApp",
    "ChatBot de WhatsApp"
  ],
  "Plano Premium": [
    "Cardápio Web para delivery, visualização e balcão",
    "Cardápio Web para mesas com pedidos",
    "Controle de mesas e garçons",
    "Adição de pedidos (delivery + mesas)",
    "Sistema de caixa",
    "Controle de estoque simplificado",
    "Integração com Facebook Pixels",
    "Gestão de clientes",
    "Histórico de pedidos e relatórios",
    "Atualização do cardápio",
    "Horários de funcionamento",
    "Taxas de entrega por bairro ou km",
    "Gestão de cupons e avisos",
    "Múltiplos usuários com permissões",
    "Impressão automática de comandas",
    "Múltiplas impressoras",
    "Controle de entregadores",
    "Pedidos agendados",
    "Avaliação de pedidos",
    "Pagamento online",
    "Google Analytics e Tag Manager",
    "Integração com domínio próprio",
    "WhatsFácil — extensão WhatsApp",
    "ChatBot de WhatsApp"
  ]
}

const ADDON_FEATURES = {
  "Marketplace": {
    desc: "iFood, Keeta, 99Food e AiQFome",
    features: ["Integração com iFood", "Integração com Keeta", "Integração com 99Food", "Integração com AiQFome"]
  },
  "Estoque Avançado": {
    desc: "Controle completo de estoque e fichas técnicas",
    features: ["Estoque de itens e opções", "Controle de insumos", "Ficha técnica", "Movimentações de estoque"]
  },
  "Roteirização": {
    desc: "Otimização de rotas para entregadores",
    features: ["500 pedidos/mês inclusos", "Excedente até 1.500: R$ 0,08/pedido", "Acima de 1.500: R$ 0,06/pedido"]
  },
  "Fiscal": {
    desc: "Emissão de NFC-e integrada",
    features: ["Até 2.500 NFC-e por mês", "Excedente: R$ 0,05 por NFC-e"]
  },
  "Financeiro": {
    desc: "Gestão financeira completa",
    features: ["Lançamentos financeiros", "Contas a pagar e receber", "Fluxo de caixa com calendário", "Análise de pagamentos e recebimentos"]
  },
  "Totem": {
    desc: "Autoatendimento independente para clientes",
    features: ["Pedidos autônomos pelos clientes", "Interface intuitiva e rápida", "Integrado ao sistema de gestão"]
  }
}

const PLAN_PRICES = {
  "169.99": { mensal: 169.99, trimestral: 159.99, semestral: 149.99, anual: 139.99 },
  "209.99": { mensal: 209.99, trimestral: 199.99, semestral: 189.99, anual: 179.99 },
  "269.99": { mensal: 269.99, trimestral: 259.99, semestral: 249.99, anual: 239.99 }
}

const PERIOD_MONTHS = { mensal: 1, trimestral: 3, semestral: 6, anual: 12 }

const PERIOD_HINTS = {
  mensal:     "Cobrança mês a mês",
  trimestral: "3 meses — pagamento trimestral",
  semestral:  "6 meses — pagamento semestral",
  anual:      "12 meses — maior desconto"
}

export default class extends Controller {
  static targets = [
    "planRadio", "addonCheck", "totemQty",
    // plan price labels in cards
    "planPrice0", "planPrice1", "planPrice2",
    // period UI
    "periodHint", "periodTotalRow", "periodLabel", "periodTotal",
    // core display
    "monthlyValue",
    // proposal line items
    "lineItems",
    // impl fee
    "implFee", "implSection", "implDisplay", "implValue", "implFreeTag",
    // validity
    "validityDays", "validityDisplay",
    // plan features section
    "featuresSection",
    // client identification — form inputs
    "clientName", "clientPhone", "clientCompany", "clientDoc",
    "clientEmail", "clientCep", "clientAddress", "clientCity", "clientState",
    // client info — canvas display
    "clientInfoSection", "clientInfoCompany", "clientInfoName",
    "clientInfoPhone", "clientInfoEmail", "clientInfoDoc", "clientInfoAddress"
  ]

  connect() {
    this.currentPeriod = "mensal"
    this.update()
  }

  selectPlan(e) {
    const radio = e.currentTarget.querySelector("input[type=radio]")
    if (radio) radio.checked = true
    this.update()
  }

  selectPeriod(e) {
    this.currentPeriod = e.currentTarget.dataset.period

    // update button states
    this.element.querySelectorAll(".pc-period-btn").forEach(btn =>
      btn.classList.toggle("active", btn.dataset.period === this.currentPeriod)
    )

    // update hint
    if (this.hasPeriodHintTarget) {
      this.periodHintTarget.textContent = PERIOD_HINTS[this.currentPeriod] || ""
    }

    // update plan card price labels and addon prices
    this._updatePlanCardPrices()
    this._updateAddonPrices()
    this.update()
  }

  update() {
    const monthly = this._getMonthlyTotal()
    const months  = PERIOD_MONTHS[this.currentPeriod] || 1
    const total   = monthly * months

    this._setPlanHighlight()

    // monthly hero
    if (this.hasMonthlyValueTarget) {
      this.monthlyValueTarget.textContent = this._fmt(monthly)
    }

    // period total row (visible only when > 1 month)
    if (this.hasPeriodTotalRowTarget) {
      if (months > 1) {
        this.periodTotalRowTarget.style.display = ""
        if (this.hasPeriodLabelTarget) {
          this.periodLabelTarget.textContent = `${months}x de`
        }
        if (this.hasPeriodTotalTarget) {
          this.periodTotalTarget.textContent = this._fmt(total)
        }
      } else {
        this.periodTotalRowTarget.style.display = "none"
      }
    }

    this._updateAddonPrices()
    this._updateLineItems()
    this._updateImplFee()
    this._updateValidity()
    this._updateFeaturesSection()
  }

  togglePresentation() {
    this.element.classList.toggle("pc-presentation-mode")
    const btn = this.element.querySelector(".pc-present-btn")
    if (!btn) return
    btn.textContent = this.element.classList.contains("pc-presentation-mode")
      ? "✕ Sair" : "Tela Cheia"
  }

  shareWhatsApp() {
    const monthly  = this._getMonthlyTotal()
    const months   = PERIOD_MONTHS[this.currentPeriod] || 1
    const total    = monthly * months
    const implFee  = this.hasImplFeeTarget ? (parseFloat(this.implFeeTarget.value) || 0) : 0
    const validity = this.hasValidityDaysTarget ? (parseInt(this.validityDaysTarget.value) || 15) : 15
    const today    = new Date().toLocaleDateString("pt-BR")

    const periodLabel = { mensal: "Mensal", trimestral: "Trimestral", semestral: "Semestral", anual: "Anual" }
    const periodNames = { mensal: "mês a mês", trimestral: "trimestral", semestral: "semestral", anual: "anual" }

    // Build line items
    const plan = this.planRadioTargets.find(r => r.checked)
    const lines = []

    if (plan) {
      const card    = plan.closest(".pc-plan-card")
      const name    = card?.querySelector(".pc-plan-name")?.textContent?.trim() || "Plano"
      const sub     = card?.querySelector(".pc-plan-sub")?.textContent?.trim()  || ""
      const prices  = PLAN_PRICES[plan.value]
      const mPrice  = prices ? (prices[this.currentPeriod] ?? parseFloat(plan.value)) : parseFloat(plan.value)
      lines.push(`• ${name}${sub ? ` (${sub})` : ""}: ${this._fmt(mPrice)}/mês`)
    }

    this.addonCheckTargets.forEach(c => {
      if (!c.checked) return
      const val = parseFloat(c.value) || 0
      if (c.dataset.isTotem === "true") {
        const qty = this.hasTotemQtyTarget ? (parseInt(this.totemQtyTarget.value) || 1) : 1
        lines.push(`• Totem${qty > 1 ? ` (${qty} unidades)` : ""}: ${this._fmt(val * qty)}/mês`)
      } else {
        const card = c.closest(".pc-addon-item")
        const name = card?.querySelector(".pc-addon-name")?.textContent?.trim() || ""
        lines.push(`• ${name}: ${this._fmt(val)}/mês`)
      }
    })

    // Period summary line
    let periodSummary = `💰 *Mensalidade: ${this._fmt(monthly)}/mês*`
    if (months > 1) {
      periodSummary += `\n📆 Período: ${periodLabel[this.currentPeriod]} — ${months}x totalizando ${this._fmt(total)}`
    } else {
      periodSummary += `\n📆 Período: Mensal (sem fidelidade)`
    }

    // Impl fee line
    const implLine = implFee === 0
      ? `✅ *Implantação: GRATUITA*`
      : `🔧 *Taxa de Implantação: ${this._fmt(implFee)}* (pagamento único)`

    const text = [
      `📋 *PROPOSTA COMERCIAL — Cardápio Web*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📅 Data de emissão: ${today}`,
      `⏱ Validade: ${validity} dias corridos`,
      ``,
      `*Solução Proposta:*`,
      ...lines,
      ``,
      periodSummary,
      ``,
      implLine,
      ``,
      `✔ *O que está incluso:*`,
      `• Suporte técnico`,
      `• Atualizações do sistema`,
      `• Treinamento de implantação`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Proposta gerada via Portal do Parceiro Cardápio Web_`
    ].join("\n")

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }

  // Atualiza o painel da proposta com os dados do cliente
  updateClientInfo() {
    const get = (target) => this[`has${target}Target`] ? this[`${target[0].toLowerCase() + target.slice(1)}Target`].value.trim() : ""
    const name    = get("ClientName")
    const phone   = get("ClientPhone")
    const company = get("ClientCompany")
    const doc     = get("ClientDoc")
    const email   = get("ClientEmail")
    const cep     = get("ClientCep")
    const address = get("ClientAddress")
    const city    = get("ClientCity")
    const state   = get("ClientState")

    const hasAny = [ name, phone, company, doc, email, address, city ].some(v => v)

    if (this.hasClientInfoSectionTarget)
      this.clientInfoSectionTarget.style.display = hasAny ? "" : "none"

    if (this.hasClientInfoCompanyTarget) {
      this.clientInfoCompanyTarget.style.display = company ? "" : "none"
      this.clientInfoCompanyTarget.textContent   = company
    }
    if (this.hasClientInfoNameTarget)
      this.clientInfoNameTarget.style.display = name ? "" : "none"
    if (this.hasClientInfoNameTarget)
      this.clientInfoNameTarget.textContent = name

    if (this.hasClientInfoPhoneTarget) {
      this.clientInfoPhoneTarget.style.display = phone ? "" : "none"
      this.clientInfoPhoneTarget.textContent   = phone
    }
    if (this.hasClientInfoEmailTarget) {
      this.clientInfoEmailTarget.style.display = email ? "" : "none"
      this.clientInfoEmailTarget.textContent   = email
    }
    if (this.hasClientInfoDocTarget) {
      this.clientInfoDocTarget.style.display = doc ? "" : "none"
      this.clientInfoDocTarget.textContent   = doc
    }

    const addrParts = [ address, city && state ? `${city} / ${state}` : (city || state), cep ? `CEP ${cep}` : "" ].filter(Boolean)
    if (this.hasClientInfoAddressTarget) {
      this.clientInfoAddressTarget.style.display = addrParts.length ? "" : "none"
      this.clientInfoAddressTarget.textContent   = addrParts.join("  —  ")
    }
  }

  // Auto-preenche cidade/estado ao sair do campo CEP (ViaCEP)
  async fetchCep() {
    const raw = this.hasClientCepTarget ? this.clientCepTarget.value.replace(/\D/g, "") : ""
    if (raw.length !== 8) return
    try {
      const r = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
      const d = await r.json()
      if (d.erro) return
      if (this.hasClientAddressTarget && !this.clientAddressTarget.value)
        this.clientAddressTarget.value = d.logradouro || ""
      if (this.hasClientCityTarget)  this.clientCityTarget.value  = d.localidade || ""
      if (this.hasClientStateTarget) this.clientStateTarget.value = d.uf          || ""
      this.updateClientInfo()
    } catch (_) { /* ignore network errors */ }
  }

  // Coleta todos os valores e submete o formulário PDF
  generatePdf() {
    const form = document.getElementById("pcPdfForm")
    if (!form) return

    const plan     = this.planRadioTargets.find(r => r.checked)
    const planCard = plan ? plan.closest(".pc-plan-card") : null
    const planName = planCard
      ? ((planCard.querySelector(".pc-plan-name")?.textContent || "") + " " + (planCard.querySelector(".pc-plan-sub")?.textContent || "")).trim()
      : ""
    const planPrice = plan
      ? (PLAN_PRICES[plan.value]?.[this.currentPeriod] ?? parseFloat(plan.value))
      : 0

    const months      = PERIOD_MONTHS[this.currentPeriod] || 1
    const monthly     = this._getMonthlyTotal()
    const periodTotal = monthly * months
    const implFee     = this.hasImplFeeTarget     ? (parseFloat(this.implFeeTarget.value)     || 0) : 0
    const validity    = this.hasValidityDaysTarget ? (parseInt(this.validityDaysTarget.value)  || 15) : 15

    const addons = []
    this.addonCheckTargets.forEach(c => {
      if (!c.checked) return
      const item = c.closest(".pc-addon-item")
      const name = item?.querySelector(".pc-addon-name")?.textContent?.trim() || ""
      const mon  = parseFloat(c.value) || 0
      if (c.dataset.isTotem === "true") {
        const qty = this.hasTotemQtyTarget ? (parseInt(this.totemQtyTarget.value) || 1) : 1
        addons.push({ name: `Totem × ${qty}`, monthly: mon * qty })
      } else {
        addons.push({ name, monthly: mon })
      }
    })

    const set = (id, val) => { const el = form.querySelector(id); if (el) el.value = val }
    set("#pdf_plan_name",   planName)
    set("#pdf_plan_price",  planPrice)
    set("#pdf_period",      this.currentPeriod)
    set("#pdf_addons",      JSON.stringify(addons))
    set("#pdf_impl_fee",    implFee)
    set("#pdf_validity",    validity)
    set("#pdf_monthly",     monthly)
    set("#pdf_period_total", periodTotal)

    const gv = (t) => this[`has${t}Target`] ? this[`${t[0].toLowerCase()+t.slice(1)}Target`].value.trim() : ""
    set("#pdf_contact_name", gv("ClientName"))
    set("#pdf_phone",        gv("ClientPhone"))
    set("#pdf_company",      gv("ClientCompany"))
    set("#pdf_doc",          gv("ClientDoc"))
    set("#pdf_email",        gv("ClientEmail"))
    set("#pdf_cep",          gv("ClientCep"))
    set("#pdf_address",      gv("ClientAddress"))
    set("#pdf_city",         gv("ClientCity"))
    set("#pdf_state",        gv("ClientState"))

    form.submit()
  }

  // ── private ──────────────────────────────────────────────────

  _getMonthlyTotal() {
    const plan    = this.planRadioTargets.find(r => r.checked)
    let   planPx  = 0

    if (plan) {
      const prices = PLAN_PRICES[plan.value]
      planPx = prices ? (prices[this.currentPeriod] ?? parseFloat(plan.value)) : parseFloat(plan.value)
    }

    let addons = 0
    this.addonCheckTargets.forEach(c => {
      if (!c.checked) return
      const val = parseFloat(c.value || 0)
      if (c.dataset.isTotem === "true") {
        const qty = this.hasTotemQtyTarget ? (parseInt(this.totemQtyTarget.value) || 1) : 1
        addons += val * qty
      } else {
        addons += val
      }
    })

    return planPx + addons
  }

  _setPlanHighlight() {
    this.element.querySelectorAll(".pc-plan-card").forEach(card => {
      const radio = card.querySelector("input[type=radio]")
      card.classList.toggle("selected", radio?.checked === true)
    })
  }

  _updateAddonPrices() {
    const months = PERIOD_MONTHS[this.currentPeriod] || 1
    const SUFFIX = { mensal: "/mês", trimestral: "/trim.", semestral: "/sem.", anual: "/ano" }
    const suffix = SUFFIX[this.currentPeriod] || "/mês"

    // Itera pelos containers (.pc-addon-item) em vez de partir do checkbox
    this.element.querySelectorAll(".pc-addon-item").forEach(item => {
      const cb = item.querySelector("input[type=checkbox]")
      if (!cb) return
      const priceEl = item.querySelector(".pc-addon-price")
      if (!priceEl) return

      const monthly     = parseFloat(cb.value) || 0
      const isTotem     = cb.dataset.isTotem === "true"
      const periodTotal = monthly * months

      if (isTotem) {
        priceEl.textContent = months === 1
          ? `+ ${this._fmt(monthly)}/unid.`
          : `+ ${this._fmt(periodTotal)}/unid.`
      } else {
        priceEl.textContent = months === 1
          ? `+ ${this._fmt(monthly)}/mês`
          : `+ ${this._fmt(periodTotal)}${suffix}`
      }
    })
  }

  _updatePlanCardPrices() {
    this.element.querySelectorAll(".pc-plan-card").forEach((card, idx) => {
      const pricesAttr = card.dataset.prices
      if (!pricesAttr) return
      try {
        const prices = JSON.parse(pricesAttr)
        const price  = prices[this.currentPeriod]
        if (price == null) return
        const target = this[`hasPlanPrice${idx}Target`] && this[`planPrice${idx}Target`]
        if (target) target.textContent = this._fmt(price)
      } catch(e) { /* ignore */ }
    })
  }

  _updateLineItems() {
    if (!this.hasLineItemsTarget) return

    const months = PERIOD_MONTHS[this.currentPeriod] || 1
    const items  = []

    // Plan
    const plan = this.planRadioTargets.find(r => r.checked)
    if (plan) {
      const card  = plan.closest(".pc-plan-card")
      const name  = card?.querySelector(".pc-plan-name")?.textContent?.trim() || "Plano"
      const sub   = card?.querySelector(".pc-plan-sub")?.textContent?.trim()  || ""
      const prices = PLAN_PRICES[plan.value]
      const mPrice = prices ? (prices[this.currentPeriod] ?? parseFloat(plan.value)) : parseFloat(plan.value)
      items.push({ name: `${name}${sub ? ` (${sub})` : ""}`, monthly: mPrice, months })
    }

    // Addons
    this.addonCheckTargets.forEach(c => {
      if (!c.checked) return
      const val  = parseFloat(c.value) || 0

      if (c.dataset.isTotem === "true") {
        const qty = this.hasTotemQtyTarget ? (parseInt(this.totemQtyTarget.value) || 1) : 1
        items.push({ name: `Totem${qty > 1 ? ` × ${qty}` : ""}`, monthly: val * qty, months })
      } else {
        const card = c.closest(".pc-addon-item")
        const name = card?.querySelector(".pc-addon-name")?.textContent?.trim() || ""
        items.push({ name, monthly: val, months })
      }
    })

    this.lineItemsTarget.innerHTML = items.length
      ? items.map(i => `
          <div class="pc-line-item">
            <span class="pc-line-name">${i.name}</span>
            <span class="pc-line-value">${this._fmt(i.monthly)}/mês</span>
          </div>`).join("")
      : `<div class="pc-line-empty">Nenhum item selecionado</div>`
  }

  _updateImplFee() {
    if (!this.hasImplFeeTarget) return
    const fee = parseFloat(this.implFeeTarget.value) || 0
    const isFree = fee === 0

    if (this.hasImplValueTarget)   this.implValueTarget.textContent = this._fmt(fee)
    if (this.hasImplDisplayTarget) this.implDisplayTarget.style.display = isFree ? "none" : ""
    if (this.hasImplFreeTagTarget) this.implFreeTagTarget.style.display = isFree ? "" : "none"
    if (this.hasImplSectionTarget) {
      this.implSectionTarget.classList.toggle("pc-impl-free-mode", isFree)
    }
  }

  _updateValidity() {
    if (!this.hasValidityDaysTarget || !this.hasValidityDisplayTarget) return
    this.validityDisplayTarget.textContent = parseInt(this.validityDaysTarget.value) || 15
  }

  _updateFeaturesSection() {
    if (!this.hasFeaturesSectionTarget) return

    const plan = this.planRadioTargets.find(r => r.checked)
    if (!plan) {
      this.featuresSectionTarget.style.display = "none"
      return
    }

    const card     = plan.closest(".pc-plan-card")
    const planName = card?.querySelector(".pc-plan-name")?.textContent?.trim() || ""
    const features = PLAN_FEATURES[planName] || []

    const selectedAddons = []
    this.addonCheckTargets.forEach(c => {
      if (!c.checked) return
      const item      = c.closest(".pc-addon-item")
      const rawName   = item?.querySelector(".pc-addon-name")?.textContent?.trim() || ""
      const addonData = ADDON_FEATURES[rawName]
      if (!addonData) return
      let displayName = rawName
      if (c.dataset.isTotem === "true" && this.hasTotemQtyTarget) {
        const qty = parseInt(this.totemQtyTarget.value) || 1
        if (qty > 1) displayName = `Totem × ${qty}`
      }
      selectedAddons.push({ name: displayName, ...addonData })
    })

    if (!features.length && !selectedAddons.length) {
      this.featuresSectionTarget.style.display = "none"
      return
    }

    const half = Math.ceil(features.length / 2)
    const col1 = features.slice(0, half)
    const col2 = features.slice(half)
    const fi   = (f) => `<div class="pc-feat-item"><span class="pc-feat-check">✓</span><span>${f}</span></div>`

    let html = `
      <div class="pc-feat-plan-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <strong>Funcionalidades Incluídas — ${planName}</strong>
      </div>
      <div class="pc-feat-grid">
        <div class="pc-feat-col">${col1.map(fi).join("")}</div>
        <div class="pc-feat-col">${col2.map(fi).join("")}</div>
      </div>`

    selectedAddons.forEach(addon => {
      html += `
        <div class="pc-addon-feat-block">
          <div class="pc-addon-feat-header">
            <span class="pc-addon-feat-badge">+</span>
            <strong>${addon.name}</strong>
            <span class="pc-addon-feat-desc">${addon.desc}</span>
          </div>
          <div class="pc-addon-feat-items">
            ${addon.features.map(f => `<span class="pc-addon-feat-item">✓ ${f}</span>`).join("")}
          </div>
        </div>`
    })

    this.featuresSectionTarget.innerHTML = html
    this.featuresSectionTarget.style.display = ""
  }

  _fmt(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency", currency: "BRL"
    }).format(value)
  }
}
