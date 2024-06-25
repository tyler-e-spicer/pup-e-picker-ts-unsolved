import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

// I can eliminate the below catch blocks given the structure of the handler functions. However, it is generating a linting error, so leaving them in. 

export const Requests = {
  getAllDogs: async (): Promise<Dog[]> => {
    try {
      const res = await fetch(`${baseUrl}/dogs`);
      if (!res.ok) {
        throw new Error("Could not fetch dogs.");
      }
      const dogs = await res.json();
      return dogs;
    } catch (error) {
      console.error("Error fetching dogs:", error);
      throw error;
    }
  },

  postDog: async (newDog: Partial<Dog>): Promise<Dog> => {
    try {
      const res = await fetch(`${baseUrl}/dogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDog),
      });
      if (!res.ok) {
        throw new Error("Could not create dog.");
      }
      const createdDog = await res.json();
      return createdDog;
    } catch (error) {
      console.error("Error creating dog:", error);
      throw error;
    }
  },

  deleteDog: async (dogId: number) => {
    try {
      const res = await fetch(`${baseUrl}/dogs/${dogId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Could not delete dog.");
      }
      const deletedDog = await res.json();
      return deletedDog;
    } catch (error) {
      console.error("Error deleting dog:", error);
      throw error;
    }
  },

  updateDog: async (dogId: number, updatedDog: Partial<Dog>): Promise<Dog> => {
    try {
      const response = await fetch(`${baseUrl}/dogs/${dogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedDog,
          isFavorite: !updatedDog.isFavorite,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update dog");
      }
      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      console.error("Error updating dog:", error);
      throw error;
    }
  },
};
