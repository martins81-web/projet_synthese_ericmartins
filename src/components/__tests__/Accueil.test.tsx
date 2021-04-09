import { cleanup, render, screen } from '@testing-library/react';

import Accueil from '../Accueil';

test('Doit rendre le composant Accueil', ()=>{
    render(<Accueil toast={()=>console.log('toast')}/>);
    const accueilElement = screen.getByTestId('accueil-1');
    expect(accueilElement).toBeInTheDocument(); //ce test doit passer
})


test('Element avec lID accueil-1 contient le text: hello world', ()=>{
    render(<Accueil toast={()=>console.log('toast')}/>);
    const accueilElement = screen.getByTestId('accueil-1');
    expect(accueilElement).toHaveTextContent('hello world'); //ce test ne doit pas passer
})


