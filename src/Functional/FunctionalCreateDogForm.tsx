import { Dispatch, SetStateAction, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";
interface FunctionalCreateDogFormProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  isLoading,
  setIsLoading,
}: FunctionalCreateDogFormProps) => {
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
  const [description, setDescription] = useState("");

  const { postDog } = Requests;

  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedImage(defaultSelectedImage);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Submitted Dog!");
      await postDog({
        name: name,
        image: selectedImage,
        description: description,
        isFavorite: false,
      });
      toast.success("Ruff!! Dog created.");
      resetForm();
    } catch (error) {
      console.error("Error creating dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        value={name}
        name="name"
        type="text"
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        value={description}
        name="description"
        cols={80}
        rows={10}
        disabled={isLoading}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        disabled={isLoading}
        id="selectedImage"
        name="selectedImage"
        value={selectedImage}
        onChange={(e) => {
          setSelectedImage(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" disabled={isLoading} />
    </form>
  );
};
