import SubHeader from "../components/SubHeader";
import type { ReactElement } from "react";

const ResumePdf = "/assets/Resume/Carl Andrei Del Rosario - Resume.pdf";
const ResumePreview = `${ResumePdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

const DownloadIcon = "/assets/StartMenu/Attachment.svg";

const Resume = (): ReactElement => {
  const onClickDownload = (): void => {
    const link = document.createElement("a");
    link.href = ResumePdf;
    link.download = ResumePdf.split("/").pop() ?? "resume.pdf";
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
      <div className="min-h-0 flex-1 overflow-hidden bg-white">
        <object
          data={ResumePreview}
          type="application/pdf"
          className="h-full w-full"
        >
          <div className="text-95-black flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-sm">
            <p>Resume preview is not available in this browser.</p>
            <a
              className="underline"
              href={ResumePdf}
              target="_blank"
              rel="noreferrer"
            >
              Open resume
            </a>
          </div>
        </object>
      </div>
    </div>
  );
};

export default Resume;
