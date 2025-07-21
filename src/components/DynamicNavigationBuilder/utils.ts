import type { NavItem } from ".";

export const updateNavItem = (items: NavItem[], id: string | null, newItem: NavItem): NavItem[] => {
    return items.map((item) => {
        if (item.id === id) {
            console.log(item, newItem);
            
            return { ...item, ...newItem };
        } else if (item?.children && item?.children?.length > 0) {
            return { ...item, children: updateNavItem(item.children, id, newItem) };
        }
        return item;
    });
};

export const addNavItem = (items: NavItem[], id: string | null, newItem: NavItem): NavItem[] => {
    return items.map((item) => {
        if (item.id === id) {
            return { ...item, children: [...item?.children || [], newItem] };
        } else if (item?.children && item?.children?.length > 0) {
            return { ...item, children: addNavItem(item.children, id, newItem) };
        }
        return item;
    });
};


export const deleteNavItem = (items: NavItem[], idToDelete: string): NavItem[] => {
    return items
        .filter(item => item.id !== idToDelete)
        .map(item => ({
            ...item,
            children: item.children ? deleteNavItem(item.children, idToDelete) : [],
        }));
};


