

export default async (req, res) => {
    console.log(req.body)
    const response =  await fetch('https://get-server-prod.herokuapp.com/glossary/updateterm', {
        credentials: 'include',
        method: 'POST',
        body: req.body
    })

    if (response.status === 200)
        res.json(message);
    else
        res.send(response.statusText) 
}