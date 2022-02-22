
import React from "react";
import {StockDetailApi, StockItem} from "../../_types";

export type TableRowProps = {
    stock: StockItem;
    key: number;
}

const TableRow: React.FC<TableRowProps> = ({ stock, key}) => {
    return (
        <tr>
            <td className="px-0 py-3">
                <div className="symbol symbol-55px mt-1 me-5">
          <span className={`symbol-label align-items-end`}>
            {stock.name}
          </span>
                </div>
            </td>
            { stock && stock.stocks.length > 0 ? stock.stocks.map((s: StockDetailApi,i) =>
                <td className="px-0">
                    {s.stocks}
            </td>)
                : null }

        </tr>
    );
};

export { TableRow };
