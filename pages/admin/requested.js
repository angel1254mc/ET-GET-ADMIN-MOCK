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
const itemsPerPage = 7;
const totalItemCount = 1000;

const totalPages = Math.ceil(totalItemCount/itemsPerPage);

function Requested({terms, current_page}) {
    const router = useRouter();
    const [currPage, setCurrPage] = useState(current_page);
    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState([]); //Empty array that will be populated w/ fetch data and handleGetPageData
    
    /**Defining functions for maping server-side data on component mount */
    const handleGetPageData = (collection_alias = "", page = 1, search = "") => {
        fetch()
    }
    
    //Runs whenever theres a change in queries- refetches data for current page and populates w/ elements
    useEffect(() => {
        if (!(Object.keys(router.query).length <= 0))
        {
            console.log("new router query params: " + JSON.stringify(router.query));
            setCurrPage(router.query.page);
        }
            
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
            <div className={ReqStyles.search_component}>
                
                <input className={ReqStyles.search_form} type="text" id="fname" name="fname" placeholder="Search Terms"></input>
                <button>
                    <div className={ReqStyles.search_button}> Search</div>
                </button>
            </div>
            <div className={ReqStyles.term_cards_container}>
                {
                    loading ? "Loading Data (replace with loading svg)"
                    : fakeData.map((data, index) => {
                        return index < 8 ? <CardComponent data={data} key={'key-card-' + index} index={index}></CardComponent> : "";
                    })

                }
            </div>
            <Pagination additionalURLParams={'&filter=booty'} active_href="requested" curr_page={currPage} total_pages={totalPages}></Pagination>
          </div>
        </div>
    </div>
  )
}

export async function getServerSideProps (ctx) {
    return {
        props: 
        {
            terms : fakeData,
            current_page: ctx.query?.page ? ctx.query.page : 1
        }
    }
}
//There will be some form of getServerSideProps here to obtain the following
//amount of terms (in general or that match the search_query)
//current page router.query.page
//terms in current page w/ or without search_query
//calculate (locally) total amount of pages using amount of terms
export default Requested