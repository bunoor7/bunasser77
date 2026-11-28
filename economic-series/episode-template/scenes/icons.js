// أيقونات السلسلة الاقتصادية: خطوط ذهبية بالكود (viewBox 0 0 100 100)، تُلوَّن بـcurrentColor
const S = (body, extra = '') => (size, color = '#D9A441', sw = 4.5) =>
  `<svg viewBox="0 0 100 100" width="${size}" height="${size}" style="color:${color};overflow:visible" ${extra}><g fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;

module.exports = {
  // سيارة سيدان جانبية
  car: S(`<path d="M6 66 L6 56 Q6 50 12 49 L26 46 L37 33 Q40 29 46 29 L64 29 Q69 29 72 33 L82 45 L91 47 Q95 48 95 54 L95 66 Z"/>
    <path d="M40 45 L46 35 L56 35 L56 45 Z"/><path d="M61 45 L61 35 L66 35 Q68 35 70 38 L75 45 Z"/><path d="M58 50 L58 64"/>
    <circle cx="27" cy="67" r="10" fill="#0F1B2D"/><circle cx="27" cy="67" r="3" fill="currentColor"/><circle cx="75" cy="67" r="10" fill="#0F1B2D"/><circle cx="75" cy="67" r="3" fill="currentColor"/>
    <path d="M88 52 L93 52"/>`),
  wrench: S(`<path d="M62 18 a14 14 0 1 0 18 18 l-8 -2 l-4 -4 l-2 -8 z" /><path d="M66 34 L28 72 a6 6 0 0 1 -8 -8 L58 26"/>`),
  phone: S(`<rect x="30" y="10" width="40" height="80" rx="8"/><path d="M44 18 L56 18"/><circle cx="50" cy="80" r="3" fill="currentColor"/>
    <path d="M40 40 q10 -10 20 0 M44 46 q6 -6 12 0"/><circle cx="50" cy="52" r="2" fill="currentColor"/>`),
  bill: S(`<path d="M24 8 L76 8 L76 92 L68 86 L60 92 L52 86 L44 92 L36 86 L24 92 Z"/><path d="M34 26 L66 26 M34 38 L66 38 M34 50 L56 50"/><path d="M34 70 L66 70"/>`),
  check: S(`<circle cx="50" cy="50" r="40"/><path d="M32 52 L45 65 L70 38"/>`),
  cross: S(`<circle cx="50" cy="50" r="40"/><path d="M35 35 L65 65 M65 35 L35 65"/>`),
  person: S(`<circle cx="50" cy="30" r="14"/><path d="M22 90 Q22 56 50 56 Q78 56 78 90"/>`),
  factory: S(`<path d="M10 88 L10 46 L32 58 L32 46 L54 58 L54 46 L76 58 L76 20 L90 20 L90 88 Z"/><path d="M22 74 L30 74 M44 74 L52 74 M66 74 L74 74"/>`),
  bank: S(`<path d="M10 36 L50 12 L90 36 Z"/><path d="M18 42 L18 78 M38 42 L38 78 M62 42 L62 78 M82 42 L82 78"/><path d="M10 86 L90 86"/>`),
  school: S(`<path d="M12 44 L50 22 L88 44"/><rect x="20" y="44" width="60" height="44"/><rect x="42" y="64" width="16" height="24"/><path d="M50 22 L50 8 L64 12 L50 16"/>`),
  house: S(`<path d="M12 50 L50 16 L88 50"/><path d="M22 42 L22 88 L78 88 L78 42"/><rect x="42" y="62" width="16" height="26"/>`),
  road: S(`<path d="M34 92 L44 8 M66 92 L56 8"/><path d="M50 84 L50 72 M50 58 L50 46 M50 32 L50 22" stroke-dasharray="0"/>`),
  clock: S(`<circle cx="50" cy="50" r="38"/><path d="M50 26 L50 50 L66 60"/>`),
  land: S(`<path d="M8 70 L36 40 L54 58 L66 46 L92 70 Z"/><path d="M8 82 L92 82"/><circle cx="72" cy="24" r="8"/>`),
  materials: S(`<rect x="12" y="56" width="34" height="30"/><rect x="54" y="56" width="34" height="30"/><rect x="33" y="22" width="34" height="30"/>`),
  coins: S(`<ellipse cx="50" cy="28" rx="30" ry="10"/><path d="M20 28 L20 44 Q50 60 80 44 L80 28"/><path d="M20 44 L20 60 Q50 76 80 60 L80 44"/><path d="M20 60 L20 76 Q50 92 80 76 L80 60"/>`),
  market: S(`<path d="M12 40 L20 14 L80 14 L88 40 Z"/><path d="M12 40 q9.5 12 19 0 q9.5 12 19 0 q9.5 12 19 0 q9.5 12 19 0"/><path d="M18 46 L18 88 L82 88 L82 46"/><rect x="40" y="62" width="20" height="26"/>`),
  state: S(`<path d="M50 8 L50 22"/><path d="M30 34 Q50 18 70 34"/><rect x="24" y="34" width="52" height="8"/><path d="M30 42 L30 80 M43 42 L43 80 M57 42 L57 80 M70 42 L70 80"/><path d="M16 88 L84 88 M20 80 L80 80"/>`),
  scale: S(`<path d="M50 14 L50 88 M30 88 L70 88"/><path d="M14 30 L86 30"/><path d="M14 30 L4 58 L24 58 Z M86 30 L76 58 L96 58 Z"/><circle cx="50" cy="14" r="4" fill="currentColor"/>`),
  workers: S(`<circle cx="32" cy="34" r="10"/><circle cx="68" cy="34" r="10"/><path d="M14 84 Q14 54 32 54 Q50 54 50 84 M50 84 Q50 54 68 54 Q86 54 86 84"/><path d="M22 30 Q32 18 42 30 M58 30 Q68 18 78 30"/>`),
  gear: S(`<circle cx="50" cy="50" r="14"/><path d="M50 12 L50 24 M50 76 L50 88 M12 50 L24 50 M76 50 L88 50 M23 23 L32 32 M68 68 L77 77 M77 23 L68 32 M32 68 L23 77"/><circle cx="50" cy="50" r="30"/>`),
  office: S(`<rect x="22" y="12" width="56" height="78"/><path d="M34 26 L44 26 M56 26 L66 26 M34 42 L44 42 M56 42 L66 42 M34 58 L44 58 M56 58 L66 58"/><rect x="42" y="72" width="16" height="18"/>`),
  bag: S(`<rect x="14" y="32" width="72" height="54" rx="6"/><path d="M36 32 L36 20 Q36 14 42 14 L58 14 Q64 14 64 20 L64 32"/><path d="M14 54 L86 54"/>`),
  signal: S(`<path d="M20 80 L20 70 M38 80 L38 58 M56 80 L56 44 M74 80 L74 28"/>`),
};
