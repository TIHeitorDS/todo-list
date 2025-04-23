import { db } from "./firebaseConfig";
import { ref, set, get, push, update } from "firebase/database";
import { Task, User } from "../lib/definitions";
import { v4 as uuidv4 } from "uuid";

export async function login(userData: User): Promise<User | undefined> {
  const usersRef = ref(db, "users");

  try {
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const users = Object.entries(data).map(([id, user]) => ({
        ...(user as User),
        id,
      }));

      return users.find(
        (user) =>
          user.email === userData.email && user.password === userData.password
      );
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(userData: User): Promise<boolean> {
  try {
    userData.id = uuidv4();

    const userRef = ref(db, "users");
    const newUser = push(userRef);

    await set(newUser, userData);

    return true;
  } catch (error) {
    console.error("Erro ao criar o usuário:", error);
    return false;
  }
}

export async function createTask(
  user: User | undefined,
  data: Task
): Promise<boolean> {
  try {
    data.status = false;
    const tasksRef = ref(db, `users/${user?.id}/tasks`);
    const newTaskRef = push(tasksRef);
    await set(newTaskRef, data);
    return true;
  } catch (error) {
    console.error("Erro ao criar a tarefa:", error);
    return false;
  }
}

export async function fetchAllTasks(user: User): Promise<Task[]> {
  const tasksRef = ref(db, `users/${user?.id}/tasks`);

  try {
    const snapshot = await get(tasksRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      return Object.entries(data).map(([id, task]) => {
        const { id: taskId, ...data } = task as Task;
        return { id, ...data };
      });
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export async function fetchTask(user: User, id: string): Promise<Task | null> {
  const taskRef = ref(db, `users/${user.id}/tasks/${id}`);

  try {
    const snapshot = await get(taskRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    throw error;
  }
}

export async function updateTask(
  user: User,
  id: string,
  data: Task
): Promise<boolean> {
  const taskRef = ref(db, `users/${user?.id}/tasks/${id}`);

  try {
    await update(taskRef, data);
    return true;
  } catch (error) {
    return false;
  }
}
