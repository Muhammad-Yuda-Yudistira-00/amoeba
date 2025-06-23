
"use client";

import {
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle
} from "flowbite-react";
import { HiOutlineClipboardCheck, HiOutlineClipboard, HiOutlineClipboardList } from "react-icons/hi";


export default function Roadmap() {
  return (
    <Timeline horizontal>
      <TimelineItem>
        <TimelinePoint icon={HiOutlineClipboard}/>
        <TimelineContent className="">
          <TimelineTime className="capitalize text-gray-800">For team</TimelineTime>
          <TimelineTitle className="uppercase">step 1 (cardlist)</TimelineTitle>
          <TimelineBody style={{fontFamily: "Poppins"}} className="max-w-2xl bg-black/20 text-orange-200">
            <p>
              Process: create main task by team, start from here for big team, -+10 members.
            </p>
            <p className="pt-2">Methode: agile with kanban (simple) or scrum (complex).</p> 
            <div className="pt-2">
              app: 
              <a href="https://www.atlassian.com/software/jira" target="_blank" className="external-link hover:text-blue-700"> jira</a>, 
              <a href="https://trello.com" target="_blank" className="external-link hover:text-blue-700"> trello</a>, 
              <a href="https://github.com/home" target="_black" className="external-link hover:text-blue-700"> github projects</a>, dll.
            </div>
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint icon={HiOutlineClipboardList} />
        <TimelineContent className="bg-white/40">
          <TimelineTime className="capitalize text-yellow-600">For person</TimelineTime>
          <TimelineTitle className="uppercase">step 2 (checklist)</TimelineTitle>
          <TimelineBody style={{fontFamily: "Poppins"}} className="max-w-2xl text-gray-800">
            <p>
              Process: break down each main task by person, start from here for mid team, -+5 members
            </p>
            <div className="pt-2">
              app: 
              <a href="https://www.checkli.com" target="_blank" className="external-link hover:text-red-700"> checkli</a>, 
              <span className="hover:text-red-700 underline cursor-not-allowed"> checklipst</span>, dll.
            </div> 
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint icon={HiOutlineClipboardCheck} />
        <TimelineContent>
          <TimelineTime className="capitalize text-red-800">For person</TimelineTime>
          <TimelineTitle className="uppercase bg-green-400/20 ml-2">Step 3 (notes)</TimelineTitle>
          <TimelineBody style={{fontFamily: "Poppins"}} className="max-w-2xl bg-green-400/20 ml-2 text-green-700">
            <p>
              Process: write details, alerts, examples, task delays, additions that are not listed here. start from here for little team, -+1 members.
            </p>
            <div className="pt-2 text-green-200 bg-green-700/80">
              app: 
              <a href="https://keep.google.com/" target="_blank" className="external-link hover:text-black"> google keep</a>, 
               dll.
            </div>
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}

