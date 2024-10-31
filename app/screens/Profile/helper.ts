import { db } from "@/firebaseConfig";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const getUserData = async (currentUser: User | null) => {
    const docRef = doc(db, "users", currentUser ? currentUser.uid: "")
    const docSnap =  await getDoc(docRef)

    if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
}