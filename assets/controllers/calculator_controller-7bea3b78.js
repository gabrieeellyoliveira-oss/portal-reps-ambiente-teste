import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "planCard", "planRadio", "addonCheck", "totemQty", "ticketDisplay",
    "commCheck", "commissionPct",
    "salesPerMonth", "churnPct",
    "generateBtn", "resultsArea",
    "year1Total", "year2Total", "monthlyAt24",
    "chart", "chartLegend", "tableBody", "tableToggle", "tableWrapper",
    "snapshotTitle", "snapshotsList", "snapshotsEmpty",
    "section"
  ]

  connect() {
    this.chartInstance = null
    this.lastResults = null
    this.lastParams = null
    this.updateTicketDisplay()
    this.updateCommission()
  }

  // ========== PLAN SELECTION ==========
  selectPlan(e) {
    this.planCardTargets.forEach(c => c.classList.remove("selected"))
    const card = e.currentTarget
    card.classList.add("selected")
    const radio = card.querySelector("input[type=radio]")
    if (radio) radio.checked = true
    this.updateTicketDisplay()
  }

  // ========== ADDONS ==========
  updateAddons() {
    this.updateTicketDisplay()
  }

  getSelectedPlanPrice() {
    const checked = this.planRadioTargets.find(r => r.checked)
    return checked ? parseFloat(checked.value) : 0
  }

  getAddonsTotal() {
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

  updateTicketDisplay() {
    const ticket = this.getSelectedPlanPrice() + this.getAddonsTotal()
    this.ticketDisplayTarget.textContent = this.formatCurrency(ticket)

    // Highlight selected plan card
    this.planCardTargets.forEach(card => {
      const radio = card.querySelector("input[type=radio]")
      card.classList.toggle("selected", radio && radio.checked)
    })
  }

  // ========== COMMISSION ==========
  updateCommission() {
    let total = 0
    this.commCheckTargets.forEach(c => {
      if (c.checked) total += parseInt(c.dataset.value || 0)
    })
    this.commissionPctTarget.value = total
  }

  onCommissionEdit() {
    // User manually edited — uncheck all to indicate custom
  }

  // ========== SIMULATION ==========
  async runSimulation() {
    const btn = this.generateBtnTarget
    const btnText = btn.querySelector(".calc-btn-text")
    const btnLoading = btn.querySelector(".calc-btn-loading")

    // Show loading
    btnText.style.display = "none"
    btnLoading.style.display = "inline-flex"
    btn.disabled = true

    const params = {
      plan_price: this.getSelectedPlanPrice(),
      addons_total: this.getAddonsTotal(),
      sales_per_month: parseInt(this.salesPerMonthTarget.value) || 5,
      commission_pct: parseFloat(this.commissionPctTarget.value) || 30,
      churn_pct: parseFloat(this.churnPctTarget.value) || 5
    }

    try {
      const response = await fetch("/calculator/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify(params)
      })

      const data = await response.json()
      this.lastResults = data
      this.lastParams = params
      this.renderResults(data)
    } catch (err) {
      console.error("Simulation error:", err)
    } finally {
      btnText.style.display = "inline"
      btnLoading.style.display = "none"
      btn.disabled = false
    }
  }

  renderResults(data) {
    // Show results area with animation
    const area = this.resultsAreaTarget
    area.style.display = "block"
    area.classList.remove("calc-fade-in")
    void area.offsetWidth
    area.classList.add("calc-fade-in")

    // Animate totalizers
    this.animateValue(this.year1TotalTarget, data.year1_total)
    this.animateValue(this.year2TotalTarget, data.year2_total)
    this.animateValue(this.monthlyAt24Target, data.monthly_at_24)

    // Render chart
    this.renderChart(data.months)

    // Render table
    this.renderTable(data.months)

    // Scroll to results
    setTimeout(() => {
      area.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 200)
  }

  animateValue(el, finalValue) {
    const formatted = this.formatCurrency(finalValue)
    let current = 0
    const step = finalValue / 30
    const interval = setInterval(() => {
      current += step
      if (current >= finalValue) {
        current = finalValue
        clearInterval(interval)
      }
      el.textContent = this.formatCurrency(current)
    }, 25)
  }

  // ========== CHART ==========
  async renderChart(months) {
    // Chart.js loaded via script tag in layout (global)
    const ChartJS = window.Chart

    if (this.chartInstance) {
      this.chartInstance.destroy()
    }

    const ctx = this.chartTarget.getContext("2d")
    const labels = months.map(m => `Mês ${m.month}`)

    this.chartInstance = new ChartJS(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Total Clientes",
            data: months.map(m => m.total_clients),
            borderColor: "#7c3aed",
            backgroundColor: "rgba(124, 58, 237, 0.08)",
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 3,
            pointHoverRadius: 6,
            yAxisID: "y"
          },
          {
            label: "Novos Clientes/mês",
            data: months.map(m => m.new_clients),
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.08)",
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 2,
            pointHoverRadius: 5,
            yAxisID: "y"
          },
          {
            label: "Cancelamentos/mês",
            data: months.map(m => m.churn),
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 5,
            yAxisID: "y"
          },
          {
            label: "Comissão (R$)",
            data: months.map(m => m.commission),
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.10)",
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 3,
            pointHoverRadius: 6,
            yAxisID: "y1"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 20,
              font: { family: "'Inter', sans-serif", size: 12, weight: "500" }
            }
          },
          tooltip: {
            backgroundColor: "rgba(17, 24, 39, 0.92)",
            titleFont: { family: "'Inter', sans-serif", size: 13, weight: "600" },
            bodyFont: { family: "'Inter', sans-serif", size: 12 },
            padding: 14,
            cornerRadius: 10,
            displayColors: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || ""
                if (context.datasetIndex === 3) {
                  return `${label}: R$ ${context.parsed.y.toFixed(2).replace(".", ",")}`
                }
                return `${label}: ${context.parsed.y}`
              }
            }
          }
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Clientes",
              font: { family: "'Inter', sans-serif", weight: "600" }
            },
            grid: { color: "rgba(0,0,0,0.04)" },
            ticks: { font: { family: "'Inter', sans-serif" } }
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Comissão (R$)",
              font: { family: "'Inter', sans-serif", weight: "600" }
            },
            grid: { drawOnChartArea: false },
            ticks: {
              font: { family: "'Inter', sans-serif" },
              callback: function(value) {
                return "R$ " + value.toFixed(0)
              }
            }
          },
          x: {
            grid: { color: "rgba(0,0,0,0.03)" },
            ticks: {
              font: { family: "'Inter', sans-serif", size: 11 },
              maxRotation: 45
            }
          }
        }
      }
    })
  }

  // ========== TABLE ==========
  renderTable(months) {
    const tbody = this.tableBodyTarget
    tbody.innerHTML = months.map(m => `
      <tr class="${m.month === 12 ? 'calc-table-highlight' : ''} ${m.month === 24 ? 'calc-table-highlight-final' : ''}">
        <td><strong>${m.month}</strong></td>
        <td>${m.new_clients}</td>
        <td class="calc-td-churn">${m.churn}</td>
        <td><strong>${m.total_clients}</strong></td>
        <td>R$ ${m.recurring_revenue.toFixed(2).replace(".", ",")}</td>
        <td class="calc-td-commission"><strong>R$ ${m.commission.toFixed(2).replace(".", ",")}</strong></td>
      </tr>
    `).join("")
  }

  toggleTable() {
    const wrapper = this.tableWrapperTarget
    const arrow = this.tableToggleTarget.querySelector(".calc-toggle-arrow")
    if (wrapper.style.display === "none") {
      wrapper.style.display = "block"
      arrow.textContent = "▲"
    } else {
      wrapper.style.display = "none"
      arrow.textContent = "▼"
    }
  }

  // ========== SNAPSHOTS ==========
  async saveSnapshot() {
    if (!this.lastResults || !this.lastParams) {
      alert("Gere uma projeção antes de salvar.")
      return
    }

    const title = this.snapshotTitleTarget.value.trim()

    try {
      const response = await fetch("/calculator/save_snapshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
          title: title || "",
          snapshot_params: this.lastParams,
          snapshot_results: this.lastResults
        })
      })

      const data = await response.json()
      if (data.success) {
        // Add to list
        this.addSnapshotToList(data)
        this.snapshotTitleTarget.value = ""

        // Flash success
        const saveSection = this.element.querySelector(".calc-save-section")
        saveSection.classList.add("calc-save-success")
        setTimeout(() => saveSection.classList.remove("calc-save-success"), 2000)
      }
    } catch (err) {
      console.error("Save error:", err)
    }
  }

  addSnapshotToList(data) {
    // Remove empty state
    const empty = this.element.querySelector(".calc-snapshots-empty")
    if (empty) empty.remove()

    const list = this.snapshotsListTarget
    const item = document.createElement("div")
    item.className = "calc-snapshot-item calc-fade-in"
    item.dataset.snapshotId = data.id
    item.innerHTML = `
      <div class="calc-snapshot-info" data-action="click->calculator#loadSnapshot" data-id="${data.id}">
        <div class="calc-snapshot-title">${data.title}</div>
        <div class="calc-snapshot-date">${data.created_at}</div>
      </div>
      <div class="calc-snapshot-actions">
        <a href="/calculator/snapshot/${data.id}/pdf" target="_blank" class="calc-snapshot-pdf" title="Exportar PDF">
          <span>📥</span>
        </a>
        <button class="calc-snapshot-delete" data-action="click->calculator#deleteSnapshot" data-id="${data.id}" title="Excluir simulação">🗑️</button>
      </div>
    `
    list.prepend(item)
  }

  async loadSnapshot(e) {
    const id = e.currentTarget.dataset.id
    try {
      const response = await fetch(`/calculator/snapshot/${id}`, {
        headers: { "Accept": "application/json" }
      })
      const data = await response.json()

      // Restore form params
      const p = data.params
      if (p.plan_price) {
        this.planRadioTargets.forEach(r => {
          r.checked = parseFloat(r.value) === parseFloat(p.plan_price)
        })
        this.updateTicketDisplay()
      }

      if (p.sales_per_month) this.salesPerMonthTarget.value = p.sales_per_month
      if (p.commission_pct) this.commissionPctTarget.value = p.commission_pct
      if (p.churn_pct) this.churnPctTarget.value = p.churn_pct

      // Show results
      if (data.results && data.results.months) {
        this.lastResults = data.results
        this.lastParams = data.params
        this.renderResults(data.results)
      }

      // Highlight active snapshot
      this.element.querySelectorAll(".calc-snapshot-item").forEach(item => {
        item.classList.toggle("active", item.dataset.snapshotId == id)
      })
    } catch (err) {
      console.error("Load snapshot error:", err)
    }
  }

  async deleteSnapshot(e) {
    e.stopPropagation()
    const id = e.currentTarget.dataset.id
    if (!confirm("Excluir esta simulação?")) return

    try {
      await fetch(`/calculator/snapshot/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }
      })

      // Remove from DOM with animation
      const item = this.element.querySelector(`[data-snapshot-id="${id}"]`)
      if (item) {
        item.style.transition = "all 0.3s ease"
        item.style.opacity = "0"
        item.style.transform = "translateX(20px)"
        setTimeout(() => item.remove(), 300)
      }

      // Check if list is empty
      setTimeout(() => {
        const items = this.snapshotsListTarget.querySelectorAll(".calc-snapshot-item")
        if (items.length === 0) {
          this.snapshotsListTarget.innerHTML = `
            <div class="calc-snapshots-empty">
              <div class="calc-empty-icon">📊</div>
              <p>Nenhuma simulação salva.</p>
              <p class="calc-empty-hint">Gere uma projeção e clique em "Salvar" para guardar.</p>
            </div>
          `
        }
      }, 350)
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  // ========== HELPERS ==========
  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }
}
