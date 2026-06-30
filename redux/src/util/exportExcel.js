import * as XLSX from "xlsx";

export const exportToExcel = (expenseList) => {
     if(!expenseList || expenseList.length ===0){
          alert("No transaction found to export");
          return;
     }

     const formattedData = expenseList.map((item) => {
          const dateObj = item.date? new Date(item.date): null;

          return{
               "Date" : dateObj? dateObj.toLocaleDateString('en-US',{year: 'numeric', month: 'short', day: 'numeric'}) : 'N/A',
               "Description" : item.description? item.description : "N/A",
               "Category" : item.category? item.category.charAt(0).toUpperCase() + item.category.slice(1) : "Uncategorized",
               "Type" : item.type? item.type.toUpperCase() : "N/A",
               "Amount($)" : item.type === "expense" ? -Number(item.amount || 0) : Number(item.amount || 0) 
          };
     });
     //Create an Excel Worksheet from our cleaned JSON array data
     const workSheet = XLSX.utils.json_to_sheet(formattedData);

     //Create an empty Excel Workbook structure container
     const workBook = XLSX.utils.book_new();

     //Append the Worksheet to the Workbook and name the tab
     XLSX.utils.book_append_sheet(workBook, workSheet, "Transaction Ledger");

     //Generate the physical file and trigger the browser download save action
     XLSX.writeFile(workBook, `FinTrack_Transaction_${new Date().toISOString().split('T')[0]}.xlsx`);
};