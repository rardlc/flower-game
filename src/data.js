

class Flower{
    name = ""
    props = []
    img = ""
    markdown = ""
    actions = []
    color = ""
    constructor(name, props, imgPath,color=null, markdown=null, actions=[]) {
        this.name = name;
        this.props = props;
        this.img = imgPath;
        if(color){
            this.color = color
        }
        if(markdown){
            this.markdown = markdown;
        } else {
            this.markdown = `<img src="${this.img}"/> <p>${this.name}</p>`
        }
    }

}

class Progress{
    #totalProps = 0
    constructor(){
        this.progress = new Map();
    }

    get now() {
        let now = new Map()
        this.progress.forEach( (val, key) => {
            if(val > 0) {
                now[key] = val / this.#totalProps
            }
        })
        return now
    }

    addFlowerProp(oldPropsArr=[], newPropsArr=[]){

        oldPropsArr.forEach(
            (prop) => {
                const propState = this.progress.get(prop)

                if(propState - 1 <= 0){
                    this.progress.delete(prop)
                } else {
                    this.progress.set(prop,propState - 1)
                }
                this.#totalProps -= 1
            }
        )

        newPropsArr.forEach(
            (prop) => {
                this.progress.set(prop, this.progress.get(prop) ? this.progress.get(prop) + 1 : 1)
                this.#totalProps += 1
            }
        )
    }

    
}

export const INIT = {
    levels: [
        {name: "New Job", desc: "", reqs: {Friendship: 1, Humility: 1, Esteem: 1} },
    ],
    flowers: [
        new Flower("Red Rose",["Romance"],"logo.svg","red"),
        new Flower("Yellow Acacia",["Friendship"],"logo.svg","yellow"),
        new Flower("Bird of Paradise",["Esteem"],"","orange"),
        new Flower("Bluebell",["Humility"],"","blue")
    ],
    progress: new Progress()
}

