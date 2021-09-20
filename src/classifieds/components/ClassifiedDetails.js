import React from 'react'
import { useCurrentClassified } from '../../context/currentclassified.context'

export const ClassifiedDetails = () => {
    const description= useCurrentClassified(v=>v.description);
    return (
        <div>
            {description}
            
        </div>
    )
}
