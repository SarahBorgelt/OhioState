//Create a function to calculate financial aid
function calculateAid() {

  //Bring in variables from the form and assign them to constants
  const tuition = Number(document.getElementById("tuition").value) || 0;
  const grants = Number(document.getElementById("grants").value) || 0;
  const loans = Number(document.getElementById("loans").value) || 0;
  const workstudy = Number(document.getElementById("workstudy").value) || 0;
  const other = Number(document.getElementById("other").value) || 0;

  //Error handling for negative values
  if ([tuition, grants, loans, workstudy, other].some(val => val < 0)) {
    alert("Please enter only positive values.");
    return;
  }

  //Calculate total cost, total aid, and net cost
  const totalCost = tuition + other;
  const totalAid = grants + loans + workstudy;
  const netCost = totalCost - totalAid;

  //Display the result in the result element with 2 decimal places
  const resultElement = document.getElementById("result");
  resultElement.textContent = `Your estimated out-of-pocket cost is: $${netCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
