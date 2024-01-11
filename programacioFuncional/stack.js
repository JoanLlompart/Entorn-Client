

class Stack {
    // A el examen entrara com implementar a partir de nodes.

    //revisar perque entra a examen segur
    #last;
    //per posar en privat un item hem de utilitzar #
    constructor(item) {
        this.#last = null;
    }
    push(item) {
        const node = {
            item,
            prev:this.#last,
        };
        this.#last = node;
    
    
    }

    top() {
        if(this.isEmpty()) {
            return this.#last.item; 
        } else {
            return null;
        }
    }

    pop() {
        const last = this.#last;
        if(!this.isEmpty()) {
            //remove last item
            this.#last = last.prev;
            return last.item;
        } else {
            //si esta vuit no se pot consultar ni tornar el darrer
            return null;
        }
    
    }
    isEmpty() {
        return this.#last == 0;
    }
}
