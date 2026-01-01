import React from "react";
import SubHeader from "../components/SubHeader";

const HisResume = "/assets/Resume/Carl Andrei Del Rosario - Resume.pdf";

const DownloadIcon = "/assets/WinIcons/stardew_valley.png";

const Resume = () => {
  // const onClickOpenInNewTab = () => {
  //   window.open(HisResume, "_blank");
  // };

  const onClickDownload = () => {
    const link = document.createElement("a");
    link.href = HisResume;
    link.download = HisResume.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="flex h-full flex-col overflow-auto">
      <SubHeader
        className="mb-2"
        buttons={[
          // {
          //   icon: DownloadIcon,
          //   title: "Open In New Tab",
          //   onClick: onClickOpenInNewTab,
          // },
          { icon: DownloadIcon, title: "Download", onClick: onClickDownload },
        ]}
      />

      {/* Resume */}
      <iframe src={HisResume} className="h-full w-full"></iframe>
    </div>
  );
};

export default Resume;
