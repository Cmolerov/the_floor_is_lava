import React from 'react';

const Footer = () => {
  return (
    <nav className="footer">
      <div className="footer__grid-container">
        <div className="footer__grid-1">
          <img className="footer__img__icon" src='./images/favicon.ico' alt="volcano"/> 
          <div className="footer__image__label">LAVA</div>
        </div>
          <div className="footer__grid-2">
            <a className='github__links' href='https://daletsakamoto.github.io/'>Dale Sakamoto</a>
          </div>
          <div className="footer__grid-3">
          <a className='github__links' href='https://github.com/Cmolerov'>Carlos Molerov</a>
        </div>
        <div className="footer__grid-4">
        <a className='github__links' href='https://davidleegriffin.github.io/'>David Griffin</a>
          </div>
      </div>
    </nav>
  );
}

export default Footer;