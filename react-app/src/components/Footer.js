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
          <a className='github__links__creator' href='https://daletsakamoto.github.io/'>
            <span className="footer__span__names">
              Dale Sakamoto<img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' width="30" height="30" />
            </span>
          </a>
        </div>
        <div className="footer__grid-3">
          <a className='github__links__creator' href='https://github.com/Cmolerov'>
            <span className="footer__span__names">
              Carlos Molero<img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' width="30" height="30" />
            </span>
          </a>
        </div>
        <div className="footer__grid-4">
          <a className='github__links__creator' href='https://davidleegriffin.github.io/'>
            <span className="footer__span__names">
              David Griffin<img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' width="30" height="30" />
            </span>
          </a>
        </div>
        <div className="footer__grid-5">
          <a className='github__links' href='https://github.com/Cmolerov/the_floor_is_lava.git'>
            <span className="footer__span__repo">
              <img className="footer__img__repo" src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' width="30" height="30"/>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Footer;