'use client'

import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import { 
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'

const GET_TASKS = gql `
    query GetTasks($amount: Int) {
        getTasks(amount: $amount) {
            id
            name
            responsible
            createdAt
        }
    }
`

const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
        // size: 1,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'responsible',
        header: 'Responsible',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'createdAt',
        header: 'createdAt',
        cell: (props) => <p>{props.getValue()}</p>
    },
]

const TaskTable = () => {

    const { loading, error, data } = useQuery(GET_TASKS, {
        variables: { amount: 3 },
    })

    const [ taskData, setTaskData ] = useState()

    useEffect(() => {

        if (!loading && !error) {
            setTaskData(data.getTasks);
        }

    }, [loading, error, data]);

    console.log(taskData)

    const table = useReactTable({
        columns,
        data: taskData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getRowModel: () => ({ rows: taskData })
    })

    return (
        <>
        <div>
            {table.getHeaderGroups().map((headerGroup) => (
                <div key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <div key={header.id}>
                            {header.column.columnDef.header}
                        </div>
                    ))}
                </div>
            ))}
            {table.getRowModel().rows.map((row) => (
                <div key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <div key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    ))}
                </div>
            ))}
        </div>
        </>
    
    )
}

export default TaskTable