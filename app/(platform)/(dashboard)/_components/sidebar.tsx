'use client';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';
import { NavItem, Organization } from './nav-item';

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
  // useStateのかわりにuseLocalStorageを使ってローカルストレージに保存
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

  // 現在のアクティブな組織属性にアクセス
  // 分割代入かつ変数名を変更
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  // 組織のリストを取得
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      // 無限スクロールのための設定
      infinite: true,
    },
  });

  // expandedオブジェクトから値がtrueのものを抽出
  // defaultAccordionValueは文字列の配列
  // Accordionコンポーネント用のデフォルト値として使用
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      // reduceの戻り値は次のaccに渡される
      return acc;
    },
    [],
  );

  // localstorageにサイドバーのアコーディオンの状態を保存
  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-1 flex items-center text-xs font-medium">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
