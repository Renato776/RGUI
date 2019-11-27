const RGUI = {
RTextEditor : function(specification){
    let title = specification.title;
    let buttonTitle = specification.buttonTitle;
    let rows = 40;
    let cols = 40;
    if("rows" in specification)rows = specification.rows;
    if("cols" in specification)cols = specification.cols;
    let action = specification.action;
    let $form =  $("<form>", {"class": "RTextEditor"});
    if("class" in specification)$form.addClass(specification.class);
    if("id" in specification)$form.attr("id",specification.id);
    if("style" in specification)$form.attr("style",specification.style);
    let $div = $("<div>",{"class":"field RTextEditor", "name":"float-textarea",
    "style":"border: 0;"});
    $form.append($div);   
    $button = $("<button>",{"class":"btn btn-danger RButton",type:"button",
    text : buttonTitle, click: action});
    let $textArea = $("<textarea>",{
    "class":"form-control RTextArea", "for":"float-textarea"
    });
    $textArea.attr("rows", rows);
    $textArea.attr("cols", cols);
    let $title = $("<h3>",{"class":"RTitle"});
    $title.empty();
    $title.append(title);
    $div.append($button);
    $div.append($textArea);
    $div.append($title);
    return $form;
}, 
ROptionBar : function(options){
    let $maxContainer = $("<div>",{"class":"card"});
    let $cardHeader = $("<div>",{"class":"card-header"});
    let $headerList = $("<ul>",{"class":"nav nav-tabs card-header-tabs",role:"tablist"});
    let $cardBody = $("<div>",{"class":"card-body"});
    let count = 1;
    let $tabContent = $("<div>",{id:"nav-tabContent","class":"tab-content"});    
    options.forEach(opt =>{
        let $element = $("<li>",{"class":"nav-item"});
        let $aBody = null;
        let $aElement = null;
        if(count == 1){
                $aElement = $("<a>",{id:"item-1-"+count+"-tab",
                "class":"nav-link active",
                "data-toggle":"tab",
                "role":"tab",
                "aria-controls":"item-1-"+count,
                "aria-selected":"true",
                "href" : "#item-1-"+count});
                $aElement.html(opt.title);
                $aBody = $("<div>",{
                    "id":"item-1-"+count,
                    "class":"tab-pane fade show active",
                    "role":"tabpanel",
                    "aria-labelledby":"item-1-"+count+"-tab"
                });
                $aBody.append(opt.content);
        }else{
                $aElement = $("<a>",{id:"item-1-"+count+"-tab",
                "class":"nav-link",
                "data-toggle":"tab",
                "role":"tab",
                "aria-controls":"item-1-"+count,
                "aria-selected":"false",
                "href" : "#item-1-"+count});
                $aElement.html(opt.title);
                $aBody = $("<div>",{
                    "id":"item-1-"+count,
                    "class":"tab-pane fade",
                    "role":"tabpanel",
                    "aria-labelledby":"item-1-"+count+"-tab"
                });
                $aBody.append(opt.content);
        }
        if("class" in opt)$aBody.addClass(opt.class);
        if("style" in opt)$aBody.attr("style",opt.style);
        if("id" in opt)$aBody.attr("id",opt.id);
        $element.append($aElement);
        $headerList.append($element);
        $tabContent.append($aBody);
        count = count + 1;
    });
    $cardBody.append($tabContent);
    $cardHeader.append($headerList);
    $maxContainer.append($cardHeader);
    $maxContainer.append($cardBody);
    return $maxContainer;
},
RTable : function(specification){
    let $maxContainer = $("<div>",{
        id:"no-more-tables"
    });
    let data = null;
    if("specification" in specification){
        //Is indeed an specification. in such a case:
        data = specification.data;
        if("class" in specification)$maxContainer.addClass(specification.class);
        if("style" in specification)$maxContainer.attr("style",specification.style);
    }else data = specification;

    let $table = $("<table>",{
        "class":"col-md-12 table-bordered table-striped table-condensed cf"
    });
    let $table_header = $("<thead>",{"class":"cf"});
    let $table_body = $("<tbody>");
    let $headRow = $("<tr>");
    data.data.header.forEach(t=>{
        let $td = $("<th>");
        $td.html(t);
        $headRow.append($td);
    });
    data.children.forEach(child =>{
        let $row = $("<tr>");
        let td_count = 0;
        child.data.content.forEach(entry=>{
            let td_title = data.data.header[td_count];
            let $td = $("<td>",{
                "data-title":td_title
            });
            $td.html(entry);
            $row.append($td);
            td_count++;        
        });
        $table_body.append($row);
    });
    $table_header.append($headRow);
    $table.append($table_header);
    $table.append($table_body);
    $maxContainer.append($table);
    return $maxContainer;
}, RDataGrid : function(noCells, elements){
    let n = 0;
    let newCell = null;
    let $maxContainer = $("<div>",{"class":"container"});
    if(isNaN(noCells)){
        /*A whole specification for each cell was provided.*/
        n = noCells.n;
        newCell = function(action,index) {
            let $ren = $("<div>", {
                "class": "col RDataCell",
                "click": action,
                "rIndex": index
            });
            if ("class" in noCells) $ren.addClass(noCells.class);
            if ("style" in noCells) $ren.attr("style", noCells.style);
            return $ren;
        }
    }else{
        /*Just a number of cells per row was provided.*/
        n = noCells;
        newCell = function(action,index){
            let $ren = $("<div>",{"class":"col RDataCell",
                             "click":action,
                              "rIndex":index});
            return $ren;
        }
    }
    let i = 0;
    let $row = null;
    elements.forEach(element =>{
        if(i%n==0){
            if($row!=null)$maxContainer.append($row);
            $row = $("<div>",{"class":"row"});
        }
        let $col = newCell(element.action,element.index);
        $col.append(element.content);
        if (typeof element.caption === 'string' || element.caption instanceof String){
            $caption = $("<h4>",{"class":"RCaption"});
            $caption.html(element.caption);
            $col.append($caption);
        }else{	
        	$col.append(element.caption);
        }
        $row.append($col);
        i++;
    });
    return $maxContainer;
}, RColumn : function (elements) {
        let $maxContainer = $("<div>",{"class":"container"});
        elements.forEach(element => {
            let $row = $("<div>",{"class":"row"});
            let $col = $("<div>",{"class":"col"});
            for (let [key, value] of Object.entries(element)) {
                if(key == "class")$col.addClass(value);
               else if(key != "content")$col.attr(key,value);
            }
            $col.append(element.content);
            $row.append($col);
            $maxContainer.append($row);
        });
        return $maxContainer;
    }, 
    RRow :function(elements){
        let $maxContainer = $("<div>",{"class":"container"});
        let $row = $("<div>",{"class":"row"});
        elements.forEach(element => {
            let $col = $("<div>",{"class":"col"});
            for (let [key, value] of Object.entries(element)) {
                if(key == "class")$col.addClass(value);
                else if(key != "content")$col.attr(key,value);
            }
            $col.append(element.content);
            $row.append($col);
        });
        $maxContainer.append($row);
        return $maxContainer;
    },
    RWrapper : function (specification) {
        $wrapper = $("<div>");
        for (let [key, value] of Object.entries(specification)) {
            if(key == "class")$wrapper.addClass(value);
            else if(key != "content")$wrapper.attr(key,value);
        }
        $wrapper.append(specification.content);
        return $wrapper;
    }
};

