export class VirtualNode{
  #tag;
  #id;
  #text;
  #children;  //array of ids

  constructor(tag, idNumber){
    this.#tag= tag;
    this.#id = `${tag}XXX${idNumber.toString(16)}`
  }

  get id(){
    return this.#id;
  }

  set text(text){
    this.#text = text;
  }

  get text(){
    return this.#text;
  }
  hasText(){
    return this.#text !== null && this.#text !== undefined;
  }

  get tag(){
    return this.#tag;
  }

  set children(children){
     this.#children = children;
  }
  get children(){
    return this.#children;
  }

  addChild(id){
    if(id ){
      if(! this.#children){
        this.children = [];
      }
      this.#children.push(id);
    }
  }
  removeChildren(){
    this.#children = [];
  }
  removeChild(id){
    this.#children = this.#children.filter( child => child.id !== id);
  }
 
  hasChildren(){
    return this.#children !== null && this.#children !== undefined && this.#children.length > 0; 
  }


  childIndex(id){
    return this.children.indexOf(id);
  }
  addText(text){
    this.#text += text;
  }
  removeTextLastChar(){
    this.#text = this.#text.slice(0, -1);
  }

    
}