// (function () {
    var aChars = ["&yen;", "&euro;", "&pound;", "&cent;", "&copy;", "&reg;", "&trade;", "&alpha;", "&beta;", "&gamma;", "&delta;", "&eta;", "&theta;", "&lambda;", "&mu;", "&nu;", "&xi;", "&pi;", "&sigma;", "&tau;", "&rho;", "&phi;", "&chi;", "&omega;", "&Delta;", "&Sigma;", "&Phi;", "&Omega;", "&macr;", "&mdash;", "&plusmn;", "&times;", "&divide;", "&le;", "&ge;", "&sect;", "&isin;", "&permil;", "&ne;", "&or;", "&and;", "&sum;", "&infin;", "&equiv;", "&radic;", "&middot;", "&lsquo;", "&acute;", "&sup2;", "&sup3;", "&frac12;", "&frac14;", "&frac34;", "&deg;", "&ordm;C", "&ordm;F", "&oslash;", "<sub>2</sub>", "<sub>3</sub>"];
    function renderSpechar(){
        
        var aCharsTxt = ["&amp;yen;", "&amp;euro;", "&amp;pound;", "&amp;cent;", "&amp;copy;", "&amp;reg;", "&amp;trade;", "&amp;alpha;", "&amp;beta;", "&amp;gamma;", "&amp;delta;", "&amp;eta;", "&amp;theta;", "&amp;lambda;", "&amp;mu;", "&amp;nu;", "&amp;xi;", "&amp;pi;", "&amp;sigma;", "&amp;tau;", "&amp;rho;", "&amp;phi;", "&amp;chi;", "&amp;omega;", "&amp;Delta;", "&amp;Sigma;", "&amp;Phi;", "&amp;Omega;", "&amp;macr;", "&amp;mdash;", "&amp;plusmn;", "&amp;times;", "&amp;divide;", "&amp;le;", "&amp;ge;", "&amp;sect;", "&amp;isin;", "&amp;permil;", "&amp;ne;", "&amp;or;", "&amp;and;", "&amp;sum;", "&amp;infin;", "&amp;equiv;", "&amp;radic;", "&amp;middot;", "&amp;lsquo;", "&amp;acute;", "&amp;sup2;", "&amp;sup3;", "&amp;frac12;", "&amp;frac14;", "&amp;frac34;", "&amp;deg;", "&amp;ordm;C", "&amp;ordm;F", "&amp;oslash;", "<sub>2</sub>", "<sub>3</sub>"]

        var cols = 6;

        var i = 0;
        var strBuffer = "<table class= 'MainTable' height= '100%' cellSpacing= '0' cellPadding= '0'  width= '100%' align= 'center' border= '1'>";
        while (i < aChars.length) {
            strBuffer += "<tr>";
            for (var j = 0; j < cols; j++) {
                if (aChars[i]) {
                    strBuffer += "<td class='Disactive' onclick=insertChar(aChars[" + i + "]); onmouseover='over(this)' onmouseout='out(this)'>";
                    strBuffer += aChars[i];
                    strBuffer += "<br>(" + aCharsTxt[i] + ")";
                } else
                    strBuffer += "<td class='Empty'>&nbsp;";
                strBuffer += "</td>";
                i++;
            }
            strBuffer += "</tr>";
        }
        strBuffer += "<tbody></tbody>";
        strBuffer += "</table>";
        document.getElementById("spchar").innerHTML = strBuffer;

        
        



    }

    function over(td) {
        document.getElementById("SampleTD").innerHTML = td.innerHTML;
        td.className = 'Active';
    }

    function out(td) {
        document.getElementById("SampleTD").innerHTML = "&nbsp;";
        td.className = 'Disactive';
    }



    
    function insertChar(myValue) {
        // close();
        //var obj = 'o11';
        var txa = document.getElementById('rfqRemark'); //document.getElementById(obj);


        if (txa.createTextRange) {
            var start = txa.pos.start;//1 * document.getElementById(starId).value;
            var end = txa.pos.end;//1 * document.getElementById(endId).value;
            var pre = txa.value.substring(0, start);
            var post = txa.value.substring(end);
            txa.value = pre + myValue + post;
            //change position of start after insert 
            start += myValue.length;
            var currentLength = pre.length;
            var trimLength = pre.replace(/\n/g, "").length;
            txa.pos.start = start - (currentLength - trimLength);
            txa.pos.end = start - (currentLength - trimLength);
            setPos(txa, start - (currentLength - trimLength), start - (currentLength - trimLength));
        }
        else {
            insert4ff(txa, myValue);
        }
    }

    function insert4ff(txtarea, text){
        var scrollPos = txtarea.scrollTop;
        var strStart = txtarea.selectionStart;
        var strEnd = txtarea.selectionEnd;
        var front = (txtarea.value).substring(0, strStart);
        var back = (txtarea.value).substring(strEnd,txtarea.value.length);
        txtarea.value = front + text + back;
        strStart = strStart + text.length;
        txtarea.selectionStart = strStart;
        txtarea.selectionEnd = strStart;
        txtarea.focus();
        txtarea.scrollTop = scrollPos;
    }

    function close() {
        if (document.getElementById('scharDiv')) {
            hidePopMenu('scharDiv')
        }
        hidePopMenu('pop');
        document.getElementById('pop').innerHTML = "";
    }



// })();