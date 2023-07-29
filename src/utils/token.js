export function saveToken(token){
    localStorage.setItem('Token',token)
}

//用于从localStorage中读取token
export function getToken(){
    return localStorage.getItem('Token')
}

export function deleteToken(){
    localStorage.removeItem('Token')
}