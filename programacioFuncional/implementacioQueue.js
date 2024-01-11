
class Queue {
    #items;
    //per posar en privat un item hem de utilitzar #
    constructor() {
        this.#items =[];
    }
    push(item) {
        this.#items.push(item);
    } 

    peek() {
    
        return this.#items[0];
    }

    dequeue() {
        return this.#items.shift;
    }
    isEmpty() {
        return this.peek() === 0;
    }
}
let array = [1,8,9,0]

const cola1 = new Queue();
cola1.push(2);
console.log(cola1);


class Queue2 {
    //revisar perque entra a examen segur
    #first;
    #last;
    //per posar en privat un item hem de utilitzar #
    constructor(item) {
        this.#first = null;
        this.#last = null;
    }
    push(item) {
        const node = {item,next:null};
        if(this.#last != null) {
            this.#last.next = node;
        }
        this.#last = node;
    }

    peek() {
        if(this.#first != null) {
            return this.#first.item; 
        } else {
            return null;
        }
    }

    dequeue() {
        const first = this.#first;
        if(first != this.#first) {
            //remove first 
            this.#first = this.#first.next ; 
        }  
        return first.item; 
    }
    isEmpty() {
        return this.#first == 0;
    }
}


const queue = new Queue2();
console.log("isEmpty:",queue.isEmpty());
queue.push(1);

console.log("first item :", queue.peek());

queue.push(2);

console.log("first item :", queue.peek());

