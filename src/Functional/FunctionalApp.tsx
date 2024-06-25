import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { View, Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [dogsArray, setDogsArray] = useState<Dog[]>([]);
  const [currentView, setCurrentView] = useState<View>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getAllDogs, updateDog, deleteDog } = Requests;

  const faveDogs = dogsArray.filter((dog) => dog.isFavorite);
  const unFaveDogs = dogsArray.filter((dog) => !dog.isFavorite);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    setIsLoading(true);
    try {
      const dogsData = await getAllDogs();
      setDogsArray(dogsData);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDog = async (dogId: number) => {
    setIsLoading(true);
    try {
      await deleteDog(dogId);
      fetchDogs();
    } catch (error) {
      console.error(`Error deleting dog with ID ${dogId}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDog = async (dogId: number, updatedDog: Partial<Dog>) => {
    setIsLoading(true);
    try {
      await updateDog(dogId, updatedDog);
      fetchDogs();
    } catch (error) {
      console.error(`Error updating dog with ID ${dogId}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  // can be moved to Dogs component and handled there
  const filteredDogArray = (() => {
    switch (currentView) {
      case "favorited":
        return dogsArray.filter((dog) => dog.isFavorite);
      case "unfavorited":
        return dogsArray.filter((dog) => !dog.isFavorite);
      default:
        return dogsArray;
    }
  })();

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        currentView={currentView}
        setCurrentView={setCurrentView}
        numOfFaveDogs={faveDogs.length}
        numOfUnFaveDogs={unFaveDogs.length}
      >
        {currentView === "create dog" ? (
          <FunctionalCreateDogForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            fetchDogs={fetchDogs}
          />
        ) : (
          <FunctionalDogs
            isLoading={isLoading}
            filteredDogsArray={filteredDogArray}
            handleDeleteDog={handleDeleteDog}
            handleUpdateDog={handleUpdateDog}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
