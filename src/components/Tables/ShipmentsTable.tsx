import { useAppSelector } from "../../hooks/hooks";
import "./shipmentsTable.css";
import { DataGrid } from "@mui/x-data-grid";

export const ShipmentsTable = () => {
  const paginationModel = { page: 0, pageSize: 10 };
  const columns = useAppSelector((state) => state.tables.columnsDefinitions);
  const rows = useAppSelector((state) => state.tables.rowsData);

  return (
    <section className="shipmentsTable">
      <DataGrid
        initialState={{ pagination: { paginationModel } }}
        columns={columns}
        rows={rows}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        sx={{
          backgroundColor: "var(--dark-grey)", 
          border : "none",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "var(--dark-grey)",
            color: "#fff",
            flexGrow : "1"
          },
          "& .MuiDataGrid-filler" : {
            display : "none"
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#fff", 
          },
          "& .MuiSvgIcon-root": {
            fill: "#fff",
          },
          "& .MuiDataGrid-row":{
            background : "var(--dark-grey)",
            cursor : "pointer"
          },
          "& .MuiTablePagination-displayedRows" : {
            color : "var(--white)"
          },
          "& .MuiTablePagination-selectLabel" : {
            color : "var(--white)"
          }
        }}
      />
    </section>
  );
};
