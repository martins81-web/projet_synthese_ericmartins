import { cleanup, render, screen } from '@testing-library/react';
import APropos from '../APropos';


test('Doit rendre le composant Apropos et tester si lelement est present', ()=>{
    render(<APropos/>);
    const element = document.querySelector('#apropos-1');
    expect(element).toBeInTheDocument(); //ce test doit passer
})

test('Doit rendre le composant Apropos et tester si une portion de text est presente', ()=>{
    render(<APropos/>);
    const element = document.querySelector('#apropos-1');
    expect(element).toHaveTextContent('Lorem ipsum'); 
    //ce test ne doit passer, cette string nexiste pas dans l'element selectionné, si on le change pour 'eStage' le test passe.
})





