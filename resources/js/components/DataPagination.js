import React from 'react';
import { Pagination } from 'react-bootstrap';

const DataPagination = props => {
    const { page, pageSize, totalRecord, onChangePage = () => { } } = props;

    const renderedPagination = () => {
        const items = [];
        const totalPage = Math.ceil(totalRecord / pageSize);
        for (let i = 1; i <= totalPage; i++) {
            items.push(
                <Pagination.Item key={i} active={i === page} onClick={event => onChangePage(event, i)}>
                    {i}
                </Pagination.Item>,
            );
        }
        return items;
    }

    return (
        <Pagination>{renderedPagination()}</Pagination>
    )
}

export default DataPagination;
