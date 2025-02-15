import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin,FaYoutube} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="my-5">
      <footer className="text-center text-black bg-indigo-700">
        <div className="container p-4">
          <section className="mt-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 container text-center">
             <div className="row row-cols-5">
             <h6 className="uppercase font-bold">
                <a href="/about us" className="text-black">About us</a>
              </h6>
              <h6 className="uppercase font-bold">
                <a href="/menu" className="text-black">Products</a>
              </h6>
              <h6 className="uppercase font-bold">
                <a href="/awrads" className="text-black">Awards</a>
              </h6>
              <h6 className="uppercase font-bold">
                <a href="#!" className="text-black">Help</a>
              </h6>
              <h6 className="uppercase font-bold">
                <a href="#!" className="text-black">Contact</a>
              </h6>
             </div>
            </div>
          </section>

          <hr className="my-5 border-gray-400" />

          <section className="mb-5">
            <div className="flex justify-center">
              <div className="max-w-2xl text-center">
                <p className="text-black">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
                  voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
                  sequi voluptate quas.
                </p>
              </div>
            </div>
          </section>

          <section className="flex justify-center items-center gap-10 text-center mb-5">
            <h5>Social Media </h5>
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-black text-2xl block">
        <FaFacebookF />
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-black text-2xl block">
        <FaTwitter />
      </a>
      <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer" className="text-black text-2xl block">
        <FaGoogle />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-black text-2xl block">
        <FaInstagram />
      </a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-black text-2xl block">
        <FaLinkedin />
      </a>
      <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-black text-2xl block">
        <FaYoutube />
      </a>
    </section>
        </div>

       
      </footer>
    </div>
  );
};

export default Footer;