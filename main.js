
document.getElementById("yaokong").inputfunc = function(){
    var input = document.getElementById("input").value;
    input = alphabetphy(input);
    document.getElementById("yaokongM").innerHTML = input;
    var key = document.getElementById("yaokongkey").value;
    key = alphabetphy(key);
    document.getElementById("yaokongK").innerHTML = key;
    var list = [];
    for(var i=0; i<key.length; i++){
        list.push([i, key.charCodeAt(i)]);
    }
    list.sort((a,b)=>{
        if(a[1]>b[1])return 1; if(a[1]<b[1])return -1; return 0;
    });
    //检查每个字母唯一
    for(var i=1; i<key.length; i++){
        if(list[i][1]==list[i-1][1]){
            document.getElementById("yaokongC").innerHTML = "密钥中含有相同字母，无法加密";
            return;
        }
    }
    //开始打乱处理
    texted = "";
    for(var i=0; i<list.length; i++){
        x = list[i][0];
        for(var y=0; x+y*list.length<input.length; y++){
            texted+=input.charAt(x+y*list.length);
        }
    }
    document.getElementById("yaokongC").innerHTML = texted;
}

document.getElementById("shuanggui").inputfunc = function(){
    var input = document.getElementById("input").value;
    input = alphabetphy(input);
    document.getElementById("shuangguiM").innerHTML = input;
    var output = "";
    for(var i=0; i<input.length; i+=2){
        output+=input.charAt(i);
    }
    for(var i=1; i<input.length; i+=2){
        output+=input.charAt(i);
    }
    document.getElementById("shuangguiC").innerHTML = output;
}

document.getElementById("vigenere").inputfunc = function(){
    var input = document.getElementById("input").value;
    input = alphabetphy(input);
    document.getElementById("vigenereM").innerHTML = input;
    var key = document.getElementById("vigenerekey").value;
    key = alphabetphy(key);
    document.getElementById("vigenereK").innerHTML = key;
    keyn = [];
    for(var i=0; i<key.length; i++){
        var c = key.charCodeAt(i);
        if(c>=97){
            c-=97;
        }
        else{
            c-=65;
        }
        keyn.push(c);
    }
    var output = "";
    var ki=0;
    for(var i=0; i<input.length; ){
        if(ki>=keyn.length)ki=0;
        var c = input.charCodeAt(i);
        if(c>=97){
            c-=97;
            c = (c+keyn[ki])%26;
            c+=97;
        }
        else{
            c-=65;
            c = (c+keyn[ki])%26;
            c+=65;
        }
        output += String.fromCharCode(c);
        ki++;i++;
    }
    document.getElementById("vigenereC").innerHTML = output;
}

function refresh(){
    document.getElementById("yaokong").inputfunc();
    document.getElementById("shuanggui").inputfunc();
    document.getElementById("vigenere").inputfunc();
}

//main
document.getElementById("input").addEventListener("input", refresh)
document.getElementById("yaokongkey").addEventListener("input", document.getElementById("yaokong").inputfunc);
document.getElementById("vigenerekey").addEventListener("input", document.getElementById("vigenere").inputfunc);
refresh();

function antimod(a,b){
    if(b%a==0){
        return 0;
    }
    else if(b%a==1){
        //break down b into ak+1
        var k = (b-1)/a;
        return b-k;
    }
    else{
        //break down b into ak+h
        var h = b%a; var k = (b-h)/a;
        var suba = antimod(h, a);
        if(suba==0)return 0;
        var m = (h*suba-1)/a;
        //h*suba mod a = 1      h*suba - a*m = 1
        var ans = -k*suba-m;
        ans+=b; ans%=b;
        return ans;
    }
}

function alphabetphy(text){
    var texted = "";
    for(var i=0; i<text.length; i++){
        var n = text.charCodeAt(i);
        if((65<=n && n<91) || (97<=n && n<123)){
            texted+=String.fromCharCode(n);
        }
    }
    return texted;
}