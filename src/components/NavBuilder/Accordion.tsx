import React, { useState } from "react";
import "./index.css";
import { findActiveParent } from "./utils";
import type { NavItem } from "./NavBuilderUI";

interface AccordionProps {
  item: NavItem;
  open: boolean;
  activeParent: string | null;
  activeNav: string | null;
  activeOuterParent: string | null;
  setActiveOuterParent: (id: string | null) => void;
  setActiveParent: (id: string | null) => void;
  setActiveNav: (id: string | null) => void;
  navItems: NavItem[];
  handleActiveNav: (item: NavItem) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  item,
  open,
  activeParent,
  activeNav,
  setActiveParent,
  setActiveNav,
  navItems,
  activeOuterParent,
  setActiveOuterParent,
  handleActiveNav,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={((activeParent === item?.id) || (activeOuterParent === item?.id)) ? "ActiveParent" : "AccordionCont"}
      >
        <p>@</p>
        {isOpen ? (
          <i className="fas fa-chevron-down"></i>
        ) : (
          <i className="fas fa-chevron-right"></i>
        )}
        <p>{item?.name}</p>
      </div>
      {isOpen ? (
        <div>
          {item.children &&
            item.children.length > 0 &&
            item.children.map((child) => (
              <div key={child?.id} style={{ marginLeft: 20 }}>
                {child?.children && child?.children?.length > 0 ? (
                  <Accordion
                    item={child}
                    open={isOpen}
                    setActiveParent={setActiveParent}
                    setActiveNav={setActiveNav}
                    activeParent={activeParent}
                    activeNav={activeNav}
                    navItems={navItems}
                    activeOuterParent={activeOuterParent}
                    setActiveOuterParent={setActiveOuterParent}
                    handleActiveNav={handleActiveNav}
                  />
                ) : (
                  <li
                    className={
                      child?.id === activeNav ? "ActiveNavCont" : "NavCont"
                    }
                    onClick={() => handleActiveNav(child)}
                  >
                    {child?.name}
                  </li>
                )}
              </div>
            ))}
        </div>
      ) : null}
    </>
  );
};
