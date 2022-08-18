import { verify } from 'jsonwebtoken';

/**
 * Returning true means the user is authenticated,
 * Returning false means the user is not authenticated or an error occurred
 */
const authMiddleware = (req) => {
    const {cookies} = req;
    const jwt = cookies.etgetjwt;
    const url = req.url;
    console.log("Does the URL include admin? : " + url.includes('/admin'))
    if (url.includes("/admin") || req.method === "POST") {
      if (!jwt) {
          return false
      }

      try {
          verify(jwt, process.env.REFRESH_TOKEN_SECRET, () => {
            console.log("I finished verifying and it worked")
            return true;
          });
      }
      catch (error) {
          console.log(error)
          return false;
      }
      return true;
  }
  return true;
}

export default authMiddleware