export function calculateMessageDate(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    if ((now.getTime() - date.getTime()) / (1000*3600*24) > 1) {
        return date.toDateString();
    } else {
        const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return date.getHours() + ":" + minutes; 
    }
}