import { Board } from "./board";

document.addEventListener("DOMContentLoaded", () => {
    const board = new Board();
    const addCardButtons = document.querySelectorAll(".add-card--btn");
    addCardButtons.forEach(button => {
        button.addEventListener("click", event => {
            const column = event.target.closest(".column");
            board.newCard(column.querySelector(".column-content"));
        });
    });

    window.addEventListener("beforeunload", () => {
        // saveCards();
    });
});
