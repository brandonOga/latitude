import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "light" | "outline";
type Size = "md" | "sm";

type BaseProps = {
  variant?: Variant;
  size?: Size;
};

type LinkProps = BaseProps &
  ComponentPropsWithoutRef<"a"> & { href: string };

type NativeButtonProps = BaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

export type ButtonProps = LinkProps | NativeButtonProps;

// Rounded button. Renders an <a> when given an href, otherwise a <button>.
export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = ["btn", `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(" ");

  if (props.href !== undefined) {
    return <a {...(props as LinkProps)} className={classes} />;
  }

  const { type = "button", ...rest } = props as NativeButtonProps;
  return <button type={type} {...rest} className={classes} />;
}
