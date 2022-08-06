import React, { useEffect, useState } from 'react'
import styles from '../../styles/Admin.module.css';
import Sidebar from '../../src/components/Sidebar';
import Link from 'next/link';
import fakeData from '../../src/fakeData/fakeTerms';
import Pagination from '../../src/components/Pagination';
import { useRouter } from 'next/router';
const itemsPerPage = 7;
const totalItemCount = 1000;

const totalPages = Math.ceil(totalItemCount/itemsPerPage);

function Glossary({terms, curr_page}) {
    const router = useRouter();
    const [currPage, setCurrPage] = useState(1);
    const [loading, setLoading] = useState(true);
    
    //Triggers when there is a change in the query
    useEffect(() => {
        if (!(Object.keys(router.query).length <= 0))
        {
            console.log("new router query params: " + JSON.stringify(router.query));
            setCurrPage(router.query.page);
        }
            
    }, [router.query])
    
    
    
    
    return (
    <div className={styles.admin_container}>
        <Sidebar curr_path="gloss"></Sidebar>
        <div className={styles.admin_main}>
            <div className={styles.admin_lead}>Current Page: {currPage}</div>
            <Pagination additionalURLParams={'&filter=booty'} curr_page={currPage} total_pages={totalPages}></Pagination>
        </div>
    </div>
  )
}


export default Glossary