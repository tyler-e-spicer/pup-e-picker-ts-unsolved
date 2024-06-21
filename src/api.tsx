import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

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
      const newDog = await res.json();
      return newDog;
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

  updateDog: async (dogId: number, isFavorite: boolean) => {
    try {
      const response = await fetch(`${baseUrl}/dogs/${dogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorite }),
      });
      if (!response.ok) {
        throw new Error("Failed to update dog");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating dog:", error);
      throw error;
    }
  },
};
