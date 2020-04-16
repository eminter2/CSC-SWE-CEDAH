import React from 'react';
import { useParams } from 'react-router-dom';

const Groupviewer = () => {
    let groupId = useParams().id
    return (
        <div>Group {groupId}</div>
    )
}

export default Groupviewer;