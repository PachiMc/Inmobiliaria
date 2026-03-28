export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-black/10 bg-white text-black shadow-lg">
        {children}
      </div>
    </section>
  );
}
