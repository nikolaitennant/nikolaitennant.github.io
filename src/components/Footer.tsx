export default function Footer() {
  return (
    <footer className="border-t border-border/50 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Nikolai Tennant
        </p>
        <p className="text-xs text-muted-foreground/50">
          Built with Next.js &amp; 21st.dev
        </p>
      </div>
    </footer>
  );
}
