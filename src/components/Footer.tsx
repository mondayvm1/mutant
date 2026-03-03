export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <img
          src="/images/mutant-logo.png"
          alt="MUTANT"
          className="h-14 w-auto object-contain"
          style={{ filter: "invert(1) brightness(0.5) sepia(1) saturate(12) hue-rotate(50deg) brightness(1.3) drop-shadow(0 0 14px hsl(82,85%,50%/0.8))" }}
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
