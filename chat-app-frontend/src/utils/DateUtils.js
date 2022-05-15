export function calculateMessageDate(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    if ((now.getTime() - date.getTime()) / (1000*3600*24) > 1) {
        console.log((now.getTime() - date.getTime()) / (1000*3600*24));
        return date.toDateString();
    } else {
        return date.getHours() + ":" + date.getMinutes();
    }
}