export function SidebarNavItems({ capabilities }: SidebarNavItemsProps) {
  const filteredNavItems = navItems
    // 🔐 Remove admin-only groups entirely (e.g., "Others")
    .filter((group) => {
      if (group.title === "Others" && !capabilities?.isAdmin) {
        return false;
      }
      return true;
    })
    .map((group) => {
      const filteredGroup = {
        ...group,
        navGroup: group.navGroup.filter((item) => {
          // 🔐 Users management (ADMIN only)
          if (item.title === "Users" && !capabilities?.canManageUsers) {
            return false;
          }

          // 🔐 Plans management (ADMIN only)
          if (item.title === "Plans" && !capabilities?.canManagePlans) {
            return false;
          }

          // 🔐 Blog management (ADMIN only)
          if (item.title === "Blogs" && !capabilities?.canManageBlog) {
            return false;
          }

          return true;
        })
      };

      return filteredGroup;
    })
    // 🧹 Remove empty groups automatically
    .filter((group) => group.navGroup.length > 0);

  return filteredNavItems.map(({ id, title, navGroup }) => (
    <NavGroup title={title} items={navGroup} key={id} />
  ));
}
