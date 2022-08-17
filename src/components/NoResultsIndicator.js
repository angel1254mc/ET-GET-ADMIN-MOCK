import React from 'react'

function NoResultsIndicator({pageData}) {
    if (pageData.length > 0)
        return (
        <></>
    )
    return (
        <div id="no-results-card">No results were found</div>
    )
}

export default NoResultsIndicator