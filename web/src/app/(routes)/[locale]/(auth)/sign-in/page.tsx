'use client';

import { FC } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

const SignIn: FC = () => {
    const t = useTranslations("auth");

    return (
        <div className="flex w-screen h-screen">
            <div className="w-full md:w-3/4 xl:w-3/5 2xl:w-1/2">
                <div className="absolute inset-0 bg-[url('/image/freepik-auth-image.jpg')] bg-cover bg-center bg-no-repeat opacity-5 md:opacity-0 grayscale" />
                <div className="relative z-10 py-24 px-6 flex flex-col w-[95%] sm:w-[80%]  max-w-144 mx-auto h-full justify-between ">
                    <div className="flex flex-col gap-20">
                        <div className="flex flex-col items-center align-middle">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="max-w-72" src={'/image/logo.png'} alt="Logo" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-3xl md:text-5xl font-bold md:font-medium">
                                {t("slogan")}
                            </p>
                            <p className="text-base">
                                {t("introduction")}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col align-middle items-center pt-12 gap-6 text-center">
                        <button
                            onClick={() => signIn('google')}
                            className="block cursor-pointer bg-primary hover:bg-primary-hover py-3 w-full rounded-lg text-white font-bold"
                        >
                            <div className="flex items-center justify-center gap-3 px-[10%]">
                                <SparklesIcon className="size-5" />
                                <span className="">
                                    {t("sign_in_btn")}
                                </span>
                            </div>
                        </button>
                        <p className="pb-8">
                            {t("by_clicking")} <b>“{t("sign_in")}”</b>, {t("you_agree_to")}{' '}
                            <span className="text-primary font-bold">
                                {t("terms")}
                            </span>{' '}
                            {t("and")}{' '}
                            <span className="text-primary font-bold">
                                {t("policy")}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="md:visible md:w-1/4 xl:w-2/5 2xl:w-1/2 h-full rounded-l-lg">
                <a
                    className="cursor-default"
                    target="_blank"
                    href="https://www.freepik.com/free-photo/medium-shot-family-members-laying-grass_16689056.htm#fromView=search&page=1&position=46&uuid=40b5eeea-9953-4032-ba3f-99faa4440254&query=people+community"
                >
                    <div
                        className="flex-1 h-screen rounded-l-4xl"
                        style={{
                            backgroundImage:
                                "url('/image/freepik-auth-image.jpg')",
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPositionX: 'center',
                        }}
                    />
                </a>
            </div>
        </div>
    );
};

export default SignIn;
