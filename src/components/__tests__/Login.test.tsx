import React from 'react';
import * as ReactDOM from 'react-dom';

import Login from '../Login';

describe('Test composant login', ()=>{
    let container: HTMLDivElement

    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Login login={true}/>, container)
    })

    afterEach(()=>{
        document.body.removeChild(container);
        container.remove();
    })

    it('Rendre correctement le document initial et verifie quil y a deux inputs', ()=>{
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(2); //test doit passer -- le login a 2 inputs!
        
    })

    it('Rendre correctement le document initial et verifie si le premier input a Email comme name', ()=>{
        const inputs = container.querySelectorAll('input');
        expect(inputs[0].name).toBe('email'); //test ne doit pas passer, le name du premier input est 'Courriel'
    })

}) 