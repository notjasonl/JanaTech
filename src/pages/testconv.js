//Test Code works 
var docxConverter = require('docx-pdf');
docxConverter('./test.docx','./output.pdf',function(err,result){
    if(err){
         console.log(err);
    }   
    console.log('result'+result);
});

