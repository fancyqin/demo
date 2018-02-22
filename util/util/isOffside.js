// const isDom = (obj)=>{
//     return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
// }

const isOffside = (dom) =>{
    const el = typeof dom === 'string' ? document.querySelector(dom): dom;
    const domRect =  el.getBoundingClientRect();
    if(domRect.top >= 0 && domRect.left >= 0 && domRect.bottom <= window.innerHeight && domRect.right <= window.innerWidth){
        return false;
    }else{
        let str = '';
        if(domRect.top < 0){
            str += 'top';
        }
        if(domRect.bottom > window.innerHeight){
            str += 'bottom';
        }
        if(domRect.left < 0){
            str += 'left';
        }
        if(domRect.right > window.innerWidth){
            str += 'right';
        }
        return str;
    }
    
}


export default isOffside;