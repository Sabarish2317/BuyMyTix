import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const otpInitial = ['1', '4', '4', '6']

const Howitworks = () => {
  const [otp, setOtp] = useState(otpInitial)

  // Simulate OTP number change (for demonstration)
  useEffect(() => {
    const interval = setInterval(() => {
      setOtp(prev =>
        prev.map(() => Math.floor(Math.random() * 10).toString())
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="flex justify-center border gap-8 px-8 flex-col bg-gradient-to-b  "
      style={{
        borderColor: '#8D59C2',
        backgroundImage: 'linear-gradient(180deg, #4E2E7B 0%, #26004C 100%)',
      }}
    >
      {/* Title */}
      <div className='flex justify-center'>
        <div className='px-4 py-2 rounded-[24px] self-center w-fit bg-[#fff] text-[#150C29] font-semibold text-[20px]'>
          How it Works
        </div>
      </div>

      {/* Header */}
      <div className='flex flex-col gap-2 text-center'>
        <h2 className='text-[#EAEAEA] font-bold text-[clamp(22px,5vw,32px)]'>
          Post your ticket in just a few steps – it's that easy!
        </h2>
        <p className='text-[#eaeaeaac] text-[clamp(16px,4vw,24px)] font-medium'>
          From discovering events to selling your own tickets, BuyMyTix makes the entire process seamless, secure, and effortless.
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-wrap gap-4 relative justify-center">
        {/* Step 1 */}
        <div className='bg-[#ffffff1e] rounded-[10px] p-4 flex flex-col flex-1 min-w-[280px] max-w-[400px] gap-3'>
          <div className='flex justify-between items-center  font-bold text-white text-[18px]'>
            <h3 className='text-[clamp(20px,4vw,20px)] font-bold'>Create & Verify</h3>
            <h3>1</h3>
          </div>
          <p className='text-[#EAEAEA] text-[16px]'>
          Browse existing event titles or create your own — whether it's a concert, movie, or sports game, we've got you covered.
          </p>
          <div className='bg-[#1d1624d6] flex flex-col gap-2 rounded-xl'>
            <div className='bg-black p-3 flex gap-2 text-white items-center rounded-xl'>
              <img src='./images/Pro.png' alt='profile' className='h-8 w-8' />
              <div className='flex flex-col text-s'>
                <p>Sabarish Vs</p>
                <p>sa@gmail.com</p>
              </div>
            </div>
            <div className='bg-black flex flex-col gap-3 p-3 rounded-xl text-white text-s'>
              <div className='flex justify-between'>
                <h4 className='font-bold text-lg'>Verify Account</h4>
                <h4 className='font-bold text-lg'>x</h4>
              </div>
              <p className='text-center'>OTP verification</p>
              <p className='text-center'>An otp is sent to your ******gmail.com expiring in 2 hours</p>
              <div className="flex gap-2 justify-center mt-3">
                {otp.map((val, idx) => (
                  <div
                    key={idx}
                    className='w-10 h-10 border-[#8D59C2] border rounded flex justify-center items-center bg-white text-black text-sm font-semibold relative overflow-hidden'
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={val}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute"
                      >
                        {val}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <button className='w-full bg-[#8D59C2] scale-3d hover:scale-105  duration-200 hover:text-white rounded py-2 text-s'>Get Started</button>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className='bg-[#ffffff1e] rounded-[10px] p-4 flex flex-col flex-1 min-w-[280px] max-w-[400px] gap-3'>
          <div className='flex justify-between items-center  font-bold text-white text-[18px]'>
            <h3 className='text-[clamp(20px,4vw,20px)] font-bold'>Select or Create</h3>
            <h3>2</h3>
          </div>
          <p className='text-[#EAEAEA] text-[16px]'>
          Browse existing event titles or create your own — whether it's a concert, movie, or sports game, we've got you covered.
          </p>
          <div
            className='flex flex-col justify-between p-3 pb-0 rounded-xl h-full'
            style={{
              backgroundImage: "url('./images/Bg-Search.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <h2 className='font-bold text-white text-center text-[24px] pt-2'>Movies Concert Sports</h2>
            <div className='w-full flex justify-center'>
              <img src='./images/Slide-pic.png' alt='search'  />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className='bg-[#ffffff1e] rounded-[10px] p-4 flex flex-col flex-1 min-w-[280px] max-w-[400px] gap-3'>
          <div className='flex justify-between items-center  font-bold text-white text-[18px]'>
            <h3 className='text-[clamp(20px,4vw,20px)] font-bold'>Add Details & Go Live</h3>
            <h3>3</h3>
          </div>
          <p className='text-[#EAEAEA] text-[16px]'>
            Enter seat info, price, and quantity. Once submitted, your listing goes live — sit back while buyers reach out!
          </p>
          <div className='bg-[#1d1624d6] h-full flex flex-col gap-2 rounded-xl overflow-hidden'>
  <img 
    src='./images/Add-Ticket.svg' 
    alt='Add Ticket' 
    className='h-full w-full object-cover' 
  />
</div>
        </div>
      </div>

      {/* CTA */}
      <div className='flex items-center justify-end gap-2 pb-4'>
        <h2 className='text-[#fff] text-[24px] font-bold'>Sell Your Ticket</h2>
        <img src='./images/Next-red.png' alt='hand' className='w-6' />
      </div>
    </div>
  )
}

export default Howitworks