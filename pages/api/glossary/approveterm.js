import authMiddleware from "../../../src/controller/authMiddleware";

export default async (req, res) => {
    const authenticated = authMiddleware(req)
    if (!authenticated)
    {
        return res.status(401).send({'message': 'You are not logged in and thus cannot perform this function'});
    }
    const parseBody = JSON.parse(req.body)
    parseBody.SERVER_SECRET_API_KEY = process.env.SERVER_SECRET_API_KEY;
    const response =  await fetch('https://get-server-prod.herokuapp.com/glossary/approverequested', {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        method: 'POST',
        body: JSON.stringify(parseBody)
    })

    const message = await response.json();
    console.log(message);
    if (response.status === 200)
        res.json(message);
    else
        res.send(response.statusText); 
}