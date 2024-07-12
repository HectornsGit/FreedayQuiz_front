'use client';
import { useState } from 'react';

//El id de la pregunta tiene que ir por props para asignarle value al input
export default function CheckQuestions(props) {
    console.log(props);
    // console.log('1.recibo por props el id', idQuestion )

    const { setValueCheckbox, idQuestion, valueCheckbox } = props;
    /*    console.log('SET', setValueCheckbox )
    //const {valueCheckbox} = state
    console.log('1.id', idQuestion )*/

    //console.log('1.destructuring', idQuestion, seteo, state )

    return (
        <>
            <input
                type="checkbox"
                //value={idQuestion}
                onChange={handleValue}
            />
        </>
    );
}
