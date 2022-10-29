import React, {useRef} from 'react'
import emailjs from 'emailjs-com'
import "./styles.css"

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.init("lgRY_8UtgG31MRQfw");
    emailjs.sendForm("service_3v6xq8n", "template_s0nc04w", form.current);
    e.target.reset();
  }
  return (
    <div className='contact-container container' id='contact'>
      <div className='contact-form'>
        <p className='contact-title'>Liên hệ với Food Town</p>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="lastname" placeholder='Họ đệm' required/>
          <input type="text" name="firstname" placeholder='Tên' required/>
          <input type="email" name="email" placeholder='Email' required/>
          <textarea name="message" cols="30" rows="10" placeholder='Gửi gắm tới Food Town vài điều' required></textarea>
          <button type="submit" value="Send">Gửi</button>
        </form>
      </div>
    </div>
  )
}

export default Contact