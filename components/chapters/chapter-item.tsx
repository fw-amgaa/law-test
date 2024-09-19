export default function ChapterItem() {
  return (
    <div className="relative mx-auto">
      <div className="group relative flex cursor-pointer after:shadow-lg after:shadow-black">
        <div className="relative -left-16 top-0 z-10 w-96 rounded-xl bg-[#3d348b] px-5 py-3 text-base font-semibold leading-7 transition-all duration-700 group-hover:-left-14">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <p>Sub-chapters: </p>
              <p className="text-white opacity-0 delay-200 duration-700 ease-in-out group-hover:opacity-100">
                None:
              </p>
            </div>
            <p>
              <a
                href="https://tailwindcss.com/docs"
                className="text-sky-500 opacity-0 hover:text-sky-600"
              >
                &rarr;
              </a>
            </p>
          </div>
        </div>
        <div className="absolute -right-16 top-0 z-20 flex w-96 flex-col gap-4 self-end rounded-xl rounded-l-2xl border-none bg-[#7678ed] px-5 py-3 text-base font-semibold leading-7 transition-all duration-700 group-hover:-right-14 group-hover:w-64 group-hover:rounded-l-lg">
          <p className="text-[#fff]">Achivements unlocked</p>
          {/* <p className="text-[#fff]">Records sold</p> */}
          <p>
            <a href="https://tailwindcss.com/docs" className="text-white/50">
              Learn more &rarr;
            </a>
          </p>
        </div>
        <div className="h-16 bg-[#3d348b] w-[28rem] -left-10 shadow-2xl shadow-[#3d348b] absolute bottom-0"></div>
      </div>
    </div>
  );
}
