import { Component, FormEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";

interface ClassCreateDogFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  fetchDogs: () => void;
}

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<ClassCreateDogFormProps> {
  state = {
    name: "",
    selectedImage: defaultSelectedImage,
    description: "",
  };

  resetForm = () => {
    this.setState({
      name: "",
      selectedImage: defaultSelectedImage,
      description: "",
    });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { setIsLoading } = this.props;
    setIsLoading(true);
    try {
      console.log("Submitted Dog!");
      const { name, selectedImage, description } = this.state;
      await Requests.postDog({
        name,
        image: selectedImage,
        description,
        isFavorite: false,
      });
      this.props.fetchDogs();
      toast.success("Ruff!! Dog created.");
      this.resetForm();
    } catch (error) {
      console.error("Error creating dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  render() {
    const { isLoading } = this.props;
    const { name, selectedImage, description } = this.state;

    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          value={name}
          name="name"
          type="text"
          disabled={isLoading}
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          value={description}
          name="description"
          cols={80}
          rows={10}
          disabled={isLoading}
          onChange={(e) => {
            this.setState({ description: e.target.value });
          }}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          disabled={isLoading}
          id="selectedImage"
          name="selectedImage"
          value={selectedImage}
          onChange={(e) => {
            this.setState({ selectedImage: e.target.value });
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          ))}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}

export default ClassCreateDogForm;
