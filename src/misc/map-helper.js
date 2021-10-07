

export const getGeoOrdinates = async (address) => {
    let geocoder = new window.google.maps.Geocoder();
    //console.log(address);
    return await geocoder
        .geocode(address)
        .then((result) => {
            const { results } = result;
            //console.log(results);
            if (results.length > 0)
            {
                //console.log( results[0].geometry.location);
                return results[0].geometry.location;
            }      
            else
                return null;
            })

        .catch((e) => {
            alert("Geocode was not successful for the following reason: " + e);
            return null;
        });
}