import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { View } from "../types";

interface ClassSectionProps {
  children: ReactNode;
  setCurrentView: (view: View) => void;
  currentView: View;
  faveDogs: number;
  unFaveDogs: number;
}

export class ClassSection extends Component<ClassSectionProps> {
  render() {
    const { children, setCurrentView, currentView, faveDogs, unFaveDogs } =
      this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/class"} className="btn">
            Change to Class
          </Link>
          <div className="selectors">
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
                setCurrentView(
                  currentView === "create dog" ? "" : "create dog"
                );
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
