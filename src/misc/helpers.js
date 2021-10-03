
export function getNameInitials(name) {
    const splitName = name.toUpperCase().split(' ');
    if (splitName.length > 1) {
        return splitName[0][0] + splitName[1][0]; 
    }
    return splitName[0][0];

}
export function formatPhone(phone)
{
    const phone_val = phone.replace(/\D[^\.]/g, "");
    return phone_val.slice(0,3)+"-"+phone_val.slice(3,6)+"-"+phone_val.slice(6);
}

export function convertDate(rawdate)
{
    const date=new Date(rawdate);
    const converteddate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    return converteddate;
}

export function convertTime(rawdate)
{
    const date=new Date(rawdate);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  
}
export function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
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
export function transformArrWithoutId(snapVal) {
    snapVal=snapVal[0];
    const data= snapVal ? Object.keys(snapVal).map(roomId => {
        console.log(roomId);
        if(roomId!=='id')
          return { ...snapVal[roomId]}
    }): [];
    console.log(data);
    return data;

}
// export function transformArrWithoutId(snapVal) {
//     const result=[]
//     console.log(snapVal);
//     if(snapVal.length==0)
//         return result;
//     for(var field in snapVal[0])
//     {
//         console.log(field);
//         console.log(snapVal[field]);
//         if (field != 'id')
//         {
//          result.push(field)
//         }
//     }
//     console.log(result);
//     return result;

//}
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