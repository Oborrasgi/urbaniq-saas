"use client";

import {
  Blocks,
  ChevronRight,
  Component,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  Users,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "@/components/ui/sidebar";

interface NavItem {
  id: number;
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
}

interface NavGroup {
  id: number;
  navGroup: NavItem[];
  items?: NavItem[];
  title?: string;
}

const navItems: NavGroup[] = [
  {
    id: 1,
    navGroup: [
      { id: 2, title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { id: 7, title: "Users", url: "/dashboard/users", icon: Users },
      {
        id: 8,
        icon: Package,
        title: "Plans",
        items: [
          { id: 9, title: "Plans", url: "/dashboard/plans" },
          { id: 10, title: "Create Plan", url: "/dashboard/plans/create" }
        ]
      },
      {
        id: 11,
        icon: FileText,
        title: "Blogs",
        items: [
          { id: 12, title: "Blogs", url: "/dashboard/blogs" },
          { id: 13, title: "Create Blog", url: "/dashboard/blogs/create" }
        ]
      },
      {
        id: 3,
        icon: Settings,
        title: "Settings",
        items: [
          { id: 4, title: "General", url: "/dashboard/general" },
          { id: 5, title: "Billing", url: "/dashboard/billing" },
          { id: 5, title: "Delete Account", url: "/dashboard/delete" },
          { id: 6, title: "Change Password", url: "/dashboard/change-password" }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Others",
    navGroup: [
      { id: 8, icon: Component, title: "Components", url: "#components" },
      { id: 9, icon: Blocks, title: "Blocks", url: "#blocks" }
    ]
  }
];

export function SidebarNavItems() {
  return navItems.map(({ id, title, navGroup }) => (
    <NavGroup title={title} items={navGroup} key={id} />
  ));
}

function NavGroup({ title, items }: { items: NavItem[]; title: string | undefined }) {
  const { state } = useSidebar();
  const currentPath = usePathname();

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}

      <SidebarMenu>
        {items.map((item) => {
          if (item.items)
            return <SidebarMenuCollapsible key={item.id} item={item} currentPath={currentPath} />;

          if (state === "collapsed")
            return (
              <SidebarMenuCollapsedDropdown key={item.id} item={item} currentPath={currentPath} />
            );

          return <SidebarMenuLink key={item.id} item={item} currentPath={currentPath} />;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarMenuLink({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={checkIsActive(currentPath, item)} tooltip={item.title}>
        {item.url && (
          <Link href={item.url} onClick={() => setOpenMobile(false)}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SidebarMenuCollapsible({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const { setOpenMobile } = useSidebar();
  return (
    <Collapsible
      asChild
      className="group/collapsible"
      defaultOpen={checkIsActive(currentPath, item, true)}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items &&
              item.items.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild isActive={checkIsActive(currentPath, subItem)}>
                    {subItem.url && (
                      <Link href={subItem.url} onClick={() => setOpenMobile(false)}>
                        {subItem.title}
                      </Link>
                    )}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function SidebarMenuCollapsedDropdown({
  item,
  currentPath
}: {
  item: NavItem;
  currentPath: string;
}) {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip={item.title} isActive={checkIsActive(currentPath, item)}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>

            <ChevronRight className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>{item.title}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          {item.items &&
            item.items.map((sub) => (
              <DropdownMenuItem key={sub.id} asChild>
                {sub.url && (
                  <Link
                    href={sub.url}
                    className={`${checkIsActive(currentPath, sub) ? "bg-secondary" : ""}`}
                  >
                    {sub.icon && <sub.icon />}
                    <span className="max-w-52 text-wrap">{sub.title}</span>
                  </Link>
                )}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}

function checkIsActive(currentPath: string, item: NavItem, mainNav = false) {
  return (
    currentPath === item.url || // /endpoint?search=param
    currentPath.split("?")[0] === item.url || // /endpoint
    !!item?.items?.filter((i) => i.url === currentPath).length || // if child nav is active
    (mainNav &&
      currentPath.split("/")[1] !== "" &&
      currentPath.split("/")[1] === item?.url?.split("/")[1])
  );
}
