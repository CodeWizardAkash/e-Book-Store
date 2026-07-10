import React from "react";

function Footer() {
  return (
    <div>
      <hr className="border-t-1 border-gray-300" />
      <footer>
        <div className="">
          <ul className="flex items-center justify-center gap-7 md:gap-60 md:mt-7 mt-5">
            <li>About us</li>
            <li>Contact</li>
            <li>Jobs</li>
            <li>Press kit</li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-8 md:gap-60 md:mt-7 mt-5">
          <img className="w-5 p-0.8" src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/all-icons/twitter-x-1fhy50xzcvkl246hf5ua4.png/twitter-x-jyw81k7vr85ry57c7ym2d.png?_a=DATAiZAAZAA0" alt="" />
          <img className="w-7" src="https://upload.wikimedia.org/wikipedia/commons/8/8b/YouTube_dark_icon_%282017%29.svg" alt="" />
          <img className="w-5"  src="https://www.svgrepo.com/show/494341/facebook.svg" alt="" />
        </div>

        <div className="flex items-center justify-center px-5 mt-5 md:mt-7 mb-5">
          <p>Copyright © 2026 - All right reserved by ACME Industries Ltd</p>
        </div>
        
      </footer>
      
    </div>
  );
}
export default Footer;