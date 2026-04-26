export const overlaySurface = {
  root:
    "fixed inset-0 z-[80] flex items-center justify-center p-2 md:p-4",
  backdrop:
    "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
  glow:
    "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00f0ff] via-[#0080ff] to-[#00f0ff] p-[1px] opacity-70 animate-pulse-glow",
  panel:
    "relative overflow-hidden rounded-2xl border border-[#00f0ff]/20 bg-black/85 text-white shadow-2xl backdrop-blur-md",
  header:
    "flex items-center justify-between border-b border-[#00f0ff]/20 bg-gradient-to-r from-[#00f0ff]/10 via-transparent to-[#00f0ff]/10",
  section:
    "rounded-lg border border-[#00f0ff]/20 bg-black/40 backdrop-blur-sm",
  mediaFrame:
    "rounded-lg border border-[#00f0ff]/10 bg-black/80 shadow-md",
  closeButton:
    "border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-300",
};

export const chatbotSurface = {
  trigger:
    "h-14 w-14 rounded-full border border-[#00f0ff]/30 bg-neon-blue text-black shadow-lg shadow-[#00f0ff]/20 transition-all duration-300 hover:scale-105 hover:bg-electric-green hover:shadow-neon-blue/40",
  panel:
    "flex h-[500px] w-80 flex-col overflow-hidden rounded-2xl border border-[#00f0ff]/20 bg-black/85 text-white shadow-2xl shadow-[#00f0ff]/10 backdrop-blur-md md:w-96",
  header:
    "flex h-14 items-center justify-between border-b border-[#00f0ff]/20 bg-gradient-to-r from-[#00f0ff]/10 via-transparent to-[#00f0ff]/10 px-4",
  botAvatar:
    "flex h-8 w-8 items-center justify-center rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/15 text-neon-blue",
  userAvatar:
    "flex h-8 w-8 items-center justify-center rounded-full border border-[#00f0ff]/30 bg-neon-blue/20 text-neon-blue",
  botBubble:
    "inline-block rounded-lg border border-[#00f0ff]/20 bg-black/40 px-4 py-2 text-gray-200",
  userBubble:
    "inline-block rounded-lg border border-[#00f0ff]/25 bg-black/70 px-4 py-2 text-white",
  input:
    "flex-1 rounded-lg border border-[#00f0ff]/20 bg-black/60 px-4 py-2 text-sm text-white placeholder-gray-400 transition-colors focus:border-neon-blue focus:outline-none",
  iconButton:
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] p-0 text-white/70 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40",
};