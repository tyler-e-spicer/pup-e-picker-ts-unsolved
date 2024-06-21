import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { View } from "../types";

export function FunctionalApp() {
  const [currentView, setCurrentView] = useState<View>("");

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        currentView={currentView}
        setCurrentView={setCurrentView}
      >
        {currentView === "create dog" ? (
          <FunctionalCreateDogForm />
        ) : (
          <FunctionalDogs currentView={currentView} />
        )}
      </FunctionalSection>
    </div>
  );
}
