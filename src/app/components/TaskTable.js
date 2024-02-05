import React from 'react'
import { 
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from '@tanstack/react-table'
import { gql, useQuery } from '@apollo/client'

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
        variables: { amount: 3 },
    })
    console.log(data)

    // const table = useReactTable(options)

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
    })
    return (
        <div>table</div>
    )
}

export default TaskTable