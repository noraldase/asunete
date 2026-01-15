(() => {
  const neoForm = document.getElementById('neoForm');
  const btnTopup = document.getElementById('btnTopup');
  const btnBongkar = document.getElementById('btnBongkar');
  const flowSection = document.getElementById('flowSection');
  const flowTitle = document.getElementById('flowTitle');
  const flowBack = document.getElementById('flowBack');
  const amountInput = document.getElementById('amount');
  const noteInput = document.getElementById('note');
  const flowSubmit = document.getElementById('flowSubmit');
  const chips = document.querySelectorAll('.chip');

  let currentAction = null;

  const rupiahFormat = (value) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

  const sanitizePhone = (v) => {
    const onlyDigits = (v || '').replace(/[^\d]/g, '');
    if (onlyDigits.startsWith('0')) return '62' + onlyDigits.slice(1);
    if (onlyDigits.startsWith('8')) return '62' + onlyDigits;
    return onlyDigits;
  };

  const showFlow = (action) => {
    currentAction = action;
    flowTitle.textContent = action === 'TOPUP' ? 'TOP UP Neo' : 'BONGKAR Neo';
    flowSection.classList.remove('hidden');
    amountInput.focus();
    flowSubmit.textContent = 'Kirim via WhatsApp';
  };

  const hideFlow = () => {
    currentAction = null;
    flowSection.classList.add('hidden');
    amountInput.value = '';
    noteInput.value = '';
  };

  btnTopup.addEventListener('click', () => {
    if (!neoForm.reportValidity()) return;
    showFlow('TOPUP');
  });
  btnBongkar.addEventListener('click', () => {
    if (!neoForm.reportValidity()) return;
    showFlow('BONGKAR');
  });
  flowBack.addEventListener('click', hideFlow);

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const amt = chip.getAttribute('data-amount');
      amountInput.value = amt;
    });
  });

  flowSubmit.addEventListener('click', () => {
    const neoId = document.getElementById('neoId').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const amount = parseInt(amountInput.value, 10);
    const note = noteInput.value.trim();

    if (!neoId || !whatsapp) {
      alert('Harap isi Neo ID dan No. Whatsapp terlebih dahulu.');
      return;
    }
    if (!amount || amount < 10000) {
      alert('Nominal minimal Rp10.000.');
      amountInput.focus();
      return;
    }

    const actLabel = currentAction === 'BONGKAR' ? 'BONGKAR' : 'TOP UP';
    const message = [
      `[${
        actLabel
      }] Neo Agent Web`,
      `Neo ID: ${neoId}`,
      `No. Whatsapp: ${whatsapp}`,
      `Nominal: ${rupiahFormat(amount)}`,
      note ? `Catatan: ${note}` : null,
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });
})(); 
