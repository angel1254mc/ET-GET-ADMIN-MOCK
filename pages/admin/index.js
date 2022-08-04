import React from 'react'
import styles from '../../styles/Admin.module.css';
import Image from 'next/image';
import ReqTerms from '../../public/req_terms.svg'
import GlossTerms from '../../public/gloss_terms.svg';
import Settings from '../../public/settings.svg';
export default function index() {
  return (
    <div className={styles.admin_container}>
        <div className={styles.admin_sidebar}>
            <div className={styles.sidebar_content_top}>
              <div className={styles.main_logo}>
                <Image src="/../public/etLogo.webp" object-fit="contain" layout="fixed" width={200} height={108}></Image>
              </div>
              <div className={styles.sidebar_item}><ReqTerms className={styles.sidebar_logo}></ReqTerms>Requested Terms</div>
              <div className={styles.sidebar_item}><GlossTerms className={styles.sidebar_logo}></GlossTerms>Glossary Terms</div>
            </div>
            <div className={styles.sidebar_content_bottom}>
              <div className={styles.sidebar_item}><Settings className={styles.sidebar_logo}></Settings>Settings</div>
            </div>
        </div>
        <div className={styles.admin_main}>
          
        </div>
    </div>
  )
}
