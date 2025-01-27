// Select the table body
const outputTable = document.getElementById("output");

// Add the default loading row with id="loading"
const loadingRow = document.createElement("tr");
loadingRow.id = "loading"; // Add the id
loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
outputTable.appendChild(loadingRow);

// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(index) {
  return new Promise((resolve) => {
    const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
    setTimeout(() => resolve({ name: `Promise ${index}`, time: time.toFixed(3) }), time * 1000);
  });
}

// Create an array of promises
const promises = [
  createRandomPromise(1),
  createRandomPromise(2),
  createRandomPromise(3),
];

// Use Promise.all to wait for all promises to resolve
const startTime = performance.now(); // Record the start time

Promise.all(promises).then((results) => {
  const endTime = performance.now(); // Record the end time
  const totalTime = ((endTime - startTime) / 1000).toFixed(3);

  // Remove the loading row
  outputTable.removeChild(loadingRow);

  // Populate the table with resolved promise results
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time} s</td>
    `;
    outputTable.appendChild(row);
  });

  // Add the total time row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime} s</td>
  `;
  outputTable.appendChild(totalRow);
});
