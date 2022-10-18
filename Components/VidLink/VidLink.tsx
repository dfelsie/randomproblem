import React, { useEffect, useState } from "react";
import localStyles from "./VidLink.module.css";
type Props = {
  vidLink: string;
  vidTitle: string;
};
export default function VidLink({ vidLink, vidTitle }: Props) {
  const embedLinkBase = "https://www.youtube.com/embed/";
  const linkId = vidLink.slice(vidLink.lastIndexOf("?v=") + 3);

  return (
    <div className={localStyles.vidDiv}>
      <iframe
        src={embedLinkBase + linkId}
        title={vidTitle}
        /*       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         */
      ></iframe>
    </div>
  );
}
