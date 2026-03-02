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
      <div className="mt-8 pb-6 flex items-center justify-center gap-2 text-muted-foreground/50 text-xs font-body tracking-widest">
        <span>MADE WITH</span>
        <a
          href="https://adfluence.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/70 font-semibold hover:text-muted-foreground transition-colors"
        >
          adfluence.org
        </a>
      </div>
    </footer>
  );
}
