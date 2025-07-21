import type { NavItem } from "./NavBuilderUI";

export const findActiveParent = (items: NavItem[], id: string, parent: NavItem | null = null, out: NavItem | null = null) => {
    for (let i = 0; i < items?.length; i++) {
      const item = items[i];
      if (item?.id === id) {
        console.log(item);
        return {parent, out};
      }
      if (item?.children && item?.children?.length > 0) {
          const result: any = findActiveParent(item?.children, id, item, out ?? item);
          console.log(result, 'result');
          
          console.log('parent', result);    
          
          if (result) return result;
      }
    }
    return null;
  };
  

// export const findActiveParent = (
//     items: NavItem[],
//     id: string,
//     parent: NavItem | null = null
//   ): { item: NavItem; parent: NavItem | null } | null => {
//     for (const item of items) {
//       if (item.id === id) {
//         return { item, parent };
//       }
  
//       if (item.children && item.children.length > 0) {
//         const result = findActiveParent(item.children, id, item);
//         if (result) return result;
//       }
//     }
//     return null;
//   };
  