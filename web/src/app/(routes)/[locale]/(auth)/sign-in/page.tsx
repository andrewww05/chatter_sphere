'use client'

import Image from 'next/image';
import { FC } from 'react'
import { SparklesIcon } from '@heroicons/react/24/solid';
import { signIn } from 'next-auth/react';

const SignIn: FC = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex-1">
        <div className="py-24 px-6 flex flex-col w-[80%] max-w-144 mx-auto h-full justify-between">
          <div className="flex flex-col gap-20">
            <div className="flex flex-col items-center align-middle">
              <img src={'/image/logo.png'} alt='Logo' />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-5xl">Step into the Sphere! 💫</p>
              <p>A world of chats, vibes, and endless connections is waiting for you..</p>
            </div>
          </div>
          <div className="flex flex-col align-middle items-center pt-12 gap-6 text-center">
            <button onClick={() => signIn("google")} className="block cursor-pointer bg-primary hover:bg-primary-hover py-3 w-full rounded-lg text-white font-bold">
              <div className="flex items-center justify-center gap-3 px-[10%]">
                <SparklesIcon className="size-5" />
                <span>Sign in to start your journey</span>
              </div>
            </button>
            <p>By clicking <b>“Sign in”</b>, you agree to <span className="text-primary font-bold">the terms and conditions and privacy policy.</span></p>
          </div>
        </div>
      </div>
      <div className="flex-1 h-full rounded-l-lg">
        <a className="cursor-default" target='_blank' href="https://www.freepik.com/free-photo/medium-shot-family-members-laying-grass_16689056.htm#fromView=search&page=1&position=46&uuid=40b5eeea-9953-4032-ba3f-99faa4440254&query=people+community">
          <div
            className="flex-1 h-screen rounded-l-4xl"
            style={{
              backgroundImage: "url('/image/freepik-auth-image.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPositionX: "center"
            }}
          />
        </a>
      </div>
    </div>
  )
}

export default SignIn;
