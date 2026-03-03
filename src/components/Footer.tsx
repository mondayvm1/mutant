export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <img
          src="/images/mutant-logo.png"
          alt="MUTANT"
          className="h-10 w-auto object-contain"
          style={{ filter: "invert(1) drop-shadow(0 0 6px hsl(82,85%,50%/0.45))" }}
        />
        <p className="text-muted-foreground text-xs font-body">
          © {new Date().getFullYear()} Mutant Vehicles. A new species of machine.
        </p>
      </div>
      <a
        href="https://adfluence.org"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          window.open("https://adfluence.org", "_blank", "noopener,noreferrer");
        }}
        className="mt-8 pb-6 flex items-center justify-center gap-2 text-muted-foreground/50 text-xs font-body tracking-widest hover:text-muted-foreground/70 transition-colors cursor-pointer"
      >
        <span>MADE WITH</span>
        <span className="font-semibold text-muted-foreground/70">adfluence.org</span>
      </a>
    </footer>
  );
}
