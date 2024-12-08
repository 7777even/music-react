import React, { memo } from 'react';
import Pagination from 'antd/es/pagination';
import "antd/es/pagination/style/css";
import "./style.less";

export default memo(function RewritePagination(props) {
    // 修改分页器上一步和下一步为文字链接
    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button className="prev-btn">上一页</button>;
        }
        if (type === 'next') {
            return <button className="next-btn">下一页</button>;
        }
        return originalElement;
    }

    return (
        <div className="pagination-wrapper">
            <Pagination
                showTitle={false}
                itemRender={itemRender}
                {...props}
            />
        </div>
    );
});