import { Dispatch, ReactNode, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { View } from "../types";
interface FunctionalSectionProps {
  children: ReactNode;
  setCurrentView: Dispatch<SetStateAction<View>>;
  currentView: View;
  faveDogs: number;
  unFaveDogs: number;
}

export const FunctionalSection = ({
  children,
  setCurrentView,
  currentView,
  faveDogs,
  unFaveDogs,
}: FunctionalSectionProps) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              currentView === "favorited" ? "active" : ""
            }`}
            onClick={() => {
              setCurrentView(currentView === "favorited" ? "" : "favorited");
            }}
          >
            Favorited: {faveDogs}
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              currentView === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              setCurrentView(
                currentView === "unfavorited" ? "" : "unfavorited"
              );
            }}
          >
            Unfavorited: {unFaveDogs}
          </div>
          <div
            className={`selector ${
              currentView === "create dog" ? "active" : ""
            }`}
            onClick={() => {
              setCurrentView(currentView === "create dog" ? "" : "create dog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
