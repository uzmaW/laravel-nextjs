"use client";

import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";

export const useTask = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth({
    middleware: "auth",
  });

  const csrf = async () => {
    await axios.get("/sanctum/csrf-cookie");
  };

  const generateTasks = async () => {
    await csrf();
    try {
      const response = await axios.get(`/api/tasks/generate/${user?.id}`);
      return response.data?.data?.tasks;
    } catch (error) {
      throw error;
    }
  }
  const getAllTasks = async () => {
    await csrf();
    try {
      const response = await axios.get(`/api/tasks`);
      return response.data?.tasks;
    } catch (error) {
      throw error;
    }
  }
  const fetchTasks = async () => {
    await csrf();
    try {
      const response = await axios.get(`/api/users/${user?.id}/tasks`);
      return response.data?.tasks;
    } catch (error) {
      throw error;
    }
  };

  const fetchAssignedTasks = async () => {
    await csrf();
    try {
      const response = await axios.get(`/api/users/${user?.id}/assigned`);
      return response.data?.tasks;
    } catch (error) {
      throw error;
    }
  }

  const createTask = async ({ setErrors, ...props }) => {
    await csrf();
    try {
      const res = await axios.post(`/api/users/${user?.id}/tasks`, props);
        return res.data.data;
    } catch (error) {
      console.log(error)
      if (error?.response && error?.response?.status === 422) {
          setErrors(error.response.data.errors);
      } else {
      throw error;
      }
    }
  };

  const updateTask = async ({ setErrors, ...props }) => {
    await csrf();

    try {
      const res = await axios.patch(`/api/tasks/${props.id}`, props);
      return res.data;
    } catch (error) {
      if (error?.response && error?.response?.status === 422) {
          setErrors(error.response.data.errors);
      } else {
      throw error;
      }
    }
  };

  const deleteTask = async (id) => {
    await csrf();

    try {
      await axios.delete(`/api/tasks/${id}`);
    } catch (error) {
      if (error?.response && error?.response?.status === 422) {
          return error.response.data.errors;
      } else {
      throw error;
      }
    }
  };

  const getTask = async (id) => {
    await csrf();

    try {
      const response = await axios.get(`/api/tasks/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
  };

  const assignTask = async (id, email) => {
    await csrf();

    try {
      const response = await axios.patch(`/api/tasks/${id}/assign`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  return { createTask, updateTask, deleteTask, fetchTasks, fetchAssignedTasks, assignTask, getTask, getAllTasks, generateTasks};
};
