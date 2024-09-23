"use client";

import Chapters, { IChapter } from "@/components/chapters";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { useRouter } from "next/navigation";
import { logout } from "./(auth)/login/action";

interface Props {
  chapters: IChapter[];
  user: User;
}

export default function HomePage({ chapters, user }: Props) {
  const router = useRouter();

  return (
    <section className="">
      <main className="z-1 max-w-screen-xl mx-auto px-4 py-8 gap-12 text-gray-600 md:px-8 xl:flex">
        <div className="max-w-2xl mx-auto text-center xl:text-left">
          <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0 xl:justify-start">
            {user.token ? (
              <div className="flex gap-4 items-center">
                <Button
                  onClick={async () => {
                    await logout();
                    router.push("/login");
                    user = {} as AdapterUser;
                  }}
                  variant={"destructive"}
                >
                  Гарах
                </Button>
                <p className="text-black text-sm">Та нэвтэрсэн байна. </p>
              </div>
            ) : (
              <Button onClick={() => router.push("/login")} variant={"outline"}>
                Нэвтрэх <ArrowRightIcon size={"xs"} className="ml-2" />
              </Button>
            )}
          </div>
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
        <Chapters user={user} chapters={chapters} />
      </main>

      <footer>
        <div className="bg-gray-900">
          <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
              <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
                <div className="space-y-2 text-sm">
                  <p className="text-base font-bold tracking-wide text-gray-100">
                    Холбогдох
                  </p>
                  <div className="flex">
                    <p className="mr-1 text-gray-100">Утас:</p>
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
