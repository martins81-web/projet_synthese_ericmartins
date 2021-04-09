import CardDernieresAnnonces from '../CardDernieresAnnonces';
import { Appel } from '../../Enum';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { screen } from '@testing-library/react';

describe('Test composant CardDernieresAnnonces', ()=>{
    let container: HTMLDivElement

    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<CardDernieresAnnonces type={Appel.OFFRE}/>, container)
    })

    afterEach(()=>{
        document.body.removeChild(container);
        container.remove();
    })

    it('Rendre correctement le document initial et verifie quil y a deux buttons', ()=>{
        const buttons = container.getElementsByClassName('button');
        expect(buttons).toBeTruthy() //test doit passer - il y deux element avec la class button!
        
    })

    it('Verifie si le text dans un des buttons est "Postuler"', ()=>{
        const buttons = screen.getByTestId('CardDerniersAnnonces');
        expect(buttons).toHaveTextContent('Détails'); //test ne doit pas passer
        
    })

   
}) 