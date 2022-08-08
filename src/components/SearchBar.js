import { Router, useRouter } from 'next/router';
import React, {useState, useEffect} from 'react'
import SearchStyles from '../../styles/SearchBar.module.css'
function SearchBar({active_href = "glossary"}) {
  
    const router = useRouter();
    const [input, setInput] = useState("")
    const conductSearch = (search_query) => {
        console.log("Perform search! " + encodeURIComponent(search_query));
        if (!search_query)
        {
            router.push({
                pathname: active_href,
                query: {page: 1, search: search_query}
            },
            undefined
            );
        }
        else if (search_query)
        {
            const encodedSearch = encodeURIComponent(search_query);
            router.push({
                pathname: active_href,
                query: {page: 1, search: encodedSearch}
            },
            undefined
            );
        }
    }
    return (
    <div className={SearchStyles.search_component}>          
        <input className={SearchStyles.search_form} 
        type="text" 
        id="fname" 
        name="fname" 
        placeholder="Search Terms"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
            if (e.key === 'Enter')
                conductSearch(input);
        }}
        />
        <button onClick={() => {conductSearch(input)}}>
            <div className={SearchStyles.search_button}> Search</div>
        </button>
    </div>
  )
}

export default SearchBar