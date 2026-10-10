export const rupiah = (number) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0
}).format(number)

// tanggal lokal dalam format yyyy-mm-dd (untuk input date)
export const todayLocal = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)

export const tanggalHariIni = () => new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
