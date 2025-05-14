import React, { useState } from "react";
import EditListModal from "../editList/EditListModal";
import { ShoppingListType } from "../../../../interfaces/shoppingListInterfaces";
import "../../userBody/editList/EditList.css"

interface ShoppingListProps {
  setLists: React.Dispatch<React.SetStateAction<ShoppingListType[]>>;
}

function CreateListButton({ setLists }: ShoppingListProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  function handleCreateList() {
    setShowCreateModal(true);
  }
  function handleSaveNewList(newList: ShoppingListType) {
    setShowCreateModal(false);
    setLists(prev => [...prev, newList]); 
  }

  return (
    <>
      <button onClick={handleCreateList} className="button-area-button">Create New List</button>
      {showCreateModal && (
        <EditListModal
          mode="create"
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveNewList}
          setLists={setLists}
        />
      )}
    </>
  );
}

export default CreateListButton;
