import React from 'react'
import '../../css/footer.css'

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-item">
          <div className="foot-head">About</div>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>
        <div className="footer-item">
          <div className="foot-head">Help</div>
          <ul>
            <li>Payment</li>
            <li>Shipping</li>
            <li>Cancellation & Return</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer-item">
          <div className="foot-head">Policy</div>
          <ul>
            <li>Return policy</li>
            <li>Term of Use</li>
            <li>Security</li>
            <li>Priacy</li>
            <li>EPR Complain</li>
          </ul>
        </div>
        <div className="footer-item">
          <div className="foot-head">Social</div>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>YouTube</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div className="divider"></div>
        <div className="footer-item-info">
          <div className="foot-head">Mail Us:</div>
            <div className='foot-mail'>
              <p>Best Deal Private Limited,
                Buildings Alyssa, Begonia &
                Clove Embassy Tech Village,
                Outer Ring Road, Devarabeesanahalli Village,
                Bengaluru, 560103,
                Karnataka, India</p>
            </div>
        </div>
        <div className="footer-item-info">
          <div className="foot-head">Address:</div>
            <div className="foot-address">
              <p>
                Best Deal Private Limited,
                Buildings Alyssa, Begonia &
                Clove Embassy Tech Village,
                Outer Ring Road, Devarabeesanahalli Village,
                Bengaluru, 560103,
                Karnataka, India
                CIN : U51109KA2012PTC066107
                Telephone: 044-45614700
              </p>
            </div>
        </div>
      </div>
    </>
  )
}

export default Footer