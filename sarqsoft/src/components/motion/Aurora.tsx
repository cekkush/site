/**
 * Ambient, slowly drifting light behind the whole page. Kept light on the GPU:
 * two isolated, layer-promoted blobs (no backdrop work, moderate blur).
 */
export function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute -left-[15%] top-[6%] h-[38rem] w-[38rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(246,160,74,0.09),transparent_62%)] blur-2xl [will-change:transform,opacity]"
      />
      <div
        className="absolute -right-[12%] top-[42%] h-[34rem] w-[34rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(255,125,85,0.075),transparent_62%)] blur-2xl [will-change:transform,opacity]"
        style={{animationDelay: '-6s'}}
      />
    </div>
  );
}
