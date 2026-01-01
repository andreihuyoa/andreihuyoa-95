import React, { useState } from "react";

import InputField from "../components/InputField";
import SubHeader from "../components/SubHeader";

const SendEmailIcon = "/assets/WinIcons/workspace.png";

const Mail = () => {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //requires backend kakatamad
  const [status, setStatus] = useState("");

  const validateEmail = (email) => {
    return email.includes("@");
  };

  // const onClickSendEmail = async () => {
  //   if (!validateEmail(from)) {
  //     setError("Enter a valid email address");
  //     return;
  //   }
  //   setError("");

  //   try {
  //     const response = await fetch("http://localhost:3001/send-email", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         from,
  //         subject,
  //         message,
  //       }),
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       setStatus("Sent!");
  //     } else {
  //       setStatus("Error sending: " + result);
  //     }
  //   } catch (error) {
  //     setStatus("Error sending: " + error.message);
  //   }
  // };

  const onClickUseDiffApp = () => {
    if (!validateEmail(from)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");

    const mailToLink = `mailto:andrei.huyoa.me@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(from)}`;

    window.location.href = mailToLink;
  };

  return (
    <div className="flex h-full flex-col overflow-auto">
      <SubHeader
        className="mb-2"
        buttons={[
          //replace it with onClickSendEmail pag nakapag setup na ng backend eg. express
          // tho mas okay with library eg. email.js, formspree, smtp.js(best?)
          { icon: SendEmailIcon, title: "Send", onClick: onClickUseDiffApp },
          {
            icon: SendEmailIcon,
            title: "Use Different App",
            onClickUseDiffApp,
          },
        ]}
      />

      {/* Fields */}
      <div className="flex flex-1 flex-col overflow-auto p-1 *:mb-1 *:flex *:items-center *:gap-1 *:border-b *:py-1">
        {/* Subject Updates */}
        <div className="mb-2 overflow-auto font-MS95 text-xl font-bold tracking-tighter">
          {subject || "New Message"}
        </div>

        {/* To */}
        <div>
          <label>To:</label>
          <p className="rounded-md bg-95-cyan px-1">Andrei Huyo-a</p>
        </div>

        {/* Subject */}
        <div className="">
          <label htmlFor="Subject" className="">
            Subject:
          </label>
          <InputField
            name="Subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
          />
        </div>

        {/* From */}
        <div>
          <label htmlFor="From" className="text-base">
            From:
          </label>
          <InputField
            name="From"
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Your email"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        {/* Message */}
        <div className="flex-1 overflow-auto border-none">
          <InputField
            name="Message"
            type="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me something!"
          />

          {/* Status Message */}
          {status && <p className="mt-2 text-sm text-green-500">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default Mail;
