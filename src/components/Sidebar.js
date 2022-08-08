import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../../styles/Admin.module.css';
import Image from 'next/image';
import Link from 'next/link';
import ReqTerms from '../../public/req_terms.svg'
import logo from '../../public/etLogo.webp'
import GlossTerms from '../../public/gloss_terms.svg';
import Settings from '../../public/settings.svg';
const path_to_focus = {
    req: 'req_terms_link',
    gloss: 'gloss_terms_link',
    settings: 'settings_link'
}
const Sidebar = ({curr_path = null}) => {
    useEffect(()=> {
        if (curr_path)
            document.getElementById(path_to_focus[curr_path]).classList.add('focused');
    })
    return (
    <div className={styles.admin_sidebar}>
        <div className={styles.sidebar_content_top}>
          <Link href='/admin/'>
            <a>
            <div className={styles.main_logo}>
              <Image src={logo} object-fit="contain" layout="fixed" width={200} height={108}></Image>
            </div>
            </a>
          </Link>
          <Link href="/admin/requested">
            <a>
              <div className={styles.sidebar_item} id="req_terms_link">
                  <ReqTerms className={styles.sidebar_logo}/> Requested Terms
              </div>    
            </a>
          </Link>
          <Link href="/admin/glossary">
            <a>
              <div className={styles.sidebar_item} id="gloss_terms_link">
                  <GlossTerms className={styles.sidebar_logo}/> Glossary Terms
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.sidebar_content_bottom}>
        <Link href="/admin/settings">
            <a>
              <div className={styles.sidebar_item} id="settings_link">
                <Settings className={styles.sidebar_logo}/> Settings
              </div>
            </a>
        </Link>
        </div>
    </div>
  )
}

export default Sidebar