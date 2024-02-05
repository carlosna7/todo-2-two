'use client'

import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { 
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
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
    // {
    //     accessorKey: row => row.lastName,
    //     header: () => <span>Last Name</span>,
    // },
]

const TaskTable = () => {

    const { loading, error, data } = useQuery(GET_TASKS, {
        variables: { amount: 30 },
    })

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const tasksData = data.getTasks
    
    console.log(data)

    // const table = useReactTable(options)

    const table = useReactTable({
        columns,
        data: () => tasksData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <>
        {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <div key={header.id}>
                        {header.column.columnDef.header}
                    </div>
                ))}
            </div>
        ))}
        </>
    
    )
}

export default TaskTable