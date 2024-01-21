import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const headingFont = localFont({
  src: '../public/fonts/font.woff2',
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image
          src="/logo.svg"
          alt="Logo"
          height={20}
          width={30}
          priority={true}
          className="h-auto max-w-full"
        />
        <p
          className={cn('pb-1 text-lg text-neutral-700', headingFont.className)}
        >
          Taskify
        </p>
      </div>
    </Link>
  );
};
