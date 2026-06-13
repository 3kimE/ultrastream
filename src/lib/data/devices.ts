export interface Device {
  slug: string;
  name: string;
  description: string;
  icon: string;
  os: string;
  recommendedApp: string;
  appStoreUrl?: string;
  steps: InstallStep[];
  issues: TroubleshootItem[];
  bgColor: string;
}

export interface InstallStep {
  step: number;
  title: string;
  description: string;
}

export interface TroubleshootItem {
  problem: string;
  solution: string;
}

export const DEVICES: Device[] = [
  {
    slug: "fire-tv-stick",
    name: "Fire TV Stick",
    description: "Stream in 4K on your Amazon Fire TV Stick with one tap.",
    icon: "🔥",
    os: "Fire OS",
    recommendedApp: "IPTV Smarters Pro",
    bgColor: "#FF6600",
    steps: [
      { step: 1, title: "Enable Unknown Sources", description: "Go to Settings → My Fire TV → Developer Options → Apps from Unknown Sources → ON." },
      { step: 2, title: "Install Downloader App", description: "Search for 'Downloader' in the Amazon App Store and install it." },
      { step: 3, title: "Download IPTV Smarters", description: "Open Downloader and enter the IPTV Smarters APK URL from our setup guide email." },
      { step: 4, title: "Enter Your Credentials", description: "Open IPTV Smarters → Add User → Enter your M3U URL or Xtream credentials from your welcome email." },
      { step: 5, title: "Start Watching", description: "Your channels will load in under 60 seconds. Enjoy 4K streaming!" },
    ],
    issues: [
      { problem: "Buffering on 4K channels", solution: "Use a wired Ethernet adapter or move closer to your router. Minimum 25 Mbps recommended for 4K." },
      { problem: "App crashes on startup", solution: "Clear app cache: Settings → Applications → IPTV Smarters → Clear Cache → Restart." },
    ],
  },
  {
    slug: "android-tv",
    name: "Android TV",
    description: "Install directly from the Google Play Store on any Android TV.",
    icon: "📺",
    os: "Android TV",
    recommendedApp: "TiviMate",
    bgColor: "#3DDC84",
    steps: [
      { step: 1, title: "Open Google Play Store", description: "On your Android TV home screen, open the Play Store app." },
      { step: 2, title: "Search TiviMate", description: "Search for 'TiviMate IPTV Player' and install." },
      { step: 3, title: "Add Playlist", description: "Open TiviMate → Add Playlist → M3U URL → Paste your M3U URL from the welcome email." },
      { step: 4, title: "Refresh Channels", description: "Wait for channels to load (30-60 seconds depending on connection)." },
      { step: 5, title: "Enjoy", description: "Navigate with your remote. Use the EPG button for the program guide." },
    ],
    issues: [
      { problem: "M3U URL not loading", solution: "Double-check there are no extra spaces in the URL. Try copy-pasting from the email directly." },
      { problem: "No EPG guide showing", solution: "Go to TiviMate Settings → Playlist → Update EPG. Wait 2-3 minutes." },
    ],
  },
  {
    slug: "samsung-tv",
    name: "Samsung Smart TV",
    description: "Native app support on Samsung Tizen OS smart TVs.",
    icon: "🖥️",
    os: "Tizen OS",
    recommendedApp: "Smart IPTV",
    bgColor: "#1428A0",
    steps: [
      { step: 1, title: "Open Smart Hub", description: "Press the Home button and navigate to Apps." },
      { step: 2, title: "Search Smart IPTV", description: "Search for 'Smart IPTV' in the Samsung App Store and install." },
      { step: 3, title: "Note Your MAC Address", description: "Open Smart IPTV — note the MAC address shown on screen." },
      { step: 4, title: "Activate on Website", description: "Visit siptv.eu on your phone/PC → enter your MAC address → add your M3U URL." },
      { step: 5, title: "Restart the App", description: "Close and reopen Smart IPTV on your TV. Channels will load automatically." },
    ],
    issues: [
      { problem: "App not available in my region", solution: "Change your Samsung account region to USA in account settings, then reinstall." },
      { problem: "Black screen on some channels", solution: "The channel may use a codec your TV doesn't support. Try different stream quality settings." },
    ],
  },
  {
    slug: "lg-tv",
    name: "LG Smart TV",
    description: "Full IPTV support on LG webOS smart TVs.",
    icon: "🖥️",
    os: "webOS",
    recommendedApp: "SS IPTV",
    bgColor: "#A50034",
    steps: [
      { step: 1, title: "Open LG Content Store", description: "Press Home → LG Content Store → Apps." },
      { step: 2, title: "Install SS IPTV", description: "Search for 'SS IPTV' and install the free app." },
      { step: 3, title: "Note Your Device ID", description: "Open SS IPTV → note the Device ID displayed." },
      { step: 4, title: "Link Your Playlist", description: "Visit ssiptv.app → My playlists → Add M3U URL with your Device ID." },
      { step: 5, title: "Launch and Watch", description: "Return to SS IPTV on your TV. Your channels will sync automatically." },
    ],
    issues: [
      { problem: "Audio but no video", solution: "Go to SS IPTV Settings → Decoder → Enable Hardware Decoder." },
      { problem: "Channels not updating", solution: "Delete the playlist from ssiptv.app and re-add it, then refresh on TV." },
    ],
  },
  {
    slug: "apple-tv",
    name: "Apple TV",
    description: "Premium 4K streaming on Apple TV 4K and HD.",
    icon: "🍎",
    os: "tvOS",
    recommendedApp: "Infuse 7",
    bgColor: "#555555",
    steps: [
      { step: 1, title: "Open App Store", description: "On your Apple TV, open the App Store." },
      { step: 2, title: "Install GSE Smart IPTV", description: "Search and install 'GSE Smart IPTV' (free version available)." },
      { step: 3, title: "Add Remote Playlist", description: "Open GSE Smart IPTV → Remote Playlists → Add M3U URL." },
      { step: 4, title: "Enter Your URL", description: "Paste your M3U URL from the welcome email and tap Done." },
      { step: 5, title: "Browse and Watch", description: "Tap your playlist to load channels. Use Siri Remote to navigate." },
    ],
    issues: [
      { problem: "App requires purchase", solution: "GSE Smart IPTV has a free tier. Alternatively use Flex IPTV which is fully free." },
      { problem: "Stream won't start", solution: "Check if your M3U URL includes the correct user-agent. Contact support for the tvOS-optimized URL." },
    ],
  },
  {
    slug: "iphone-ipad",
    name: "iPhone & iPad",
    description: "Watch anywhere on iOS and iPadOS with full 4K support.",
    icon: "📱",
    os: "iOS / iPadOS",
    recommendedApp: "IPTV Smarters Pro",
    bgColor: "#007AFF",
    steps: [
      { step: 1, title: "Open App Store", description: "On your iPhone or iPad, open the App Store." },
      { step: 2, title: "Install IPTV Smarters", description: "Search 'IPTV Smarters Pro' and install ($4.99)." },
      { step: 3, title: "Add Account", description: "Open the app → Add User → Choose 'Load your playlist or File/URL'." },
      { step: 4, title: "Enter Credentials", description: "Select Xtream Codes API → Enter your username, password, and server URL from the welcome email." },
      { step: 5, title: "Watch Anywhere", description: "Your full channel list loads instantly. Works on 4G/5G too!" },
    ],
    issues: [
      { problem: "App crashes on launch", solution: "Update to the latest iOS version. Clear app cache in iPhone Settings → IPTV Smarters." },
      { problem: "Buffering on mobile data", solution: "Enable the 'Lower Quality on Mobile Data' setting in app preferences." },
    ],
  },
  {
    slug: "android-phone",
    name: "Android Phone",
    description: "Stream on any Android device — phone or tablet.",
    icon: "📱",
    os: "Android",
    recommendedApp: "IPTV Smarters Pro",
    bgColor: "#3DDC84",
    steps: [
      { step: 1, title: "Open Google Play", description: "Open the Google Play Store on your Android device." },
      { step: 2, title: "Install IPTV Smarters", description: "Search 'IPTV Smarters Pro' and install (free on Android)." },
      { step: 3, title: "Add User", description: "Open the app → Add User → Load playlist or File/URL." },
      { step: 4, title: "Enter M3U URL", description: "Paste your M3U URL from the welcome email." },
      { step: 5, title: "Watch", description: "Channels load in seconds. Use picture-in-picture mode for multitasking." },
    ],
    issues: [
      { problem: "Buffering on Wi-Fi", solution: "In app settings, change stream buffer size to 'Large'. Also check your router's 5GHz band." },
      { problem: "EPG not showing", solution: "In app settings → EPG → select your EPG URL from the welcome email → refresh." },
    ],
  },
  {
    slug: "mag-box",
    name: "MAG Box",
    description: "Plug-and-play IPTV on MAG 250, 254, 256, 322, 351, 424.",
    icon: "📦",
    os: "Linux / Infomir",
    recommendedApp: "Built-in Stalker Portal",
    bgColor: "#666666",
    steps: [
      { step: 1, title: "Connect Your MAG Box", description: "Connect your MAG box to TV via HDMI and to your router via Ethernet." },
      { step: 2, title: "Open System Settings", description: "On the MAG home screen, go to System → Servers → Stalker Portal." },
      { step: 3, title: "Enter Portal URL", description: "Clear Portal 1 field and enter the Portal URL from your welcome email." },
      { step: 4, title: "Restart Device", description: "Go to System → Reboot. The MAG will restart and auto-authenticate." },
      { step: 5, title: "Watch TV", description: "Use the MAG remote to navigate channels, EPG, and VOD." },
    ],
    issues: [
      { problem: "Invalid credentials error", solution: "The portal URL must match your registered MAC address. Contact support with your MAC to re-link." },
      { problem: "No channels showing", solution: "Check Ethernet connection. MAG boxes work best wired. Disable any VPN on your router." },
    ],
  },
  {
    slug: "windows-mac",
    name: "Windows & Mac",
    description: "Full IPTV experience on your PC or Mac laptop.",
    icon: "💻",
    os: "Windows / macOS",
    recommendedApp: "VLC Media Player",
    bgColor: "#0078D4",
    steps: [
      { step: 1, title: "Download VLC", description: "Download VLC Media Player from videolan.org (free, open source)." },
      { step: 2, title: "Open Network Stream", description: "In VLC: Media → Open Network Stream (Ctrl+N on Windows, Cmd+N on Mac)." },
      { step: 3, title: "Paste M3U URL", description: "Paste your M3U URL from the welcome email into the URL field." },
      { step: 4, title: "Click Play", description: "Click Play. VLC will load your full channel playlist." },
      { step: 5, title: "Browse Channels", description: "Use View → Playlist to see all channels. Double-click any to watch." },
    ],
    issues: [
      { problem: "VLC shows blank screen", solution: "Try Tools → Preferences → Video → Output → change from Auto to DirectX (Windows) or OpenGL (Mac)." },
      { problem: "Audio/video out of sync", solution: "Press G/H in VLC to adjust audio delay. Usually fixed by pressing J to reset." },
    ],
  },
];
