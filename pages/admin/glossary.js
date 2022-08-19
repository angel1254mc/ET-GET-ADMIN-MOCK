import React, { useEffect, useState } from 'react'
import styles from '../../styles/Admin.module.css';
import Sidebar from '../../src/components/Sidebar';
import Link from 'next/link';
import fakeData from '../../src/fakeData/fakeTerms';
import Pagination from '../../src/components/Pagination';
import GlossTerms from '../../public/gloss_terms.svg';
import GlossStyles from '../../styles/Glossary.module.css';
import CardComponent from '../../src/components/CardComponent';
import { useRouter } from 'next/router';
import SearchBar from '../../src/components/SearchBar';
import NoResultsIndicator from '../../src/components/NoResultsIndicator';
import authMiddleware from '../../src/controller/authMiddleware';
const itemsPerPage = 7;
const totalItemCount = 1000;

const totalPages = Math.ceil(totalItemCount/itemsPerPage);
const BASE_URL = process.env.ENVIRONMENT === "development" ? 'http://localhost:3000' : process.env.HOST;

function Glossary({terms, current_page, totalPages, search_query}) {
    const router = useRouter();
    const [currPage, setCurrPage] = useState(current_page);
    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState([]); //Empty array that will be populated w/ fetch data and handleGetPageData
    const [currSearch, setCurrSearch] = useState(search_query);
    //Triggers when there is a change in the query
    const handleGetPageData = (page = 1, search = "") => {
        
        if (!search || search.length <= 0)
        {
            fetch('/api/glossary/browsecollection?' + new URLSearchParams({
                page: page,
                collection_alias: 'glossary',
                results_per_page: 8
            }), {
                credentials: 'include'
            })
            .then(response => response.json())
            .then((data) => {
                setPageData(data);
                setLoading(false);
            })
        }
        else if (search.length > 0)
        {
            fetch('/api/glossary?' + new URLSearchParams({
                page: page,
                collection_alias: 'glossary',
                term: search,
                results_per_page: 8
            }), {
                credentials: 'include'
            })
            .then(response => response.json())
            .then((data) => {
                setPageData(data);
                setLoading(false);
            })
        }
    }
    useEffect(() => {
        if (!(Object.keys(router.query).length <= 0))
        {
            //console.log("new router query params: " + JSON.stringify(router.query));
            setCurrSearch(router.query?.search);
            setCurrPage(router.query.page);
            setLoading(true);
            handleGetPageData( router.query.page, router.query.search)
        }
        else
            handleGetPageData(1, "");
            
    }, [router.query])
    
    
    return (
    <div className={styles.admin_container}>
        <Sidebar curr_path="gloss"></Sidebar>
        <div className={styles.admin_main}>
            <div className={GlossStyles.content_container}>
            <div className={GlossStyles.Gloss_header}>
                <GlossTerms className={GlossStyles.header_icon}/>
                <div className= {GlossStyles.header_lead}>
                    Glossary Terms
                </div>
            </div>
            <SearchBar/>
            <div className={GlossStyles.term_cards_container}>
                {
                    loading ? ""
                    : pageData.map((data, index) => {
                        return index < 8 ? <CardComponent collection_alias={"glossary"} data={data} key={'key-card-' + index} index={index}></CardComponent> : "";
                    })

                }
            <NoResultsIndicator pageData={pageData}/>
            </div>
            <Pagination additionalURLParams={'none'} active_href="glossary" curr_page={currPage} total_pages={totalPages} searchQuery={currSearch}></Pagination>
          </div>
        </div>
    </div>
  )
}
export async function getServerSideProps (ctx) {
    const userIsAuthenticated = authMiddleware(ctx.req);
    if (!userIsAuthenticated)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    } 
    let totalPages;
    console.log(BASE_URL);
    totalPages = await fetch(BASE_URL + '/api/glossary/searchsize?' + new URLSearchParams({
        collection_alias: 'glossary',
        search_term: ctx.query?.search ? ctx.query.search : ""
    }), {
        credentials: 'include'
    })
    totalPages = await totalPages.json();
    totalPages = Math.floor(totalPages.totalElements/8) + 1;//total amount of elements divided by elements per page, roofed, yields total page count
    return {
        props: 
        {
            totalPages: totalPages, //Create server endpoint to retrieve size of collection
            terms : fakeData,
            current_page: ctx.query?.page ? ctx.query.page : 1,
            search: ctx.query?.search ? ctx.query.search : ""
        }
    }
}

export default Glossary