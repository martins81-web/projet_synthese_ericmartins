import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import DashBoardUsers from '../Dashboard/DashBoardUsers';

describe("Valeur input recherche", ()=>{
    it('mise à jour au changement', ()=>{
        const { queryByPlaceholderText} = render(<DashBoardUsers usersType='candidats'/>)

        const searchInput = queryByPlaceholderText('Rechercher');

        searchInput &&
        fireEvent.change(searchInput, {target:{value: 'test'}}) //on rentre la valeur 'test' dans l'input de recherche

        var inputValue = (queryByPlaceholderText('Rechercher') as HTMLInputElement).value;

        expect(inputValue).toBe('test') //on attend que la valeur soit 'test'. Ce test doit passer!
    })
})

describe("Valeur input recherche2", ()=>{
    it('mise à jour au changement', ()=>{
        const { queryByPlaceholderText} = render(<DashBoardUsers usersType='candidats'/>)

        const searchInput = queryByPlaceholderText('Rechercher');
        
        searchInput &&
        fireEvent.change(searchInput, {target:{value: 'test'}}) //on rentre la valeur 'test' dans l'input de recherche

        var inputValue = (queryByPlaceholderText('Rechercher') as HTMLInputElement).value;

        expect(inputValue).toBe('pasTest') //on attend que la valeur soit 'test'. Ce test ne doit passer!
    })
})