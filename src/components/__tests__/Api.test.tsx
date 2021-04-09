import {fetchUtilisateurs} from '../../Api'



describe("test fetch users", ()=>{
    test("doit retourner les utilisateurs", async ()=>{
        const result = await fetchUtilisateurs();
        expect(result).toBe('Eric'); //test ne doit pas passer, result doit avoir un array d'objects et pas une string
    })
})

describe("test fetch users2", ()=>{
    test("doit retourner les utilisateurs", async ()=>{
        const result = await fetchUtilisateurs();
        const user = result.find(user=> user.Prenom==='Homer');
        expect(user?.Prenom).toBe('Homer'); //test doit passer
    })
})