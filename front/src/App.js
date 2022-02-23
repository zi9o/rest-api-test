import logo from './axa.png';
import React from "react";
import "./App.css";
import MultilineChart from "./components/MultilineChart";
import {EmptyTable} from "./components/EmtyTable";
import {Alert} from "@mui/material";

const dimensions = {
    width: 800,
    height: 300,
    margin: {
        top: 300,
        right: 30,
        bottom: 30,
        left: 60
    }
};

function changeItem(item, index = 0) {
    return {
        date: new Date(item.timestamp),
        value: item.stocks,
        index
    }
}

function changeDataStructure(list) {
    let newList = [];
    let names = new Set();
    let nameKeys = new Map();
    let allowChanges = [];
    list.forEach((item) => {
        if (names.has(item.name)) {
            const stockIndex = nameKeys.get(item.name);
            allowChanges[stockIndex].push(true);
            const index = newList[stockIndex].items.length;
            newList[stockIndex].items.push(changeItem(item, index));
        } else {
            const size = names.size;
            nameKeys.set(item.name, size);
            names.add(item.name);
            allowChanges.push([true]);
            newList.push({
                name: item.name,
                index: size,
                color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6),
                items: [changeItem(item, 0)]
            })
        }
    });

    return {changedData: newList, allowChanges};
}

function App() {
    const [data, setData] = React.useState([]);
    const [tableData, setTableData] = React.useState([]);
    const [hasData, setHasData] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [allowedToChange, setAllowedToChange] = React.useState([]);

    function toChange(stockIndex, index) {
        allowedToChange[stockIndex][index] = false;
        setAllowedToChange([...allowedToChange]);
    }

    function cancelChange(stockIndex, index) {
        allowedToChange[stockIndex][index] = true;
        setAllowedToChange([...allowedToChange]);
    }

    function updateData(stockIndex, index, value) {
        tableData[stockIndex].items[index] = {...tableData[stockIndex].items[index], value};
        setTableData([...tableData]);
    }
    React.useEffect(() => {
        fetch("/api/stocks")
            .then(async (resp) => {
                if(resp.ok) {
                    const stockData = await resp.json();
                    setData(stockData);
                    const {changedData, allowChanges} = changeDataStructure(stockData);
                    setTableData(changedData);
                    setHasData(stockData && stockData.length > 0);
                    setAllowedToChange(allowChanges)
                } else {
                    setIsError(true);
                }
            })
    }, []);

    return (
        <div className="App">
            {
                isError ? (
                    <Alert severity="error" onClose={() => {
                        setIsError(false);
                    }}>Le service est momentanément indisponible</Alert>
                ) : null
            }{(
                    <section>
                        <div className="card">
                            {/* begin::Header */}
                            <div className="card-header border-0 pt-5">
                                <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark fs-3">
            List of stocks
          </span>
                                </h3>

                            </div>
                            {/* end::Header */}

                            {/* begin::Body */}

                            { hasData ?
                                (
                                    <div className="card-body pt-3 pb-0 mt-n3">
                                        <div className="tab-content mt-4" id="myTabTables2">
                                            {/* begin::Tap pane */}
                                            <div
                                                id="kt_tab_pane_2_1"
                                                role="tabpanel"
                                                aria-labelledby="kt_tab_pane_2_1"
                                                className="tab-pane fade active show"
                                            >
                                                {/* begin::Table */}
                                                <div className="table-responsive">
                                                    { hasData ? (

                                                        <table className="table table-bordered table-responsive align-middle">
                                                            <thead>
                                                            <tr>
                                                                <th className="p-0 min-w-50px"></th>
                                                                <th className="p-0 min-w-400px"></th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            { data && data.length > 0 ? tableData.map((s,i) =>
                                                                    <tr key={i}>
                                                                        <td className="px-0 py-3 text-info">
                                                                            <div className="symbol symbol-55px mt-1 me-5">
          <span className={`symbol-label align-items-end`}>
            {s.name}
          </span>
                                                                            </div>
                                                                        </td>
                                                                        { s && s.items.length > 0 ? s.items.map((item, j) =>
                                                                                allowedToChange[i] && allowedToChange[i][j] ? <td onClick={() => {toChange(s.index, j)}} key={j} className="px-1">
                                                                                        {item.value}
                                                                                    </td>
                                                                                    : <td key={j} className="px-1">
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control form-control-lg form-control-solid"
                                                                                            placeholder=""
                                                                                            value={item.value}
                                                                                            onBlur={() => cancelChange(s.index, j)}
                                                                                            onChange={(e) =>
                                                                                                updateData(s.index, j, e.target.value)
                                                                                            }
                                                                                        />
                                                                                    </td>
                                                                            )
                                                                            : null }

                                                                    </tr>
                                                            ): null }
                                                            </tbody>
                                                        </table>

                                                    ) : null}

                                                </div>
                                                {/* end::Table */}
                                            </div>
                                            {/* end::Tap pane */}
                                        </div>
                                    </div>)
                                : (
                                    <EmptyTable count={3} ></EmptyTable>
                                )
                            }
                            {/* end::Body */}

                        </div>
                        {hasData ? <MultilineChart data={data.map((v)=>changeItem(v))} tabledata={tableData} dimensions={dimensions}/> : null }
                    </section>


                )
            }
        </div>
    );
}

export default App;
