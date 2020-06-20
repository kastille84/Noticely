export const limitText = (text:string, charLimit:number) => {
    if(text.length >= charLimit) {
        return text.slice(0, charLimit) + "...";
    } else {
        return text;
    }
}