function doNothing(event){
event.preventDefault();
let e = $(event.target);
alert(e.parents('.RDataCell').attr('rIndex'));
}

function sampleContent(){
let $div = $("<div>",{"style":"width:400px; height:200px; background-color:orange;"});
return $div;
}
/*
var cell = {style:"height:700px; width:450px;",class:"miSpecifaction",n:3};
var elementos = [{caption:"RM",content:RGUI.RTextEditor({title:"Mono",buttonTitle:"Amazing",action:doNothing}), action:doNothing, index: 1
},{caption:"Jimin",content:sampleContent(),action:doNothing, index: 2},
{caption:"Junkook",content:sampleContent(),action:doNothing, index: 3},
{caption:"JHope",content:sampleContent(),action:doNothing, index: 4},
{caption:"Suga",content:sampleContent(),action:doNothing, index: 5},
{caption:"Jin",content:sampleContent(),action:doNothing, index: 6},
{caption:"V",content:sampleContent(),action:doNothing, index: 7}];


$(function(){
	$("#RBody").append(RGUI.RDataGrid(cell,elementos)); 
});
*/
/*
How to use the RTable:

let tree = RTree.new_node();
//1) define the header of the table: 
tree.data["header"] = ["JHope","Suga","V","RM","Jin","Jimin","Junkook"]; //A header is defined as a "header" field inside the root's data.
//2) Fill the rows. The rows are defined as a "content" field in the data of each child in the root.
let first = RTree.new_node(); //We create a new node
first.data["content"] = ["Cool","Super Cool","Love Yourself","Anpanman","GoGo","Best of me","Magic Shop"]; //We create the content field and fill it
let second = RTree.new_node(); //Same as above a new node for a new row
second.data["content"] = ["Cool","Super Cool","Love Yourself","Anpanman","GoGo","Best of me","Magic Shop"];
let third = RTree.new_node(); //Same as above a new node for a new row.
third.data["content"] = ["MAMA","Piano","Stigma","Reflection","Awake","Lie","Begin"];
tree.children.push(first); //We add the children rows to the root.
tree.children.push(second); //Same as above
tree.children.push(third); //Same as above

$(function(){
	$("#RBody").append(RGUI.RTable(tree)); //We graph the tree as a table.
});
*/
/*
How to use RTable:

let tree = RTree.new_node();
//1) define the header of the table: 
tree.data["header"] = ["JHope","Suga","V","RM","Jin","Jimin","Junkook"]; //A header is defined as a "header" field inside the root's data.
//2) Fill the rows. The rows are defined as a "content" field in the data of each child in the root.
let first = RTree.new_node(); //We create a new node
first.data["content"] = ["Cool","Super Cool","Love Yourself","Anpanman","GoGo","Best of me","Magic Shop"]; //We create the content field and fill it
let second = RTree.new_node(); //Same as above a new node for a new row
second.data["content"] = ["Cool","Super Cool","Love Yourself","Anpanman","GoGo","Best of me","Magic Shop"];
let third = RTree.new_node(); //Same as above a new node for a new row.
third.data["content"] = ["MAMA","Piano","Stigma","Reflection","Awake","Lie","Begin"];
tree.children.push(first); //We add the children rows to the root.
tree.children.push(second); //Same as above
tree.children.push(third); //Same as above

$(function(){
	$("#RBody").append(RGUI.RTable(tree)); //We graph the tree as a table.
});
*/
/*
function doNothing(event){
event.preventDefault();
alert('do nothing');
}
function doSomething(event){
event.preventDefault();
alert('I am doing something!');
}

var opciones = [{title:"Opcion1",content:RGUI.RTextEditor("Editor de prueba 1","Submit",40,40,doNothing)},
{title:"Opcion2",content:RGUI.RTextEditor("Editor de prueba 2","Submitir",40,40,doNothing)},
{title:"Opcion3",content:RGUI.RTextEditor("Editor de prueba 3","Enviar",40,40,doNothing)},
{title:"Option_4", content:RGUI.RTextEditor("Editor de prueba 4","Entrar",40,40,doSomething)}];

$(function(){
	$("#RBody").append(RGUI.ROptionBar(opciones));
});

*/

/*
function ren(event){
event.preventDefault();
alert('hello world!');
}

$(function(){
	$("#RBody").append(RGUI.RTextEditor("Editor de Prueba","Submit",30,30,ren));
});
*/
