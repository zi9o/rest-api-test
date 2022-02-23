import { Skeleton } from "@mui/material";


const EmptyTable = ({ count, label, action }) => {
    return (
        <>
            {[...Array(count)].map((x, i) =>
                <Skeleton key={i} variant="text" animation="wave" height={50} style={{ marginTop: '10px', marginRight: '10px' }} />
            )}


        </>
    );
}

export { EmptyTable };