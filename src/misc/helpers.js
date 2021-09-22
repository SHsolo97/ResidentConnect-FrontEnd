
export function getNameInitials(name) {
    const splitName = name.toUpperCase().split(' ');
    if (splitName.length > 1) {
        return splitName[0][0] + splitName[1][0]; 
    }
    return splitName[0][0];

}
export function convertDate(rawdate)
{
    const date=new Date(rawdate);
    const converteddate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    return converteddate;
}
export function calculateAverageStars(_1star,_2star,_3star,_4star,_5star,_totrating)
{
    let averageRating=((1*_1star)+ (2*_2star)+(3*_3star)+(4*_4star)+(5*_5star))/_totrating;
    return Math.round(averageRating,1).toFixed(1);
}
export function transformToArr(snapVal) {
    return snapVal ? Object.keys(snapVal) : [];
}
export function transformArrWithId(snapVal) {
    return snapVal ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId }
    }): [];

}
export async function getUserUpdates(userId, keyToUpdate, value, db) {
    const updates = {};

    updates[`/profiles/${userId}/${keyToUpdate}`] = value;
    
    const getMsgs = db.ref(`/messages`).orderByChild(`author/uid`).equalTo(userId).once('value');
    const getRooms = db.ref(`/rooms`).orderByChild(`lastMessage/author/uid`).equalTo(userId).once('value');
    const [mSnap,rSnap] = await Promise.all([getMsgs, getRooms]);
    mSnap.forEach(msgSnap => {
        updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
    });
    rSnap.forEach(roomSnap => {
        updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
    });
    // console.log(updates);
    return updates;

}

export function groupBy(array,groupingKeyFn) {

    return array.reduce((result,item) => {
        const groupingKey = groupingKeyFn(item);
        if (!result[groupingKey]) {
            result[groupingKey] = [];
        }
        result[groupingKey].push(item);
        return result;
    }, {})
}