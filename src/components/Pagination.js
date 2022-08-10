import React, {useState, useEffect} from 'react'
import PagiStyles from '../../styles/Pagination.module.css';
import ChevronLeft from '../../public/chevron-left-solid.svg';
import ChevronRight from '../../public/chevron-right-solid.svg';
import { useRouter } from 'next/router';
/**
 * @param {string} active_href slug of current website section, e.g. http:locahost:3000/admin/glossary, rather than glossary?term=1 
 * @param {int} total_pages total amount of pages
 * @param {int} curr_page number of current page 
 * @returns 
 */
function Pagination({curr_page, total_pages, active_href = "glossary", searchQuery= "", DynamicRouteTest}) {
    const router = useRouter();
    const routeInputPage = (val = desiredPage) => {
        if (val >= 1 && val <= total_pages)
        {
            router.push({
                pathname: active_href,
                query: {page: val, search: searchQuery}
            },
            undefined
            );
            setDesiredPage(val);
        }

    }
    const [desiredPage, setDesiredPage] = useState(parseInt(curr_page)); //Serves to keep track of the page the user wishes to jump to
    //Pagination - current page has 2 to the right, 2 to the left
    //If current page is 2 pages away from one of the ends display those 2 pages on the corresponding side
    // Otherwise, if 3 or more pages away, 
    //For styling
    //Outer container flex-row, with 3 elements (chevron left, actual pagination logic, chevron right)
    //pagi_inner has flex-row, w/ Page input box, slash, and total page count box (clickable)

    useEffect(() => {
        setDesiredPage(router.query?.page ? router.query.page : 1);
    }, [router.query])
    useEffect(() => {

    }, [])
    return (
    <div className={PagiStyles.pagi_wrapper}>
        <div className={PagiStyles.chevron} onClick={() => {
            if (desiredPage > 1 && desiredPage <= total_pages)
            {
                routeInputPage(parseInt(desiredPage)-1) 
            }
            }}>
            <ChevronLeft className={PagiStyles.chevron_svg}/>
        </div>
        <div className={PagiStyles.pagi_inner}>
            <input className={PagiStyles.page_input}
                type="text"
                value={desiredPage}
                placeholder={curr_page}
                onChange={(event) => {
                    setDesiredPage(parseInt(event.target.value ? event.target.value : 0));
                    }
                }
                onKeyDown={e => {
                        if (e.key === 'Enter')
                        routeInputPage()
                    }
                }
            />
            <div className={PagiStyles.slash}>/</div>
            <div className={PagiStyles.page_final}>{total_pages}</div>
        </div>
        <div className={PagiStyles.chevron} onClick={() => {
            if (desiredPage >= 1 && desiredPage < total_pages)
            {
                routeInputPage(parseInt(desiredPage)+1) 
            }
            }}>
            <ChevronRight className={PagiStyles.chevron_svg}/>
        </div>
    </div>
  )
}
export default Pagination
