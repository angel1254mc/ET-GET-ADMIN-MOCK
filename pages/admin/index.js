import React from 'react'
import styles from '../../styles/Admin.module.css';
import Home from '../../styles/Admin_Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../../src/components/Sidebar';
import Gears from '../../public/gears_small.svg'

export default function index() {
  return (
    <div className={styles.admin_container}>
        <Sidebar></Sidebar>
        <div className={styles.admin_main}>
          <div className={Home.main_message_container}>
            <div className={Home.main_hero}>
              <Gears className={Home.gears_svg}/>
            </div>
            <div className={Home.main_lead}>Welcome to the GET App Admin Portal!</div>
            <div className={Home.main_subtitle}>Here you can approve newly requested terms, as well as update, delete, or add database terms</div>
            <div className={Home.main_subtitle + ' ' + Home.upper_spacing}>
              Get Started by clicking on 
              <Link href='admin/requested'>
                <a className={Home.main_links}> Requested Terms </a>
              </Link>
              or
              <Link href='/admin/terms'>
                <a className={Home.main_links}> Glossary Terms</a>
              </Link> 
            </div>
          </div>
        </div>
    </div>
  )
}
