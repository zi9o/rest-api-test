import logo from './axa.png';
import React from "react";
import "./App.css";
import MultilineChart from "./components/MultilineChart";

const dimensions = {
    width: 600,
    height: 600,
    margin: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 60
    }
};

function changeItem(item) {
    return {
        date: new Date(item.timestamp),
        value: item.stocks,
    }
}

function changeDataStructure(list) {
    let newList = [];
    let names = new Set();
    let nameKeys = new Map();
    list.forEach((item) => {
        if (names.has(item.name)) {
            newList[nameKeys.get(item.name)].items.push(changeItem(item));
        } else {
            nameKeys.set(item.name, names.size);
            names.add(item.name);
            newList.push({
                name: item.name,
                color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6),
                items: [changeItem(item)]
            })
        }
    });
    console.log(newList);
    return newList;
}

function App() {
    const [data, setData] = React.useState(null);
    const [tableData, setTableData] = React.useState(null);
    const [hasData, setHasData] = React.useState(false);

    function updateData(index, value) {
        data[index] = {...data[index], stocks: value};
    }
    React.useEffect(() => {
        fetch("/api/stocks")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setTableData(changeDataStructure(data));
                setHasData(data && data.length > 0);
            });
    }, []);

    return (
        <div className="App">
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

                                        <table className="table table-bordered align-middle">
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
                                                                <td key={j} className="px-1">
                                                                    {item.value}
                                                                </td>)
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
                    </div>
                    {/* end::Body */}

                </div>
            </section>

            <div className="pt-4">
                {hasData ? <MultilineChart
                    data={tableData}
                    dimensions={dimensions}
                /> : null }
            </div>
        </div>
    );
}

export default App;
