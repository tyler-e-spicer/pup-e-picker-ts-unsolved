import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

interface ClassDogsProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  filteredDogsArray: Dog[];
  setDogsArray: (dogs: Dog[]) => void;
  handleDeleteDog: (dogId: number) => Promise<void>;
  handleUpdateDog: (dogId: number, updatedDog: Partial<Dog>) => Promise<void>;
}

export class ClassDogs extends Component<ClassDogsProps> {
  componentDidMount() {
    this.fetchDogs();
  }

  fetchDogs = async () => {
    const { setIsLoading, setDogsArray } = this.props;
    setIsLoading(true);
    try {
      const { getAllDogs } = Requests;
      const dogsData = await getAllDogs();
      setDogsArray(dogsData);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
