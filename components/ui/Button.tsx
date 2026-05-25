import Link from "next/link";

type Variant = "primary" | "ghost" | "whatsapp" | "dark";

interface ButtonProps {
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white font-medium hover:opacity-90 transition-opacity duration-200",
  ghost:
    "border border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-200",
  whatsapp:
    "bg-whatsapp text-white font-semibold hover:bg-whatsapp-dark transition-colors duration-200",
  dark:
    "bg-surface-dark text-white font-semibold hover:opacity-85 transition-opacity duration-200",
};

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm tracking-wide rounded-sm select-none";

export function Button({
  variant = "primary",
  href,
  onClick,
  className = "",
  children,
  external = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
