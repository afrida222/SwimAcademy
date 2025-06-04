// src/context/TrainingContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
  const [trainingSchedule, setTrainingSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("trainingSchedule");
        if (savedData) {
          setTrainingSchedule(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Failed to load training data:", error);
      } finally {
        setIsLoading(false); // Pastikan loading di-set false
      }
    };
    loadData();
  }, []);

  const loadTrainingData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("trainingSchedule");
      if (savedData) {
        setTrainingSchedule(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to load training data:", error);
    }
  };

  const saveTrainingData = async (data) => {
    try {
      await AsyncStorage.setItem("trainingSchedule", JSON.stringify(data));
      setTrainingSchedule(data);
    } catch (error) {
      console.error("Failed to save training data:", error);
    }
  };

  const addTraining = async (newTraining) => {
    const updatedSchedule = [...trainingSchedule, newTraining];
    await saveTrainingData(updatedSchedule);
  };

  const updateTraining = async (id, updatedTraining) => {
    const updatedSchedule = trainingSchedule.map((item) => (item.id === id ? updatedTraining : item));
    await saveTrainingData(updatedSchedule);
  };

  const deleteTraining = async (id) => {
    const updatedSchedule = trainingSchedule.filter((item) => item.id !== id);
    await saveTrainingData(updatedSchedule);
  };

  return (
    <TrainingContext.Provider
      value={{
        trainingSchedule,
        isLoading,
        addTraining,
        updateTraining,
        deleteTraining,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};
