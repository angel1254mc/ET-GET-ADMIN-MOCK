import React, {useState, useEffect} from 'react'
import styles from '../../styles/Admin.module.css';
import ReqStyles from '../../styles/Requested.module.css'
import Sidebar from '../../src/components/Sidebar';
import Link from 'next/link';
import fakeData from '../../src/fakeData/fakeTerms';
import ReqTerms from '../../public/req_terms.svg'
import GlossTerms from '../../public/gloss_terms.svg';
import CardComponent from '../../src/components/CardComponent';
import Pagination from '../../src/components/Pagination';
import { useRouter } from 'next/router';
import SearchBar from '../../src/components/SearchBar';
import NoResultsIndicator from '../../src/components/NoResultsIndicator';
import authMiddleware from '../../src/controller/authMiddleware';


function Requested({terms, current_page, totalPages, search_query}) {
    const router = useRouter();
    const [currPage, setCurrPage] = useState(current_page);
    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState([]); //Empty array that will be populated w/ fetch data and handleGetPageData
    const [currSearch, setCurrSearch] = useState(search_query);
    /**Defining functions for maping server-side data on component mount */
    const handleGetPageData = (page = 1, search = "") => {
        if (!search || search.length <= 0)
        {
            fetch('http://localhost:3000/api/' + 'glossary/retrieveall?' + new URLSearchParams({
                page: page,
                collection_alias: 'requested',
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
            fetch('http://localhost:3000/api/' + 'glossary?' + new URLSearchParams({
                page: page,
                collection_alias: 'requested',
                term: search,
                results_per_page: 8
            }), {
                credentials: 'include'
            })
            .then(response => response.json())
            .then((data) => {
                setPageData(data);
                console.log(data);
                setLoading(false);
            })
        }
    }
    
    //Runs whenever theres a change in queries- refetches data for current page and populates w/ elements
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
        <Sidebar curr_path="req"></Sidebar>
        <div className={styles.admin_main}>
          <div className={ReqStyles.content_container}>
            <div className={ReqStyles.requested_header}>
                <ReqTerms className={ReqStyles.header_icon}/>
                <div className= {ReqStyles.header_lead}>
                    Requested Terms
                </div>
            </div>
            {/**<SearchBar active_href="requested"/>*/}
            <div className={ReqStyles.term_cards_container}>
                {
                    loading ? ""
                    : pageData.map((data, index) => {
                        return index < 8 ? <CardComponent collection_alias={"requested"} data={data} key={'key-card-' + index} index={index}></CardComponent> : "";
                    })

                }

            </div>
            <Pagination additionalURLParams={'none'} active_href="requested" curr_page={currPage} total_pages={totalPages} searchQuery={currSearch}></Pagination>
          </div>
        </div>
    </div>
  )
}

export async function getServerSideProps (ctx) {
    const userIsAuthenticated = authMiddleware(ctx.req);
    console.log(userIsAuthenticated);
    if (!userIsAuthenticated)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    } 
    
    let totalPages;
    totalPages = await fetch('http://localhost:3000/api/glossary/searchsize?' + new URLSearchParams({
        collection_alias: 'requested',
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
//There will be some form of getServerSideProps here to obtain the following
//amount of terms (in general or that match the search_query)
//current page router.query.page
//terms in current page w/ or without search_query
//calculate (locally) total amount of pages using amount of terms
export default Requested