import { ChecklistItem } from '../types';

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'link_pelik',
    title: 'Link Pelik (Suspicious Link)',
    description: 'Pautan yang mengandungi ejaan salah, karakter rawak, atau singkatan URL yang menyembunyikan destinasi sebenar.',
    example: 'Ejaan ditukar sedikit (typosquatting) seperti "maybnak2u.com" atau menggunakan pemendek link seperti "bit.ly/claim-duit-free" untuk menyembunyikan link berniat jahat.',
    iconName: 'Link2'
  },
  {
    id: 'ejaan_mencurigakan',
    title: 'Ejaan/Ayat Mencurigakan (Poor Spelling)',
    description: 'Bahasa Melayu yang kelihatan seperti diterjemah terus menggunakan penterjemah automatik (Google Translate), bercampur bahasa, atau penuh kesalahan tatabahasa.',
    example: '"Kami mendeteksi aktivitas login yang mencurigakan daripada IP luar negara pada akaun anda..." (Penggunaan perkataan seperti "mendeteksi", "aktivitas" iaitu ejaan bahasa Indonesia atau tatabahasa janggal).',
    iconName: 'SpellCheck'
  },
  {
    id: 'mendesak_klik',
    title: 'Mendesak Klik Segera (Urgency)',
    description: 'Penggunaan amaran atau ugutan untuk memaksa mangsa mengambil keputusan cepat dalam ketakutan atau kebimbangan tanpa berfikir panjang.',
    example: '"Sahkan akaun anda dalam masa 12 jam atau akaun anda akan dibekukan selama-lamanya!" atau "Saman aktif dikesan, klik untuk bayar sekarang sebelum waran tangkap dikeluarkan!"',
    iconName: 'Clock'
  },
  {
    id: 'minta_otp',
    title: 'Minta OTP/Kata Laluan (Asking Credentials)',
    description: 'Sebarang permintaan langsung atau tidak langsung untuk memasukkan kata laluan, nombor pin kad bank, atau kod pengesahan SMS (OTP/TAC).',
    example: 'Laman web yang meminta anda memasukkan username bank diikuti dengan kata laluan DAN nombor telefon serta kod OTP serentak di satu halaman tunggal.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'tawaran_terlalu_bagus',
    title: 'Tawaran Terlalu Bagus (Too Good To Be True)',
    description: 'Umpan kewangan yang sangat lumayan seperti cabutan bertuah, subsidi kerajaan rawak, baucar besar percuma, atau kerja sambilan mudah dengan gaji tidak masuk akal.',
    example: '"Tahniah! Anda memenangi hadiah utama cabutan bertuah Shell RM5,000!" atau "Jana RM800 sehari hanya dengan klik like video di rumah!"',
    iconName: 'Gift'
  },
  {
    id: 'domain_tidak_rasmi',
    title: 'Domain Tidak Rasmi (Unofficial Domain)',
    description: 'Alamat pengirim emel atau alamat laman web (URL) yang tidak sepadan dengan nama entiti rasmi.',
    example: 'Mengaku sebagai "Lembaga Hasil Dalam Negeri (LHDN)" tetapi menghantar emel daripada alamat "lhdn-tax-refund@gmail.com" atau mengarahkan ke tapak "http://lhdn-gov-malaysia.icu".',
    iconName: 'Globe2'
  }
];
