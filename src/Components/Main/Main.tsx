import React from 'react';
import Auth from './AuthForm/Auth';
import Login from './Account/Login';
import Register from './Account/Register';

export default function Main() {
  const [logged, setLogged] = React.useState(true);

  return (
    <div className="main-container">
      <section id="section1" className="section roboto-font d-flex">
          {logged ? <Auth/> : null}
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