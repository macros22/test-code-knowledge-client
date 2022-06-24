import styles from "./MedicationList.module.css";
import axios from "axios";
import { IMedicationItem } from "../../interfaces/medication.interface";
import React from "react";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { MedicationItem } from "../MedicationItem/MedicationItem";
import Modal from "../Modal/Modal";
import { GET_ITEMS_URL } from "../../constants/url";
import { EditMedicationItem } from "components";

const defaultItem: IMedicationItem = {
  id: 0,
  name: "Example name",
  description: "Example description",
  destinationCount: 5,
  count: 0,
};

export const MedicationList = (): JSX.Element => {
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const [editItemMode, setEditItemMode] = React.useState(false);
  const [addItemMode, setAddItemMode] = React.useState(false);

  const [items, setItems] = React.useState<IMedicationItem[] | null>(null);

  const makeHandleEditButton = (index: number) => {
    return () => {
      setCurrentItemIndex(index);
      setEditItemMode(true);
      getItems();
    };
  };

  const handleAddItemButton = () => {
    setAddItemMode(true);
  };

  const getItems = async () => {
    try {
      const res = await axios.get(GET_ITEMS_URL, { withCredentials: true });
      setItems(res.data.items);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  React.useEffect(() => {
    (async function () {
      await getItems();
    })();
  }, []);

  React.useEffect(() => {
    (async function () {
      await getItems();
    })();
  }, [editItemMode, addItemMode]);

  return (
    <div className="wrapper">
      <div className={styles.title}>
        <h1>Your medication list</h1>

        <Button
          className={styles.addItemButton}
          appearance="primary"
          onClick={handleAddItemButton}
        >
          Add
        </Button>
      </div>
      {items && items.length ? (
        items.map((item, index) => {
          return (
            <Card className={styles.item} key={item.id}>
              <MedicationItem
              updateItems={getItems}
                handleEditButton={makeHandleEditButton(index)}
                item={item}
                key={item.id}
              />
            </Card>
          );
        })
      ) : (
        <Card className={styles.item}>Empty medication list</Card>
      )}

      {items && editItemMode && (
        <Modal setModalOpen={setEditItemMode}>
          <EditMedicationItem
            setModalOpen={setEditItemMode}
            mode="edit"
            item={items[currentItemIndex]}
          />
        </Modal>
      )}

      {items && addItemMode && (
        <Modal setModalOpen={setAddItemMode}>
          <EditMedicationItem
            setModalOpen={setAddItemMode}
            
            mode="add"
            item={defaultItem}
          />
        </Modal>
      )}
    </div>
  );
};
