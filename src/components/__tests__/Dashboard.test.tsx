import React from 'react';
import * as ReactDOM from 'react-dom';
import Dashboard from '../Dashboard/Dashboard';



describe('Test composant login', ()=>{
    let container: HTMLDivElement


    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Dashboard logout={()=>console.log('logout')}/>, container)
    })

    afterEach(()=>{
        document.body.removeChild(container);
        container.remove();
    })

    it('Rendre correctement le document initial et verifie quil y a un titre h4', ()=>{
        const inputs = container.querySelectorAll('h4');
        expect(inputs).toHaveLength(2); //test doit passer 
        
    })

   
}) 