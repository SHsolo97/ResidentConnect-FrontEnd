import React from 'react'
import { useCurrentClassified } from '../../context/currentclassified.context'

export const ClassifiedDetails = () => {
    const description= useCurrentClassified(v=>v.description);
    return (
        <div style={{whiteSpace:'pre-line'}}>
            {description}
            
        </div>
    )
}
