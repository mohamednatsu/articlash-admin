import Image from 'next/image'
import React from 'react'
import line from "@/assets/img/line.png"
import logo from "@/assets/img/logo.png"
import elem1 from "@/assets/img/elements/3.png"
import elem2 from "@/assets/img/elements/2.png"
import cover from "@/assets/img/drawing-screen.jpg"
import MainButton from '@/components/main-button'
import Link from 'next/link'

export default function Page() {
       return (
              <div className='w-full flex md:flex-row-reverse flex-col-reverse justify-around gap-3 items-center md:h-screen h-auto bg-secondary'>
                     <div className="w-1/2">
                            <div className="flex justify-center flex-col items-center w-full mb-7 mt-2">
                                   <h1 className='font-waterlily md:text-[40px] text-[35px] text-white text-center'>Login</h1>
                                   <Image alt='line image' src={line} quality={100} priority className='w-1/4 h-1/4' />
                            </div>

                            <div className="flex flex-col justify-around items-center gap-8">

                                   <div className="flex flex-col justify-center items-start gap-3">
                                          <label htmlFor="" className='text-font '>Email or Username</label>
                                          <input type='text' className='w-[350px] h-[40px] rounded-lg shadow-lg outline-none pl-3' />
                                   </div>

                                   <div className="flex flex-col justify-center items-start gap-3">
                                          <label htmlFor="" className='text-font '>Password</label>
                                          <input type='password' className='w-[350px] h-[40px] rounded-lg shadow-lg outline-none pl-3' />
                                   </div>

                                   <div className="flex md:flex-row flex-col-reverse justify-around gap-5 md:gap-0 items-center md:mb-3">
                                          <div className="md:text-[10px] text-[9px]  md:w-3/4 w-full flex flex-col gap-2">
                                                 <span className='text-font mr-3 md:text-[13px] text-[11px]'>Don’t have account yet? <Link href={"/sign-up"} className='font-bold text-primary'>Sign Up</Link> </span>
                                          </div>

                                          <div className="">
                                                 <MainButton>
                                                        Login
                                                 </MainButton>
                                          </div>
                                   </div>
                            </div>
                     </div>

                     <div className="md:w-1/2 w-full bg-white md:h-full rounded-b-md">
                            <div className="flex justify-around items-center mt-1 md:mt-0">
                                   <Image src={elem1} alt="element 1" className='w-1/5 h-1/5' />
                                   <Image src={elem2} alt="element 2" className='w-1/5 h-1/5' />
                            </div>

                            <div className="flex justify-center items-center flex-col gap-4">
                                   <Image src={logo} alt='logo' className='w-1/2 h-1/2' />
                                   <h2 className='font-extrabold text-[15px] px-4 md:w-1/2 w-full text-center leading-7'>You are one step closer to a world of creativity, competition and artistic development!</h2>
                            </div>

                            <div className="flex justify-center items-center mt-5">
                                   <Image src={cover} alt="cover img" className='md:w-[55%] w-1/2 h-1/2 rounded-t-xl shadow-lg' />
                            </div>
                     </div>
              </div>
       )
}
