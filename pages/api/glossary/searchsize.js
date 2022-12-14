

export default async (req, res) => {
    let totalPages;
    totalPages = await fetch('https://get-server-prod.herokuapp.com/glossary/searchsize?' + new URLSearchParams({
        collection_alias: req.query.collection_alias,
        search_term: req.query?.search_term ? req.query.search_term : ""
    }), {
        credentials: 'include'
    })
    let response = await totalPages.json();
    res.json(response);
}