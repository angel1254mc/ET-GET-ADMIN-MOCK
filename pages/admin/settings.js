import React from 'react'
import styles from '../../styles/settings.module.css'
import adminStyles from '../../styles/Admin.module.css';
import Sidebar from '../../src/components/Sidebar.js'
function settings({}) {
  return (
    <div className={adminStyles.admin_container}>
      <Sidebar curr_path="settings"></Sidebar>
      <div className={adminStyles.admin_main}>
        <div className={styles.main_center}>
        <div className={styles.title}>
          Settings
        </div>
        <div className={styles.flex_row}>
        <div className={styles.admin_text}>
          Admin Accounts:
        </div>
        <div className={styles.flex_button_container}>
          <div className={styles.button1}>
            <button>Add +</button>
          </div>
        </div>
        </div>
          <div className={styles.login}>
            <label>Username:</label>
            <label className={styles.password}>Password:</label>
          </div>
          <div className={styles.login_input}>
            <input className={styles.username_input} type='text' placeholder='Enter username' name='username' required></input>
            <input className={styles.password_input} type='text' placeholder='Enter password' name='password' required></input>
          </div>
          <div className={styles.logout}>
            <div>Logout?</div>
            <button className={styles.button2}>Logout</button>
          </div>
          <div className={styles.flex_row}>
            <div className={styles.select_container}>
              <select className={styles.dropdown}><option>Choose an account: </option>
              <option>Admin Placeholder 1</option><option>Admin Placeholder 2</option>
              <option>Admin Placeholder 3</option></select>
            </div>
            <div className={styles.temp_checklist}>
              <div className={styles.read_option}>
                <label htmlFor='read only'>Read: </label>
                <input type='checkbox' name='read only'></input>
              </div>
              <div className={styles.edit_option}>
                <label htmlFor='edit'>Edit: </label>
                <input type='checkbox' name='edit'></input>
              </div>
              <div className={styles.delete_option}>
                <label htmlFor='delete'>Delete: </label>
                <input type='checkbox' name='delete'></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const authMiddleware = (req) => {
  const {cookies} = req;
  console.log(cookies);
  const jwt = cookies.etgetjwt;
  const url = req.url;
  if (url.includes("/admin")) {
    if (!jwt) {
        return null
    }

    try {
        verify(jwt, process.env.REFRESH_TOKEN_SECRET)

        return true;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}
}
export default settings