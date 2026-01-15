/* ===============================
   API (ENDPOINT TIDAK DIUBAH)
================================ */
async function fetchDepositAmounts() {
  const res = await fetch("/deposit-amounts");
  return res.json();
}

async function fetchUserInfo() {
  const res = await fetch("/get");
  return res.json();
}

/* ===============================
   USER RENDER
================================ */
async function renderUser() {
  const el = document.getElementById("user-info");

  try {
    const res = await fetchUserInfo();
    if (res.status !== "success") {
      el.innerHTML = "";
      return;
    }

    const u = res.data;

    el.innerHTML = `
      <div class="user-box">
        <strong>${u.Nick}</strong><br>
        ID: ${u.PlayerId}<br>
        Level: ${u.Level} | VIP: ${u.Vip}<br>
        Coin: ${u.Coin}
      </div>
    `;
  } catch {
    el.innerHTML = "";
  }
}

/* ===============================
   DEPOSIT RENDER
================================ */
async function renderDeposit() {
  const container = document.getElementById("deposit-list");

  try {
    const res = await fetchDepositAmounts();
    if (!res.success) {
      container.innerHTML = "<p>Gagal memuat data</p>";
      return;
    }

    container.innerHTML = res.data.map(item => `
      <div class="card">
        <h3>${item.display_chip_amount}</h3>
        <p>${item.display_currency}</p>
        ${item.bonus ? `<small>Bonus ${item.bonus}</small>` : ""}
      </div>
    `).join("");
  } catch {
    container.innerHTML = "<p>Error koneksi</p>";
  }
}

/* ===============================
   BOOTSTRAP
================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderUser();
  renderDeposit();
});
