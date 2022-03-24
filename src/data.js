

class Flower{
    name = ""
    props = []
    img = ""
    markdown = ""
    actions = []

    constructor(name, props, imgPath, markdown=null, actions=[]) {
        this.name = name;
        this.props = props;
        this.img = imgPath;
        if(markdown){
            this.markdown = markdown;
        } else {
            this.markdown = `<img src="${this.img}"/> <p>${this.name}</p>`
        }
    }

}

class Progress{

    constructor(){
        this.progress = new Map();
    }

    get current () {
        return this.progress
    }

    set current(allFlowerProps) {
        for (const key in allFlowerProps) {
            if (Object.hasOwnProperty.call(allFlowerProps, key)) {
                this.progress.set(key,allFlowerProps[key])
            }
        }
        //debug set current
        console.log(this.current)
    }

    removeProgress(flowerProp) {
        if(typeof flowerProp === typeof new Array){
            
        } else {

        }

        if(this.progress.has(flowerProp.name)){
            this.progress.delete(flowerProp.name)
        }
    }
}

export const INIT = {
    levels: [
        {name: "New Job", desc: "", reqs: {friendship: 0.3, humility: 0.3, esteem: 0.3} },
    ],
    flowers: [
        new Flower("Red Rose",["Romance"],"logo.svg"),
        new Flower("Yellow Acacia",["Friendship"],"logo.svg"),
        new Flower("Bird of Paradise",["Esteem"],""),
        new Flower("Bluebell",["Humility"],"")
    ],
    progress: new Progress()
}

