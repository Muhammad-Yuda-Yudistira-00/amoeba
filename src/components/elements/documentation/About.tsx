
"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import Link from 'next/link'

const appDesc = process.env.NEXT_PUBLIC_APP_DESC

export default function About() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Link href="" onClick={() => setOpenModal(true)} className="underline hover:text-white text-stone-300">About</Link>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader style={{fontFamily: "Poppins"}} className="">About</ModalHeader>
        <ModalBody className="bg-orange-400 border-dashed border-4 border-white">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-white dark:text-black opacity-70">
              {appDesc}
            </p>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
