/* eslint-disable react/prop-types */
import { IoIosClose } from "react-icons/io";

import { TiSocialFacebook } from "react-icons/ti";
import { GrLinkedinOption } from "react-icons/gr";
import { GrTwitter } from "react-icons/gr";
import { FaTelegramPlane } from "react-icons/fa";
import { RiWhatsappLine } from "react-icons/ri";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const ShareModal = ({ closeShareModalHandler, id }) => {
  const shareUrl = `https://arriendalo.com.co/propiedades/${id}`;
  return (
    <div
      onClick={closeShareModalHandler}
      className="fixed inset-0 flex items-center bg-black/80 justify-center z-50"
    >
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg sm:w-[50%] md:w-[60%] lg:w-[40%]">
        <div className="relative items-center bg-slate-50 dark:bg-slate-950 justify-center flex-row border-[0.5px] rounded-xl border-neutral-400 p-2 w-full">
          <div
            onClick={closeShareModalHandler}
            className="flex absolute right-2 justify-end items-center  cursor-pointer"
          >
            <IoIosClose className="text-3xl" />
          </div>
          <div className="flex-row items-center ">
            <div>
              <h1 className="text-center font-semibold"> Comparte </h1>
            </div>

            <div className="flex pb-3 items-center justify-center gap-3">
              <div className="flex mt-5 items-center justify-center">
                <FacebookShareButton url={shareUrl}>
                  <div className="p-2 border-[1.5px] border-neutral-400 rounded-full">
                    <TiSocialFacebook className="text-xl hover:scale-110 duration-200" />
                  </div>
                </FacebookShareButton>
              </div>
              <div className="flex mt-5 items-center justify-center">
                <LinkedinShareButton url={shareUrl}>
                  <div className="p-2 border-[1.5px] border-neutral-400 rounded-full">
                    <GrLinkedinOption className="text-xl hover:scale-110 duration-200" />
                  </div>
                </LinkedinShareButton>
              </div>
              <div className="flex mt-5 items-center justify-center">
                <TelegramShareButton url={shareUrl}>
                  <div className="p-2 border-[1.5px] border-neutral-400 rounded-full">
                    <FaTelegramPlane className="text-xl hover:scale-110 duration-200" />
                  </div>
                </TelegramShareButton>
              </div>
              <div className="flex mt-5 items-center justify-center">
                <TwitterShareButton url={shareUrl}>
                  <div className="p-2 border-[1.5px] border-neutral-400 rounded-full">
                    <GrTwitter className="text-xl hover:scale-110 duration-200" />
                  </div>
                </TwitterShareButton>
              </div>
              <div className="flex mt-5 items-center justify-center">
                <WhatsappShareButton url={shareUrl}>
                  <div className="p-2 border-[1.5px] border-neutral-400 rounded-full">
                    <RiWhatsappLine className="text-xl hover:scale-110 duration-200" />
                  </div>
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
