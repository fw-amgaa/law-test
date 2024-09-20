"use client";

import Chapters, { IChapter } from "@/components/chapters";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { AdapterUser } from "next-auth/adapters";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "./(auth)/login/action";

interface Props {
  chapters: IChapter[];
}

export default function HomePage({ chapters }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const features = [
    {
      name: "Trusted",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Over 100+ questions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.515a1.75 1.75 0 01-1.75 1.75h-1.5c-.078 0-.155-.005-.23-.015H4.48c-.075.01-.152.015-.23.015h-1.5A1.75 1.75 0 011 15.265V4.75zm16.5 7.385V11.01a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zm0 2.005a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .108.069.2.165.235h1.585a.25.25 0 00.25-.25v-1.11zm-15 1.11v-1.11a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.164.235H2.75a.25.25 0 01-.25-.25zm2-4.24v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V11.01a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25zm13-2.005V7.88a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zM4.25 7.63a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V7.88a.25.25 0 01.25-.25h1.5zm0-3.13a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5zm11.5 1.625a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5zm-9 3.125a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "12 chapters",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="">
      <main className="z-1 max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8 xl:flex">
        <div className="space-y-5 max-w-2xl mx-auto text-center xl:text-left">
          <div className="flex flex-wrap items-center justify-center gap-6 xl:justify-start">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-x-2 text-gray-500 text-sm"
              >
                {item.icon}
                {item.name}
              </div>
            ))}
          </div>
          <h1 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
            Elevate Your Law Exam Preparation
          </h1>
          <p className="max-w-xl mx-auto xl:mx-0">
            Welcome! Here, you’ll find the resources and insights designed to
            support your journey through law exams with clarity and composure.
            Our goal is to provide a structured and focused approach to help you
            navigate your studies effectively. Your path to success is our
            priority.
          </p>
          <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0 xl:justify-start">
            <Button>Browse chapters</Button>

            {session?.user.token ? (
              <div className="flex gap-4 items-center">
                <Button
                  onClick={async () => {
                    await logout();
                    session.user = {} as AdapterUser;
                  }}
                  variant={"destructive"}
                >
                  Logout
                </Button>
                <p className="text-black text-sm">You are logged in. </p>
              </div>
            ) : (
              <Button onClick={() => router.push("/login")} variant={"outline"}>
                Get access <ArrowRightIcon size={"xs"} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1 max-w-xl mx-auto mt-14 xl:mt-0">
          <Image alt="book" src={"/book.webp"} width={600} height={50} />
        </div>
      </main>

      {/* Background */}
      <div className="absolute inset-0 z-[-1]" aria-hidden="true">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 1024"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,204.8 Q360,102.4 720,204.8 T1440,204.8"
            fill="none"
            stroke="rgba(100, 116, 139, 0.1)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0,409.6 Q360,307.2 720,409.6 T1440,409.6"
            fill="none"
            stroke="rgba(100, 116, 139, 0.1)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0,614.4 Q360,512 720,614.4 T1440,614.4"
            fill="none"
            stroke="rgba(100, 116, 139, 0.1)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0,819.2 Q360,716.8 720,819.2 T1440,819.2"
            fill="none"
            stroke="rgba(100, 116, 139, 0.1)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0,1024 Q360,921.6 720,1024 T1440,1024"
            fill="none"
            stroke="rgba(100, 116, 139, 0.1)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      {/* Background end*/}

      <main>
        <Chapters chapters={chapters} />
      </main>

      <footer>
        <div className="bg-gray-900">
          <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
              <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
                {/* <div>
                  <p className="font-medium tracking-wide text-gray-300">
                    Category
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        News
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        World
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        Games
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                      >
                        References
                      </a>
                    </li>
                  </ul>
                </div> */}

                <div className="space-y-2 text-sm">
                  <p className="text-base font-bold tracking-wide text-gray-100">
                    Contacts
                  </p>
                  <div className="flex">
                    <p className="mr-1 text-gray-100">Phone:</p>
                    <a
                      href="tel:850-123-5021"
                      aria-label="Our phone"
                      title="Our phone"
                      className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-100"
                    >
                      850-123-5021
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
              <p className="text-sm text-gray-500">2024 Law exam materials.</p>
              <div className="flex items-center mt-4 space-x-4 sm:mt-0">
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z"></path>
                  </svg>
                </a>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                >
                  <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                    <circle cx="15" cy="15" r="4"></circle>
                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
                  </svg>
                </a>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
