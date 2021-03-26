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

  export type RegionsType={
    _id: string,
    Name: string,
    Actif: boolean,
    Supprime: boolean 
  }
  

  export type OffreDemandeType={
    _id: string,
    Titre: string,
    Type: string,
    SecteurActivite: string,
    Ville:string,
    Region:string,
    DateDebut:Date,
    DateFin: Date,
    DureeStage: string,
    Description: string,
    NombreHeuresSemaine: number,
    CompetencesRecherches: string,
    EmploiApresStage: boolean,
    InformationsSuplementaires: string,
    ProgrammesSuivi: string,
    AutresFormations: string,
    CompetencesAcquises: string,
    DescriptionPosteRecherche: string,
    Remuneration: string,
    DateParution: Date,
    AutresInformations: string,
    Actif: boolean,
    Supprime: boolean,
    Valide:boolean,
    Communications:[{
      Date: Date,
      EnvoyeParID: string,
      Message: string,
      NbMessages: number
    }],
    Auteur: string,
    TypeStage: string,
    DureeSemaines: number,
    Vedette: boolean
  }