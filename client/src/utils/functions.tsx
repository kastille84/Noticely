export const limitText = (text:string, charLimit:number) => {
    if(text.length >= charLimit) {
        return text.slice(0, charLimit) + "...";
    } else {
        return text;
    }
}

  //slidepanel comp needs proper width based on windowwidth
export const getWindowWidth = () => {
    let w = window.innerWidth;
    if (w > 768) {
      return "50%";
    } else if (w <= 768 && w > 425) {
      return "70%";
    } else if (w <= 425) {
      return "90%";
    }
  };

export const IsEmptyObj = (obj:any):boolean => {
  return Object.keys(obj).length === 0;
}