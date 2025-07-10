function calculateAid() {
  const tuition = Number(document.getElementById("tuition").value) || 0;
  const grants = Number(document.getElementById("grants").value) || 0;
  const loans = Number(document.getElementById("loans").value) || 0;
  const workstudy = Number(document.getElementById("workstudy").value) || 0;
  const other = Number(document.getElementById("other").value) || 0;

  if ([tuition, grants, loans, workstudy, other].some(val => val < 0)) {
    alert("Please enter only positive values.");
    return;
  }

  const totalCost = tuition + other;
  const totalAid = grants + loans + workstudy;
  const netCost = totalCost - totalAid;

  const resultElement = document.getElementById("result");
  resultElement.textContent = `Your estimated out-of-pocket cost is: $${netCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
