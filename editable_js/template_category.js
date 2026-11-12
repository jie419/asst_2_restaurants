/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories
 */
import { categoryGroups } from './template_charts.js';
import { formatDate } from './template_cards.js';
import { getLevel } from './template_table.js';
const cityCorrect = {
  'DISTRICT HTS': 'DISTRICT HEIGHTS',
  'Riverdale' : 'RIVERDALE',
  'Hyattsville' : 'HYATTSVILLE'
};
function getCity(inspection) {
  return cityCorrect[inspection.city] || inspection.city;
}

function showCategories(data) {
  // Requirements:
  // - Group data by one meaningful field (category, city, inspection result, etc.)
  // - Show how many records are in each group, plus one other number per group
  //   (an average, a highest, a lowest)
  // - Show items within each group
  // - Make the groups easy to compare, and visually distinct from their items
  
  const byCity = {};
  data.forEach((inspection) => {
    const city = getCity(inspection);
    byCity[city] = byCity[city] || [];
    byCity[city].push(inspection);
  });

  const categoryHTML = Object.keys(byCity)
  .sort((a, b) => byCity[b].length - byCity[a].length)
  .map((city) => {
  const inspections = byCity[city];
  const total = inspections.length;
  const passed = inspections.filter((inspection) => getLevel(inspection) === 'Pass').length;
  const noResult = inspections.filter((inspection) => getLevel(inspection) === 'Not listed').length;
  const items = inspections
    .map((inspection) => `<li class="category-item">
      <p><strong>Name:</strong> ${inspection.name}</p>
      <p><strong>Broad category:</strong> ${categoryGroups[inspection.category] || 'Not listed'}</p>
      <p><strong>Inspected:</strong> ${formatDate(inspection.inspection_date)}</p>
      <p><strong>Result:</strong> ${getLevel(inspection)}</p>
    </li>`)
    .join('');
/*html*/
  return `
    <details class="category-section">
      <summary class = "category-header">${city}: ${total} inspections, ${Math.round((passed / total) * 100)}% passed, ${Math.round((noResult / total) * 100)}% Not listed</summary>
      <ul class="category-items">${items}</ul>
    </details>
  `;
})
.join('');
  return `
                <h2 class="view-title">📂 Category View</h2>
                ${categoryHTML}
            `;
}

export default showCategories;