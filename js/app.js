/*----------------------------*/
/*--------Rodolfo Puc---------*/
/*----------------------------*/

var calculadora = {
	
	pantalla: document.getElementById("display"),
	valorPantalla: "0",
	operacion: "",
	operando_1: 0,
	operando_2: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false,
	
	cargarValores: (function(){
		this.formatoBotones(".tecla"); //Para efectos de pulsar una tecla
		this.asignarFunciones();
	}),
	
	//Eventos de formato de botones
	formatoBotones: function(selector){
		var teclaPulsada = document.querySelectorAll(selector);
		for (var i = 0; i<teclaPulsada.length;i++) {
			teclaPulsada[i].addEventListener ("click", this.oprimirBtn);
			teclaPulsada[i].onmouseleave = this.soltarBtn;
		};
	},

	oprimirBtn: function(event){
		calculadora.oprimeBtn(event.target);
	},

	soltarBtn: function(event){
		calculadora.sueltaBtn(event.target);
	},
	
	//Formato de botones 
	
	oprimeBtn: function(btnPulsado){
		var x = btnPulsado.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			btnPulsado.style.width = "27%";
			btnPulsado.style.height = "61px";
		} else if(x=="mas") {
			btnPulsado.style.width = "84%";
			btnPulsado.style.height = "97%";
		} else {
			btnPulsado.style.width = "20%";
			btnPulsado.style.height = "61px";
		}
	},
	
	sueltaBtn: function(btnPulsado){
		var x = btnPulsado.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			btnPulsado.style.width = "29%";
			btnPulsado.style.height = "62.91px";
		} else if(x=="mas") {
			btnPulsado.style.width = "90%";
			btnPulsado.style.height = "100%";
		} else {
			btnPulsado.style.width = "22%";
			btnPulsado.style.height = "62.91px";
		}
	},

	
	asignarFunciones: function(){

		document.getElementById("0").onclick = function(e){
    		calculadora.mostrarenPantalla("0");
  		}
		document.getElementById("1").onclick = function(e){
			calculadora.mostrarenPantalla("1");
		}
		document.getElementById("2").onclick = function(e){
			calculadora.mostrarenPantalla("2");
		}
		document.getElementById("3").onclick = function(e){
			calculadora.mostrarenPantalla("3");
		}
		document.getElementById("4").onclick = function(e){
			calculadora.mostrarenPantalla("4");
		}
		document.getElementById("5").onclick = function(e){
			calculadora.mostrarenPantalla("5");
		}
		document.getElementById("6").onclick = function(e){
			calculadora.mostrarenPantalla("6");
		}
		document.getElementById("7").onclick = function(e){
			calculadora.mostrarenPantalla("7");
		}
		document.getElementById("8").onclick = function(e){
			calculadora.mostrarenPantalla("8");
		}
		document.getElementById("9").onclick = function(e){
			calculadora.mostrarenPantalla("9");
		}
		document.getElementById("on").onclick = function(e){
			calculadora.borrarpantalla();
		}
		document.getElementById("sign").onclick = function(e){
			calculadora.cambiarSigno();
		}
		document.getElementById("punto").onclick = function(e){
			calculadora.ingresoDecimal();
		}
		document.getElementById("igual").onclick = function(e){
			calculadora.verResultado();
		}
		document.getElementById("raiz").onclick = function(e){
			calculadora.ingresoOperacion("sqrt");
		}
		document.getElementById("dividido").onclick = function(e){
			calculadora.ingresoOperacion("/");
		}
		document.getElementById("por").onclick = function(e){
			calculadora.ingresoOperacion("*");
		}
		document.getElementById("menos").onclick = function(e){
			calculadora.ingresoOperacion("-");
		}
		document.getElementById("mas").onclick = function(e){
			calculadora.ingresoOperacion("+");
		}
	},
	
	borrarpantalla: function(){ 

	    this.valorPantalla = "0";
		this.operacion = "";
		this.operando_1 = 0;
		this.operando_2 = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.reescribirPantalla();
	},
	
	cambiarSigno: function(){
		if (this.valorPantalla !="0") {
			var aux;
			if (this.valorPantalla.charAt(0)=="-") {
				aux = this.valorPantalla.slice(1);
			}	else {
				aux = "-" + this.valorPantalla;
			}
		this.valorPantalla = "";
		this.valorPantalla = aux;
		this.reescribirPantalla();
		}
	},
	
	ingresoDecimal: function(){
		if (this.valorPantalla.indexOf(".")== -1) {
			if (this.valorPantalla == ""){
				this.valorPantalla = this.valorPantalla + "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
			}
			this.reescribirPantalla();
		}
	},
	
	mostrarenPantalla: function(valor){
		if (this.valorPantalla.length < 8) {
		
			if (this.valorPantalla=="0") {
				this.valorPantalla = "";
				this.valorPantalla = this.valorPantalla + valor;
			} else {
				this.valorPantalla = this.valorPantalla + valor;
			}
		this.reescribirPantalla();
		}
	},
	
	ingresoOperacion: function(oper){
		this.operando_1 = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.reescribirPantalla();
	},
	
	verResultado: function(){

		if(!this.auxTeclaIgual){ 
			this.operando_2 = parseFloat(this.valorPantalla);
			this.ultimoValor = this.operando_2;
			this.realizarOperacion(this.operando_1, this.operando_2, this.operacion);
		
		} else {
			this.realizarOperacion(this.operando_1, this.ultimoValor, this.operacion);
		}
	
		this.operando_1 = this.resultado;
		this.valorPantalla = "";
	
		if (this.resultado.toString().length < 8){
			this.valorPantalla = this.resultado.toString();
		} else {
			this.valorPantalla = this.resultado.toString().slice(0,9);
		}
	
		this.auxTeclaIgual = true;		
		this.reescribirPantalla();
	
	},
	
	realizarOperacion: function(operando_1, operando_2, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(operando_1 + operando_2);
			break;
			case "-": 
				this.resultado = eval(operando_1 - operando_2);
			break;
			case "*": 
				this.resultado = eval(operando_1 * operando_2);
			break;
			case "/": 
				this.resultado = eval(operando_1 / operando_2);
			break;
			case "sqrt":
				this.resultado = eval(Math.sqrt(operando_1));
		}
	},
	
	reescribirPantalla: function(){
		this.pantalla.innerHTML = this.valorPantalla;
	}
	
};

calculadora.cargarValores();