let stressCount = 0;

document.querySelectorAll(".btn--yes").forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault()
        stressCount++;
        console.log(stressCount);

    })
})

document.querySelectorAll(".btn--no").forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault()
        stressCount -= 1;
        console.log(stressCount);
    })
})
