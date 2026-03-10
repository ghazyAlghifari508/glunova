import { Mail, Phone, MapPin, Activity, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden w-full m-0 p-0">
      {/* Wave separator */}
      <div className="w-full leading-none flex -mb-[1px]" style={{ background: 'var(--white)' }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="var(--primary-900)" />
        </svg>
      </div>

      <div style={{ background: 'var(--primary-900)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-heading font-bold text-white">
                  Glunova
                </span>
              </div>
              <p className="text-sm text-white/50 mb-6 max-w-xs leading-relaxed">
                Generasi Sadar Diabetes — Platform digital untuk manajemen diabetes dengan AI, edukasi interaktif, dan konsultasi dokter.
              </p>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5 text-white/50">
                  <Mail className="w-4 h-4" /> info@glunova.id
                </div>
                <div className="flex items-center gap-2.5 text-white/50">
                  <Phone className="w-4 h-4" /> +62 21 1234 5678
                </div>
                <div className="flex items-center gap-2.5 text-white/50">
                  <MapPin className="w-4 h-4" /> Jakarta, Indonesia
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-heading font-bold text-white mb-4 text-sm">Perusahaan</h4>
              <ul className="space-y-2.5">
                {["Tentang Kami", "Karir", "Blog", "Kontak"].map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading font-bold text-white mb-4 text-sm">Layanan</h4>
              <ul className="space-y-2.5">
                {["Konsultasi Dokter", "Pemantauan Gula Darah", "Vision AI", "Edukasi Diabetes", "Roadmap Kesehatan"].map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-heading font-bold text-white mb-4 text-sm">Berlangganan</h4>
              <p className="text-sm text-white/50 mb-4">Dapatkan tips kesehatan diabetes terbaru langsung di email Anda.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-2.5 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                <button
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors flex-shrink-0"
                  style={{ background: 'var(--primary-700)' }}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-white/30 gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span>© 2026 Glunova — Generasi Sadar Diabetes. Hak cipta dilindungi.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/60 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-white/60 transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
