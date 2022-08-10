import React, { useEffect, useReducer, useState } from 'react'
import styles from '../../../styles/Admin.module.css';
import Home from '../../../styles/Admin_Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../../../src/components/Sidebar';
import Gears from '../../../public/gears_small.svg'
import tidStyles from '../../../styles/tid.module.css'
import authMiddleware from '../../../src/controller/authMiddleware';
const BASE_URL = process.env.ENVIRONMENT === "development" ? 'http://localhost:3000' : process.env.HOST;
export default function termId({data, termID, collection_alias}) {

  const initialTermData = data;
  const termReducer = (state, action) => {
    switch(action.target)
    {
      case 'TITLE':
        return {...state, 'TITLE' : action.content};
      case 'DESCRIPTION':
        return {...state, 'DESCRIPTION' : action.content};
      case 'ABBREVIATIONS':
        return {...state, 'ABBREVIATIONS' : action.content};
      case 'SOURCE':
        const newArr = [...state['SOURCE']];
        newArr[action.index] = action.content;
        return {...state, 'SOURCE' : action.content};
    }
  }
  const [termData, changeTermData] = useReducer(termReducer, initialTermData);
  const handleAddSource = () => {

  }
  const handleUpdate = async () => {
    const body = {
      id: termID,
      update: termData
    }
    const response =  await fetch('/api/glossary/updateterm', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(body)
  })
  }
  const handleDelete = async () => {

  }
  /**useEffect(() => {
    console.log(termData);
  },[termData])*/

  return (
    <div className={styles.admin_container}>
        <Sidebar></Sidebar>
        <div className={styles.admin_main}>
          <div className={tidStyles.card_container}>
            <div className={tidStyles.card_header}>
            <input value={termData['TITLE']} onChange={(e) => {
              return changeTermData({target: 'TITLE', content: e.target.value});
              }} className={tidStyles.card_title}></input>
                <hr/>
            </div>
            <div className={tidStyles.card_contents_wrapper}>
              <div className={tidStyles.left_contents}>
                <div className={tidStyles.left_abbreviations}>
                  <h3 className={tidStyles.left_abbreviations_leader}>Abbreviations</h3>
                  <input value={termData['ABBREVIATIONS']} onChange={(e) => {
              return changeTermData({target: 'ABBREVIATIONS', content: e.target.value});
              }}
               className={tidStyles.abbreviations_input}></input>
                </div>
                <div className={tidStyles.left_descriptions}>
                  <h3 className={tidStyles.left_descriptions_leader}>Descriptions</h3>
                  <textarea value={termData['DESCRIPTION']} onChange={(e) => {
              return changeTermData({target: 'DESCRIPTION', content: e.target.value});
              }} className={tidStyles.descriptions_input}></textarea>
                </div>
                <div className={tidStyles.left_id}>
                  <h3 className={tidStyles.left_id_leader}>ObjectID</h3>
                  <input value={termData['_id']} className={tidStyles.id_readonly} readOnly={true}></input>
                </div>
              </div>
              <div className={tidStyles.right_contents}>
                <div className={tidStyles.right_content_lead}>
                  <h1>Standards Org & Sources</h1>
                  <hr/>
                </div>
                <div className={tidStyles.right_content_sources}>
                  <div className={tidStyles.sources_list}>
                    <div className={tidStyles.src_wrapper}>
                    <input value={termData['SOURCE']} onChange={(e) => {
                      return changeTermData({target: 'SOURCE', content: e.target.value});
                      }}
                      className={tidStyles.abbreviations_input}></input>
                    </div>
                    {/**<div className={tidStyles.src_wrapper}>
                      <p>NIST SMP #1.19</p>
                      <input name="src_link" placeholder="https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-97.pdf"></input>
                    </div>
                    <div className={tidStyles.src_wrapper}>
                      <p>NIST SMP #1.19</p>
                      <input name="src_link" placeholder="https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-97.pdf"></input>
                    </div>
                    <div className={tidStyles.src_wrapper}>
                      <p>NIST SMP #1.19</p>
                      <input name="src_link" placeholder="https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-97.pdf"></input>
                    </div>
                    <div className={tidStyles.src_wrapper}>
                      <p>NIST SMP #1.19</p>
                      <input name="src_link" placeholder="https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-97.pdf"></input>
                    </div>
                    <div className={tidStyles.src_wrapper}>
                      <p>NIST SMP #1.19</p>
                      <input name="src_link" placeholder="https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-97.pdf"></input>
                    </div>
                    <div className={tidStyles.src_wrapper}>
                      <p>NIST SMP #1.19</p>
                      <input name="src_link" placeholder="https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-97.pdf"></input>
                    </div>*/}
                  </div>
                  <h3>More functionality Coming soon!</h3>
                  <hr className={tidStyles.src_hr_separator}/>
                  <button className={tidStyles.action_button + ' ' + tidStyles.smaller} onClick={() => {
                      handleAddSource()
                    }
                  }> Add More +</button> 
                </div>
              </div>
            </div>
            {
              collection_alias == "glossary" ? 
              <div className={tidStyles.action_buttons}>
                <button className={tidStyles.critical_button} onClick={handleDelete}>Delete</button>
                <button className={tidStyles.action_button} onClick={handleUpdate}>Update</button>
              </div>
              :
              <div className={tidStyles.action_buttons}>
                <button className={tidStyles.critical_button} onClick={() => {handleDeny}}>Deny</button>
                <button className={tidStyles.action_button} onClick={() => {handleApprove}}>Approve</button>
              </div>
            }
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
    let term_data = await fetch(BASE_URL + '/api/glossary/findbyid?' + new URLSearchParams({
      collection_alias: ctx.query.collection_alias,
      id: ctx.query.tid ? ctx.query.tid : ""
      }), {
          credentials: 'include'
      })
      term_data = await term_data.json();
    return {
        props: 
        {
          data: term_data,
          termID: ctx.query.tid,
          collection_alias: ctx.query.collection_alias
        }
    }
}