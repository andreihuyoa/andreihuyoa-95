const NotFound = () => {
  return (
    <div className="items-center justify-center px-12 py-6">
      <div className="flex flex-col gap-1">
        <div className="flex justify-center">
          <img
            src="/assets/Projects/web-ss-replace-frontend-later.png"
            alt="404"
            className="h-auto w-48 max-w-xs md:max-w-md lg:max-w-md"
          />
        </div>
        <h2 className="py-2 font-MS95 text-2xl font-extrabold">
          Healthcare Recommendation API Model
        </h2>
        <p className="text-sm text-gray-700"> </p>
        <div className="flex flex-wrap items-center gap-2 *:h-5 *:w-auto *:rounded-none *:text-xs">
          <img alt="Python" src="https://img.shields.io/badge/-Python-3776AB" />
          <img
            alt="Machine Learning"
            src="https://img.shields.io/badge/-Machine Learning-00ADD8"
          />
          <img
            alt="Next.js"
            src="https://img.shields.io/badge/-Next.js-black"
          />
          <img alt="AWS" src="https://img.shields.io/badge/-AWS-232F3E" />
          <img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED" />
        </div>
        <div className="pt-4">
          <h3 className="font-600 pb-1 font-MS95 text-lg underline decoration-dotted underline-offset-2">
            About This Project
          </h3>
          <div className="*:pb-2.5 *:text-sm *:font-light *:text-gray-700">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              labore architecto, eaque ea laborum ad officia ducimus unde.
              Beatae consequuntur id sed cum quaerat, quisquam culpa a
              architecto inventore similique!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
