'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export type Organization = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isExpanded,
  isActive,
  organization,
  onExpand,
}: NavItemProps) => {
  // ルーティング用のメソッド群
  const router = useRouter();

  // 現在のパスを取得
  const pathName = usePathname();

  // サイドバーのリンク一覧を定義しておく
  const routes = [
    {
      label: 'Boards',
      icon: <Layout className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: 'Activity',
      icon: <Activity className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: 'Billing',
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700',
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative h-7 w-7">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="text-sm font-medium">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              'mb-1 w-full justify-start pl-10 font-normal',
              pathName === route.href && 'bg-sky-500/10 text-sky-700',
            )}
            variant="ghost"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

// ナビゲーションアイテムのスケルトン作成
NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative h-10 w-10 shrink-0">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
