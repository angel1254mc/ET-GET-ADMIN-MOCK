import { getCardActionsUtilityClass } from '@mui/material';
import React, {useEffect, useState} from 'react'
import CardStyles from '../../styles/Card.module.css';


function CardComponent({data, index}) {

    useEffect(() => {
        //document.getElementById('card_num_' + index).classList.add('fade-card-');
    }, [])
    return (
        <div className={CardStyles.card_container} id = {"card_num_" + index}>
            <div className={CardStyles.top_of_card}>
                <div className={CardStyles.top_left_card}>
                    <div className={CardStyles.card_title}>{data.term}</div>
                    <div className={CardStyles.card_standards}>NIST DREAM SMP</div>
                </div>
                <div className={CardStyles.top_right_card}>
                    <div className={CardStyles.top_right_subtitle}>email@email.com</div>
                </div>
            </div>
            <div className={CardStyles.card_description}>{data.description.length > 90 ? data.description.substring(0,90) + '. . . ' : data.description}</div>
        </div>
    )
}

export default CardComponent;