import React, { useState } from "react";
import AddItem from "./AddItem";
import type { NavItem } from ".";

interface AccordionProps {
  key?: string;
  item: NavItem;
  navItemsList: NavItem[];
  onAdd: (id: string) => void;
  onEdit: (id: string) => void;
  activeAddId: string | null;
  activeEditId: string | null;
  onSave: (item: NavItem, isEditing: boolean) => void;
  onDelete: (id: string) => void;
}

const Accordion: React.FC<AccordionProps> = ({ key, item, navItemsList, onAdd, onEdit, activeAddId, activeEditId, onSave, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className="d-flex" style={{ display: 'flex', alignItems: 'center' }}>
        <span>{isOpen ? '^' : '>'}</span>
        <p>{item?.icon}</p>
        <p>{item?.label}</p>
        <span onClick={() => onAdd(item.id)}>+</span>
        <span onClick={() => onEdit(item.id)}>e</span>
        <span onClick={() => onDelete(item.id)}>D</span>
      </div>
      {
        (activeAddId === item.id || activeEditId === item.id) && (
          <div>
            <AddItem
              parent={item}
              isEditing={activeEditId === item?.id}
              onSave={onSave}
              defaultItem={activeEditId === item?.id ? item : null}
            />
          </div>
        )
      }
      {isOpen && (
        <div style={{ marginLeft: '20px', paddingTop: '10px' }}>
          {item.children && item.children.length > 0 && item.children.map((child: any) => (
            <div key={child.id}>
              {child?.children?.length > 0 ? (
                <Accordion
                  key={child?.id}
                  item={child}
                  onSave={onSave}
                  onAdd={onAdd}
                  onEdit={onEdit}
                  activeAddId={activeAddId}
                  activeEditId={activeEditId}
                  navItemsList={navItemsList}
                  onDelete={onDelete}
                />
              ) : (
                <>
                  <div className="d-flex align-items-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>@ {child.icon}</span>
                    <h5>{child.label}</h5>
                    <span onClick={() => onAdd(child?.id)}>+</span>
                    <span onClick={() => onEdit(child?.id)}>e</span>
                    <span onClick={() => onDelete(child.id)}>D</span>
                  </div>
                  {
                    (activeAddId === child?.id || activeEditId === child?.id) && (
                      <div>
                        <AddItem
                          parent={child}
                          isEditing={activeEditId === child?.id}
                          onSave={onSave}
                          defaultItem={activeEditId === child?.id ? child : null}
                        />
                      </div>
                    )
                  }
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Accordion
