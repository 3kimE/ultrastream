export interface Channel {
  id: string;
  name: string;
  category: ChannelCategory;
  country: string;
  countryCode: string;
  is4K?: boolean;
  isPremium?: boolean;
  isLive?: boolean;
  logoColor: string;
  logoInitials: string;
}

export type ChannelCategory =
  | "Sports"
  | "Movies"
  | "News"
  | "Kids"
  | "Music"
  | "Documentary"
  | "International"
  | "Premium"
  | "Entertainment";

export const CHANNEL_CATEGORIES: { name: ChannelCategory; count: number }[] = [
  { name: "Sports", count: 15420 },
  { name: "Movies", count: 8300 },
  { name: "News", count: 4200 },
  { name: "Kids", count: 2100 },
  { name: "Music", count: 1800 },
  { name: "Documentary", count: 3200 },
  { name: "International", count: 45000 },
  { name: "Premium", count: 12000 },
  { name: "Entertainment", count: 17980 },
];

export const CHANNELS: Channel[] = [
  // Sports
  { id: "espn", name: "ESPN", category: "Sports", country: "USA", countryCode: "us", isLive: true, logoColor: "#CC0000", logoInitials: "ES" },
  { id: "espn2", name: "ESPN 2", category: "Sports", country: "USA", countryCode: "us", isLive: true, logoColor: "#CC0000", logoInitials: "E2" },
  { id: "sky-sports", name: "Sky Sports", category: "Sports", country: "UK", countryCode: "gb", isLive: true, logoColor: "#0072C6", logoInitials: "SS" },
  { id: "bein-sports", name: "beIN Sports", category: "Sports", country: "Qatar", countryCode: "qa", isLive: true, logoColor: "#8B0000", logoInitials: "BS" },
  { id: "nba-tv", name: "NBA TV", category: "Sports", country: "USA", countryCode: "us", isLive: true, logoColor: "#1D428A", logoInitials: "NB" },
  { id: "nfl-network", name: "NFL Network", category: "Sports", country: "USA", countryCode: "us", isLive: true, logoColor: "#013369", logoInitials: "NF" },
  { id: "fox-sports", name: "Fox Sports", category: "Sports", country: "USA", countryCode: "us", logoColor: "#003366", logoInitials: "FS" },
  { id: "bt-sport", name: "BT Sport", category: "Sports", country: "UK", countryCode: "gb", logoColor: "#5A0096", logoInitials: "BT" },
  { id: "canal-sport", name: "Canal+ Sport", category: "Sports", country: "France", countryCode: "fr", logoColor: "#000000", logoInitials: "CS" },
  { id: "dazn", name: "DAZN", category: "Sports", country: "Global", countryCode: "us", is4K: true, logoColor: "#F5FF00", logoInitials: "DA" },
  { id: "eurosport", name: "Eurosport", category: "Sports", country: "Europe", countryCode: "eu", isLive: true, logoColor: "#003580", logoInitials: "EU" },
  { id: "tnt-sports", name: "TNT Sports", category: "Sports", country: "UK", countryCode: "gb", isLive: true, logoColor: "#FF6600", logoInitials: "TN" },
  { id: "premier-league", name: "Premier League TV", category: "Sports", country: "UK", countryCode: "gb", logoColor: "#3D0072", logoInitials: "PL" },
  { id: "la-liga-tv", name: "LaLiga TV", category: "Sports", country: "Spain", countryCode: "es", logoColor: "#FF5500", logoInitials: "LL" },
  { id: "serie-a-tv", name: "Serie A TV", category: "Sports", country: "Italy", countryCode: "it", logoColor: "#1B5FA8", logoInitials: "SA" },
  // Premium / Entertainment
  { id: "hbo", name: "HBO", category: "Premium", country: "USA", countryCode: "us", isPremium: true, logoColor: "#000000", logoInitials: "HB" },
  { id: "showtime", name: "Showtime", category: "Premium", country: "USA", countryCode: "us", isPremium: true, logoColor: "#CC0000", logoInitials: "SH" },
  { id: "starz", name: "Starz", category: "Premium", country: "USA", countryCode: "us", isPremium: true, logoColor: "#000080", logoInitials: "ST" },
  { id: "cinemax", name: "Cinemax", category: "Premium", country: "USA", countryCode: "us", isPremium: true, logoColor: "#000000", logoInitials: "CM" },
  { id: "sky-cinema", name: "Sky Cinema", category: "Premium", country: "UK", countryCode: "gb", is4K: true, logoColor: "#0072C6", logoInitials: "SC" },
  { id: "amc", name: "AMC", category: "Entertainment", country: "USA", countryCode: "us", logoColor: "#C8102E", logoInitials: "AM" },
  { id: "fx", name: "FX", category: "Entertainment", country: "USA", countryCode: "us", logoColor: "#000000", logoInitials: "FX" },
  { id: "usa-network", name: "USA Network", category: "Entertainment", country: "USA", countryCode: "us", logoColor: "#0033A0", logoInitials: "US" },
  { id: "syfy", name: "SYFY", category: "Entertainment", country: "USA", countryCode: "us", logoColor: "#FFCC00", logoInitials: "SY" },
  { id: "bravo", name: "Bravo", category: "Entertainment", country: "USA", countryCode: "us", logoColor: "#000000", logoInitials: "BR" },
  // News
  { id: "cnn", name: "CNN", category: "News", country: "USA", countryCode: "us", isLive: true, logoColor: "#CC0000", logoInitials: "CN" },
  { id: "bbc-news", name: "BBC News", category: "News", country: "UK", countryCode: "gb", isLive: true, logoColor: "#BB1919", logoInitials: "BB" },
  { id: "al-jazeera", name: "Al Jazeera", category: "News", country: "Qatar", countryCode: "qa", isLive: true, logoColor: "#0054A6", logoInitials: "AJ" },
  { id: "fox-news", name: "Fox News", category: "News", country: "USA", countryCode: "us", isLive: true, logoColor: "#003366", logoInitials: "FN" },
  { id: "msnbc", name: "MSNBC", category: "News", country: "USA", countryCode: "us", isLive: true, logoColor: "#FF6600", logoInitials: "MS" },
  { id: "sky-news", name: "Sky News", category: "News", country: "UK", countryCode: "gb", isLive: true, logoColor: "#003580", logoInitials: "SN" },
  { id: "france-24", name: "France 24", category: "News", country: "France", countryCode: "fr", isLive: true, logoColor: "#003399", logoInitials: "F2" },
  { id: "dw-news", name: "DW News", category: "News", country: "Germany", countryCode: "de", isLive: true, logoColor: "#CC0000", logoInitials: "DW" },
  { id: "rt-news", name: "RT", category: "News", country: "Global", countryCode: "us", isLive: true, logoColor: "#CC0000", logoInitials: "RT" },
  { id: "euronews", name: "Euronews", category: "News", country: "Europe", countryCode: "eu", isLive: true, logoColor: "#003580", logoInitials: "EN" },
  // Kids
  { id: "disney-jr", name: "Disney Junior", category: "Kids", country: "USA", countryCode: "us", logoColor: "#003087", logoInitials: "DJ" },
  { id: "nickelodeon", name: "Nickelodeon", category: "Kids", country: "USA", countryCode: "us", logoColor: "#FF8C00", logoInitials: "NK" },
  { id: "cartoon-network", name: "Cartoon Network", category: "Kids", country: "USA", countryCode: "us", isLive: true, logoColor: "#FFCC00", logoInitials: "CN" },
  { id: "boomerang", name: "Boomerang", category: "Kids", country: "USA", countryCode: "us", logoColor: "#00AEEF", logoInitials: "BM" },
  { id: "baby-tv", name: "Baby TV", category: "Kids", country: "UK", countryCode: "gb", logoColor: "#FF6699", logoInitials: "BT" },
  { id: "pbs-kids", name: "PBS Kids", category: "Kids", country: "USA", countryCode: "us", logoColor: "#003380", logoInitials: "PK" },
  { id: "nick-jr", name: "Nick Jr.", category: "Kids", country: "USA", countryCode: "us", logoColor: "#FF8C00", logoInitials: "NJ" },
  // Movies
  { id: "tcm", name: "TCM", category: "Movies", country: "USA", countryCode: "us", logoColor: "#CC0000", logoInitials: "TC" },
  { id: "ifc", name: "IFC", category: "Movies", country: "USA", countryCode: "us", logoColor: "#000000", logoInitials: "IF" },
  { id: "sundance", name: "Sundance TV", category: "Movies", country: "USA", countryCode: "us", logoColor: "#FF6600", logoInitials: "SD" },
  { id: "channel4", name: "Film4", category: "Movies", country: "UK", countryCode: "gb", logoColor: "#8B008B", logoInitials: "F4" },
  // Music
  { id: "mtv", name: "MTV", category: "Music", country: "USA", countryCode: "us", isLive: true, logoColor: "#000000", logoInitials: "MT" },
  { id: "vh1", name: "VH1", category: "Music", country: "USA", countryCode: "us", logoColor: "#9B0076", logoInitials: "VH" },
  { id: "bet", name: "BET", category: "Music", country: "USA", countryCode: "us", logoColor: "#000000", logoInitials: "BE" },
  { id: "music-choice", name: "Music Choice", category: "Music", country: "USA", countryCode: "us", logoColor: "#660099", logoInitials: "MC" },
  // Documentary
  { id: "nat-geo", name: "Nat Geo", category: "Documentary", country: "USA", countryCode: "us", is4K: true, logoColor: "#FFCC00", logoInitials: "NG" },
  { id: "discovery", name: "Discovery", category: "Documentary", country: "USA", countryCode: "us", is4K: true, logoColor: "#00A8E0", logoInitials: "DC" },
  { id: "history", name: "History", category: "Documentary", country: "USA", countryCode: "us", logoColor: "#000080", logoInitials: "HI" },
  { id: "animal-planet", name: "Animal Planet", category: "Documentary", country: "USA", countryCode: "us", logoColor: "#009900", logoInitials: "AP" },
  { id: "tlc", name: "TLC", category: "Documentary", country: "USA", countryCode: "us", logoColor: "#0066CC", logoInitials: "TL" },
  // International
  { id: "rai-uno", name: "RAI Uno", category: "International", country: "Italy", countryCode: "it", isLive: true, logoColor: "#0033CC", logoInitials: "RU" },
  { id: "tve", name: "TVE Internacional", category: "International", country: "Spain", countryCode: "es", isLive: true, logoColor: "#CC0000", logoInitials: "TV" },
  { id: "tf1", name: "TF1", category: "International", country: "France", countryCode: "fr", isLive: true, logoColor: "#003399", logoInitials: "TF" },
  { id: "ard", name: "ARD", category: "International", country: "Germany", countryCode: "de", isLive: true, logoColor: "#003399", logoInitials: "AR" },
  { id: "zdf", name: "ZDF", category: "International", country: "Germany", countryCode: "de", logoColor: "#003399", logoInitials: "ZD" },
  { id: "rtp", name: "RTP Internacional", category: "International", country: "Portugal", countryCode: "pt", logoColor: "#00FF00", logoInitials: "RT" },
  { id: "globo", name: "Globo", category: "International", country: "Brazil", countryCode: "br", isLive: true, logoColor: "#FF8C00", logoInitials: "GL" },
  { id: "telemundo", name: "Telemundo", category: "International", country: "USA/LATAM", countryCode: "us", logoColor: "#CC0000", logoInitials: "TM" },
  { id: "univision", name: "Univision", category: "International", country: "USA/LATAM", countryCode: "us", isLive: true, logoColor: "#003399", logoInitials: "UV" },
  { id: "mbc", name: "MBC", category: "International", country: "Saudi Arabia", countryCode: "sa", isLive: true, logoColor: "#000000", logoInitials: "MB" },
  { id: "nbc", name: "NBC", category: "Entertainment", country: "USA", countryCode: "us", isLive: true, logoColor: "#FF0000", logoInitials: "NB" },
  { id: "abc", name: "ABC", category: "Entertainment", country: "USA", countryCode: "us", isLive: true, logoColor: "#000080", logoInitials: "AB" },
  { id: "cbs", name: "CBS", category: "Entertainment", country: "USA", countryCode: "us", isLive: true, logoColor: "#0033CC", logoInitials: "CB" },
  { id: "nbc-sports", name: "NBC Sports", category: "Sports", country: "USA", countryCode: "us", logoColor: "#CC0000", logoInitials: "NS" },
  { id: "food-network", name: "Food Network", category: "Entertainment", country: "USA", countryCode: "us", logoColor: "#FF6600", logoInitials: "FD" },
  { id: "hgtv", name: "HGTV", category: "Entertainment", country: "USA", countryCode: "us", logoColor: "#00AA00", logoInitials: "HG" },
  { id: "travel-channel", name: "Travel Channel", category: "Documentary", country: "USA", countryCode: "us", logoColor: "#006633", logoInitials: "TC" },
  { id: "comedy-central", name: "Comedy Central", category: "Entertainment", country: "USA", countryCode: "us", logoColor: "#FFCC00", logoInitials: "CC" },
  { id: "tbs", name: "TBS", category: "Entertainment", country: "USA", countryCode: "us", logoColor: "#003380", logoInitials: "TB" },
  { id: "tnt", name: "TNT", category: "Entertainment", country: "USA", countryCode: "us", logoColor: "#CC0000", logoInitials: "TT" },
  // 4K channels
  { id: "uhd1", name: "UHD1 4K", category: "Entertainment", country: "Germany", countryCode: "de", is4K: true, logoColor: "#003399", logoInitials: "U1" },
  { id: "bbc-earth", name: "BBC Earth 4K", category: "Documentary", country: "UK", countryCode: "gb", is4K: true, logoColor: "#BB1919", logoInitials: "BE" },
  { id: "discovery-4k", name: "Discovery 4K", category: "Documentary", country: "USA", countryCode: "us", is4K: true, logoColor: "#00A8E0", logoInitials: "D4" },
  { id: "sports-4k", name: "Sports 4K", category: "Sports", country: "Global", countryCode: "us", is4K: true, isLive: true, logoColor: "#00CC44", logoInitials: "S4" },
  { id: "cinema-4k", name: "Cinema 4K", category: "Movies", country: "Global", countryCode: "us", is4K: true, logoColor: "#660099", logoInitials: "C4" },
  // More international
  { id: "tv5monde", name: "TV5 Monde", category: "International", country: "France", countryCode: "fr", logoColor: "#003399", logoInitials: "T5" },
  { id: "nhk-world", name: "NHK World", category: "International", country: "Japan", countryCode: "jp", logoColor: "#CC0000", logoInitials: "NW" },
  { id: "cctv4", name: "CCTV-4", category: "International", country: "China", countryCode: "cn", logoColor: "#CC0000", logoInitials: "CT" },
  { id: "zee-tv", name: "Zee TV", category: "International", country: "India", countryCode: "in", logoColor: "#FF6600", logoInitials: "ZT" },
  { id: "star-plus", name: "Star Plus", category: "International", country: "India", countryCode: "in", logoColor: "#CC0000", logoInitials: "SP" },
  { id: "colors-tv", name: "Colors TV", category: "International", country: "India", countryCode: "in", logoColor: "#FF00FF", logoInitials: "CT" },
  { id: "mnet", name: "M-Net", category: "International", country: "South Africa", countryCode: "za", logoColor: "#009900", logoInitials: "MN" },
  { id: "supersport", name: "SuperSport", category: "Sports", country: "South Africa", countryCode: "za", isLive: true, logoColor: "#006633", logoInitials: "SS" },
  { id: "canal-plus", name: "Canal+", category: "Premium", country: "France", countryCode: "fr", is4K: true, logoColor: "#000000", logoInitials: "C+" },
  { id: "premier-sports", name: "Premier Sports", category: "Sports", country: "Ireland", countryCode: "ie", isLive: true, logoColor: "#CC0000", logoInitials: "PS" },
  { id: "setanta", name: "Setanta Sports", category: "Sports", country: "Ireland", countryCode: "ie", logoColor: "#003399", logoInitials: "SE" },
  { id: "willow-tv", name: "Willow TV", category: "Sports", country: "USA", countryCode: "us", logoColor: "#006633", logoInitials: "WL" },
  { id: "star-sports", name: "Star Sports", category: "Sports", country: "India", countryCode: "in", isLive: true, logoColor: "#CC0000", logoInitials: "ST" },
  { id: "sony-sports", name: "Sony Sports", category: "Sports", country: "India", countryCode: "in", logoColor: "#003399", logoInitials: "SO" },
  { id: "bbc-one", name: "BBC One", category: "Entertainment", country: "UK", countryCode: "gb", isLive: true, logoColor: "#BB1919", logoInitials: "B1" },
  { id: "itv", name: "ITV", category: "Entertainment", country: "UK", countryCode: "gb", isLive: true, logoColor: "#003399", logoInitials: "IT" },
  { id: "channel-4", name: "Channel 4", category: "Entertainment", country: "UK", countryCode: "gb", isLive: true, logoColor: "#8B008B", logoInitials: "C4" },
  { id: "five", name: "Channel 5", category: "Entertainment", country: "UK", countryCode: "gb", logoColor: "#003399", logoInitials: "C5" },
  { id: "atv", name: "ATV", category: "International", country: "Turkey", countryCode: "tr", logoColor: "#CC0000", logoInitials: "AT" },
  { id: "trt-world", name: "TRT World", category: "News", country: "Turkey", countryCode: "tr", isLive: true, logoColor: "#CC0000", logoInitials: "TW" },
  { id: "beinsports2", name: "beIN Sports 2", category: "Sports", country: "Qatar", countryCode: "qa", isLive: true, logoColor: "#8B0000", logoInitials: "B2" },
  { id: "ssc", name: "SSC Sports", category: "Sports", country: "Saudi Arabia", countryCode: "sa", isLive: true, logoColor: "#006600", logoInitials: "SC" },
  { id: "dmc", name: "DMC", category: "Entertainment", country: "Egypt", countryCode: "eg", logoColor: "#CC6600", logoInitials: "DM" },
];

export const CHANNEL_LOGOS_MARQUEE = [
  "ESPN", "HBO", "Sky Sports", "beIN", "NBA TV", "Fox Sports",
  "CNN", "BBC News", "Al Jazeera", "Discovery", "Nat Geo",
  "MTV", "Disney Jr", "Nickelodeon", "Cartoon Network",
  "NBC", "ABC", "CBS", "TBS", "TNT", "AMC", "FX",
  "Canal+", "TF1", "RAI", "ARD", "Globo", "Zee TV",
  "Star Sports", "BT Sport", "Eurosport", "SuperSport",
  "History", "Animal Planet", "Food Network", "HGTV",
];
