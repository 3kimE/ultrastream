export interface Testimonial {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  avatar: string;
  rating: number;
  plan: string;
  quote: string;
  isVideo?: boolean;
  verifiedBuyer?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "James Mitchell",
    country: "United States",
    countryCode: "us",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    plan: "12 Month Plan",
    verifiedBuyer: true,
    quote: "Switched from cable 8 months ago and haven't looked back. The 4K quality on sports channels is insane — Premier League in crystal clear 4K for a fraction of what Sky charged me.",
  },
  {
    id: "2",
    name: "Sophie Leclerc",
    country: "France",
    countryCode: "fr",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    plan: "6 Month Plan",
    verifiedBuyer: true,
    quote: "J'utilise ce service depuis 6 mois. Les chaînes françaises et internationales sont toutes là, la qualité est parfaite et le support répond en quelques minutes sur WhatsApp.",
  },
  {
    id: "3",
    name: "Carlos Rivera",
    country: "Spain",
    countryCode: "es",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    plan: "12 Month Plan",
    verifiedBuyer: true,
    quote: "Todo LaLiga, Champions League, y todos los canales españoles. Activación instantánea y soporte excelente. Sin duda el mejor servicio IPTV que he probado.",
  },
  {
    id: "4",
    name: "Amira Hassan",
    country: "UAE",
    countryCode: "ae",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    rating: 5,
    plan: "6 Month Plan",
    verifiedBuyer: true,
    quote: "Arabic channels, beIN Sports, and even kids channels for my children — all in one subscription. The setup on my Samsung TV took literally 5 minutes.",
  },
  {
    id: "5",
    name: "Tom Hendriks",
    country: "Netherlands",
    countryCode: "nl",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 4,
    plan: "3 Month Plan",
    verifiedBuyer: true,
    isVideo: true,
    quote: "I was skeptical at first, but the 24-hour trial convinced me. No buffering on F1 races, which was my #1 requirement. Renewed to the annual plan immediately.",
  },
  {
    id: "6",
    name: "Priya Sharma",
    country: "United Kingdom",
    countryCode: "gb",
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    rating: 5,
    plan: "24 Month Plan",
    verifiedBuyer: true,
    quote: "Indian channels, Bollywood movies, plus all UK channels. My family can watch what they want without fighting over the remote. Absolutely worth every penny.",
  },
];
