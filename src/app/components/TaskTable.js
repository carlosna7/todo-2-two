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
import { Thasadith } from 'next/font/google'

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

const dados = {
    id: "1",
    name: "teste",
    responsible: "admin",
    createdAt: "12:12"
} 

const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
        // size: 1,
        // cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'name',
        header: 'Name',
        // cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'responsible',
        header: 'Responsible',
        // cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'createdAt',
        header: 'createdAt',
        // cell: (props) => <p>{props.getValue()}</p>
    },
]

const TaskTable = () => {

    const { loading, error, data } = useQuery(GET_TASKS, {
        variables: { amount: 3 },
    })

    const [ taskData, setTaskData ] = useState([])

    useEffect(() => {

        if (!loading && !error) {
            setTaskData(data.getTasks);
        }

    }, [loading, error, data]);

    // console.log(taskData)

    const table = useReactTable({
        columns,
        data: taskData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
    }) 

    return (
        <>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.column.columnDef.header}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    
    )
}

export default TaskTable