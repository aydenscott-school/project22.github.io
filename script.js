const GROSS_SALARY = 60000;

function money(number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function getValue(id) {
  return Number(document.getElementById(id).value) || 0;
}

function calculateBudget() {

  // -------------------------
  // PERSONAL INFORMATION
  // -------------------------

  const status = document.getElementById("status").value;
  const dependents = getValue("dependents");

  // -------------------------
  // TAXES
  // -------------------------

  const federalRate = getValue("federalTax") / 100;
  const stateRate = getValue("stateTax") / 100;
  const ficaRate = getValue("ficaTax") / 100;

  const federalTax = GROSS_SALARY * federalRate;
  const stateTax = GROSS_SALARY * stateRate;
  const fica = GROSS_SALARY * ficaRate;

  // Assignment formula:
  // Net = Gross - Federal Tax - State Tax - FICA

  const netAnnual =
    GROSS_SALARY -
    federalTax -
    stateTax -
    fica;

  // -------------------------
  // COMPANY INSURANCE
  // -------------------------

  let medical = 0;
  let dental = 0;
  let vision = 0;

  if (document.getElementById("medical").checked) {

    if (status === "individual") {
      medical = 100;
    } else {
      medical = 125;
    }

    medical += dependents * 50;
  }

  if (document.getElementById("dental").checked) {

    if (status === "individual") {
      dental = 25;
    } else {
      dental = 50;
    }

    dental += dependents * 25;
  }

  if (document.getElementById("vision").checked) {

    if (status === "individual") {
      vision = 50;
    } else {
      vision = 75;
    }

    vision += dependents * 25;
  }

  // Insurance amounts are monthly
  const monthlyInsurance =
    medical +
    dental +
    vision;

  const annualInsurance =
    monthlyInsurance * 12;

  // NET1 = Net - Total Insurance Cost
  const net1Annual =
    netAnnual -
    annualInsurance;

  const net1Monthly =
    net1Annual / 12;

  // Paid twice a month: 1st and 15th
  const paycheck =
    net1Monthly / 2;

  // -------------------------
  // MONTHLY BUDGET
  // -------------------------

  const housing = getValue("housing");
  const transportation = getValue("transportation");
  const utilities = getValue("utilities");
  const food = getValue("food");
  const communications = getValue("communications");
  const maintenance = getValue("maintenance");
  const entertainment = getValue("entertainment");
  const otherInsurance = getValue("otherInsurance");

  const totalBudget =
    housing +
    transportation +
    utilities +
    food +
    communications +
    maintenance +
    entertainment +
    otherInsurance;

  const remaining =
    net1Monthly -
    totalBudget;

  // -------------------------
  // DISPLAY RESULTS
  // -------------------------

  document.getElementById("grossAnnual").textContent =
    money(GROSS_SALARY);

  document.getElementById("federalAmount").textContent =
    money(federalTax);

  document.getElementById("stateAmount").textContent =
    money(stateTax);

  document.getElementById("ficaAmount").textContent =
    money(fica);

  document.getElementById("netAnnual").textContent =
    money(netAnnual);

  document.getElementById("insuranceAmount").textContent =
    money(annualInsurance);

  document.getElementById("net1Annual").textContent =
    money(net1Annual);

  document.getElementById("net1Monthly").textContent =
    money(net1Monthly);

  document.getElementById("paycheck").textContent =
    money(paycheck);

  document.getElementById("totalBudget").textContent =
    money(totalBudget);

  document.getElementById("remaining").textContent =
    money(remaining);

  // -------------------------
  // BUDGET BREAKDOWN
  // -------------------------

  const breakdown = document.getElementById("budgetBreakdown");

  breakdown.innerHTML = `
    <div class="budget-row">
      <span>🏠 Housing</span>
      <strong>${money(housing)}</strong>
    </div>

    <div class="budget-row">
      <span>🚗 Car / Transportation</span>
      <strong>${money(transportation)}</strong>
    </div>

    <div class="budget-row">
      <span>⚡ Utilities</span>
      <strong>${money(utilities)}</strong>
    </div>

    <div class="budget-row">
      <span>🍔 Food</span>
      <strong>${money(food)}</strong>
    </div>

    <div class="budget-row">
      <span>📱 Communications</span>
      <strong>${money(communications)}</strong>
    </div>

    <div class="budget-row">
      <span>🔧 Maintenance</span>
      <strong>${money(maintenance)}</strong>
    </div>

    <div class="budget-row">
      <span>🎬 Entertainment</span>
      <strong>${money(entertainment)}</strong>
    </div>

    <div class="budget-row">
      <span>🛡️ Other Insurance</span>
      <strong>${money(otherInsurance)}</strong>
    </div>

    <div class="budget-row">
      <span><strong>Total Monthly Expenses</strong></span>
      <strong>${money(totalBudget)}</strong>
    </div>

    <div class="budget-row">
      <span><strong>Money Remaining</strong></span>
      <strong>${money(remaining)}</strong>
    </div>
  `;
}

// Calculate automatically when page loads
calculateBudget();
