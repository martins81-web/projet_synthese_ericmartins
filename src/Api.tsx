import { SecteursActiviteType, UtilisateursType } from './Types';


const ENDPOINT='http://localhost:3001/api/'

export const fetchSecteursActivite = async (): Promise<SecteursActiviteType[]> => {
  const data = await (await fetch(ENDPOINT+"secteurs")).json();
  return data;
};

export const updateSecteurActivite = async (secteur: SecteursActiviteType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  console.log(secteur);
  const {_id, ...secteurToEdit} = secteur;
  let updated=''
  fetch(ENDPOINT+ "secteurs/"+ secteur._id, {
    method: 'put', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    },
    body: JSON.stringify(secteurToEdit) // We send data in JSON format
   })
    .then(response => {
      response.json();
      updated='updated'
      return updated;
    })
    .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
    .catch(err => console.log(err))

    return updated;
}


export const fetchUtilisateurs = async (): Promise<UtilisateursType[]> => {
  const data = await (await fetch(ENDPOINT+"utilisateurs")).json();
  return data;
  
};

export const fetchUtilisateur = async (id: string): Promise<UtilisateursType> => {
  const data = await (await fetch(ENDPOINT+"utilisateurs/"+id)).json();
  return data;
  
};


export const updateUtilisateur = async (user: UtilisateursType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  const {_id, ...userToEdit} = user;
  let updated=''
  fetch(ENDPOINT+ "utilisateurs/"+ user._id, {
    method: 'put', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    },
    body: JSON.stringify(userToEdit) // We send data in JSON format
   })
    .then(response => {
      response.json();
      updated='updated'
      return updated;
    })
    .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
    .catch(err => console.log(err))

    return updated;
}

