
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */
import { formatDate, orNotListed } from './template_cards.js';
 const resultLevels= {
    'Compliant - No Health Risk': 'Pass',
    'Compliance Schedule - Completed':'Pass',
    'Facility Reopened':'Pass',
    'Non-Compliant - Violations Observed':'Non-Compliant Minor',
    'Compliance Schedule - Outstanding':'Non-Compliant Minor',
    'Critical Violations observed':'Non-Compliant Severe',
    'Facility Closed' : 'Facility Closed',
    '------':'Not listed'
 };

 const levelOrder = {
  'Pass': 1,
  'Non-Compliant Minor': 2,
  'Non-Compliant Severe': 3,
  'Facility Closed': 4,
  'Not listed': 5
};
function getLevel(inspection) {
  return resultLevels[inspection.inspection_results] || orNotListed(inspection.inspection_results);
}
function showTable(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Use a real HTML <table>, with <th> header cells and a <caption> saying what the table shows
  // - Include the 4-6 most useful fields
  // - Show "Not listed" instead of undefined when a value is missing
  // - Optional: add sorting
  /*html*/ 
  const byBusiness = {};
  data.forEach((inspection)  => {
    byBusiness[inspection.establishment_id] = byBusiness[inspection.establishment_id] || [];
    byBusiness[inspection.establishment_id].push(inspection);
  });
  
  Object.values(byBusiness).forEach((inspections) => {
  inspections.sort((a, b) => {
  const diff = new Date(b.inspection_date) - new Date(a.inspection_date);
  if (diff !== 0) {
    return diff;
  }
   if (a.inspection_results === '------') {
      return 1;
    }
    if (b.inspection_results === '------') {
      return -1;
    }
    return 0;
  });
  });

  const tableHTML = Object.values(byBusiness)
   .sort((a, b) => levelOrder[getLevel(a[0])] - levelOrder[getLevel(b[0])])
    .map(
      /*html*/
      (inspections) => {
       const latest = inspections[0];
      const history = inspections.slice(1);
      let historyHTML = 'No earlier inspections';

      if (history.length > 0) {
        const items = history
          .map((inspection) => `<li><p><strong>Inspected:</strong> ${formatDate(inspection.inspection_date)}</p>
                    <p><strong>Result:</strong> ${getLevel(inspection)}</p></li>`)
          .join('');

        historyHTML = `
          <details>
            <summary>${history.length} earlier inspections</summary>
            <ul>${items}</ul>
          </details>
        `;
      }

      return `
        <tr>
          <td>${latest.name}</td>
          <td>${latest.address_line_1}, ${latest.city}</td>
          <td>${getLevel(latest)}</td>
          <td>${formatDate(latest.inspection_date)}</td>
          <td>${historyHTML}</td>
        </tr>
      `;
      }
    )
    .join('');

  return `
               <h2 class="view-title">📊 Table View</h2>
               <div class="table-scroll">    
               <table class="restaurant-table">
               <caption class="restaurant-table caption"><b>Inspection Results</b></caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Address</th>
      <th scope="col">Latest Result</th>
      <th scope="col">Inspection Date</th>
      <th scope="col">Inspection History</th>
    </tr>
  </thead>
  <tbody>
    ${tableHTML}
  </tbody>
</table>
               </div>
`;
}

export default showTable;
export { getLevel };