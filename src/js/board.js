import { Card } from './card.js';
import defaultState from "./default-state";

export class Board {
    constructor() {
        this.columns = []
        document.querySelectorAll('.column').forEach(column => {
            this.columns.push({column, rect: column.getBoundingClientRect()});
        });
        this.cards = [];
        this.placeholder = undefined;
        this.init();
    }
    init() {
        let cards;
        try {
            cards = localStorage.getItem("cards");
            if (!cards) {
                cards = defaultState;
            }
            else {
                cards = JSON.parse(cards);
            }
        } catch {
            cards = defaultState;
        }
        this.columns.forEach((column, index) => {
            cards[index].forEach(cardText => {
                this.addCard(column.column.querySelector(".column-content"), cardText);
            });
        });
    }
    save() {
        let cards = [];
        this.columns.forEach(column => {
            let column_cards = [];
            column.column.querySelectorAll(".card").forEach(card => {
                column_cards.push(card.textContent);
            });
            cards.push(column_cards);
        });
        localStorage.setItem("cards", JSON.stringify(cards));
    }
    addCard(parent, text) {
        let card = new Card(parent, text);
        card.self.addEventListener("mousedown", (event) => {
            event.preventDefault();
            const rect = card.self.getBoundingClientRect();
            document.querySelector("body").appendChild(card.self);
            card.self.classList.add("dragging-card");
            card.self.style.width = `${rect.width}px`;
            card.self.style.height = `${rect.height}px`;
            const onMove = (e) => {
                this.dragCard(card, rect, event, e);
            }
            onMove(event);
            document.addEventListener("mousemove", onMove);
            const onUp = () => {
                document.removeEventListener("mousemove", onMove);
                card.self.removeEventListener("mouseup", onUp);
                card.self.classList.remove("dragging-card");
                if (this.placeholder) {
                    card.self.style.left = "";
                    card.self.style.top = "";
                    card.self.style.width = "";
                    card.self.style.height = "";
                    this.placeholder.parentElement.insertBefore(card.self, this.placeholder);
                    this.placeholder.remove();
                }

            }
            card.self.addEventListener("mouseup", onUp);
        });
        this.cards.push(card);
        return card;
    }
    newCard(column) {
        let new_card = this.addCard(column, "");
        new_card.updateText();
    }
    dragCard(card, rect, eventClick, eventMove) {
        let offsetX = eventClick.clientX - rect.x;
        let offsetY = eventClick.clientY - rect.y;
        card.self.style.left = `${eventMove.clientX - offsetX}px`;
        card.self.style.top = `${eventMove.clientY - offsetY}px`;
        let findColumn = undefined;
        for (let column of this.columns) {
            let rect = column.rect;
            if (eventMove.clientX > rect.left && eventMove.clientX < rect.right) {
                findColumn = column.column;
                break;
            }
        }
        if (findColumn === undefined) return;

        if (!this.placeholder) {
            this.placeholder = document.createElement("div");
            this.placeholder.className = "card-placeholder";
            this.placeholder.style.height = `${rect.height}px`;
            this.placeholder.style.width = `${rect.width}px`;
            // this.placeholder.remove();
        }

        for (let card of findColumn.querySelectorAll(".card")) {
            let rect = card.getBoundingClientRect();
            if (eventMove.clientY > rect.top && eventMove.clientY < rect.bottom) {
                if (eventMove.clientY > rect.top + rect.height / 2) {
                    findColumn.querySelector(".column-content").insertBefore(this.placeholder, card.nextSibling);
                } else {
                    findColumn.querySelector(".column-content").insertBefore(this.placeholder, card);
                }
                return;
            }
            else {
                findColumn.querySelector(".column-content").appendChild(this.placeholder);
            }
        }
        findColumn.querySelector(".column-content").appendChild(this.placeholder);
    }
}