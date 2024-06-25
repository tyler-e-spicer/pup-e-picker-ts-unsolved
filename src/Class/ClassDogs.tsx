import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

interface ClassDogsProps {
  isLoading: boolean;
  filteredDogsArray: Dog[];
  handleDeleteDog: (dogId: number) => Promise<void>;
  handleUpdateDog: (dogId: number, updatedDog: Partial<Dog>) => Promise<void>;
  fetchDogs: () => void;
}

export class ClassDogs extends Component<ClassDogsProps> {
  componentDidMount() {
    this.props.fetchDogs();
  }

  render() {
    const { isLoading, filteredDogsArray, handleDeleteDog, handleUpdateDog } =
      this.props;

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
  }
}

export default ClassDogs;
