import React, { useEffect, useState } from 'react'
import type { NavItem } from '.';


interface AddItemProps {
    parent: NavItem;
    isEditing: boolean;
    onSave: (item: NavItem, isEditing: boolean) => void;
    defaultItem?: NavItem | null;
}


const AddItem: React.FC<AddItemProps> = ({ parent, isEditing, onSave, defaultItem }) => {
    const [item, setItem] = useState<NavItem>({
        id: Date.now().toString(),
        label: '',
        icon: '',
        url: '',
        children: [],
    });

    useEffect(() => {
        if (isEditing && defaultItem) {
            setItem(defaultItem);
        }
    }, [isEditing, defaultItem])

    const handleSubmit = () => {
      if(!item.label || !item.url || !item.icon) {
          alert('All fields Required');
          return;
      }
      onSave(item, isEditing)
    };

    return (
        <div>
            <h4>{isEditing ? 'Edit Item' : 'AddItem'}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <div>
                    <p>Label</p>
                    <input type="text" placeholder="Enter label" className="form-control mb-2" value={item.label} onChange={(e) => setItem(prev => ({ ...prev, label: e.target.value }))} />
                </div>
                <div>
                    <p>URL</p>
                    <input type="text" placeholder="Enter URL" className="form-control mb-2" value={item.url} onChange={(e) => setItem(prev => ({ ...prev, url: e.target.value }))} />
                </div>
                <div>
                    <p>Icon</p>
                    <input type="text" placeholder="Enter icon" className="form-control mb-2" value={item.icon} onChange={(e) => setItem(prev => ({ ...prev, icon: e.target.value }))} />
                </div>
                <div>
                    <button onClick={handleSubmit}>Save</button>
                    {/* <button onClick={() => { setAddItem(false); setIsEditing(false) }}>Cancel</button> */}
                </div>
            </div>
        </div>
    )
}

export default AddItem
