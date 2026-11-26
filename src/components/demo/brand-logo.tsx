import Image from "next/image";

interface BrandLogoProps {
  displayName: string;
  logoPath: string | null;
  sizeClass?: string;
}

export function BrandLogo({
  displayName,
  logoPath,
  sizeClass = "size-12",
}: BrandLogoProps) {
  if (!logoPath) {
    const initials = displayName
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        aria-hidden="true"
        className={`flex ${sizeClass} items-center justify-center rounded-lg border border-border bg-muted text-base font-bold tracking-tight text-foreground`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={`flex ${sizeClass} items-center justify-center`}>
      <Image
        src={logoPath}
        alt={`${displayName} logosu`}
        width={48}
        height={48}
        className="size-full object-contain opacity-90 transition-opacity dark:invert"
      />
    </div>
  );
}
