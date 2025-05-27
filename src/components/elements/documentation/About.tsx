
"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import Link from 'next/link'

const appDesc = process.env.NEXT_PUBLIC_APP_DESC

export default function About() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Link href="" onClick={() => setOpenModal(true)} className="underline hover:text-white text-stone-400">About</Link>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader style={{fontFamily: "Poppins"}}>About</ModalHeader>
        <ModalBody className="bg-orange-400">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-black opacity-70">
              {appDesc}
            </p>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
