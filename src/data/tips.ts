import { CyberTip } from '../types';

export const CYBER_TIPS: CyberTip[] = [
  {
    id: 1,
    title: 'Jangan Kongsi OTP / TAC',
    description: 'Kod OTP atau TAC adalah kunci keselamatan terakhir anda. Jangan serahkan kepada sesiapa pun.',
    expandedDetails: 'Kata laluan sekali guna (OTP) atau Kod Kebenaran Transaksi (TAC) dihantar ke telefon bimbit anda untuk mengesahkan transaksi perbankan atau log masuk kritikal. Scammer sering memujuk mangsa menyerahkan kod ini dengan alasan tersalah daftar nombor telefon atau memenangi peraduan. Ingat, pihak bank, kurier, atau kerajaan tidak akan sesekali meminta kod OTP anda.',
    iconName: 'KeyRound'
  },
  {
    id: 2,
    title: 'Guna MFA (Pengesahan Pelbagai Faktor)',
    description: 'Aktifkan MFA pada semua akaun digital utama (emel, perbankan, media sosial).',
    expandedDetails: 'Multi-Factor Authentication (MFA atau 2FA) menambah satu lagi lapisan keselamatan. Selain kata laluan biasa, anda perlu memasukkan kod tambahan (seperti daripada aplikasi Google Authenticator, pengimbasan cap jari, atau SMS). Walaupun scammer berjaya mencuri kata laluan anda, mereka tetap tidak dapat menceroboh masuk tanpa pengesahan faktor kedua ini.',
    iconName: 'ShieldCheck'
  },
  {
    id: 3,
    title: 'Semak Alamat URL / Domain',
    description: 'Sentiasa perhatikan bar alamat pelayar (address bar) sebelum menaip maklumat sulit.',
    expandedDetails: 'Scammer sangat mahir membina klon laman web rasmi (seperti Maybank2u, CIMB Clicks, atau Facebook). Periksa ejaan nama domain satu persatu. Cari perbezaan kecil seperti "maybank2u-alert.com" bukannya "maybank2u.com.my". Pastikan juga tapak web tersebut mempunyai sijil keselamatan HTTPS (ikon mangga terkunci).',
    iconName: 'Globe'
  },
  {
    id: 4,
    title: 'Jangan Klik Pautan Mencurigakan',
    description: 'Fikir dahulu sebelum klik pautan di emel, SMS, WhatsApp atau Telegram.',
    expandedDetails: 'Jika anda menerima emel atau mesej yang tidak dijangka yang mendesak anda menekan pautan, jangan lakukannya! Adalah lebih selamat untuk mengakses laman web tersebut dengan menaip sendiri URL rasmi di browser anda atau menggunakan aplikasi mudah alih rasmi mereka yang sedia dipasang.',
    iconName: 'MousePointerClick'
  },
  {
    id: 5,
    title: 'Kemas Kini Perisian & Telefon',
    description: 'Pastikan sistem operasi, aplikasi, dan pelayar internet anda sentiasa dikemas kini.',
    expandedDetails: 'Kemaskini perisian (updates) bukan sekadar membawa ciri baru, malah ia mengandungi tampalan keselamatan (security patches) untuk menutup kelemahan sistem (vulnerabilities) yang sering dieksploitasi oleh hacker untuk menyebarkan malware atau spyware ke dalam peranti anda.',
    iconName: 'RefreshCw'
  },
  {
    id: 6,
    title: 'Guna Kata Laluan yang Kuat',
    description: 'Cipta kata laluan yang sukar diteka dengan gabungan huruf, nombor, dan simbol.',
    expandedDetails: 'Elakkan penggunaan kata laluan yang mudah diteka seperti "123456", "password", nama kucing anda, atau tarikh lahir anda. Gunakan sekurang-kurangnya 12 aksara yang menggabungkan huruf besar, huruf kecil, angka, dan simbol khas (contoh: P@$$w0rd!#2026). Penggunaan "Password Manager" adalah sangat digalakkan.',
    iconName: 'Lock'
  },
  {
    id: 7,
    title: 'Jangan Guna Kata Laluan yang Sama',
    description: 'Gunakan kata laluan berbeza untuk setiap akaun perkhidmatan digital yang penting.',
    expandedDetails: 'Jika anda menggunakan satu kata laluan yang sama untuk emel, media sosial, dan akaun bank, anda meletakkan diri dalam bahaya besar. Sekiranya salah satu pangkalan data laman web tersebut bocor (data breach), scammer akan mencuba kata laluan yang sama untuk mengakses akaun perbankan dan emel utama anda.',
    iconName: 'CopyX'
  },
  {
    id: 8,
    title: 'Sahkan Melalui Saluran Rasmi',
    description: 'Hubungi talian khidmat pelanggan rasmi jika musykil dengan tuntutan denda atau pembekuan akaun.',
    expandedDetails: 'Scammer sering menyamar sebagai polis, LHDN, SPRM, mahkamah, atau pegawai bank yang mendakwa anda terlibat dalam penggubahan wang haram atau pengelakan cukai. Jangan panik. Letakkan telefon, cari nombor telefon rasmi agensi tersebut dari laman web rasmi mereka, dan hubungi mereka sendiri untuk pengesahan.',
    iconName: 'PhoneCall'
  },
  {
    id: 9,
    title: 'Berhati-hati dengan WiFi Awam',
    description: 'Elakkan melakukan transaksi perbankan ketika bersambung dengan rangkaian WiFi awam.',
    expandedDetails: 'Rangkaian WiFi awam percuma di kafe, lapangan terbang, atau hotel biasanya tidak disulitkan. Penggodam boleh melakukan taktik "Man-in-the-Middle" (MitM) untuk mengintip data trafik internet anda, termasuk merekodkan kata laluan atau maklumat kad kredit yang anda taip. Gunakan data mudah alih peribadi atau aktifkan VPN jika terpaksa.',
    iconName: 'WifiOff'
  },
  {
    id: 10,
    title: 'Laporkan Scam dengan Segera',
    description: 'Hubungi Pusat Respons Scam Kebangsaan (NSRC) di talian 997 dalam tempoh 24 jam.',
    expandedDetails: 'Sekiranya anda tersedar telah menjadi mangsa scam dan wang telah dipindahkan, hubungi talian NSRC 997 dengan segera (dalam tempoh 24 jam) untuk membantu pihak bank menyekat aliran keluar wang tersebut daripada sistem perbankan. Anda juga harus membuat laporan polis berhampiran bagi siasatan lanjut.',
    iconName: 'AlertTriangle'
  }
];
