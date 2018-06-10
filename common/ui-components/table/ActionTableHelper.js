class ActionTableHelper {
    static createColumnDefinition({
        title,
        width,
        minWidth,
        maxWidth,
        dataFieldName,
        dataAccessorFunction,
        cellClassName,
        headerClassName,
        rowRenderFunction,
        noDefaultClick
    }) {
        let columnDef = {
            Header: title
        };
        if (width !== undefined) {
            columnDef.width = width;
        }
        if (minWidth !== undefined) {
            columnDef.minWidth = minWidth;
        }
        if (maxWidth !== undefined) {
            columnDef.maxWidth = maxWidth;
        }
        if (cellClassName !== undefined) {
            columnDef.className = cellClassName;
        }
        if (headerClassName !== undefined) {
            columnDef.headerClassName = headerClassName;
        }
        if (noDefaultClick !== undefined) {
            columnDef.noClick = noDefaultClick;
        }
        if (dataAccessorFunction !== undefined) {
            columnDef.accessor = dataAccessorFunction;
            columnDef.id = dataFieldName;
        } else if (dataFieldName !== undefined) {
            columnDef.accessor = dataFieldName;
        }
        if (rowRenderFunction !== undefined) {
            columnDef.Cell = rowRenderFunction;
        }
        return columnDef;
    }
}
export default ActionTableHelper;
