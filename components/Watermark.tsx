export default function Watermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
    >
      {/* diagonal repeating watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: 'rotate(-35deg)' }}
      >
        <div className="flex flex-col gap-24 opacity-[0.07]">
          {Array.from({ length: 12 }).map((_, row) => (
            <div key={row} className="flex gap-32 whitespace-nowrap">
              {Array.from({ length: 8 }).map((_, col) => (
                <span
                  key={col}
                  className="text-sm font-bold tracking-widest uppercase text-gray-900"
                >
                  PROTOTYPE · PROTOFORGE.APP
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
