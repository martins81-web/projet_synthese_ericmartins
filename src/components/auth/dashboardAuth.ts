//fonctions callback de connexion et déconnexion
const dashboardAuth={
    signIn (cb:()=> void){
        setTimeout(cb,100);
    },
    signOut (cb:()=> void){
        setTimeout(cb,100);
    },
};

export default dashboardAuth;