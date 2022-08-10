

export default async (req, res) => {

    let term_data = await fetch('https://get-server-prod.herokuapp.com/glossary/findbyid?' + new URLSearchParams({
      collection_alias: req.query.collection_alias,
      id: req.query.id
      }), {
          credentials: 'include'
      })
    let response = await term_data.json()
    res.json(response);
}