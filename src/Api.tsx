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

  var updated= await (await fetch(ENDPOINT+ "offreDemande/"+ offreDemande._id, {
    method: 'put', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(offreDemandeToEdit) // Envoie du data en format JSON 
   })).json()
    

    return updated;
}

export const addOffreDemande = async (OffreDemande: OffresDemandesType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  //console.log(OffreDemande);
  const {_id, ...offreDemandeToAdd} = OffreDemande;
  var added= await fetch(ENDPOINT+ "offreDemande/", {
    method: 'post', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(offreDemandeToAdd) // Envoie du data en format JSON 
   })

    return added.json();
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
  var updated= await fetch(ENDPOINT+ "regions/"+ region._id, {
    method: 'put', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(regionToEdit) // Envoie du data en format JSON 
  })

    return updated.json();
}

export const addRegion = async (region: RegionsType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  console.log(region);
  const {_id, ...regionToAdd} = region;
  var added = await (await fetch(ENDPOINT+ "regions/"+ region._id, {
    method: 'post', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(regionToAdd) // Envoie du data en format JSON 
   })).json();

    return added;
}

export const fetchSecteursActivite = async (): Promise<SecteursActiviteType[]> => {
  const data = await (await fetch(ENDPOINT+"secteurs")).json();
  return data;
};

export const fetchSecteur = async (id: string): Promise<SecteursActiviteType> => {
  const data = await (await fetch(ENDPOINT+"secteurs/"+id)).json();
  return data;
  
};

export const updateSecteurActivite = async (secteur: SecteursActiviteType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  console.log(secteur);
  const {_id, ...secteurToEdit} = secteur;
  var updated= await fetch(ENDPOINT+ "secteurs/"+ secteur._id, {
    method: 'put', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(secteurToEdit) // Envoie du data en format JSON 
   })
    

    return updated.json();
}

export const addSecteurActivite = async (secteur: SecteursActiviteType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  console.log(secteur);
  const {_id, ...secteurToAdd} = secteur;
  
  var added = await fetch(ENDPOINT+ "secteurs/"+secteur._id, {
    method: 'post', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(secteurToAdd) // Envoie du data en format JSON 
   })

    return added.json();
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
  var updated= await fetch(ENDPOINT+ "utilisateurs/"+user._id, {
    method: 'put', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu  
    },
    body: JSON.stringify(userToEdit) // Envoie du data en format JSON 
   })
  
    return updated.json();
}

export const addUtilisateur = async (utilisateur: UtilisateursType) : Promise<string> => {
  //const {currentIndustry, ...filteredObject} = myObject;
  console.log(utilisateur);
  const {_id, ...utilisateurToAdd} = utilisateur;
  var added= await fetch(ENDPOINT+ "utilisateurs/"+ utilisateur._id, {
    method: 'post', // Méthode elle-même
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indique le contenu 
    },
    body: JSON.stringify(utilisateurToAdd) // Envoie du data en format JSON 
   })

    return added.json();
}
