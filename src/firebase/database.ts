import { auth, db } from "./firebaseConfig";
import { ref, set, get, push, update } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Task, User } from "../lib/definitions";

export async function login(userData: User): Promise<User | undefined> {
  const { email, password } = userData;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return {
      id: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      password: password,
      tasks: [],
    };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return undefined;
  }
}

export async function createUser(userData: User): Promise<boolean> {
  const { email, password } = userData;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser!, {
      displayName: userData.name,
    });
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
    const tasksRef = ref(db, `tasks/${user?.id}`);
    const newTaskRef = push(tasksRef);
    await set(newTaskRef, data);
    return true;
  } catch (error) {
    console.error("Erro ao criar a tarefa:", error);
    return false;
  }
}

export async function fetchAllTasks(user: User): Promise<Task[]> {
  const tasksRef = ref(db, `tasks/${user.id}`);

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
  const taskRef = ref(db, `tasks/${user?.id}/${id}`);

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
  const taskRef = ref(db, `tasks/${user?.id}/${id}`);

  try {
    await update(taskRef, data);
    return true;
  } catch (error) {
    return false;
  }
}
