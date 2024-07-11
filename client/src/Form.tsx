import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const API_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3001' //use 3001 for local dev
      : 'https://your-site-url'; //or your production site url

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // form validation checks
    if (!firstName || !message || !phone || !email) {
      alert('Please make sure to fill the required box ');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/send-email`, {
        senderEmail: email,
        subject: `${firstName}`,
        message: `Name:${firstName} ${lastName} Phone: ${phone}\n\nMessage: ${message}`,
      });

      // Check if the response was successful
      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        // Throw error for unexpected response status
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setIsError(true);
    } finally {
      // Reset form state
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }
  };

  // Clear success or error state after 10 seconds
  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError]);

  return (
    <div className='form-container flex items-center justify-center '>
      <section className=''>
        <div className='container mx-auto '>
          <div className='flex  flex-col justify-between  '>
            <form
              className='flex flex-col gap-8 rounded-xl  mt-[100px]'
              onSubmit={handleSubmit}
            >
              <div className=' flex flex-col max-w-[600px] gap-5  xl:gap-10 text-white'>
                <div className='flex flex-col xl:flex-row gap-4 '>
                  <input
                    className='bg-transparent border-[1px] p-2 rounded-full focus:outline-none'
                    type='text'
                    placeholder='first name *'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className='bg-transparent border-[1px] p-2 rounded-full focus:outline-none'
                    type='text'
                    placeholder='last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <input
                  className='bg-transparent border-[1px] p-2 rounded-full focus:outline-none'
                  type='email'
                  placeholder='Email *'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className='bg-transparent border-[1px] p-2 rounded-full focus:outline-none'
                  type='tel'
                  placeholder='Phone *'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <textarea
                className=' border p-2 text-white min-h-[50px]  max-h-[100px] border-white/30 bg-transparent text-[16px] focus:text-white focus:outline-none'
                placeholder='text *'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {/* btn */}

              <button
                className=' rounded-full p-2 border text-white/50 transition-all duration-500 hover:bg-black hover:text-white '
                type='submit'
              >
                Send
              </button>
            </form>
            {isSuccess && (
              <div className='p-5'>
                <p className=' text-white'>Message sent successfully</p>
              </div>
            )}
            {isError && (
              <p className='error-message text-[20px] text-white'>
                Failed..something went wrong.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form;
