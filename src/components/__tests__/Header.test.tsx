import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Header from '../Header';

it('Composant rend correctement et le button recherche est présent', ()=>{
    const {queryByTestId} = 
    render(<Header imageURL='' imgSize={600} logout={()=>console.log('logout')} recherche={()=>console.log('recherche')}/>);
    expect(queryByTestId('button-recherche')).toBeTruthy(); //ce test doit passer
})

it('Vérifie sil y a un placeholderText avec le text keyword', ()=>{
    const { queryByPlaceholderText} = 
    render(<Header imageURL='' imgSize={600} logout={()=>console.log('logout')} recherche={()=>console.log('recherche')}/>);
    expect(queryByPlaceholderText('keyword')).toBeTruthy(); //ce test ne doit pas passer, le placeholderText dans ce composant a comme text: Mot clé
})