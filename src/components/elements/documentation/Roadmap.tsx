
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
          <TimelineTitle className="uppercase">First todolist (cardlist)</TimelineTitle>
          <TimelineBody style={{fontFamily: "Poppins"}}>
            <p>For agile (management project) with kanban or scrum. professional or big company start from here.</p> 
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
          <TimelineTitle className="uppercase">Second todolist (checklist)</TimelineTitle>
          <TimelineBody style={{fontFamily: "Poppins"}}>
            Every person had task from card task can break it down to be checklist tasks here. or for individu and simple project can start from here.
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
          <TimelineTime className="capitalize">finish</TimelineTime>
          <TimelineTitle className="uppercase">Tracking cardlist by leader, checklist by person.</TimelineTitle>
          <TimelineBody style={{fontFamily: "Poppins"}}>
            Check them in daily, weekly, monthly, yearly, or combine all for looks the progress.
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}

