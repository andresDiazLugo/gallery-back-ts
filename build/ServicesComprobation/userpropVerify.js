"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPropsUser = void 0;
const isString = (param) => {
    return typeof param === "string";
};
const verifyProps = (props, prop) => {
    if (!isString(props))
        throw new Error(prop + ' tiene que ser un valor de tipo string');
    return props;
};
const verifyPropsUser = (object) => {
    const user = {
        username: object.username ? verifyProps(object.username, "username") : "",
        profileUrl: object.profileUrl ? verifyProps(object.profileUrl, "profileUrl") : "",
        email: verifyProps(object.email, "email"),
        password: verifyProps(object.password, "password"),
    };
    return user;
};
exports.verifyPropsUser = verifyPropsUser;
