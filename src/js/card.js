export class Card {
    constructor(parent, text) {
        this.parent = parent;
        this.text = text;
        this.self = undefined;
        this.render();
    }

    render() {
        const card = document.createElement("div");
        card.className = 'card';
        card.textContent = this.text;
        this.parent.appendChild(card);
        this.self = card;

        const removeButton = document.createElement("button");
        removeButton.className = "remove-card--btn";
        removeButton.textContent = "✖️";
        card.appendChild(removeButton);
        this.removeButton = removeButton;

        this.removeButton.addEventListener("click", () => {
            this.remove();
        });
        this.removeButton.addEventListener("mousedown", (e) => {
            e.stopPropagation();
        });
        this.self.addEventListener("mouseover", () => {
            this.removeButton.style.display = "block";
        });
        this.self.addEventListener("mouseleave", () => {
            this.removeButton.style.display = "none";
        });
    }

    remove() {
        this.self.remove();
    }

    updateText() {
        let textarea = document.createElement("textarea");
        textarea.className = "new-card--text-input";
        textarea.placeholder = "Add a title for this card...";
        textarea.addEventListener("blur", () => {
            this.remove();
        });
        textarea.addEventListener("input", () => {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        });
        textarea.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                if (e.shiftKey) return;
                this.text = textarea.value;
                const textNode = document.createTextNode(this.text);
                this.self.insertBefore(textNode, this.self.firstChild);
                textarea.remove();
            } else if (e.key === "Escape") {
                this.remove();
            }
        });
        this.self.appendChild(textarea);
        textarea.focus();
    }
}
