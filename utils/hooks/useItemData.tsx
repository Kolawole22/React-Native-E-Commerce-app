import { getFirestore, query, collection, getDocs } from "firebase/firestore";
import app from "../../config/firebase";
import { SetStateAction, useEffect, useState } from "react";

export type Items = {
  quantity: number;
  id: string;
  image: string;
  description: string;
  price: number;
  rating: [];
  title: string;
  category: string;
};

export function useItemData() {
  const db = getFirestore(app);
  const [storeItems, setStoreItems] = useState<Items[]>([]);
  //const menuItems: MenuItems[] = [];
  const [itemsLoaded, setItemsLoaded] = useState<boolean>(false);
  useEffect(() => {
    async function fetchItems() {
      try {
        const q = query(collection(db, "items"));
        const querySnapshot = await getDocs(q);
        const items: SetStateAction<Items[]> = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const newItem: Items = {
            quantity: data.quantity,
            id: doc.id,
            image: data.image,
            title: data.title,
            price: data.price,
            rating: data.rating,
            description: data.description,
            category: data.category,
          };
          items.push(newItem);
        });
        setStoreItems(items);
        //console.log("length of array is:", menuItems.length);
        setItemsLoaded(true);
        //console.log("menuItems loaded");
      } catch (error) {
        console.log(error);
      }
    }

    fetchItems();
    //console.log("length of array is:", menuItems.length);
    // console.log(menuItems);
  }, []);
  return { storeItems, itemsLoaded };
}
