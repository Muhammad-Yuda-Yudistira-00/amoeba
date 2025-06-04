
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
        <TimelineContent>
          <TimelineTime className="capitalize">For team</TimelineTime>
          <TimelineTitle className="uppercase">step 1 (cardlist)</TimelineTitle>
          <TimelineBody style={{fontFamily: "Poppins"}} className="max-w-2xl">
            <p>
              Process: create main task by team, start from here for big team, -+10 members.
            </p>
            <p className="pt-2">Methode: agile with kanban (simple) or scrum (complex).</p> 
            <div className="pt-2">
              app: 
              <a href="https://www.atlassian.com/software/jira" target="_blank" className="external-link"> jira</a>, 
              <a href="https://trello.com" target="_blank" className="external-link"> trello</a>, 
              <a href="https://github.com/home" target="_black" className="external-link"> github projects</a>, dll.
            </div>
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint icon={HiOutlineClipboardList} />
        <TimelineContent>
          <TimelineTime className="capitalize">For person</TimelineTime>
          <TimelineTitle className="uppercase">step 2 (checklist)</TimelineTitle>
          <TimelineBody style={{fontFamily: "Poppins"}} className="max-w-2xl">
            <p>
              Process: break down each main task by person, start from here for mid team, -+5 members
            </p>
            <div className="pt-2">
              app: 
              <a href="https://www.checkli.com" target="_blank" className="external-link"> checkli</a>, 
              <span className="hover:text-red-200 underline cursor-not-allowed"> checklipst</span>, dll.
            </div> 
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint icon={HiOutlineClipboardCheck} />
        <TimelineContent>
          <TimelineTime className="capitalize">For person</TimelineTime>
          <TimelineTitle className="uppercase">Step 3 (notes)</TimelineTitle>
          <TimelineBody style={{fontFamily: "Poppins"}} className="max-w-2xl">
            <p>
              Process: write details, alerts, examples, task delays, additions that are not listed here. start from here for little team, -+1 members.
            </p>
            <div className="pt-2">
              app: 
              <a href="https://keep.google.com/" target="_blank" className="external-link"> google keep</a>, 
               dll.
            </div>
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}

