import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
interface FunctionalDogsProps {
  isLoading: boolean;
  filteredDogsArray: Dog[];
  handleDeleteDog: (dogId: number) => Promise<void>;
  handleUpdateDog: (dogId: number, updatedDog: Partial<Dog>) => Promise<void>;
}

export const FunctionalDogs = ({
  isLoading,
  filteredDogsArray,
  handleDeleteDog,
  handleUpdateDog,
}: FunctionalDogsProps) => {
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
