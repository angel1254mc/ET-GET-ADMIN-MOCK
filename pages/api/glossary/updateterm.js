

export default async (req, res) => {
    const parseBody = JSON.parse(req.body)
    const response =  await fetch('https://get-server-prod.herokuapp.com/glossary/updateterm', {
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
        res.send(response.statusText) 
}