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
        <p className='contact-title'>Contact</p>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="lastname" placeholder='Lastname' required/>
          <input type="text" name="firstname" placeholder='Firstname' required/>
          <input type="email" name="email" placeholder='Email' required/>
          <textarea name="message" cols="30" rows="10" placeholder='Some messages to Food Town' required></textarea>
          <button type="submit" value="Send">Gửi</button>
        </form>
      </div>
    </div>
  )
}

export default Contact