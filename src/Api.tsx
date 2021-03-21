import { SecteursActiviteType, UtilisateursType } from './Types';


const ENDPOINT='http://localhost:3001/api/'

export const fetchSecteursActivite = async (): Promise<SecteursActiviteType[]> => {
  const data = await (await fetch(ENDPOINT+"secteurs")).json();
  return data;
};


export const fetchUtilisateurs = async (): Promise<UtilisateursType[]> => {
  const data = await (await fetch(ENDPOINT+"utilisateurs")).json();
  return data;
  
};


export const updateUtilisateur = (user: UtilisateursType) => {
  //const {currentIndustry, ...filteredObject} = myObject;
  const {_id, ...userToEdit} = user;

  fetch(ENDPOINT+ "utilisateurs/"+ user._id, {
    method: 'put', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    },
    body: JSON.stringify(userToEdit) // We send data in JSON format
   })
    .then(response => response.json())
    .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
    .catch(err => console.log(err))
}

