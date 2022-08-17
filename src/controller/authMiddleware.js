import { verify } from 'jsonwebtoken';

const authMiddleware = (req) => {
    const {cookies} = req;
    const jwt = cookies.etgetjwt;
    const url = req.url;
    if (url.includes("/admin")) {
      if (!jwt) {
          return null
      }

      try {
          verify(jwt, process.env.REFRESH_TOKEN_SECRET)

          return true;
      }
      catch (error) {
          console.log(error)
          return false;
      }
  }
}

export default authMiddleware