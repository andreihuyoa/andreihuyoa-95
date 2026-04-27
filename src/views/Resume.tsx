import SubHeader from "../components/SubHeader";
import type { ReactElement } from "react";

const HisResume = "/assets/Resume/Carl Andrei Del Rosario - Resume.pdf";

const DownloadIcon = "/assets/WinIcons/stardew_valley.png";

const Resume = (): ReactElement => {
  // const onClickOpenInNewTab = () => {
  //   window.open(HisResume, "_blank");
  // };

  const onClickDownload = (): void => {
    const link = document.createElement("a");
    link.href = HisResume;
    link.download = HisResume.split("/").pop() ?? "resume.pdf";
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
