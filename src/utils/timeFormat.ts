export const formatHHMMSSDDMMYY = (time?: string): string => {
    if (time) {
        const date = new Date(time);
        const HH = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        const Min = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
        const SS = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;
        const DD = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        const MM = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const YY = date.getFullYear();
        return `${HH}:${Min}:${SS} ${DD}-${MM}-${YY}`;
    }
    return "";
} 
