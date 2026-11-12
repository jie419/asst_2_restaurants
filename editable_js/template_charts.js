/**
 * CHARTS VIEW - STUDENTS IMPLEMENT
 * Show patterns in your data as charts, using Chart.js
 *
 * This view has two parts:
 *   showCharts(data) returns the HTML: one <canvas> per chart, with a text alternative under each
 *   drawCharts(data) runs after that HTML is on the page, and draws a chart into each <canvas>
 *
 * Chart.js docs: https://www.chartjs.org/docs/latest/getting-started/
 */

import { getLevel } from './template_table.js';
//Mapping categories into a broader category
const categoryGroups = {
//Food service
 'Fast Food - Chain': 'Food service',
  'Restaurant': 'Food service',
  'Carry-out': 'Food service',
  'Fast Food - Local': 'Food service',
  'Coffee Shop': 'Food service',
  'Ice Cream': 'Food service',
  'Bar/Tavern/Lounge': 'Food service',
  'Snack Bar/Concession Stand': 'Food service',
  'Bakery/Catering': 'Food service',
  '@Fast Food-Do Not Use': 'Food service',
  'Diet/Nutrition Site': 'Food service',
  // Food retail
  'Convenience Store': 'Food retail',
  'Gas Station Store': 'Food retail',
  'Grocery Store': 'Food retail',
  'Grocery Store - Large': 'Food retail',
  'Grocery Store- Medium': 'Food retail',
  'Dollar Store': 'Food retail',
  'Specialty Store': 'Food retail',
  // Schools & Institutions
  'Public School': 'Schools & Institutions',
  'Private School': 'Schools & Institutions',
  'Health Care Facility': 'Schools & Institutions',
  'Church/Temple/Mosque': 'Schools & Institutions',
};
//Mapping critical checks into a broader category
const checkThemes = {
  'cooling_time_and_temperature': 'Temperature',
  'cold_holding_temperature': 'Temperature',
  'hot_holding_temperature': 'Temperature',
  'cooking_time_and_temperature': 'Temperature',
  'reheating_time_and_temperature': 'Temperature',
  'rodent_and_insects': 'Pests',
  'food_protected_from': 'Cleanliness',
  'food_contact_surfaces_and': 'Cleanliness',
  'proper_hand_washing': 'Hygiene',
  'adequate_hand_washing': 'Hygiene',
  'no_bare_hand_contact': 'Hygiene',
  'ill_workers_restricted': 'Hygiene',
  'food_from_approved_source': 'Food source',
  'hot_and_cold_running_water': 'Water & sewage',
  'proper_sewage_disposal': 'Water & sewage'
};
function showCharts(data) {
  // TODO: Replace each TODO sentence below with text that says what that chart shows.
  // Charts are drawn as pictures, so screen readers can't read them.
  /*html*/
  return `
                <h2 class="view-title">📈 Charts View</h2>
                <p class="view-description">Patterns in the data at a glance</p>
                <div class="charts-grid">
                    <figure class="chart-figure">
                        <canvas id="chart-one"></canvas>
                        <figcaption class="chart-summary">In this chart, you can see the rate of inspections that did not pass for all the businesses offering food. This data excludes inspections with no results. The highest failure rate is for schools and institutions (100%, 9 of 9 inspections), the second is food retail (75%), followed by food service (64%).</figcaption>
                    </figure>
                    <figure class="chart-figure">
                        <canvas id="chart-two"></canvas>
                        <figcaption class="chart-summary">This chart only includes the results of 15 critical checks. In this dataset, some inspections pass all 15 critical checks, but the overall result is not passed. However, we still show an overall view for the public to understand what the common violations might be. The top three are temperature control (26 violations), pest control (20), and cleanliness (17).</figcaption>
                    </figure>
                </div>
            `;
}

function drawCharts(data) {
  // Chart.js is loaded by a <script> tag in index.html. If it didn't load, say so instead of breaking.
  if (typeof Chart === 'undefined') {
    document.querySelector('.charts-grid').innerHTML =
      '<p class="error">Chart.js did not load, so the charts can\'t be drawn. Check the &lt;script&gt; tag in index.html.</p>';
    return;
  }
  const recorded = data.filter((inspection) => inspection.inspection_results !== '------');
  const totals = {};
  const notPassed = {};
  recorded.forEach((inspection) => { 
    const group = categoryGroups[inspection.category]|| 'Unknown type';
    totals[group] = (totals[group] || 0) + 1;
   if (getLevel(inspection) !== 'Pass') {           
    notPassed[group] = (notPassed[group] || 0) + 1;
  }});
    const groupOrder = ['Food service', 'Food retail', 'Schools & Institutions', 'Unknown type' ];
    const groupLabels = groupOrder;
    const groupPercents = groupOrder.map((group) => Math.round((notPassed[group] || 0) / totals[group] * 100));
 
  new Chart(document.querySelector('#chart-one'), {
      type: 'bar',
      data: {
        labels: groupLabels,
        datasets: [{ label: 'Percentage of Inspections Not Passed ', data: groupPercents }]
      },
      options: {
        plugins: { title: { display: true, text: 'Percentage of Inspections Not Passed by Type of Business' } },
        scales: {
          x: { title: { display: true, text: 'Type of business' } },
          y: { title: { display: true, text: 'Percentage (%)' }, beginAtZero: true, max: 100 }
        }
      }
    });

  const violations = {};
  recorded.forEach((inspection) => {
    Object.keys(checkThemes).forEach((field) => {
      if (inspection[field] === 'Out of Compliance') {
        violations[checkThemes[field]] = (violations[checkThemes[field]] || 0) + 1;
      }
    });
  });
  const themeLabels = Object.keys(violations).sort((a, b) => violations[b] - violations[a]);
  const themeCounts = themeLabels.map((theme) => violations[theme]);
  new Chart(document.querySelector('#chart-two'), {
      type: 'doughnut',
      data: {
        labels: themeLabels,
        datasets: [{ label: 'Number of Out of Compliance Checks', data: themeCounts }]
      },
      options: {
        plugins: { title: { display: true, text: 'Number of Out of Compliance Checks by Theme' } },
      }
    });

  // TODO 1: Reshape your data for the first chart.
  // Chart.js doesn't take your array of records.
  // It wants a list of labels and a matching list of numbers.
  // Example: count inspections by type of business.
  //
  //   const counts = {};
  //   data.forEach((item) => {
  //     counts[item.category] = (counts[item.category] || 0) + 1;
  //   });
  //   const labels = Object.keys(counts);
  //   const numbers = Object.values(counts);

  // TODO 2: Draw the first chart into <canvas id="chart-one">.
  // Every chart needs a title, and every axis needs a label.
  //
  //   new Chart(document.querySelector('#chart-one'), {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [{ label: 'Number of inspections', data: numbers }]
  //     },
  //     options: {
  //       plugins: { title: { display: true, text: 'Inspections by type of business' } },
  //       scales: {
  //         x: { title: { display: true, text: 'Type of business' } },
  //         y: { title: { display: true, text: 'Inspections' }, beginAtZero: true }
  //       }
  //     }
  //   });

  // TODO 3: Reshape your data again, and draw a second chart of a DIFFERENT type
  // (pie, line, scatter...) into <canvas id="chart-two">, answering a different question.
  // Ideas: inspection results as a pie, inspections per month as a line,
  // or how many "Out of Compliance" checks each type of business averages.
}

export { showCharts, drawCharts, categoryGroups };
