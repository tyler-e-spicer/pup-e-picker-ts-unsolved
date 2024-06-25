import { useEffect, Dispatch, SetStateAction } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";
interface FunctionalDogsProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  filteredDogsArray: Dog[];
  setDogsArray: Dispatch<SetStateAction<Dog[]>>;
  handleDeleteDog: (dogId: number) => Promise<void>;
  handleUpdateDog: (dogId: number, updatedDog: Partial<Dog>) => Promise<void>;
}

export const FunctionalDogs = ({
  isLoading,
  setIsLoading,
  filteredDogsArray,
  setDogsArray,
  handleDeleteDog,
  handleUpdateDog,
}: FunctionalDogsProps) => {
  const { getAllDogs } = Requests;

  useEffect(() => {
    async function fetchDogs() {
      setIsLoading(true);
      try {
        const dogsData = await getAllDogs();
        setDogsArray(dogsData);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDogs();
  }, []);

  return (
    <>
      {filteredDogsArray.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => handleDeleteDog(dog.id)}
          onEmptyHeartClick={() => handleUpdateDog(dog.id, dog)}
          onHeartClick={() => handleUpdateDog(dog.id, dog)}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
