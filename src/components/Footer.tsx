export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-2xl tracking-widest text-foreground">
          MUTANT<span className="text-primary">.</span>
        </div>
        <p className="text-muted-foreground text-xs font-body">
          © 2026 Mutant Vehicles. A new species of machine.
        </p>
      </div>
      <a
        href="https://adfluence.org"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 pb-6 flex items-center justify-center gap-2 text-muted-foreground/50 text-xs font-body tracking-widest hover:text-muted-foreground/70 transition-colors"
      >
        <span>MADE WITH</span>
        <span className="font-semibold text-muted-foreground/70">adfluence.org</span>
      </a>
    </footer>
  );
}
