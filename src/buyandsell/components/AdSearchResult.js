import React from 'react'

export const AdSearchResult = ({...props}) => {
    return (
        <>
        <div> Category: {props.category}</div>
        <div> Sub Category: {props.subcategory}</div>

        </>
    )
}
