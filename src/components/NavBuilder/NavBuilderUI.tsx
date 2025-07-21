import React, { useState, useEffect } from "react";
import { Accordion } from "./Accordion";
import "./index.css";
import { findActiveParent } from "./utils";

export type NavItem = {
  id: string;
  name: string;
  children?: NavItem[] | [];
};

const NavList = [
  {
    id: "1",
    name: "Office Map",
  },
  {
    id: "2",
    name: "New Employee Onboarding",
    children: [
      {
        id: "8",
        name: "Onboarding Materials",
      },
      {
        id: "9",
        name: "Training",
      },
    ],
  },
  {
    id: "3",
    name: "Office Events",
    children: [
      {
        id: "6",
        name: "2018",
        children: [
          {
            id: "10",
            name: "Summer Picnic",
          },
          {
            id: "11",
            name: "Valentine's Day Party",
          },
          {
            id: "12",
            name: "New Year's Party",
          },
        ],
      },
      {
        id: "7",
        name: "2017",
        children: [
          {
            id: "13",
            name: "Company Anniversary Celebration",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Public Holidays",
  },
  {
    id: "5",
    name: "Vacations and Sick Leaves",
  },
];

export const NavBuilderUI = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [activeOuterParent, setActiveOuterParent] = useState<string | null>(null);
  const [activeParent, setActiveParent] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);

  useEffect(() => {
    setNavItems(NavList)
  }
  , []);

  const handleActiveNav = (item: NavItem) => {
    setActiveNav(item?.id);
    const parent = findActiveParent(navItems, item?.id);
    setActiveParent(parent?.parent?.id || null);
    setActiveOuterParent(parent?.out?.id || null);
    console.log(activeParent, activeOuterParent, parent, "activeParent");
  };

  return (
    <>
      {navItems.map((item) => (
        <div key={item.id}>
          {item?.children && item?.children?.length > 0 ? (
            <Accordion
              item={item}
              open={false}
              setActiveParent={setActiveParent}
              setActiveNav={setActiveNav}
              activeOuterParent={activeOuterParent}
              setActiveOuterParent={setActiveOuterParent}
              activeParent={activeParent}
              activeNav={activeNav}
              navItems={navItems}
              handleActiveNav={handleActiveNav}
            />
          ) : (
            <li
              className={item?.id === activeNav ? "ActiveNavCont" : "NavCont"}
              onClick={() => handleActiveNav(item)}
            >
              <p>{item.name}</p>
            </li>
          )}
        </div>
      ))}
    </>
  );
};
