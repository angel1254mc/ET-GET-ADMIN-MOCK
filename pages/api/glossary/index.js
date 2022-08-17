

export default async (req, res) => {
    console.log(req.query.search);
    let response = await fetch('https://get-server-prod.herokuapp.com/' + 'glossary?' + new URLSearchParams({
        page: req.query.page,
        collection_alias: 'glossary',
        term: req.query.term,
        results_per_page: 8
    }), {
        credentials: 'include'
    })
    response = await response.json();
    console.log(response);
    res.json(response);
}