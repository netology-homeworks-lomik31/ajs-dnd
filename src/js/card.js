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
        this.self.classList.add("new-card");
        let textarea = document.createElement("textarea");
        textarea.className = "new-card--text-input";
        textarea.placeholder = "Add a title for this card...";
        const onblur = () => {
            this.remove();
        }
        textarea.addEventListener("blur", onblur);
        textarea.addEventListener("input", () => {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        });
        textarea.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                textarea.removeEventListener("blur", onblur);
                if (textarea.value === "") {
                    this.remove();
                    return;
                }
                if (e.shiftKey) return;
                this.text = textarea.value;
                const textNode = document.createTextNode(this.text);
                this.self.appendChild(textNode);
                textarea.remove();
                this.self.classList.remove("new-card");
            } else if (e.key === "Escape") {
                this.remove();
            }
        });
        this.self.appendChild(textarea);
        textarea.focus();
    }
}
