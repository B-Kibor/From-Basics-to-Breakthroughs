document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("opinion-form");
  const input = document.getElementById("opinion-input");
  const list = document.getElementById("opinion-list");

  
  // Fetch and render existing opinions
  fetch("http://localhost:3000/opinions")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(opinion => renderOpinion(opinion));
    });


  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const opinionText = input.value.trim();
    if (opinionText === "") return;

    const newOpinion = { text: opinionText };

    fetch("http://localhost:3000/opinions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOpinion)
    })
      .then((res) => res.json())
      .then((data) => {
        renderOpinion(data);
        form.reset();
      });
  });


  // Render an opinion in the list
  function renderOpinion(opinion) {
    const li = document.createElement("li");
    li.textContent = opinion.text;
    li.className = "bg-gray-100 p-2 rounded my-1";
    list.appendChild(li);
  }
});


// Toggle form visibility
function toggleOpinionForm() {
  const section = document.getElementById("opinion-section");
  section.classList.toggle("hidden");
}
