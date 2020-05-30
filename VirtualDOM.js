import {VNodeBuilder} from './VNodeBuilder.js';

export class VirtualDOM{
   
  vDomRoot; 
  vDomMap = new Map(); // key= id, value= virtual Node  -- root will always have id = root
  
  idNumber = Math.floor(Math.random() * 666);
  
  htmlRoot;
  currentHtmlElement;  // DOM Element
  currentNode;

  currentDomRange;
  currentDomSelection;

  currentText;

  constructor(){
    this.initialize();
  }


  
  initialize(){
    // setup virtual
    this.vDomRoot = this.tagBuilder('div');
    let p = this.tagBuilder('p');
    this.vNode = p;  
    this.vDomRoot.addChild( p.id );  
    
    
    // set actual html
    this.buildRoot();

  }

  buildHtmlNode(vNode){
    
    let htmlNode = document.createElement(vNode.tag);
    htmlNode.id = vNode.id;

    if(vNode.hasText()){
      htmlNode.appendChild(document.createTextNode(vNode.text));
    } 

    // addEventListeners and other attributes per tag
    this.htmlTagEnhancer(htmlNode);
    
    if( vNode.hasChildren() ){ 

      vNode.children.forEach(id => {        
        let childVNode = this.vDomMap.get(id);
        let child = this.buildHtmlNode(childVNode);
        htmlNode.appendChild(child);               
      });
    }
    return htmlNode;
  }

  buildRoot(){
    this.htmlRoot = this.buildHtmlNode(this.vDomRoot);
    let editor = document.getElementById("editor");
    while(editor.firstChild){
      editor.removeChild(editor.lastChild);
    }
    editor.appendChild( this.htmlRoot );
  }

  

  addVDomNode(vNode){
    this.vDomMap.set(vNode.id, vNode);
  }
  onFocus = (e)=>{
    if(e.target.tagName == 'P'){
      this.vNode = this.vDomMap.get(e.path[0].id);
      
    }
  }

  onKeyDown = (e)=>{    
    let  {code ,key, shiftKey, altKey, ctrlKey} = e;       
    let el = e.target;
    let id = e.path[0].id;


    switch(key){
      case 'Enter':
        e.preventDefault(); 
        let htmlNode = this.buildHtmlNode( this.tagBuilder('p'));
        this.htmlRoot.insertBefore( htmlNode, el.nextSibling);
        htmlNode.focus();
        break;
      case 'Backspace':
        if(this.vNode.text == "" && this.htmlRoot.children.length>1){
          this.vDomMap.delete(id);
          this.vDomRoot.removeChild(id);
          this.htmlRoot.removeChild(document.getElementById(id));  
          this.htmlRoot.lastChild.focus();  
        }else{
          this.vNode.removeTextLastChar();          
        }
        break;
      default:
        if(key.length === 1 ){
          this.vNode.addText(key);
      }
      break;    
    }
   
       
  }


  tagBuilder = (tag)=>{
        return VNodeBuilder.initializeNode(tag, this).build(); 
  }

  htmlTagEnhancer(htmlNode){    
    switch(htmlNode.tagName){
      case 'P':
      htmlNode.contentEditable  =true;
      htmlNode.addEventListener('keydown',this.onKeyDown);
      htmlNode.addEventListener('focus', this.onFocus);
    }
  }
}