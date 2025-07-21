import React, { Children, useEffect, useState } from 'react'
import Accordion from './Accordion';
import AddItem from './AddItem';
import { addNavItem, deleteNavItem, updateNavItem } from './utils';

export const navItemsList = [
  {
    id: '1',
    label: 'Home',
    url: '/',
    icon: '🏠',
    children: []
  },
  {
    id: '2',
    label: 'Products',
    url: '/products',
    icon: '📦',
    children: [
      {
        id: '2-1',
        label: 'Electronics',
        url: '/products/electronics',
        icon: '💻',
        children: [
          {
            id: '2-1-1',
            label: 'Electronics1',
            url: '/products/electronics',
            icon: '💻',
            children: [
              {
                id: '2-1-1-1',
                label: 'Electronics11',
                url: '/products/electronics',
                icon: '💻',
                children: [
                  {
                    id: '2-1-1-1-1',
                    label: 'Electronics111',
                    url: '/products/electronics',
                    icon: '💻',
                    children: [],
                  },
                  {
                    id: '2-1-1-1-2',
                    label: 'Electronics112',
                    url: '/products/electronics',
                    icon: '💻',
                    children: [],
                  }
                ],
              }
            ],
          }
        ],
      },
      {
        id: '2-2',
        label: 'next',
        url: '/products/electronics',
        icon: '💻',
        children: [
          {
            id: '2-2-1',
            label: 'Electronics1',
            url: '/products/electronics',
            icon: '💻',
            children: [
              {
                id: '2-2-1-1',
                label: 'Electronics11',
                url: '/products/electronics',
                icon: '💻',
                children: [
                  {
                    id: '2-2-1-1-1',
                    label: 'Electronics111',
                    url: '/products/electronics',
                    icon: '💻',
                    children: [],
                  },
                  {
                    id: '2-2-1-1-2',
                    label: 'Electronics112',
                    url: '/products/electronics',
                    icon: '💻',
                    children: [],
                  }
                ],
              }
            ],
          }
        ],
      },
      {
        id: '2-3',
        label: 'Clothing',
        url: '/products/clothing',
        icon: '👕',
        children: []
      }
    ]
  },
  {
    id: '3',
    label: 'About',
    url: '/about',
    icon: 'ℹ️',
    children: []
  },
  {
    id: '4',
    label: 'About1',
    url: '/about',
    icon: 'ℹ️',
    children: []
  },
  {
    id: '5',
    label: 'new',
    url: '/new',
    icon: '📦',
    children: [
      {
        id: '5-1',
        label: 'Electronics',
        url: '/products/electronics',
        icon: '💻',
        children: [
          {
            id: '5-1-1',
            label: 'Electronics1',
            url: '/products/electronics',
            icon: '💻',
            children: [
              {
                id: '5-1-1-1',
                label: 'Electronics11',
                url: '/products/electronics',
                icon: '💻',
                children: [],
              }
            ],
          }
        ],
      },
      {
        id: '5-2',
        label: '5',
        url: '/products/5',
        icon: '👕',
        children: []
      }
    ]
  },
];
export type NavItem = {
  id: string;
  label: string;
  url: string;
  icon: string;
  children?: NavItem[] | [];
};

export const NavBuilder = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const [activeEditId, setActiveEditId] = useState<string | null>(null);
  const [activeAddPrentId, setActiveAddParentId] = useState<string | null>(null)
  console.log('navItems', navItems);

  useEffect(() => {
    const storedNavItems = localStorage.getItem('navItems');
    setNavItems(storedNavItems ? JSON.parse(storedNavItems) : navItemsList);
  }, []);


  const handleSave = (newItem: NavItem, isEditing: boolean) => {
    let updateItems;
    if (isEditing) {
      setActiveEditId(null);
      updateItems = updateNavItem(navItems, activeEditId, newItem);
    } else {
      setActiveAddParentId(null);
      updateItems = addNavItem(navItems, activeAddPrentId, newItem);
    }

    setNavItems(updateItems);
    localStorage.setItem('navItems', JSON.stringify(updateItems));
  };


  const handleDelete = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    const updatedItems = deleteNavItem(navItems, id);
    setNavItems(updatedItems);
    localStorage.setItem('navItems', JSON.stringify(updatedItems));

    if (activeEditId === id) setActiveEditId(null);
    if (activeAddPrentId === id) setActiveAddParentId(null);
  };

  return (
    <div>
      {
        navItems.map((item) => (
          <div key={item?.id}>
            {item.children && item.children.length > 0 && item.children.length > 0 ? (
              <Accordion
                key={item.id}
                item={item}
                navItemsList={navItems}
                onAdd={(id: string) => setActiveAddParentId(id)}
                onEdit={(id: string) => setActiveEditId(id)}
                activeAddId={activeAddPrentId}
                activeEditId={activeEditId}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            )
              : (<div className='d-flex align-items-center' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>@ {item.icon}</span>
                <h5>{item.label}</h5>
                <p>{item.url}</p>
                <span onClick={() => setActiveAddParentId(item?.id)}>+</span>
                <span onClick={() => setActiveEditId(item?.id)}>e</span>
                <span onClick={() => handleDelete(item.id)}>D</span>
              </div>)}
            {(activeAddPrentId === item.id || activeEditId === item.id) && (
              <div>
                <AddItem
                  parent={item}
                  isEditing={activeEditId === item.id}
                  onSave={handleSave}
                  defaultItem={activeEditId === item.id ? item : null}
                />
              </div>
            )}
          </div>
        ))
      }
    </div>
  )
}

