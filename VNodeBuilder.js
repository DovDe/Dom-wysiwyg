import {VirtualNode} from './VirtualNode.js';

export class VNodeBuilder {
  

  vNode;


  static initializeNode(tag, vDom){
    
    this.vNode = new VirtualNode(tag, ++vDom.idNumber );
    
    vDom.vDomMap.set(this.vNode.id, this.vNode);

    if (tag === 'p') {
      let br = new VirtualNode('br', ++vDom.idNumber );   
      vDom.vDomMap.set(br.id, br);
      this.vNode.addChild(br.id);
      this.vNode.text = "";            
    } 

    return this;
  }



  static addChild(child){
    this.vNode.addChild(child); 
    return this;
  }

  static setChildren(children){
    this.vNode.setChildren(children);
    return this;
  }
 
  static setText(text){
    this.vNode.setText(text);
    return this;
  }

  static build(){
    return this.vNode;
  }
}