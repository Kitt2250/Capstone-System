import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export async function logAudit({ user, role, action, target }) {
  try {
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace("T", " ");
    await addDoc(collection(db, "auditLogs"), {
      user,
      role,
      action,
      target,
      timestamp,
    });
  } catch (err) {
    console.error("Failed to write audit log:", err);
  }
}