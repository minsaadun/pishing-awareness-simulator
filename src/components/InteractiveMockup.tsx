import React from 'react';
import { Scenario, RedFlag } from '../types';
import { ShieldAlert, AlertTriangle, Check, Info } from 'lucide-react';

interface InteractiveMockupProps {
  scenario: Scenario;
  revealRedFlags: boolean;
  selectedRedFlagId: string | null;
  onSelectRedFlag: (flagId: string) => void;
}

export const InteractiveMockup: React.FC<InteractiveMockupProps> = ({
  scenario,
  revealRedFlags,
  selectedRedFlagId,
  onSelectRedFlag,
}) => {
  // Helper to check if a specific red flag is selected
  const isSelected = (id: string) => selectedRedFlagId === id;

  // Render pulsing hotspot marker
  const renderHotspot = (flagId: string, label: string) => {
    if (!revealRedFlags) return null;
    const active = isSelected(flagId);

    return (
      <button
        id={`hotspot-${flagId}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelectRedFlag(flagId);
        }}
        className={`absolute z-20 flex h-6 items-center justify-center rounded-full px-2 text-[10px] font-bold tracking-wider uppercase transition-all duration-300 shadow-md ${
          active
            ? 'bg-cyber-red text-white scale-110 ring-4 ring-red-300'
            : 'bg-amber-500 text-white animate-pulse hover:bg-cyber-red'
        }`}
        title={`Petunjuk: ${label}`}
      >
        <span className="mr-1 flex h-2 w-2 rounded-full bg-white"></span>
        {label}
      </button>
    );
  };

  // 1. Bank Email Mockup
  const renderBankEmail = () => {
    return (
      <div className="w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden flex flex-col font-sans">
        {/* Browser / Client Header */}
        <div className="bg-gray-100 px-4 py-2 flex items-center border-b border-gray-200 gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
          </div>
          <div className="flex-1 bg-white mx-4 rounded-md border border-gray-200 text-xs text-gray-500 py-1 px-3 font-mono truncate flex items-center gap-1.5 select-all">
            <span className="text-gray-400">🔒 Secure Mail |</span> 
            <span>https://outlook.live.com/mail/0/inbox</span>
          </div>
        </div>

        {/* Email Header */}
        <div className="p-4 bg-gray-50 border-b border-gray-100 text-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-semibold text-gray-800 flex items-center gap-2">
                <span>{scenario.senderName}</span>
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                  &lt;
                  <span className={`px-1.5 py-0.5 rounded ${revealRedFlags ? 'bg-amber-100 text-amber-800 border border-amber-300' : ''}`}>
                    {scenario.senderAddress}
                  </span>
                  &gt;
                </span>
                {renderHotspot('email_address', 'E-mel Palsu')}
              </div>
              <div className="text-xs text-gray-500 mt-1">Kepada: {scenario.recipient}</div>
            </div>
            <span className="text-xs text-gray-400 font-mono">{scenario.dateStr}</span>
          </div>
          <div className="font-bold text-gray-900 text-base mt-2 border-l-4 border-cyber-cyan pl-2">
            {scenario.subject}
          </div>
        </div>

        {/* Email Body */}
        <div className="p-6 text-gray-700 leading-relaxed text-sm relative">
          {/* External Sender Alert */}
          <div className="mb-4 p-2 bg-amber-50 border-l-4 border-amber-500 text-xs text-amber-800 rounded flex gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500" />
            <span><strong>Amaran Keselamatan:</strong> Pengirim ini berada di luar organisasi anda. Berhati-hati sebelum menekan pautan atau memuat turun fail.</span>
          </div>

          {/* Fictional Maybank Header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center font-black text-black text-xs">
              M2U
            </div>
            <span className="font-display font-bold text-lg text-amber-500">maybank<span className="text-black">2u</span>.com</span>
          </div>

          <p className="mb-4">Pelanggan Maybank yang dihormati,</p>
          
          <p className="mb-4">
            Kami mendeteksi aktivitas login yang mencurigakan dari IP luar negara pada akaun Maybank2u anda. 
            Untuk menjaga keselamatan dana anda, sila sahkan identiti peribadi anda di bawah 
            <span className={`px-1.5 py-0.5 rounded transition-all ${revealRedFlags ? 'bg-red-100 text-red-800 font-medium border border-red-200' : ''}`}>
              {" "}dalam tempoh 12 jam. Jika gagal, akaun Maybank2u anda akan dibekukan serta-merta{" "}
            </span>
            tanpa sebarang notis lanjut.
            {renderHotspot('urgent_language', 'Umpan Mendesak')}
          </p>

          {/* Call to Action Button */}
          <div className="my-6 text-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (revealRedFlags) onSelectRedFlag('fake_link');
              }}
              className="inline-block bg-[#ffde00] text-black font-bold py-3 px-8 rounded-lg shadow hover:bg-amber-400 transition-all text-sm tracking-wide active:scale-95"
            >
              Sahkan Akaun Maybank2u
            </button>
            <div className="mt-2 text-xs text-gray-400 font-mono flex justify-center items-center gap-1">
              <span>Hala pautan: </span>
              <span className={`px-1 py-0.5 rounded ${revealRedFlags ? 'bg-red-100 text-red-800 border border-red-200 font-medium' : ''}`}>
                {scenario.mockupUrl}
              </span>
              {renderHotspot('fake_link', 'URL Palsu')}
            </div>
          </div>

          <p className="mb-2">Terima kasih,</p>
          <p className="font-semibold text-gray-800">Jabatan Sekuriti Siber Maybank</p>

          <hr className="my-6 border-gray-100" />
          <p className="text-[10px] text-gray-400 leading-tight">
            Penafian Keselamatan: Emel ini dijanakan secara automatik. Sila jangan balas. Maybank tidak akan meminta PIN, Kata Laluan, atau OTP anda melalui emel atau panggilan telefon biasa.
          </p>
        </div>
      </div>
    );
  };

  // 2. WhatsApp Parcel Mockup
  const renderWhatsAppParcel = () => {
    return (
      <div className="w-full max-w-sm mx-auto rounded-2xl border border-emerald-600 bg-[#efeae2] shadow-xl overflow-hidden flex flex-col font-sans h-[480px]">
        {/* WhatsApp Phone Header */}
        <div className="bg-[#075e54] text-white px-3 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-inner relative">
              {scenario.avatarInitials}
              {renderHotspot('whatsapp_number', 'Bukan No. Rasmi')}
            </div>
            <div>
              <div className="font-semibold text-sm flex items-center gap-1.5">
                <span className={`px-1 rounded ${revealRedFlags ? 'bg-amber-500 text-white text-xs' : ''}`}>
                  {scenario.senderName}
                </span>
              </div>
              <div className="text-[10px] text-emerald-200">dalam talian</div>
            </div>
          </div>
          <div className="flex gap-3 text-emerald-100 text-xs">
            <span>📞</span>
            <span>📹</span>
            <span>⋮</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col justify-end">
          {/* Encrypted Disclaimer */}
          <div className="mx-auto bg-amber-100 text-amber-900 border border-amber-200 text-[10px] py-1 px-3 rounded-lg text-center shadow-sm max-w-[280px]">
            🔒 Mesej dan panggilan disulitkan secara hujung-ke-hujung. Tiada sesiapa di luar sembang ini boleh membacanya.
          </div>

          {/* Received Bubble */}
          <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85%] self-start relative">
            <div className="text-xs text-gray-800 leading-relaxed mb-2">
              PosLaju MY: Penghantaran bungkusan anda (No: PL-827391-MY) telah ditangguhkan kerana alamat rumah tidak lengkap. 
              Sila kemas kini alamat anda dan jelaskan 
              <span className={`px-1 py-0.5 rounded transition-all ${revealRedFlags ? 'bg-red-100 text-red-800 font-medium' : ''}`}>
                {" "}caj pengurusan sebanyak RM1.50{" "}
              </span>
              di pautan di bawah dengan kadar segera.
              {renderHotspot('small_charge', 'Caj Penipuan')}
            </div>

            {/* Link Preview Card */}
            <div 
              onClick={() => {
                if (revealRedFlags) onSelectRedFlag('icu_tld');
              }}
              className="border border-gray-100 rounded-lg bg-gray-50 overflow-hidden cursor-pointer hover:bg-gray-100 transition-all"
            >
              <div className="bg-orange-100 h-16 flex items-center justify-center text-orange-600 font-bold text-xs font-display">
                POSLAJU MALAYSIA TRACING
              </div>
              <div className="p-2 text-[11px]">
                <div className="font-semibold text-gray-800 truncate">Sila Kemaskini Alamat Anda</div>
                <div className="text-gray-500 text-[10px] line-clamp-1">Kemas kini butiran penghantaran & bayar caj tertunggak.</div>
                <div className={`mt-1 font-mono text-emerald-600 truncate font-semibold ${revealRedFlags ? 'bg-red-100 text-red-800 px-1 rounded' : ''}`}>
                  {scenario.mockupUrl}
                </div>
              </div>
            </div>
            
            {renderHotspot('icu_tld', 'Domain Murah')}

            <div className="text-[9px] text-gray-400 text-right mt-1.5 font-mono">
              {scenario.dateStr} ✓✓
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="bg-[#f0f0f0] p-2 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-400 flex items-center justify-between shadow-sm">
            <span>Taip mesej...</span>
            <span>📎 📷</span>
          </div>
          <div className="h-8 w-8 bg-[#075e54] rounded-full flex items-center justify-center text-white text-xs shadow">
            🎤
          </div>
        </div>
      </div>
    );
  };

  // 3. Fake Login Mockup
  const renderFakeLogin = () => {
    return (
      <div className="w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden flex flex-col font-sans">
        {/* Browser Header */}
        <div className="bg-slate-100 px-4 py-2.5 flex items-center border-b border-gray-200 gap-2">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
          </div>
          <div className="flex-1 bg-red-50 text-red-700 mx-2 md:mx-6 rounded-md border border-red-200 text-xs py-1 px-3 font-mono flex items-center justify-between truncate">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-red-500 font-bold font-sans">⚠️ NOT SECURE |</span>
              <span className={`truncate px-1.5 py-0.5 rounded font-bold ${revealRedFlags ? 'bg-red-200 text-red-900' : ''}`}>
                {scenario.mockupUrl}
              </span>
            </div>
            {renderHotspot('misleading_url', 'Umpan URL')}
          </div>
        </div>

        {/* Main Interface */}
        <div className="bg-gray-50 flex items-center justify-center p-6 md:p-12 relative min-h-[350px]">
          {renderHotspot('http_insecure', 'Insecure HTTP')}
          
          <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
            {/* Google Logo (Fictional Colorful) */}
            <div className="flex items-center gap-0.5 mb-2 font-display text-2xl font-bold tracking-tight">
              <span className="text-blue-600">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-600">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Sesi Tamat Sila Log Masuk</h3>
            <p className="text-xs text-gray-400 mb-6">untuk meneruskan muat turun dokumen</p>

            {/* Document Warning box */}
            <div className="mb-5 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex gap-2 w-full">
              <span className="text-lg shrink-0">📄</span>
              <div>
                <span className="font-semibold">Nama Fail:</span>
                <span className={`ml-1 font-mono break-all px-1 py-0.2 rounded ${revealRedFlags ? 'bg-amber-100 text-amber-900 font-medium' : ''}`}>
                  {scenario.bodyContent.match(/"([^"]+)"/)?.[1] || "Senarai_Gaji_Bonus_Syarikat_2026.pdf"}
                </span>
                {renderHotspot('greed_bait', 'Fail Rahsia')}
                <div className="text-[10px] text-gray-400 mt-0.5">Saiz: 4.8MB • Format: PDF</div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3 w-full">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Alamat Emel</label>
                <input 
                  type="text" 
                  disabled
                  placeholder="pengguna@gmail.com" 
                  className="w-full px-3 py-2 border border-gray-200 rounded text-xs bg-gray-50 text-gray-500 cursor-not-allowed font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Kata Laluan</label>
                <input 
                  type="password" 
                  disabled
                  value="••••••••••••••" 
                  className="w-full px-3 py-2 border border-gray-200 rounded text-xs bg-gray-50 text-gray-400 cursor-not-allowed font-mono"
                />
                <span className="text-[9px] text-red-400 mt-1 block">⚠️ Jangan masukkan kata laluan sebenar anda di sini!</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (revealRedFlags) onSelectRedFlag('misleading_url');
              }}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-xs font-bold transition-colors shadow"
            >
              Muat Turun Fail Serta-Merta
            </button>

            <span className="text-[10px] text-gray-400 mt-4 hover:underline cursor-pointer">Lupa e-mel atau kata laluan?</span>
          </div>
        </div>
      </div>
    );
  };

  // 4. QR Code Poster Mockup
  const renderQRWarning = () => {
    return (
      <div className="w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden flex flex-col font-sans">
        {/* Context Badge */}
        <div className="bg-gray-100 px-4 py-2.5 flex items-center border-b border-gray-200 text-xs text-gray-500 font-medium">
          🏢 Poster yang dijumpai tertampal di dinding Kedai Runcit / Perhentian Bas Awam
        </div>

        {/* Physical Poster Display */}
        <div className="p-6 md:p-10 bg-slate-900 flex justify-center items-center relative">
          {/* Wood/Wall Background representation */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

          {/* Poster Content Box */}
          <div className="w-full max-w-sm bg-gradient-to-br from-amber-500 via-amber-600 to-red-600 text-white rounded-2xl p-6 shadow-2xl relative border-4 border-yellow-300">
            {/* Header */}
            <div className="text-center mb-4">
              <span className="bg-yellow-300 text-amber-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                KEMENTERIAN BELIA & PRIHATIN
              </span>
              <h2 className="text-xl font-black tracking-tight mt-3 text-yellow-100 leading-tight">
                IMBAS & MENANG SEGERA!
              </h2>
              <p className="text-[11px] text-amber-100 font-medium mt-1">Kempen Subsidi Rakyat Prihatin 2026</p>
            </div>

            {/* Poster Main Offer */}
            <div className="bg-amber-950/40 rounded-xl p-3 text-center border border-amber-400/30 mb-5 relative">
              <div className="text-2xl font-black text-yellow-300 tracking-wide">
                Baucar Tunai RM500
              </div>
              <div className="text-[10px] text-amber-100 mt-1 uppercase tracking-wider font-bold">
                Secara Percuma • 
                <span className={`ml-1 px-1 py-0.2 rounded ${revealRedFlags ? 'bg-red-200 text-red-950' : ''}`}>
                  Hanya tinggal 47 slot sahaja!
                </span>
                {renderHotspot('too_good', 'Tawaran Hebat')}
              </div>
            </div>

            {/* Simulated QR Code Box */}
            <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center max-w-[200px] mx-auto shadow-lg border border-yellow-200 relative">
              <div className="w-32 h-32 bg-gray-200 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 relative">
                {/* SVG Mock QR Code Pattern */}
                <svg className="w-28 h-28 text-gray-800" viewBox="0 0 100 100" fill="currentColor">
                  {/* Position detection patterns (Top Left, Top Right, Bottom Left) */}
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                  {/* Random pixels to look like QR */}
                  <rect x="40" y="5" width="10" height="10" />
                  <rect x="55" y="15" width="10" height="5" />
                  <rect x="45" y="25" width="15" height="10" />
                  <rect x="5" y="40" width="10" height="10" />
                  <rect x="20" y="45" width="15" height="10" />
                  <rect x="45" y="45" width="10" height="15" />
                  <rect x="60" y="40" width="15" height="15" />
                  <rect x="80" y="45" width="15" height="10" />
                  <rect x="15" y="60" width="10" height="5" />
                  <rect x="35" y="60" width="20" height="15" />
                  <rect x="65" y="65" width="10" height="10" />
                  <rect x="85" y="60" width="10" height="10" />
                  <rect x="45" y="80" width="25" height="10" />
                  <rect x="75" y="85" width="15" height="10" />
                  {/* Scanner line animation */}
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#ef4444" strokeWidth="2" className="animate-bounce" />
                </svg>
              </div>
              <span className="text-[9px] text-gray-400 font-semibold tracking-wider uppercase mt-2">
                IMBAS DENGAN TELEFON
              </span>
              
              {renderHotspot('quishing_tactic', 'Taktik Quishing')}
            </div>

            {/* Bottom URL */}
            <div className="mt-5 text-center">
              <p className="text-[10px] text-amber-200">Atau layari portal tebusan rasmi:</p>
              <p className={`font-mono text-xs font-bold text-yellow-300 truncate mt-1 ${revealRedFlags ? 'bg-red-950/40 text-red-200 px-1 py-0.5 rounded' : ''}`}>
                {scenario.mockupUrl}
              </p>
              {renderHotspot('xyz_domain', 'Domain Palsu')}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 5. Job Scam Mockup
  const renderJobScam = () => {
    return (
      <div className="w-full max-w-sm mx-auto rounded-2xl border border-sky-600 bg-[#f4f7f9] shadow-xl overflow-hidden flex flex-col font-sans h-[480px]">
        {/* Telegram Header */}
        <div className="bg-[#2481cc] text-white px-3 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-inner relative">
              {scenario.avatarInitials}
              {renderHotspot('unsolicited_chat', 'Chat Rawak')}
            </div>
            <div>
              <div className="font-semibold text-sm flex items-center gap-1">
                <span>{scenario.senderName}</span>
                <span className="text-[10px] bg-sky-500 text-sky-100 px-1 py-0.2 rounded shrink-0">HR Recruiter</span>
              </div>
              <div className="text-[10px] text-sky-100">aktif seminit lepas</div>
            </div>
          </div>
          <div className="flex gap-4 text-sky-100 text-xs">
            <span>🔍</span>
            <span>⋮</span>
          </div>
        </div>

        {/* Telegram Chat Area */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col justify-end bg-sky-50/50">
          <div className="mx-auto bg-sky-100/80 text-sky-900 border border-sky-200 text-[10px] py-0.5 px-3 rounded-full text-center max-w-[200px] mb-4">
            📅 {scenario.dateStr}
          </div>

          {/* First received message */}
          <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm max-w-[85%] self-start text-xs text-gray-800 leading-relaxed relative">
            <span className="font-bold text-blue-600 text-[10px] block mb-1">Sarah</span>
            <span className={`${revealRedFlags ? 'bg-amber-100 rounded text-amber-900 font-medium' : ''}`}>
              {" "}Salam sejahtera! Saya Sarah dari agensi pekerjaan Kelly Services. Kami ingin menawarkan jawatan kosong flexi-time untuk anda.{" "}
            </span>
            {renderHotspot('unsolicited_chat', 'Lantikan Rawak')}
          </div>

          {/* Second received message */}
          <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm max-w-[85%] self-start text-xs text-gray-800 leading-relaxed relative">
            Tugasan harian amat senang: Anda 
            <span className={`px-1.5 py-0.5 rounded transition-all ${revealRedFlags ? 'bg-red-100 text-red-800 font-medium' : ''}`}>
              {" "}cuma perlu LIKE video TikTok yang kami berikan. Setiap tugasan selesai dibayar RM20. Boleh jana pendapatan sampingan RM300 - RM600 sehari terus dari rumah!{" "}
            </span>
            Sila daftar profil anda di pautan di bawah.
            {renderHotspot('easy_income', 'Tawaran Gaji Pelik')}

            <div className="mt-3 bg-blue-50 p-2.5 rounded-lg border border-blue-100 flex flex-col gap-1">
              <span className="font-semibold text-blue-800 text-[10px]">Pautan Pendaftaran Rasmi:</span>
              <span className={`font-mono text-[11px] text-blue-600 break-all ${revealRedFlags ? 'bg-red-100 text-red-800 px-1 py-0.5 rounded font-medium' : ''}`}>
                {scenario.mockupUrl}
              </span>
            </div>
            {renderHotspot('fake_recruit_url', 'Laman Tidak Sah')}
            <div className="text-[8px] text-gray-400 text-right mt-1 font-mono">11:11 AM</div>
          </div>
        </div>

        {/* Telegram Input Area */}
        <div className="bg-white p-2.5 flex items-center gap-2 border-t border-gray-100">
          <span className="text-lg cursor-pointer">📎</span>
          <input 
            type="text" 
            disabled 
            placeholder="Mesej ditapis oleh simulator..." 
            className="flex-1 bg-gray-100 rounded-full py-1.5 px-3.5 text-xs text-gray-400 border-none outline-none" 
          />
          <span className="text-lg cursor-pointer">😀</span>
        </div>
      </div>
    );
  };

  // Main switch logic to render the appropriate mockup
  const renderSelectedMockup = () => {
    switch (scenario.type) {
      case 'bank_email':
        return renderBankEmail();
      case 'whatsapp_parcel':
        return renderWhatsAppParcel();
      case 'fake_login':
        return renderFakeLogin();
      case 'qr_warning':
        return renderQRWarning();
      case 'job_scam':
        return renderJobScam();
      default:
        return <div className="p-4 bg-red-100 text-red-700">Jenis senario tidak dikenali.</div>;
    }
  };

  return (
    <div className="w-full relative mockup-shadow select-none transition-transform duration-300">
      {renderSelectedMockup()}

      {/* Red flag popover/explanation if a red flag hotspot is selected */}
      {revealRedFlags && selectedRedFlagId && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 shadow-md animate-fadeIn">
          <div className="h-9 w-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
              <span>{scenario.redFlags.find(f => f.id === selectedRedFlagId)?.label}</span>
              <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-mono uppercase">Red Flag</span>
            </h4>
            <p className="text-xs text-gray-700 font-mono mt-1 bg-white/75 p-1.5 rounded border border-amber-100/50 break-all">
              &quot;{scenario.redFlags.find(f => f.id === selectedRedFlagId)?.targetText}&quot;
            </p>
            <p className="text-xs text-amber-950 mt-2 leading-relaxed">
              {scenario.redFlags.find(f => f.id === selectedRedFlagId)?.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
