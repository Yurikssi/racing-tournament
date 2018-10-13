import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}
firebase.initializeApp(config)
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)
const usersCollection = db.collection('users')
const storageRef = firebase.storage().ref()

export default {
  db,
  auth,
  currentUser,
  usersCollection,
  storageRef
}
