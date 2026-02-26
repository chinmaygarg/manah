export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-manah-navy">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-manah-gold/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-manah-gold animate-spin" />
        </div>
        <p className="text-manah-gray-400 text-body-sm font-medium tracking-wider uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
}
