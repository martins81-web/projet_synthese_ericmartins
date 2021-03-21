import { ObjectType } from 'typescript';

export type SecteursActiviteType={
    _id: string,
    Titre: string,
    Actif: boolean,
    Supprime: boolean 
  }

  export type UtilisateursType={
    _id: string
    Nom:string,
    Prenom:string,
    Entreprise:boolean,
    NomEntreprise:string,
    Adresse:string,
    Ville:string,
    Region:string,
    Logo:string,
    Courriel:string,
    Telephone:string,
    SiteWeb:string,
    CV:string,
    MessageMotivation: string,
    MotdePasse:string,
    Actif:boolean,
    Supprime:boolean,
    Valide:boolean,
    NiveauAcces: number
    PremierConnexion: boolean,
    SecteursActivites: Array<string>,
    PostesStagiaires: Array<string>,
    Ecole: string
  }

  