import { SecteursAcitiviteType, UtilisateursType } from './Types';

const ENDPOINT='http://localhost:3001/api/'

export const fetchSecteursActivite = async (): Promise<SecteursAcitiviteType[]> => {
  const data = await (await fetch(ENDPOINT+"secteurs")).json();
  return data;
};


export const fetchUtilisateurs = async (): Promise<UtilisateursType[]> => {
  const data = await (await fetch(ENDPOINT+"utilisateurs")).json();
  return data;
};