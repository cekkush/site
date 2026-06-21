/**
 * Ambient, slowly drifting light behind the whole page — the "breathing"
 * sunrise glow. Sits below content (sections are mostly transparent).
 */
export function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute -left-[15%] top-[6%] h-[42rem] w-[42rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(246,160,74,0.10),transparent_60%)] blur-3xl" />
      <div
        className="absolute -right-[12%] top-[34%] h-[36rem] w-[36rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(255,125,85,0.09),transparent_60%)] blur-3xl"
        style={{animationDelay: '-5s'}}
      />
      <div
        className="absolute -bottom-[12%] left-[28%] h-[40rem] w-[40rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(120,96,240,0.06),transparent_60%)] blur-3xl"
        style={{animationDelay: '-9s'}}
      />
    </div>
  );
}
