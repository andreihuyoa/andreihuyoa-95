import React from "react";
import SubHeader from "../components/SubHeader";

import HisResume from "../assets/Resume/CarlAndreiDelRosario.pdf";

import DownloadIcon from "../assets/WinIcons/stardew_valley.png";

const Resume = () => {
  const onClickOpenInNewTab = () => {
    window.open(HisResume, "_blank");
  };

  const onClickDownload = () => {
    const link = document.createElement("a");
    link.href = HisResume;
    link.download = "Carl Andrei Del Rosario - Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="flex flex-col h-full overflow-auto">
      <SubHeader
        className="mb-2"
        buttons={[
          //download
          { icon: DownloadIcon, title: "Open In New Tab", onClick: onClickOpenInNewTab },
          //open in new tab
          { icon: DownloadIcon, title: "Download", onClick: onClickDownload },
        ]}
      />

      {/* Resume */}
      <iframe src={HisResume} className="w-full h-full"></iframe>
    </div>
  );
};

export default Resume;
