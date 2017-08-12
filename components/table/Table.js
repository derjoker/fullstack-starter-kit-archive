import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'

const Table = ({ data }) => {
  const columns = [
    {Header: 'Name', accessor: 'name', minWidth: 50},
    {Header: 'Email', accessor: 'email'},
    {Header: 'Age', accessor: 'age'}
  ]
  return (
    <div>
      <ReactTable
        data={data}
        columns={columns}
        pageSize={(data && data.length) || 0}
        showPagination={false}
        style={{textAlign: 'center'}}
        className='-striped -highlight' />
    </div>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  save: PropTypes.func
}

export default Table
