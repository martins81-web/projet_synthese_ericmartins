import { cleanup, render, screen } from '@testing-library/react';

import SelectRegion from '../Selects/SelectRegion';

test('Doit rendre le composant SelectRegion', ()=>{
    render(<SelectRegion onChange={(selected)=>console.log(selected)}/>);
    const select = screen.getByTestId('region-1');
    expect(select).toBeInTheDocument(); //ce test doit passer
})

test('Select vide?', () => {
    render(<SelectRegion onChange={(selected)=>console.log(selected)}/>);
    const select = screen.getAllByLabelText('Region');

    expect(select).toBeEmptyDOMElement();
})