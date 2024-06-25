import { Component } from "react";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ClassDogs } from "./ClassDogs";
import { ClassSection } from "./ClassSection";
import { View, Dog } from "../types";
import { Requests } from "../api";

interface ClassAppState {
  dogsArray: Dog[];
  currentView: View;
  isLoading: boolean;
}

export class ClassApp extends Component<Record<string, never>, ClassAppState> {
  state: ClassAppState = {
    dogsArray: [],
    currentView: "",
    isLoading: false,
  };

  componentDidMount() {
    this.fetchDogs();
  }

  fetchDogs = async () => {
    this.setState({ isLoading: true });
    try {
      const { getAllDogs } = Requests;
      const dogsData = await getAllDogs();
      this.setState({ dogsArray: dogsData });
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleDeleteDog = async (dogId: number) => {
    this.setState({ isLoading: true });
    try {
      const { deleteDog } = Requests;
      await deleteDog(dogId);
      this.fetchDogs();
    } catch (error) {
      console.error(`Error deleting dog with ID ${dogId}:`, error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleUpdateDog = async (dogId: number, updatedDog: Partial<Dog>) => {
    this.setState({ isLoading: true });
    try {
      const { updateDog } = Requests;
      await updateDog(dogId, updatedDog);
      this.fetchDogs();
    } catch (error) {
      console.error(`Error updating dog with ID ${dogId}:`, error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { dogsArray, currentView, isLoading } = this.state;

    const faveDogs = dogsArray.filter((dog) => dog.isFavorite);
    const unFaveDogs = dogsArray.filter((dog) => !dog.isFavorite);

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
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          currentView={currentView}
          setCurrentView={(view: View) => this.setState({ currentView: view })}
          faveDogs={faveDogs.length}
          unFaveDogs={unFaveDogs.length}
        >
          {currentView === "create dog" ? (
            <ClassCreateDogForm
              isLoading={isLoading}
              setIsLoading={(loading: boolean) =>
                this.setState({ isLoading: loading })
              }
            />
          ) : (
            <ClassDogs
              isLoading={isLoading}
              setIsLoading={(loading: boolean) =>
                this.setState({ isLoading: loading })
              }
              filteredDogsArray={filteredDogArray}
              setDogsArray={(dogs: Dog[]) => this.setState({ dogsArray: dogs })}
              handleDeleteDog={this.handleDeleteDog}
              handleUpdateDog={this.handleUpdateDog}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
