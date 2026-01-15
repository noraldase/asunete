/* ======================
   API (ORIGINAL LOGIC)
====================== */

async function fetchUser() {
  const res = await fetch("/get");
  return res.json();
}

async function fetchDeposit() {
  const res = await fetch("/deposit-amounts");
  return res.json();
}

/* ======================
   RENDER USER
====================== */

async function renderUser() {
  const el = document.getElementById("user-info");

  try {
    const res = await fetchUser();
    if (res.status !== "success") return;

    const u = res.data;

    el.innerHTML = `
      <div class="user-box">
        <b>${u.Nick}</b><br>
        ID: ${u.PlayerId}<br>
        Level: ${u.Level} | VIP: ${u.Vip}<br>
        Coin: ${u.Coin}
      </div>
    `;
  } catch (e) {
    console.log("User fetch failed");
  }
}

/* ======================
   RENDER DEPOSIT
====================== */

async function renderDeposit() {
  const el = document.getElementById("deposit-list");

  try {
    const res = await fetchDeposit();
    if (!res.success) return;

    el.innerHTML = res.data.map(d => `
      <div class="card">
        <h3>${d.display_chip_amount}</h3>
        <p>${d.display_currency}</p>
        ${d.bonus ? `<small>Bonus ${d.bonus}</small>` : ""}
      </div>
    `).join("");

  } catch (e) {
    el.innerHTML = "<p>Error load data</p>";
  }
}

/* ======================
   BOOT
====================== */

document.addEventListener("DOMContentLoaded", () => {
  renderUser();
  renderDeposit();
});
