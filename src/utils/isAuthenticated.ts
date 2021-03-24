import jwt_decode from "jwt-decode";

const isAuthenticated = () => {
   if(typeof window !== 'undefined'){
       const accessToken = localStorage.getItem('access_token');
       if ([undefined, null, ''].includes(accessToken)) {
           return false;
       }
       try {

           if (accessToken !== null) {
               const decodedToken = jwt_decode(accessToken);
               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
               // @ts-ignore
               if (new Date().getTime() / 1000 <= new Date(decodedToken.exp)) {
                   return true;
               }
           }
       } catch (e) {
           return false;
       }
   }
    return false;
};

export default isAuthenticated;
