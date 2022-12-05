const isString = (param:any)=>{
    return typeof param === "string"
}


const verifyProps = (props:any,prop:any)=>{
if(!isString(props))  throw new Error(prop+' tiene que ser un valor de tipo string')
return props
}

export const verifyPropsUser = (object:any)=>{
    
    const user = {
        username:object.username ? verifyProps(object.username,"username"):"",
        profileUrl:object.profileUrl ? verifyProps(object.profileUrl,"profileUrl"): "",
        email:verifyProps(object.email,"email"),
        password: verifyProps(object.password,"password"),
    }
    return user
}