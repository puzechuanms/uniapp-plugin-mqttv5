import Cookies from "js-cookie";
export function getCookie(key){
    return Cookies.get(key)
}
export function setCookie(key,value){
    return Cookies.set(key,value,{ path: '/'})
}
export function setCookieWeek(key,value){
    return Cookies.set(key,value,{ path: '/',expires:7})
}