import { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    type: 'bank_email',
    title: 'Senario 1: Emel Keselamatan Bank',
    senderName: 'Maybank2u Security Alerts',
    senderAddress: 'maybank2u-alert-centre@secure-banking-malaysia.com',
    recipient: 'pengguna@gmail.com',
    subject: '[TINDAKAN SEGERA] Percubaan Log Masuk Tidak Sah Ke Akaun Maybank2u Anda',
    dateStr: 'Hari ini, 09:24 AM',
    bodyContent: 'Kami mendeteksi aktivitas login yang mencurigakan dari IP luar negara pada akaun Maybank2u anda. Untuk menjaga keselamatan dana, sila sahkan identiti peribadi anda di bawah dalam tempoh 12 jam. Jika gagal, akaun Maybank2u anda akan dibekukan serta-merta tanpa sebarang notis lanjut.',
    isPhishing: true,
    correctAnswer: 'phishing',
    mockupUrl: 'http://maybank2u-verification-portal.com/login',
    mockupBrandName: 'Maybank2u',
    avatarInitials: 'M2U',
    redFlags: [
      {
        id: 'email_address',
        label: 'Alamat Emel Pengirim Pelik',
        targetText: 'secure-banking-malaysia.com',
        explanation: 'Emel rasmi daripada Maybank sentiasa menggunakan domain @maybank.com atau @maybank2u.com.my. Scammer menggunakan domain mirip seperti secure-banking-malaysia.com untuk mengelirukan mangsa.'
      },
      {
        id: 'urgent_language',
        label: 'Bahasa Mendesak & Menakut-nakutkan',
        targetText: 'dalam tempoh 12 jam. Jika gagal, akaun Maybank2u anda akan dibekukan serta-merta',
        explanation: 'Scammer mencipta suasana cemas (urgency) supaya anda panik dan bertindak terburu-buru memasukkan kata laluan tanpa sempat berfikir atau membuat semakan.'
      },
      {
        id: 'fake_link',
        label: 'Pautan HTTP Tidak Selamat & Bukan Domain Rasmi',
        targetText: 'http://maybank2u-verification-portal.com/login',
        explanation: 'Pautan ini menggunakan HTTP biasa (tiada HTTPS selamat) dan menghala ke domain luar (maybank2u-verification-portal.com). Alamat portal rasmi Maybank ialah https://www.maybank2u.com.my.'
      }
    ],
    fullExplanation: 'Ini adalah cubaan phishing emel (Email Phishing) yang menyamar sebagai pihak bank. Scammer meniru logo dan gaya bahasa bank untuk mencuri kelayakan log masuk (username, password, serta OTP) anda.',
    safetyTip: 'Pihak bank tidak akan sesekali menghantar emel yang meminta anda menekan pautan untuk mengesahkan atau mengaktifkan semula akaun. Jangan pernah klik pautan sebegitu. Sentiasa taip sendiri alamat laman web rasmi bank di bar pelayar anda.'
  },
  {
    id: 2,
    type: 'whatsapp_parcel',
    title: 'Senario 2: Mesej WhatsApp Penghantaran PosLaju',
    senderName: '+6011-8472 9018',
    senderAddress: 'Mesej WhatsApp Peribadi',
    recipient: 'Mesej dihantar terus ke telefon anda',
    dateStr: 'Semalam, 03:45 PM',
    bodyContent: 'PosLaju MY: Penghantaran bungkusan anda (No: PL-827391-MY) telah ditangguhkan kerana alamat rumah tidak lengkap. Sila kemas kini alamat anda dan jelaskan caj pengurusan sebanyak RM1.50 di pautan di bawah dengan kadar segera.',
    isPhishing: true,
    correctAnswer: 'phishing',
    mockupUrl: 'http://poslaju-delivery-tracking.icu/update',
    mockupBrandName: 'PosLaju Malaysia',
    avatarInitials: 'PL',
    redFlags: [
      {
        id: 'whatsapp_number',
        label: 'Nombor Telefon Peribadi Biasa',
        targetText: '+6011-8472 9018',
        explanation: 'Syarikat kurier rasmi menggunakan akaun WhatsApp Perniagaan yang disahkan (Verified Business dengan ikon tanda rait hijau) atau SMS berbayar rasmi, bukannya nombor telefon bimbit prabayar biasa.'
      },
      {
        id: 'small_charge',
        label: 'Tuntutan Caj Kecil Luar Biasa',
        targetText: 'caj pengurusan sebanyak RM1.50',
        explanation: 'Meminta caj yang kecil (seperti RM1.00 - RM2.00) adalah taktik penipuan untuk membuatkan anda rasa tidak rugi untuk mencuba. Padahal, ia bertujuan memerangkap anda memasukkan butiran kad kredit/debit lengkap di portal bayaran palsu.'
      },
      {
        id: 'icu_tld',
        label: 'Domain Murah / Pelik (.icu)',
        targetText: 'poslaju-delivery-tracking.icu',
        explanation: 'Domain rasmi Pos Malaysia adalah pos.com.my. Alamat web yang berakhir dengan .icu, .top, .live, atau .xyz adalah domain murah yang dibeli oleh scammer untuk mengelak daripada dikesan.'
      }
    ],
    fullExplanation: 'Mesej ini adalah penipuan kurier (Delivery Scam) melalui WhatsApp/SMS. Scammer cuba mengeksploitasi keadaan sekiranya anda memang sedang menunggu barang, bagi mencuri maklumat kad bank anda.',
    safetyTip: 'Jika menerima mesej sebegini, abaikan pautan tersebut. Salin nombor tracking (jika ada) dan buat semakan secara terus di laman web rasmi pos.com.my atau aplikasi mudah alih Pos Malaysia.'
  },
  {
    id: 3,
    type: 'fake_login',
    title: 'Senario 3: Portal Log Masuk Google Google Drive',
    senderName: 'Pelayar Web (Web Browser)',
    senderAddress: 'Tetingkap Paparan Dokumen Google Drive',
    recipient: 'pengguna@gmail.com',
    subject: 'Google Drive - Log Masuk Diperlukan',
    dateStr: 'Masa Nyata (Live)',
    bodyContent: 'Sesi keselamatan Google anda telah tamat. Sila log masuk semula ke akaun Gmail anda untuk terus memuat turun dan melihat fail sulit: "Senarai_Gaji_Bonus_Syarikat_2026.pdf" (Saiz fail: 4.8MB).',
    isPhishing: true,
    correctAnswer: 'phishing',
    mockupUrl: 'http://accounts.google.com-security-access.net/signin-identifier',
    mockupBrandName: 'Google Accounts',
    avatarInitials: 'G',
    redFlags: [
      {
        id: 'misleading_url',
        label: 'Taktik Subdomain Mengelirukan',
        targetText: 'accounts.google.com-security-access.net',
        explanation: 'Domain utama dibaca dari kanan ke kiri, iaitu "security-access.net", bukannya "google.com". Scammer meletakkan perkataan "accounts.google.com" di bahagian hadapan sebagai subdomain untuk menipu pengguna yang cuai.'
      },
      {
        id: 'greed_bait',
        label: 'Dokumen Umpan Sensitif (Gaji/Bonus)',
        targetText: 'Senarai_Gaji_Bonus_Syarikat_2026.pdf',
        explanation: 'Scammer sengaja mengumpan anda menggunakan fail yang bernada rahsia atau kewangan (gaji, bonus, saman) untuk menaikkan sifat ingin tahu atau ketakutan anda, memaksa log masuk cepat.'
      },
      {
        id: 'http_insecure',
        label: 'Menggunakan Protokol HTTP Tidak Selamat',
        targetText: 'http://',
        explanation: 'Google dan semua laman web sensitif tidak akan menggunakan protokol "http://". Laman log masuk rasmi yang selamat mestilah bermula dengan "https://" beserta ikon kunci mangga.'
      }
    ],
    fullExplanation: 'Ini dinamakan taktik "Credential Harvesting". Halaman ini dibina menyerupai halaman Google Login yang sah semata-mata untuk mengumpul kombinasi e-mel dan kata laluan anda.',
    safetyTip: 'Sebelum memasukkan kata laluan anda ke mana-mana laman web, wajib semak bar URL. Pastikan pautan berakhir dengan domain rasmi google.com (seperti accounts.google.com/...) dan mempunyai ikon kunci keselamatan yang sah.'
  },
  {
    id: 4,
    type: 'qr_warning',
    title: 'Senario 4: Promosi Cabutan Bertuah QR Code',
    senderName: 'Poster Imbas & Menang',
    senderAddress: 'Ditampal di Stesen Bas / Kedai Runcit',
    recipient: 'Orang Awam / Pengguna Laluan',
    dateStr: 'Taktik Fizikal',
    bodyContent: 'IMBAS & MENANG SEGERA! Kempen Subsidi Rakyat Prihatin 2026. Imbas kod QR di bawah dengan telefon bimbit anda untuk menebus Baucar Tunai RM500 secara percuma. Hanya tinggal 47 slot tebusan hari ini!',
    isPhishing: true,
    correctAnswer: 'phishing',
    mockupUrl: 'http://subsidi-prihatin-malaysia.xyz/claim',
    mockupBrandName: 'Kempen Prihatin',
    avatarInitials: 'QR',
    redFlags: [
      {
        id: 'quishing_tactic',
        label: 'QR Code Phishing (Quishing)',
        targetText: 'Imbas kod QR di bawah',
        explanation: 'Scammer menyembunyikan link berniat jahat di sebalik kod QR fizikal yang ditampal secara haram di tempat awam atau diletakkan di atas kod QR bayaran rasmi kedai.'
      },
      {
        id: 'too_good',
        label: 'Ganjaran Terlalu Lumayan Tanpa Syarat',
        targetText: 'Baucar Tunai RM500 secara percuma',
        explanation: 'Tawaran wang percuma tanpa sebarang usaha yang sah adalah taktik penipuan emosi (tamak) untuk menarik perhatian mangsa dengan pantas.'
      },
      {
        id: 'xyz_domain',
        label: 'Domain Murah Pelik (.xyz)',
        targetText: 'subsidi-prihatin-malaysia.xyz',
        explanation: 'Laman web rasmi agensi kerajaan Malaysia sentiasa menggunakan akhiran domain ".gov.my", manakala badan berkanun menggunakan ".org.my" atau ".my". Penggunaan domain .xyz mendedahkan bahawa ini adalah laman phishing.'
      }
    ],
    fullExplanation: 'Taktik ini dipanggil "Quishing" (QR Phishing). Scammer menggunakan kod QR untuk menyembunyikan alamat laman web berniat jahat, menyukarkan mangsa melihat URL sebenar sebelum mengimbas.',
    safetyTip: 'Gunakan aplikasi kamera telefon yang memaparkan preview URL penuh sebelum membukanya. Jangan sesekali mengimbas kod QR rawak yang ditampal di tiang, lif, stesen bas, atau risalah misteri.'
  },
  {
    id: 5,
    type: 'job_scam',
    title: 'Senario 5: Tawaran Kerja Sambilan Mudah (Telegram/WhatsApp)',
    senderName: 'HR Recruiter - Kelly Services My',
    senderAddress: 'Mesej Rawak Telegram',
    recipient: 'Pengguna Telefon Bimbit',
    dateStr: 'Hari ini, 11:10 AM',
    bodyContent: 'Salam sejahtera! Saya Sarah dari agensi pekerjaan Kelly Services. Kami ingin menawarkan jawatan kosong flexi-time untuk anda. Tugasan harian amat senang: Anda cuma perlu LIKE video TikTok yang kami berikan. Setiap tugasan selesai dibayar RM20. Boleh jana pendapatan sampingan RM300 - RM600 sehari terus dari rumah! Sila daftar profil anda di pautan di bawah.',
    isPhishing: true,
    correctAnswer: 'phishing',
    mockupUrl: 'http://kelly-freelancers-recruit.net/register',
    mockupBrandName: 'Kelly Services Freelance',
    avatarInitials: 'KS',
    redFlags: [
      {
        id: 'unsolicited_chat',
        label: 'Mesej Kerja Tanpa Diminta (Unsolicited)',
        targetText: 'Saya Sarah dari agensi pekerjaan Kelly Services. Kami ingin menawarkan jawatan kosong',
        explanation: 'Agensi pengambilan pekerja terkemuka tidak akan menghubungi calon secara rawak melalui Telegram atau WhatsApp peribadi untuk menawarkan pekerjaan yang tidak pernah dipohon.'
      },
      {
        id: 'easy_income',
        label: 'Umpan Gaji Lumayan Kerja Sangat Mudah',
        targetText: 'cuma perlu LIKE video TikTok... jana pendapatan sampingan RM300 - RM600 sehari',
        explanation: 'Ini adalah permulaan kepada "Task Scam". Scammer menawarkan kerja mudah dengan bayaran lumayan untuk memancing mangsa. Di peringkat seterusnya, mangsa akan disuruh membuat deposit wang ke dalam akaun tertentu dengan alasan "tugas pelaburan prepaid" untuk menebus komisen yang lebih besar, sebelum dilarikan scammer.'
      },
      {
        id: 'fake_recruit_url',
        label: 'Alamat Domain Palsu Syarikat Agensi',
        targetText: 'kelly-freelancers-recruit.net',
        explanation: 'Laman web rasmi agensi Kelly Services di Malaysia menggunakan domain rasmi seperti kellyservices.com.my, bukannya domain generik murah (.net) dengan nama yang dicantumkan sesuka hati.'
      }
    ],
    fullExplanation: 'Ini adalah taktik permulaan "Job Scam" atau "Task Scam". Mangsa akan diberi komisen kecil pada mulanya untuk membina kepercayaan, sebelum diarah memindahkan ribuan ringgit wang sendiri untuk melakukan "tugasan bernilai tinggi".',
    safetyTip: 'Abaikan tawaran kerja mudah yang menjanjikan wang melimpah-ruah dari aplikasi sembang rawak. Agensi pekerjaan profesional sentiasa mengadakan proses temuduga yang rasmi dan tidak pernah meminta wang deposit atau modal daripada pencari kerja.'
  }
];
