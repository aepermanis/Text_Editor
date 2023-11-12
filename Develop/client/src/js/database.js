import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);
  const permission = jateDb.transaction('jate', 'readwrite');
  const storage = permission.objectStore('jate');
  const request = storage.add({ content });
  const result = await request;
  console.log('Data saved to the database', result);
};;


export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const permission = jateDb.transaction('jate', 'readonly');
  const storage = permission.objectStore('jate');
  const request = storage.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};


initdb();
