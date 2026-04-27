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
        <h2 className="font-MS95 py-2 text-2xl font-extrabold">
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
          <h3 className="font-600 font-MS95 pb-1 text-lg underline decoration-dotted underline-offset-2">
            About This Project
          </h3>
          <div className="*:pb-2.5 *:text-sm *:font-light *:text-gray-700">
            <p>
              As the lead developer for our thesis project, I built the CSRP
              Hospital Recommendation API, a recommendation model that
              recommends nearby hospitals based on user coordinates, required
              medical services, and facility features. It combines content-based
              filtering, distance scoring, and a neural-network ranking model to
              return the most relevant hospitals while continuously improving
              through user feedback. The project includes a production-ready
              Flask API, a model training pipeline (synthetic + real interaction
              data), and Dockerized deployment, live at
              https://four04found-model.onrender.com/.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
