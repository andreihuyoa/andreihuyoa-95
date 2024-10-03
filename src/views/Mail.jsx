import React, { useState } from "react";

import WindowHeader from "../components/WindowHeader";

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
    <>
      <WindowHeader className="mb-2" />

      {/* Fields */}
      <div className="flex flex-col *:flex *:items-center *:gap-1 *:py-1 *:mb-1 *:border-b">
        {/* Subject Updates */}
        <div className="text-lg font-bold mb-2 overflow-auto">{subject || "New Message"}</div>

        {/* To */}
        <div>
          <label htmlFor="">To:</label>
          <p className="bg-95-cyan rounded-md px-1">Andrei Huyo-a</p>
        </div>

        {/* Subject */}
        <div className="">
          <label htmlFor="subject" className="block text-sm">
            Subject:
          </label>
          <input
            name="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
          />
        </div>

        {/* From */}
        <div>
          <label htmlFor="" className="block text-sm">
            From:
          </label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="your email"
          />
        </div>

        {/* Message */}
        <div className="">
          <label htmlFor="" className="block text-sm">
            Message:
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="message!"
          />
        </div>
      </div>

      <button onClick={handleSendEmail} className="bg-blue-500 text-white p-2 mt-2">
        Send Email
      </button>
    </>
  );
};

export default Mail;
