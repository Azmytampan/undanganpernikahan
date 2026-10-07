function openInvitation() {
    const cover = document.getElementById('cover');
    const main = document.getElementById('main');
    const music = document.getElementById('music');

    cover.style.display = 'none';
    main.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (music) {
        music.play().catch(() => {});
    }
}

function toggleMusic() {
    const music = document.getElementById('music');
    if (!music) return;

    if (music.paused) {
        music.play().catch(() => {});
    } else {
        music.pause();
    }
}

// Countdown ke akad nikah: 21 November 2028 pukul 08:00 WIB
const weddingDate = new Date('2028-11-21T08:00:00+07:00').getTime();

function updateCountdown() {
    const now = Date.now();
    const distance = weddingDate - now;

    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');

    if (!days || !hours || !minutes || !seconds) return;

    if (distance <= 0) {
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
        return;
    }

    days.textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    hours.textContent = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    minutes.textContent = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0');
    seconds.textContent = String(Math.floor((distance / 1000) % 60)).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const rsvpForm = document.getElementById('rsvpForm');
const result = document.getElementById('result');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const submitButton = rsvpForm.querySelector('button[type="submit"]');
        const name = document.getElementById('name').value.trim();
        const attendance = document.getElementById('attendance').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !attendance) {
            result.innerHTML = '<p>Nama dan konfirmasi kehadiran wajib diisi.</p>';
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';
        result.innerHTML = '';

        const formData = new FormData();
        formData.append('name', name);
        formData.append('attendance', attendance);
        formData.append('message', message);

        try {
            const response = await fetch('rsvp.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Gagal menyimpan RSVP.');
            }

            result.innerHTML = `<p>Terima kasih, <strong>${escapeHtml(name)}</strong>! Konfirmasi kehadiran Anda berhasil disimpan.</p>`;
            rsvpForm.reset();
        } catch (error) {
            result.innerHTML = `<p>Maaf, data belum tersimpan. ${escapeHtml(error.message)}</p>`;
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Konfirmasi';
        }
    });
}

function copyAccount() {
    const account = '1610011351025';

    navigator.clipboard.writeText(account).then(() => {
        alert('Nomor rekening berhasil disalin.');
    }).catch(() => {
        alert('Nomor rekening: ' + account);
    });
}
