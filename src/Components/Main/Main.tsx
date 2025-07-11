import React from 'react';
import Auth from './AuthForm/Auth';
import Login from './Account/Login';
import Register from './Account/Register';

export default function Main() {
  const [logged, setLogged] = React.useState(true);

  return (
    <div className="main-container">
      <section id="section1" className="section roboto-font d-flex flex-row">
        <p className='sum1'>Найдите себя,<br/>раскрыв<br/>свой стиль</p>
        <div className='regForm d-flex align-items-center  flex-column p-5'>
          <span className='logoBg d-flex justify-content-center align-items-center'><img className='logoIcon p-1' src='/Images/logo.png' alt='logo' /></span>
          {logged ? <Auth/> : null}
        </div>
      </section>
      <section id="section2" className="section">
        <h1>Section 2</h1>
        <p>Content for section 2...</p>
      </section>
      <section id="section3" className="section">
        <h1>Section 3</h1>
        <p>Content for section 3...</p>
      </section>
      <section id="section4" className="section">
        <h1>Section 4</h1>
        <p>Content for section 4...</p>
      </section>
    </div>
  );
}