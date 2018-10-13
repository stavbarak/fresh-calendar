import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAPS_P58Rxittk8Ul4A84KsF5d4E-HZwdU",
  authDomain: "custom-calendar-c6c54.firebaseapp.com",
  databaseURL: "https://custom-calendar-c6c54.firebaseio.com",
  projectId: "custom-calendar-c6c54",
  storageBucket: "custom-calendar-c6c54.appspot.com",
  messagingSenderId: "589826858674"
};

firebase.initializeApp(firebaseConfig);
let firebase_tasks = firebase.database().ref('Tasks');

export async function fetchTaskFromServer(id) {
  let snapshot = await firebase_tasks.child(id).once('value')
  return snapshot.val();
}

export async function fetchTasksFromServer() {
  let snapshot = await firebase_tasks.once('value')
  return snapshot.val()
}

export async function updateTaskInServer(id, values) {
  let updates = {}
  for(let key in values) {
    updates['/' + key] = values[key]
  }
  return await firebase_tasks.child(id).update(updates);
}

export async function createTaskInFirebase(task) {
  let payload = { ...task };
  return await firebase_tasks.push(payload);
}

export async function deleteTaskInFirebase(id) {
  return await firebase_tasks.child(id).remove()
}
