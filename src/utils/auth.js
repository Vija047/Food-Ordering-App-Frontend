export const isauthenticated=()=>{
    return !!localStorage.getItem("token");
    
}