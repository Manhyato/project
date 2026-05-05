import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  "aria-label"?: string;
};

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function buttonVariants(variant: ButtonVariant = "secondary") {
  const base =
    "inline-flex items-center justify-center rounded px-4 py-2 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 disabled:cursor-not-allowed disabled:opacity-70";

  if (variant === "primary") {
    return cx(
      base,
      "bg-zinc-900 !text-white hover:bg-zinc-700 active:bg-black",
      "dark:bg-white dark:!text-black dark:hover:bg-zinc-200 dark:active:bg-zinc-300",
    );
  }

  return cx(
    base,
    "border border-zinc-300 bg-white !text-zinc-900 hover:bg-zinc-100",
    "dark:border-zinc-600 dark:bg-zinc-800 dark:!text-white dark:hover:bg-zinc-700",
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", className, type = "button", ...props },
  ref,
) {
  return <button ref={ref} type={type} className={cx(buttonVariants(variant), className)} {...props} />;
});

export function ButtonLink({ href, children, variant = "secondary", className, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} className={cx(buttonVariants(variant), className)} {...props}>
      {children}
    </Link>
  );
}
