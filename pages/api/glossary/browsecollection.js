

export default async (req, res) => {
    const response = await fetch('https://get-server-prod.herokuapp.com/' + 'glossary/browsecollection?' + new URLSearchParams({
                page: req.query.page,
                collection_alias: req.query.collection_alias,
                results_per_page: 8
            }), {
                credentials: 'include'
            });
    const toJson = await response.json();
    return res.json(toJson);
}