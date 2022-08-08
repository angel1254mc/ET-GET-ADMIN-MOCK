import { getCardActionsUtilityClass } from '@mui/material';
import React, {useEffect, useState} from 'react'
import CardStyles from '../../styles/Card.module.css';
import Link from 'next/link';

function CardComponent({data, index, collection_alias}) {
    const card_data = data;
    useEffect(() => {
        //document.getElementById('card_num_' + index).classList.add('fade-card-');
    }, [])
    return (
        <Link href={"/admin/terms/" + encodeURIComponent(data['_id']) +'?collection_alias=' + collection_alias }>
            <a>
                <div className={CardStyles.card_container} id = {"card_num_" + index}>
                    <div className={CardStyles.top_of_card}>
                        <div className={CardStyles.top_left_card}>
                            <div className={data['TITLE'] && data['TITLE'].length > 40 ? CardStyles.card_title + ' ' + CardStyles.title_smaller : CardStyles.card_title}>{data['TITLE'] && data['TITLE'].length > 40 ? data['TITLE'].substring(0, 40) + '. . .' : data["TITLE"]}</div>
                            <div className={CardStyles.card_standards}>{data['SOURCE']}</div>
                        </div>
                        <div className={CardStyles.top_right_card}>
                            <div className={CardStyles.top_right_subtitle}>{data['REQUESTER_EMAIL'] ? data['REQUESTER_EMAIL'].length > 20 ? data['REQUESTER_EMAIL'].substring(0,20) + '. . . ' : data['REQUESTER_EMAIL'] : data['_id']}</div>
                        </div>
                    </div>
                    <div className={CardStyles.card_description}>{data['DESCRIPTION'].length > 90 ? data['DESCRIPTION'].substring(0,90) + '. . . ' : data['DESCRIPTION']}</div>
                </div>
            </a>
        </Link>
    )
}

export default CardComponent;