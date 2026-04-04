export default function Footer() {
  return (
    <footer className="border-t border-border/50 px-6 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Nikolai Tennant
        </p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/nikolaitennant" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/nikolai-tennant/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            LinkedIn
          </a>
          <a href="mailto:nikolaitennant@gmail.com" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
