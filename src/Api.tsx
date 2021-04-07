import { OffresDemandesType, RegionsType, SecteursActiviteType, UtilisateursType } from './Types';


const ENDPOINT='https://apiestage.herokuapp.com/api/'

export const fetchOffresDemandes = async (): Promise<OffresDemandesType[]> => {
  const data = await (await fetch(ENDPOINT+"offreDemande")).json();
  return data;
};

export const updateOffreDemande = async (offreDemande: OffresDemandesType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  //</string>console.log(offreDemande);
  const {_id, ...offreDemandeToEdit} = offreDemande;

  var updated= await fetch(ENDPOINT+ "offreDemande/"+ offreDemande._id, {
    method: 'put', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(offreDemandeToEdit) // Envoie du data en format JSON 
   })
    

    return updated.json();
}

export const addOffreDemande = async (OffreDemande: OffresDemandesType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  //console.log(OffreDemande);
  const {_id, ...offreDemandeToAdd} = OffreDemande;
  let added='';
  fetch(ENDPOINT+ "offreDemande/", {
    method: 'post', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(offreDemandeToAdd) // Envoie du data en format JSON 
   })
    .then(response => {
      response.json();
    })
    .then(data => console.log(data)) // Manipuler les données récupérées, si nous voulons en faire quelque chose
    .catch(err => console.log(err))

    return added;
}

export const fetchRegions = async (): Promise<RegionsType[]> => {
  const data = await (await fetch(ENDPOINT+"regions")).json();
  return data;
};

export const fetchRegion = async (id: string): Promise<RegionsType> => {
  const data = await (await fetch(ENDPOINT+"regions/"+id)).json();
  return data;
  
};

export const updateRegion = async (region: RegionsType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  //console.log(region);
  const {_id, ...regionToEdit} = region;
  let updated='';
  fetch(ENDPOINT+ "regions/"+ region._id, {
    method: 'put', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(regionToEdit) // Envoie du data en format JSON 
   })
    .then(response => {
      response.json();
     // updated='updated'
     // return updated;
    })
    .then(data => console.log(data)) // Manipuler les données récupérées, si nous voulons en faire quelque chose
    .catch(err => console.log(err))

    return updated;
}

export const addRegion = async (region: RegionsType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  console.log(region);
  const {_id, ...regionToAdd} = region;
  let added=''
  fetch(ENDPOINT+ "regions/"+ region._id, {
    method: 'post', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(regionToAdd) // Envoie du data en format JSON 
   })
    .then(response => {
      response.json();
      added='added'
      return added;
    })
    .then(data => console.log(data)) // Manipuler les données récupérées, si nous voulons en faire quelque chose
    .catch(err => console.log(err))

    return added;
}

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
    method: 'put', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(secteurToEdit) // Envoie du data en format JSON 
   })
    .then(response => {
      response.json();
      //updated='updated'
      //return updated;
    })
    .then(data => console.log(data)) // Manipuler les données récupérées, si nous voulons en faire quelque chose
    .catch(err => console.log(err))

    return updated;
}

export const addSecteurActivite = async (secteur: SecteursActiviteType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  console.log(secteur);
  const {_id, ...secteurToAdd} = secteur;
  let added=''
  fetch(ENDPOINT+ "secteurs/"+secteur._id, {
    method: 'post', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(secteurToAdd) // Envoie du data en format JSON 
   })
    .then(response => {
      response.json();
      added='added'
      return added;
    })
    .then(data => console.log(data)) // Manipuler les données récupérées, si nous voulons en faire quelque chose
    .catch(err => console.log(err))

    return added;
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
  fetch(ENDPOINT+ "utilisateurs/"+user._id, {
    method: 'put', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu  
    },
    body: JSON.stringify(userToEdit) // Envoie du data en format JSON 
   })
    .then(response => {
      response.json();
      updated='updated'
      return updated;
    })
    .then(data => console.log(data)) // Manipuler les données récupérées, si nous voulons en faire quelque chose
    .catch(err => console.log(err))

    return updated;
}

export const addUtilisateur = async (utilisateur: UtilisateursType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  console.log(utilisateur);
  const {_id, ...utilisateurToAdd} = utilisateur;
  let added=''
  fetch(ENDPOINT+ "utilisateurs/"+ utilisateur._id, {
    method: 'post', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(utilisateurToAdd) // Envoie du data en format JSON 
   })
    .then(response => {
      response.json();
      added='added'
      return added;
    })
    .then(data => console.log(data)) // Manipuler les données récupérées, si nous voulons en faire quelque chose
    .catch(err => console.log(err))

    return added;
}
