import React, { useState } from "react";

import InputField from "../components/InputField";
import SubHeader from "../components/SubHeader";

const Mail = () => {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
    const mailToLink = `mailto:andrei.huyoa.me@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(from)}`;
    window.location.href = mailToLink;
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <SubHeader className="mb-2" onClick={handleSendEmail} title="Send" />

      {/* Fields */}
      <div className="flex-1 flex p-1 flex-col overflow-auto *:flex *:items-center *:gap-1 *:py-1 *:mb-1 *:border-b">
        {/* Subject Updates */}
        <div className="text-xl font-MSW98UIBold tracking-tighter mb-2 overflow-auto">
          {subject || "New Message"}
        </div>

        {/* To */}
        <div>
          <label>To:</label>
          <p className="bg-95-cyan rounded-md px-1">Andrei Huyo-a</p>
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
        </div>
      </div>
    </div>
  );
};

export default Mail;
