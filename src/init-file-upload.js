import Vue from 'vue';
import * as firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDt8hvS8flSNBi3WG5V5E1V_txVUZ7eLDU',
  authDomain: 'student-press-7764a.firebaseapp.com',
  databaseURL: 'https://student-press-7764a.firebaseio.com',
  projectId: 'student-press-7764a',
  storageBucket: 'gs://student-press-7764a.appspot.com/',
  messagingSenderId: '787729008611',
  appId: '1:787729008611:web:a56a527cd06e9b5aeb82d6',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

function uploadFile(storageRef, fileTitle, fileBlob, onProgress) {
  return new Promise((resolve, reject) => {
    const uploadTask = storage.ref().child(`/${storageRef}/${fileTitle}`).put(fileBlob);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (onProgress) onProgress(progress);
    });
    uploadTask.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadUrl) => {
        resolve(downloadUrl);
      }).catch(reject);
    });
  });
}

Vue.prototype.$uploadFile = uploadFile;
