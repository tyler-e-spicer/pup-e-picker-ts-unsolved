import { useState, useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { View, Dog } from "../types";
import { Requests } from "../api";
interface FunctionalDogsProps {
  currentView: View;
}

export const FunctionalDogs = ({ currentView }: FunctionalDogsProps) => {
  const [dogArray, setDogsArray] = useState<Dog[]>([]); // CHANGE BACK TO EMPTY ONCE GET IS IN PLACE
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getAllDogs, updateDog, deleteDog } = Requests;
  let dogArrayCopy = [...dogArray];

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const dogsData = await getAllDogs();
        setDogsArray(dogsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dogs:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  switch (currentView) {
    case "favorited":
      dogArrayCopy = dogArrayCopy.filter((dog) => dog.isFavorite);
      break;
    case "unfavorited":
      dogArrayCopy = dogArrayCopy.filter((dog) => !dog.isFavorite);
      break;
  }

  return (
    <>
      {dogArrayCopy.map(({ id, image, description, isFavorite, name }) => (
        <DogCard
          key={id}
          dog={{
            id: id,
            image: image,
            description: description,
            isFavorite: isFavorite,
            name: name,
          }}
          onTrashIconClick={() => deleteDog(id)}
          onEmptyHeartClick={() => updateDog(id, !isFavorite)}
          onHeartClick={() => updateDog(id, !isFavorite)}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
