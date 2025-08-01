import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"  // Importing table components from the UI library
import { Badge } from './ui/badge'  
import { useSelector } from 'react-redux'       // Importing Redux hook to access store state

const AppliedJobTable = () => {                 // Functional component to show a table of applied jobs

  const {allAppliedJobs} = useSelector( store => store.job);    // Destructuring the 'allAppliedJobs' from the job slice of Redux store
  // const { allAppliedJobs = [] } = useSelector(store => store.job || {});
  
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            // If no jobs are applied, show message. Else, map through all applied jobs
            // [1, 2].map((item, index) => (
            allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === "pending" ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
