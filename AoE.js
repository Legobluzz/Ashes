var data = new Array;
var orders = new Array;
var report = ["","","","","","","","",""];
var ptext;
var GM = '**** <span onclick="show(\'writeMessages\');">Galactic Media</span> ****\r\n\r\n';

function ReadGame() {
  var input = document.getElementById('loadgame');
   
  ptext = document.getElementById('ptext');
  
  var fr = new FileReader();
  fr.onload = function() {
	data = JSON.parse(fr.result);
	ptext.innerHTML = 'Spiel: ' + data.game + '  Turn: ' + data.turn + '  geladen.\r';
  };
  fr.readAsText(input.files[0]);
}

function SaveTurns() {
	
  for (i=1; i<9; i++) {
	  
	var filename = "g" + data.game + "t" + data.turn + "p" + i.toString() +".txt";
	var filenameHTML = "g" + data.game + "t" + data.turn + "p" + i.toString() +".html";
	
	var permut = new Array;
	
	var r = 1;
	while (r<10) {
		var c = 0;
		for (xi=0;xi<9;xi++) {
			if (data.rank[xi].GNP == r) {
				permut[r+c] = xi;
				c++
			}
		}
		r += c;
	}
	
	var HTML = '<html><head><title>Auswertung Spiel ' + data.game + ' Turn ' + data.turn + ' Spieler ' + i.toString() + '</title>\r\n<style>';
	HTML += '.button {';
	HTML += 'width: 0.1px;height: 0.1px;opacity: 0;overflow: hidden;position: absolute;z-index: -1;';
	HTML += '}';
	HTML += '.buttonLabel{'
	HTML += 'background: #aaa;cursor: pointer;padding: 5px;';
	HTML += '}';
	HTML += '.buttonLabel:hover {';
	HTML += 'background: #555; ';
	HTML += '}';
	HTML += '.buttonLabel:active {';
	HTML += 'background: red; ';
	HTML += '}';
	HTML += 'input, select, form {'
	HTML += 'font-family: Fixedsys, Courier, monospace;font-size: 16px;background: none;border: 1;border-color: black;-webkit-appearance: none;cursor:pointer;';
	HTML += '}';
	HTML += 'input[type=number]::-webkit-inner-spin-button { ';
    HTML += '-webkit-appearance: none;';
	HTML += '}';

	HTML += 'input.single, input.PV {';
	HTML += 'width: 18px;';
	HTML += '}';
	HTML += 'input.double, .PDU, .FP, .OP, .RP, .FY, .TY, .FI, .TR, .FlugFI, .FlugTR , .QC, .PRplus, .FMplus, .TMplus , .PPtemp, .simFIV, .simTRV, .simFIA, .simTRA {';
	HTML += 'width: 29px;';
	HTML += '}';
	HTML += 'input.triple , .simFMO, .simFMV, .simFMA, .simTMA {';
	HTML += 'width: 40px;';
	HTML += '}';

	HTML += 'pre {';
	HTML += 'font-family: Fixedsys, Courier, monospace;padding: 10px;';
	HTML += '}';
	
	HTML += '</style>';
	HTML += '<script>';
	HTML += 'var orders;';
	HTML += 'var data = {';
	HTML += 'X : [ 0,';
	for (p=1;p<40;p++) {
		HTML += (data.planet[p].X-50)*5 + 300 + ',';
	}
	HTML += (data.planet[40].X-50)*5 + 300;
	HTML += '],';
	HTML += 'Y : [ 0,';
	for (p=1;p<40;p++) {
		HTML += 200 - (data.planet[p].Y+35)*5 + ',';
	}
	HTML += 200 - (data.planet[40].Y+35)*5;
	HTML += '],';
	HTML += 'planet : [';
	HTML += 'null,';
	for (p=1;p<41;p++) {
		if (data.planet[p].O!=i) {
			HTML += 'null,';
		} else {
			HTML += '{ A:' + data.planet[p].A + ',';
			var name = data.planet[p].name;
			if (name.includes("'")) {
				name = name.replace("'","&apos;");
			}
			HTML += ' name: \'' + name + '\',';
			HTML += ' O: ' + i + ',';
			HTML += ' PR: ' + data.planet[p].PR + ',';
			HTML += ' FP: ' + data.planet[p].FP + ',';
			HTML += ' OP: ' + data.planet[p].OP + ',';
			HTML += ' RP: ' + data.planet[p].RP + ',';
			HTML += ' FUEL: ' + data.planet[p].FUEL + ',';
			HTML += ' ORE: ' + data.planet[p].ORE + ',';
			HTML += ' RARE: ' + data.planet[p].RARE + ',';
			HTML += ' GIP: ' + data.planet[p].GIP + ',';
			HTML += ' PDU: ' + data.planet[p].PDU + ',';
			HTML += ' PM: ' + data.planet[p].PM + ',';
			HTML += ' FI: ' + data.planet[p].FI[i][0] + ',';
			HTML += ' TR: ' + data.planet[p].TR[i][0] + ',';
			HTML += ' FY: ' + data.planet[p].FY + ',';
			HTML += ' TY: ' + data.planet[p].TY + ',';
			HTML += '},';
		}
	}
	HTML += '],';
	HTML += '  D : [';
	for (q=0;q<40;q++) {
	HTML += '[],';
	}
	HTML += '[]]';
	HTML += '};';
	for (p=1;p<41;p++) {
		for (q=1;q<41;q++) {
			HTML += '	data.D['+p+']['+q+'] = ' + data.D[p][q] + ';';
		}
	}
	HTML += 'function ReadOrders() {';
	HTML += 'var input = document.getElementById(\'loadorders\');';
	HTML += 'var fr = new FileReader();';
	HTML += 'fr.onload = function() {';
	HTML += 'orders = JSON.parse(fr.result);';
	HTML += 'if (orders.name != \'\') { document.getElementById(\'OWNERNAMEnew\').value=orders.name;}';
	HTML += 'for (q=0;q<3;q++) {';
	HTML += 'if (orders.Spion[q]!=null) {document.getElementsByClassName(\'Spion\')[q].value = orders.Spion[q];}';
	HTML += 'if (q<2) {';
	HTML += 'if (orders.PRplusPL[q]!=null) {document.getElementsByClassName(\'PRplusPL\')[q].value = orders.PRplusPL[q];}';
	HTML += 'if (orders.PRplus[q]!=null) {document.getElementsByClassName(\'PRplus\')[q].value = orders.PRplus[q];}';
	HTML += '}}';
	HTML += 'if (orders.FMplus!=null) {document.getElementsByClassName(\'FMplus\')[0].value = orders.FMplus;}';
	HTML += 'if (orders.TMplus!=null) {document.getElementsByClassName(\'TMplus\')[0].value = orders.TMplus;}';
	HTML += 'if (orders.end!=null) {';
	HTML += 'document.getElementById(\'endturn\').value = orders.end;';
	HTML += '}';
	HTML += 'for (q=1;q<orders.QC.length;q++) {';
	HTML += 'addcargo();';
	HTML += '}';
	HTML += 'for (q=0;q<orders.QC.length;q++) {';
	HTML += 'if (orders.vonc[q]!=null) {document.getElementsByClassName(\'vonc\')[q].value = orders.vonc[q];}';
	HTML += 'if (orders.C[q]!=null) {document.getElementsByClassName(\'C\')[q].value = orders.C[q];}';
	HTML += 'if (orders.QC[q]!=null) {document.getElementsByClassName(\'QC\')[q].value = orders.QC[q];}';
	HTML += 'if (orders.nachc[q]!=null) {document.getElementsByClassName(\'nachc\')[q].value = orders.nachc[q];}';
	HTML += '}';
	HTML += 'for (q=1;q<orders.newplanetnamePL.length;q++) {';
	HTML += 'addrow();';
	HTML += '}';
	HTML += 'for (q=0;q<orders.newplanetnamePL.length;q++) {';
	HTML += 'if (orders.newplanetnamePL[q]!=null) {document.getElementsByClassName(\'newplanetnamePL\')[q].value = orders.newplanetnamePL[q];}';
	HTML += 'if (orders.newplanetname[q]!=null) {document.getElementsByClassName(\'newplanetname\')[q].value = orders.newplanetname[q];}';
	HTML += '}';
	HTML += 'if (orders.HP!=null) {';
	HTML += 'document.getElementById(\'HPnew\').value=orders.HP;';
	HTML += 'changeHPname(document.getElementById(\'HPnew\').value);';
	HTML += '}';
	HTML += 'for (q=1;q<9;q++) {';
	HTML += 'document.getElementsByClassName(\'PV\')[q].value = orders.PV[q];';
	HTML += '}';
	HTML += 'for (q=0;q<orders.PL.length;q++) {';
	HTML += 'if (orders.PDU[q]!=null) {document.getElementsByClassName(\'PDU\')[q].value = orders.PDU[q];}';
	HTML += 'if (orders.FP[q]!=null) {document.getElementsByClassName(\'FP\')[q].value = orders.FP[q];}';
	HTML += 'if (orders.OP[q]!=null) {document.getElementsByClassName(\'OP\')[q].value = orders.OP[q];}';
	HTML += 'if (orders.RP[q]!=null) {document.getElementsByClassName(\'RP\')[q].value = orders.RP[q];}';
	HTML += 'if (orders.FY[q]!=null) {document.getElementsByClassName(\'FY\')[q].value = orders.FY[q];}';
	HTML += 'if (orders.TY[q]!=null) {document.getElementsByClassName(\'TY\')[q].value = orders.TY[q];}';
	HTML += 'if (orders.FI[q]!=null) {document.getElementsByClassName(\'FI\')[q].value = orders.FI[q];}';
	HTML += 'if (orders.TR[q]!=null) {document.getElementsByClassName(\'TR\')[q].value = orders.TR[q];}';
	HTML += '}';
	HTML += 'for (p=0;p<41;p++) {';
	HTML += 'var c = 0;';
	HTML += 'if (data.planet[p] != null) {'
	HTML += 'for (q=0;q<orders.von.length;q++) {'
	HTML += 'if (orders.von[q]==p) {';
	HTML += 'c++;';
	HTML += 'if (c>1) {addflugbefrow(p);}';
	HTML += '}';
	HTML += '}';
	HTML += '}';
	HTML += '}';
	HTML += 'for (q=0;q<orders.von.length;q++) {';
	HTML += 'for (s=0;s<document.getElementsByClassName(\'von\').length;s++) {';
	HTML += 'if (document.getElementsByClassName(\'von\')[s].value == orders.von[q]) {';
	HTML += 'if (document.getElementsByClassName(\'FlugFI\')[s].value == "" && document.getElementsByClassName(\'FlugTR\')[s].value == "" && document.getElementsByClassName(\'nach\')[s].value == "-") {';
	HTML += 'if (orders.FlugFI[q]!=null) {document.getElementsByClassName(\'FlugFI\')[s].value = orders.FlugFI[q];}';
	HTML += 'if (orders.FlugTR[q]!=null) {document.getElementsByClassName(\'FlugTR\')[s].value = orders.FlugTR[q];}';
	HTML += 'if (orders.nach[q]!=null) {document.getElementsByClassName(\'nach\')[s].value = orders.nach[q];}';
	HTML += 's = document.getElementsByClassName(\'von\').length;';
	HTML += '}';
	HTML += '}';
	HTML += '}';
	HTML += '}';
	HTML += 'document.getElementsByClassName(\'publicmessage\')[0].value = orders.publicmessage;';
	HTML += 'for (j=1;j<9;j++) {';
	HTML += 'document.getElementsByClassName(\'GHB\')[j].value = orders.GHB[j];';
	HTML += '}';
	HTML += '};';
	HTML += 'fr.readAsText(input.files[0]);';
	HTML += '}';
	//end ReadOrders
	HTML += 'function SaveOrders() {';
	HTML += '  var PV = document.getElementsByClassName(\'PV\');';
	HTML += '  var PL = document.getElementsByClassName(\'pl\');';
	HTML += '  var PDU = document.getElementsByClassName(\'PDU\');';
	HTML += '  var FP = document.getElementsByClassName(\'FP\');';
	HTML += '  var OP = document.getElementsByClassName(\'OP\');';
	HTML += '  var RP = document.getElementsByClassName(\'RP\');';
	HTML += '  var FY = document.getElementsByClassName(\'FY\');';
	HTML += '  var TY = document.getElementsByClassName(\'TY\');';
	HTML += '  var FI = document.getElementsByClassName(\'FI\');';
	HTML += '  var TR = document.getElementsByClassName(\'TR\');';
	HTML += '  var von = document.getElementsByClassName(\'von\');';
	HTML += '  var FlugFI = document.getElementsByClassName(\'FlugFI\');';
	HTML += '  var FlugTR = document.getElementsByClassName(\'FlugTR\');';
	HTML += '  var nach = document.getElementsByClassName(\'nach\');';
	HTML += '  var vonc = document.getElementsByClassName(\'vonc\');';
	HTML += '  var C = document.getElementsByClassName(\'C\');';
	HTML += '  var QC = document.getElementsByClassName(\'QC\');';
	HTML += '  var nachc = document.getElementsByClassName(\'nachc\');';
	HTML += '  var Spion = document.getElementsByClassName(\'Spion\');';
	HTML += '  var PRplus = document.getElementsByClassName(\'PRplus\');';
	HTML += '  var PRplusPL = document.getElementsByClassName(\'PRplusPL\');';
	HTML += '  var FMplus = document.getElementsByClassName(\'FMplus\');';
	HTML += '  var TMplus = document.getElementsByClassName(\'TMplus\');';
	HTML += '  var newplanetnamePL = document.getElementsByClassName(\'newplanetnamePL\');';
	HTML += '  var newplanetname = document.getElementsByClassName(\'newplanetname\');';
		
	HTML += '  var sorders = new Array;';
	HTML += '  var filename = "Befg' + data.game + 't' + data.turn + 'p' + i + '.AoE";';
    
	HTML += '  sorders = {';
	HTML += '	player: ' + i + ',';
	HTML += '	game: ' + data.game + ',';
	HTML += '	turn: ' + data.turn + ',';
	if (data.turn == 0) {
	HTML += '	end: parseInt(document.getElementById(\'endturn\').value),';
	}
	HTML += '	name: document.getElementById(\'OWNERNAMEnew\').value,';
	HTML += '	HP: parseInt(document.getElementById(\'HPnew\').value),';
	HTML += '	PV: ['
	HTML += '		parseInt(PV[0].value),';
	HTML += '		parseInt(PV[1].value),';
	HTML += '		parseInt(PV[2].value),';
	HTML += '		parseInt(PV[3].value),';
	HTML += '		parseInt(PV[4].value),';
	HTML += '		parseInt(PV[5].value),';
	HTML += '		parseInt(PV[6].value),';
	HTML += '		parseInt(PV[7].value),';
	HTML += '		parseInt(PV[8].value)';
	HTML += '		],';
	HTML += '	PL: [],';
	HTML += '	PDU: [],';
	HTML += '	FP: [],';
	HTML += '	OP: [],';
	HTML += '	RP: [],';
	HTML += '	FY: [],';
	HTML += '	TY: [],';
	HTML += '	FI: [],';
	HTML += '	TR: [],';
	HTML += '	newplanetnamePL: [],';
	HTML += '	newplanetname: [],';
	HTML += '	von: [],';
	HTML += '	FlugFI: [],';
	HTML += '	FlugTR: [],';
	HTML += '	nach: [],';
	HTML += '	vonc: [],';
	HTML += '	C: [],';
	HTML += '	QC: [],';
	HTML += '	nachc: [],';
	HTML += '	Spion: [';
	HTML += '		parseInt(Spion[0].value),';
	HTML += '		parseInt(Spion[1].value),';
	HTML += '		parseInt(Spion[2].value)';
	HTML += '	],';
	HTML += '	PRplus: [';
	HTML += '		parseInt(PRplus[0].value),';
	HTML += '		parseInt(PRplus[1].value)';
	HTML += '	],';
	HTML += '	PRplusPL: [';
	HTML += '		parseInt(PRplusPL[0].value),';
	HTML += '		parseInt(PRplusPL[1].value)';
	HTML += '	],';
	HTML += '	FMplus: parseInt(FMplus[0].value),';
	HTML += '	TMplus: parseInt(TMplus[0].value),';
	HTML += '   publicmessage : "",';
	HTML += '   GHB : [null,null,null,null,null,null,null,null,null]';
	HTML += '};';
	HTML += 'for (p=0;p<PL.length;p++) {';
	HTML += '	sorders.PL[p] = parseInt(PL[p].value);';
	HTML += '}';
	HTML += 'for (p=0;p<PDU.length;p++) {';
	HTML += '	sorders.PDU[p] = parseInt(PDU[p].value);';
	HTML += '	sorders.FP[p] = parseInt(FP[p].value);';
	HTML += '	sorders.OP[p] = parseInt(OP[p].value);';
	HTML += '	sorders.RP[p] = parseInt(RP[p].value);';
	HTML += '	sorders.FY[p] = parseInt(FY[p].value);';
	HTML += '	sorders.TY[p] = parseInt(TY[p].value);';
	HTML += '	sorders.FI[p] = parseInt(FI[p].value);';
	HTML += '	sorders.TR[p] = parseInt(TR[p].value);';
	HTML += '}';
	HTML += 'for (p=0;p<newplanetnamePL.length;p++) {';
	HTML += '	sorders.newplanetnamePL[p] = newplanetnamePL[p].value;';
	HTML += '	sorders.newplanetname[p] = newplanetname[p].value;';
	HTML += '}';
	HTML += 'for (p=0;p<von.length;p++) {';
	HTML += '	sorders.von[p] = parseInt(von[p].value);';
	HTML += '	sorders.FlugFI[p] = parseInt(FlugFI[p].value);';
	HTML += '	sorders.FlugTR[p] = parseInt(FlugTR[p].value);';
	HTML += '	sorders.nach[p] = parseInt(nach[p].value);';
	HTML += '}';
	HTML += 'for (p=0;p<vonc.length;p++) {';
	HTML += '	sorders.vonc[p] = parseInt(vonc[p].value);';
	HTML += '	sorders.QC[p] = parseInt(QC[p].value);';
	HTML += '	sorders.C[p] = parseInt(C[p].value);';
	HTML += '	sorders.nachc[p] = parseInt(nachc[p].value);';
	HTML += '}';
	HTML += 'sorders.publicmessage = document.getElementsByClassName(\'publicmessage\')[0].value;';	
	HTML += 'for (j=1;j<9;j++) {'
	HTML += '   sorders.GHB[j] = document.getElementsByClassName(\'GHB\')[j].value;';
	HTML += '}';
	HTML += 'sdata=JSON.stringify(sorders);';
	HTML += 'var pom = document.createElement(\'a\');';
	HTML += 'pom.setAttribute(\'href\', \'data:text/plain;charset=utf-8,\' + encodeURIComponent(sdata));';
	HTML += 'pom.setAttribute(\'download\', filename);';
	HTML += 'if (document.createEvent) {';
	HTML += '	var event = document.createEvent(\'MouseEvents\');';
	HTML += '	event.initEvent(\'click\', true, true);';
	HTML += '	pom.dispatchEvent(event);';
	HTML += '} else {';
	HTML += 'pom.click();';
    HTML += '}';
	HTML += '}';
	//end saveorders()

	HTML += 'function show(elemId) {var elem = document.getElementById(elemId);	if (elem.style.display == \'none\') {elem.style.display = \'inline\';} else {elem.style.display = \'none\';	}}';
	HTML += 'function changeHPname (p) {';
	HTML += 'document.getElementById(\'HPname\').innerHTML = data.planet[p].name;';
	HTML += '}';
	HTML += 'function updatePP() {';
	HTML += 'var PPtemp = ' + parseInt(data.player[i].PP) + ';';
	HTML += 'for (q=0;q<3;q++) {';
	HTML += '	if (document.getElementsByClassName(\'Spion\')[q].value != \'-\') {';
	HTML += '		PPtemp -= 7;';
	HTML += '	}';
	HTML += '}';
	HTML += 'for (q=0;q<2;q++) {';
	HTML += '	if (document.getElementsByClassName(\'PRplus\')[q].value) {';
	HTML += '		PPtemp -= document.getElementsByClassName(\'PRplus\')[q].value;';
	HTML += '	}';
	HTML += '}';
	HTML += 'if (document.getElementsByClassName(\'FMplus\')[0].value) {';
	HTML += '	PPtemp -= document.getElementsByClassName(\'FMplus\')[0].value;';
	HTML += '}';
	HTML += 'if (document.getElementsByClassName(\'TMplus\')[0].value) {';
    HTML += '	PPtemp -= document.getElementsByClassName(\'TMplus\')[0].value;';
	HTML += '}';
	HTML += 'document.getElementById(\'PPtemp\').value = PPtemp;';
	HTML += '}';
	HTML += 'function addflugbefrow(planet) {';
	HTML += 'var table = document.getElementById(\'flugbeftable\'+planet);';
	HTML += 'var row = table.insertRow(0);';
	HTML += 'row.style.backgroundColor = \'orange\';';
	HTML += 'var cell1 = row.insertCell(0);';
	HTML += 'var cell2 = row.insertCell(1);';
	HTML += 'var cell3 = row.insertCell(2);';
	HTML += 'cell1.innerHTML = \'&nbsp;\';';
	HTML += 'cell1.style.backgroundColor = \'white\';';
	HTML += 'cell3.innerHTML = \'&nbsp;\';';
	HTML += 'cell2.innerHTML = \'<input type="hidden" name="von[]" class="von" value="\'+planet+\'"><input type="number" name="FlugFI[]" class="FlugFI" min="0" step="1">FI / <input type="number" name="FlugTR[]" class="FlugTR" min="0" step="1">TR --\> <select name="nach[]" class="nach"><option value="-">-</option>';
	for (q=1;q<41;q++) {
	HTML += '	<option value="' + q + '">' + q + ' (D+\'+data.D[planet]['+q+']+\')</option>';
	}
	HTML += '</select>\';';
	HTML += '}';
	HTML += 'function addcargo() {';
	HTML += 'var table = document.getElementById(\'sonder\');';
	HTML += 'var row = table.insertRow(3);';
	HTML += 'row.style.backgroundColor = \'orange\';';
	HTML += 'var cell1 = row.insertCell(0);';
	HTML += 'cell1.colSpan = 13;';
	HTML += 'cell1.innerHTML = \'';
	HTML += '<td colspan="13">Frachtfl&uuml;ge: #<input type="number" name="QC[]" class="QC" min="0" step="1"> C<select name="C[]" class="C"><option value="-">-</option>';
	for (c=0;c<10;c++) {
		HTML += '<option value="' + c + '">' + c + '</option>';
	}
	HTML += '</select> von <select name="vonc[]" class="vonc"><option value="-">-</option>';
	for (p=1;p<41;p++) {
		if (data.planet[p].O == i && data.planet[p].TR[i][0]) {
			HTML += '<option value="' + p + '">' + p + '</option>';
		}
	}
	HTML += '</select> nach <select name="nachc[]" class="nachc"><option value="-">-</option>';
	for (p=1;p<41;p++) {
		HTML += '<option value="' + p + '">' + p + '</option>';
	}
	HTML += '</select></td>\';';
	HTML += '}';
	HTML += 'function addrow () {';
	HTML += 'var table = document.getElementById(\'sonder\');';
	HTML += 'var r = table.rows.length-2;';
	HTML += 'var row = table.insertRow(r);';
	HTML += 'row.style.backgroundColor = \'orange\';';
	HTML += 'var cell1 = row.insertCell(0);';
	HTML += 'cell1.colSpan = 13;';
	HTML += 'cell1.innerHTML = \'';
	HTML += 'Benenne Planet <select name="newplanetnamePL[]" class="newplanetnamePL"><option value="-">-</option>';
	for (p=1;p<41;p++) {
		HTML += '<option value="'+p+'">'+p+'</option>';
	}
	HTML += '</select> um in <input type="text" name="newplanetname[]" class="newplanetname">';
	HTML += '\';';
	HTML += '}';
	HTML += 'function updatebau(planet) {';
	HTML += 'var Atemp = data.planet[planet].A;';
	HTML += 'var PDUtemp = data.planet[planet].PDU;';
	HTML += 'var FPtemp = data.planet[planet].FP;';
	HTML += 'var OPtemp = data.planet[planet].OP;';
	HTML += 'var RPtemp = data.planet[planet].RP;';
	HTML += 'var FUELtemp = data.planet[planet].FUEL;';
	HTML += 'var OREtemp = data.planet[planet].ORE;';
	HTML += 'var RAREtemp = data.planet[planet].RARE;';
	HTML += 'var FYtemp = data.planet[planet].FY;';
	HTML += 'var TYtemp = data.planet[planet].TY;';
	HTML += 'var NAMEnew = data.planet[planet].name;';
	HTML += 'var OWNERNAMEnew = \'' + data.player[i].name + '\';';
	HTML += 'var GIPnew = data.planet[planet].GIP;';
	HTML += 'var PMnew = data.planet[planet].PM;';
	HTML += 'var Anew = data.planet[planet].A;';
	HTML += 'var PRnew = data.planet[planet].PR;';
	HTML += 'var FPnew = data.planet[planet].FP;';
	HTML += 'var OPnew = data.planet[planet].OP;';
	HTML += 'var RPnew = data.planet[planet].RP;';
	HTML += 'var FUELnew = data.planet[planet].FUEL;';
	HTML += 'var OREnew = data.planet[planet].ORE;';
	HTML += 'var RAREnew = data.planet[planet].RARE;';
	HTML += 'var FYnew = data.planet[planet].FY;';
	HTML += 'var TYnew = data.planet[planet].TY;';
	HTML += 'var FInew = data.planet[planet].FI;';
	HTML += 'var TRnew = data.planet[planet].TR;';
	HTML += 'var PDUnew = data.planet[planet].PDU;';
	HTML += 'var vonc = document.getElementsByClassName(\'vonc\');';
	HTML += 'var QC = document.getElementsByClassName(\'QC\');';
	HTML += 'for (q=0;q<QC.length;q++) {';
	HTML += 'if (vonc[q] && QC[q].value && vonc[q].value == planet) {';
	HTML += 'var QCact = Math.min(QC[q].value, TRnew);';
	HTML += 'var c = parseInt(document.getElementsByClassName(\'C\')[q].value);';
	HTML += 'switch (c) {';
	HTML += 'case 0:';
	HTML += 'QCact = Math.min(QCact,Math.floor(Atemp/8));';
	HTML += 'Atemp -= QCact*8;';
	HTML += 'Anew -= QCact*8;';
	HTML += 'TRnew -= QCact;';
	HTML += 'break;';
	HTML += 'case 1:';
	HTML += 'QCact = Math.min(QCact,PDUtemp);';
	HTML += 'PDUtemp -= QCact;';
	HTML += 'PDUnew -= QCact;';
	HTML += 'TRnew -= QCact;';
	HTML += 'break;';
	HTML += 'case 2:';
	HTML += 'QCact = Math.min(QCact,Math.floor(FPtemp/4));';
	HTML += 'FPtemp -= QCact*4;';
	HTML += 'FPnew -= QCact*4;';
	HTML += 'TRnew -= QCact;';
	HTML += 'break;';
	HTML += 'case 3:';
	HTML += 'QCact = Math.min(QCact,Math.floor(OPtemp/5));';
	HTML += 'OPtemp -= QCact*5;';
	HTML += 'OPnew -= QCact*5;';
	HTML += 'TRnew -= QCact;';
	HTML += 'break;';
	HTML += 'case 4:';
	HTML += 'QCact = Math.min(QCact,Math.floor(RPtemp/2));';
	HTML += 'RPtemp -= QCact*2;';
	HTML += 'RPnew -= QCact*2;';
	HTML += 'TRnew -= QCact;';
	HTML += 'break;';
	HTML += 'case 5:';
	HTML += 'QCact = Math.min(QCact,Math.floor(FUELtemp/40));';
	HTML += 'FUELtemp -= QCact*40;';
	HTML += 'FUELnew -= QCact*40;';
	HTML += 'TRnew -= QCact;';
	HTML += 'break;';
	HTML += 'case 6:';
	HTML += 'QCact = Math.min(QCact,Math.floor(OREtemp/50));';
	HTML += 'OREtemp -= QCact*50;';
	HTML += 'OREnew -= QCact*50;';
	HTML += 'TRnew -= QCact;';
	HTML += 'break;';
	HTML += 'case 7:';
	HTML += 'QCact = Math.min(QCact,Math.floor(RAREtemp/20));';
	HTML += 'RAREtemp -= QCact*20;';
	HTML += 'RAREnew -= QCact*20;';
	HTML += 'TRnew -= QCact;';
	HTML += 'break;';
	HTML += 'case 8:';
	HTML += 'QCact = Math.min(QCact,FYtemp);';
	HTML += 'FYtemp -= QCact;';
	HTML += 'FYnew -= QCact;';
	HTML += 'TRnew -= QCact;';
	HTML += 'break;';
	HTML += 'case 9:';
	HTML += 'QCact = Math.min(QCact,TYtemp);';
	HTML += 'TYtemp -= QCact;';
	HTML += 'TYnew -= QCact;';
	HTML += 'TRnew -= QCact;';
	HTML += 'break;';
	HTML += '}';
	HTML += '}';
	HTML += '}';
	HTML += 'var t = -1;';
	HTML += 'var pl = null;';
	HTML += 'for (q=0;q<document.getElementsByClassName(\'newplanetnamePL\').length;q++) {';
	HTML += 'pl = document.getElementsByClassName(\'newplanetnamePL\')[q];';
	HTML += 'if (pl && pl.value == planet) {';
	HTML += 't = q;';
	HTML += '}';
	HTML += '}';
	HTML += 'if (t > -1 && document.getElementsByClassName(\'newplanetname\')[t].value) {';
	HTML += 'NAMEnew = document.getElementsByClassName(\'newplanetname\')[t].value;';
	HTML += '}';
	HTML += 'var p = 0;';
	HTML += 'pl = null;';
	HTML += 'for (q=1;q<41;q++) {';
	HTML += 'pl = document.getElementsByClassName(\'pl\')[q];';
	HTML += 'if (pl && pl.value == planet) { p = q;}';
	HTML += '}';
	HTML += 'if (document.getElementsByClassName(\'PDU\')[p]) { Atemp -= document.getElementsByClassName(\'PDU\')[p].value*15; }';
	HTML += 'if (document.getElementsByClassName(\'FP\')[p]) { Atemp -= document.getElementsByClassName(\'FP\')[p].value*5; }';
	HTML += 'if (document.getElementsByClassName(\'OP\')[p]) { Atemp -= document.getElementsByClassName(\'OP\')[p].value*4; }';
	HTML += 'if (document.getElementsByClassName(\'RP\')[p]) { Atemp -= document.getElementsByClassName(\'RP\')[p].value*10; }';
	HTML += 'if (document.getElementsByClassName(\'FY\')[p]) { Atemp -= document.getElementsByClassName(\'FY\')[p].value*15; }';
	HTML += 'if (document.getElementsByClassName(\'TY\')[p]) { Atemp -= document.getElementsByClassName(\'TY\')[p].value*20; }';
	HTML += 'if (document.getElementsByClassName(\'FI\')[p]) {';
	HTML += 'Atemp -= document.getElementsByClassName(\'FI\')[p].value*10;';
	HTML += 'FUELtemp -= document.getElementsByClassName(\'FI\')[p].value;';
	HTML += 'OREtemp -= document.getElementsByClassName(\'FI\')[p].value;';
	HTML += 'RAREtemp -= document.getElementsByClassName(\'FI\')[p].value*3;';
	HTML += 'FYtemp -= document.getElementsByClassName(\'FI\')[p].value;';
	HTML += '}';
	HTML += 'if (document.getElementsByClassName(\'TR\')[p]) {';
	HTML += 'Atemp -= document.getElementsByClassName(\'TR\')[p].value*20;';
	HTML += 'FUELtemp -= document.getElementsByClassName(\'TR\')[p].value*2;';
	HTML += 'OREtemp -= document.getElementsByClassName(\'TR\')[p].value*3;';
	HTML += 'RAREtemp -= document.getElementsByClassName(\'TR\')[p].value;';
	HTML += 'TYtemp -= document.getElementsByClassName(\'TR\')[p].value;';
	HTML += '}';
	HTML += 'document.getElementById(\'Atemp\' + parseInt(planet)).innerHTML = Atemp;';
	HTML += 'if (Atemp < 0) {';
	HTML += 'document.getElementById(\'Atemp\' + parseInt(planet)).style.backgroundColor = \'red\'';
	HTML += '} else {';
	HTML += 'document.getElementById(\'Atemp\' + parseInt(planet)).style.backgroundColor = \'orange\'';
	HTML += '}';
	HTML += 'document.getElementById(\'FUELtemp\' + parseInt(planet)).innerHTML = FUELtemp;';
	HTML += 'if (FUELtemp < 0) {';
	HTML += 'document.getElementById(\'FUELtemp\' + parseInt(planet)).style.backgroundColor = \'red\'';
	HTML += '} else {';
	HTML += 'document.getElementById(\'FUELtemp\' + parseInt(planet)).style.backgroundColor = \'orange\'';
	HTML += '}';
	HTML += 'document.getElementById(\'OREtemp\' + parseInt(planet)).innerHTML = OREtemp;';
	HTML += 'if (OREtemp < 0) {';
	HTML += 'document.getElementById(\'OREtemp\' + parseInt(planet)).style.backgroundColor = \'red\'';
	HTML += '} else {';
	HTML += 'document.getElementById(\'OREtemp\' + parseInt(planet)).style.backgroundColor = \'orange\'';
	HTML += '}';
	HTML += 'document.getElementById(\'RAREtemp\' + parseInt(planet)).innerHTML = RAREtemp;';
	HTML += 'if (RAREtemp < 0) {';
	HTML += 'document.getElementById(\'RAREtemp\' + parseInt(planet)).style.backgroundColor = \'red\'';
	HTML += '} else {';
	HTML += 'document.getElementById(\'RAREtemp\' + parseInt(planet)).style.backgroundColor = \'orange\'';
	HTML += '}';
	HTML += 'document.getElementById(\'FYtemp\' + parseInt(planet)).innerHTML = FYtemp;';
	HTML += 'if (FYtemp < 0) {';
	HTML += 'document.getElementById(\'FYtemp\' + parseInt(planet)).style.backgroundColor = \'red\'';
	HTML += '} else {';
	HTML += 'document.getElementById(\'FYtemp\' + parseInt(planet)).style.backgroundColor = \'orange\'';
	HTML += '}';
	HTML += 'document.getElementById(\'TYtemp\' + parseInt(planet)).innerHTML = TYtemp;';
	HTML += 'if (TYtemp < 0) {';
	HTML += 'document.getElementById(\'TYtemp\' + parseInt(planet)).style.backgroundColor = \'red\'';
	HTML += '} else {';
	HTML += 'document.getElementById(\'TYtemp\' + parseInt(planet)).style.backgroundColor = \'orange\'';
	HTML += '}';
	HTML += 'document.getElementById(\'NAMEnew\' + parseInt(planet)).innerHTML = NAMEnew;';
	HTML += 'document.getElementById(\'OWNERNAMEnew\' + parseInt(planet)).innerHTML = OWNERNAMEnew;';
	HTML += 'document.getElementById(\'PMnew\' + parseInt(planet)).innerHTML = Math.min(PMnew+10,250);';
	HTML += 'Anew += Math.floor(data.planet[planet].GIP/40);';
	HTML += 'document.getElementById(\'Anew\' + parseInt(planet)).innerHTML = Anew;';
	HTML += 'PRnew = Math.floor((Math.round(PRnew*60)+Math.floor(data.planet[planet].GIP/200))*100/6)/1000;';
	HTML += 'document.getElementById(\'PRnew\' + parseInt(planet)).innerHTML = PRnew;';
	HTML += 'HDnew = Math.ceil(Anew/40);';
	HTML += 'document.getElementById(\'HDnew\' + parseInt(planet)).innerHTML = HDnew;';
	HTML += 'if (isNaN(parseInt(document.getElementsByClassName(\'FP\')[p].value))==false) {';
	HTML += 'FPnew += parseInt(document.getElementsByClassName(\'FP\')[p].value);';
	HTML += '}';
	HTML += 'FUELnew = Math.min(Math.max(FUELtemp,0) + Math.floor(FPnew*data.planet[planet].PR),FPnew*10);';
	HTML += 'document.getElementById(\'FUELnew\' + parseInt(planet)).innerHTML = FUELnew;';
	HTML += 'if (isNaN(parseInt(document.getElementsByClassName(\'OP\')[p].value))==false) {';
	HTML += 'OPnew += parseInt(document.getElementsByClassName(\'OP\')[p].value);';
	HTML += '}';
	HTML += 'OREnew = Math.min(Math.max(OREtemp,0) + Math.floor(OPnew*data.planet[planet].PR),OPnew*10);';
	HTML += 'document.getElementById(\'OREnew\' + parseInt(planet)).innerHTML = OREnew;';
	HTML += 'if (isNaN(parseInt(document.getElementsByClassName(\'RP\')[p].value))==false) {';
	HTML += 'RPnew += parseInt(document.getElementsByClassName(\'RP\')[p].value);';
	HTML += '}';
	HTML += 'RAREnew = Math.min(Math.max(RAREtemp,0) + Math.floor(RPnew*data.planet[planet].PR),RPnew*10);';
	HTML += 'document.getElementById(\'RAREnew\' + parseInt(planet)).innerHTML = RAREnew;';
	HTML += 'if (isNaN(parseInt(document.getElementsByClassName(\'PDU\')[p].value))==false) {';
	HTML += 'PDUnew += parseInt(document.getElementsByClassName(\'PDU\')[p].value);';
	HTML += '}';
	HTML += 'document.getElementById(\'PDUnew\' + parseInt(planet)).innerHTML = PDUnew;';
	HTML += 'document.getElementById(\'FPnew\' + parseInt(planet)).innerHTML = FPnew;';
	HTML += 'document.getElementById(\'OPnew\' + parseInt(planet)).innerHTML = OPnew;';
	HTML += 'document.getElementById(\'RPnew\' + parseInt(planet)).innerHTML = RPnew;';
	HTML += 'if (isNaN(parseInt(document.getElementsByClassName(\'FY\')[p].value))==false) {';
	HTML += 'FYnew += parseInt(document.getElementsByClassName(\'FY\')[p].value);';
	HTML += '}';
	HTML += 'document.getElementById(\'FYnew\' + parseInt(planet)).innerHTML = FYnew;';
	HTML += 'if (isNaN(parseInt(document.getElementsByClassName(\'TY\')[p].value))==false) {';
	HTML += 'TYnew += parseInt(document.getElementsByClassName(\'TY\')[p].value);';
	HTML += '}';
	HTML += 'document.getElementById(\'TYnew\' + parseInt(planet)).innerHTML = TYnew;';
	HTML += 'if (isNaN(parseInt(document.getElementsByClassName(\'FI\')[p].value))==false) {';
	HTML += 'FInew += parseInt(document.getElementsByClassName(\'FI\')[p].value);';
	HTML += '}';
	HTML += 'document.getElementById(\'FInew\' + parseInt(planet)).innerHTML = FInew;';
	HTML += 'if (isNaN(parseInt(document.getElementsByClassName(\'TR\')[p].value))==false) {';
	HTML += 'TRnew += parseInt(document.getElementsByClassName(\'TR\')[p].value);';
	HTML += '}';
	HTML += 'document.getElementById(\'TRnew\' + parseInt(planet)).innerHTML = TRnew;';
	HTML += 'GIPnew = Math.floor(FPnew+OPnew+RPnew+Anew*PRnew/20+(FUELnew+OREnew+RAREnew)/10);';
	HTML += 'document.getElementById(\'GIPnew\' + parseInt(planet)).innerHTML = GIPnew;';
	HTML += 'if (document.getElementById(\'OWNERNAMEnew\').value) {';
	HTML += 'OWNERNAMEnew = document.getElementById(\'OWNERNAMEnew\').value;';
	HTML += '} else {';
	HTML += 'OWNERNAMEnew = \'' + data.player[i].name + '\';';
	HTML += '}';
	HTML += 'document.getElementById(\'OWNERNAMEnew\' + parseInt(planet)).innerHTML = OWNERNAMEnew;';
	HTML += 'var FImaxFI = Math.min(Math.floor(Anew/10),FUELnew,OREnew,Math.floor(RAREnew/3),FYnew);';
	HTML += 'var FImaxTR = Math.min(Math.floor((Anew-FImaxFI*10)/20),Math.floor((FUELnew-FImaxFI)/2),Math.floor((OREnew-FImaxFI)/3),(RAREnew-FImaxFI*3),TYnew);';
	HTML += 'var TRmaxTR = Math.min(Math.floor(Anew/20),Math.floor(FUELnew/2),Math.floor(OREnew/3),RAREnew,TYnew);';
	HTML += 'var TRmaxFI = Math.min(Math.floor((Anew-TRmaxTR*20)/10),FUELnew-TRmaxTR*2,OREnew-TRmaxTR*3,Math.floor((RAREnew-TRmaxTR)/3),FYnew);';
	HTML += 'document.getElementById(\'FImaxFI\' + planet).innerHTML = FImaxFI;';
	HTML += 'document.getElementById(\'FImaxTR\' + planet).innerHTML = FImaxTR;';
	HTML += 'document.getElementById(\'TRmaxFI\' + planet).innerHTML = TRmaxFI;';
	HTML += 'document.getElementById(\'TRmaxTR\' + planet).innerHTML = TRmaxTR;';
	HTML += '}';
	HTML += '</script></head>\r\n';
	HTML += '<body><form name="orders"><pre>Auswertung f&uuml;r <span onclick="show(\'spielername\');">' + data.player[i].name + '</span>  Spiel: ' + data.game + '  Turn: ' + data.turn + '  <span onclick="show(\'sonder\');updatePP();">Sonderbefehle</span>\r';
	HTML += '<span id="spielername" style="display:none; background-color:orange;">\r\n neuer Spielername: <input type="text" name="spielername" style="background-color:orange;" id="OWNERNAMEnew"><span onclick="show(\'spielername\');">[x]</span><br></span>';
	HTML += '<table id="sonder" style="display:none;" cellspacing="0" border="0">';
	HTML += '<tr><td>&nbsp;</td></tr><tr style="background-color:orange;"><td colspan="3">Spionage auf</td><td width="40"></td><td><input type="number" name="PRplus[]" class="PRplus" onchange="updatePP();" min="0" step="1"></td><td>PP&rarr;PR auf</td><td><select name="PRplusPL[]" class="PRplusPL"><option value="-">-</option>';
	for (p=1;p<41;p++) {
		HTML += '<option value="'+p+'">'+p+'</option>';
	}
	HTML += '</select></td><td width="40"></td><td>PP&rarr;FM%</td><td><input type="number" name="FMplus" class="FMplus" onchange="updatePP();" min="0" step="1"></td><td width="40"></td><td>';
	if (data.turn == 0) {
		HTML += 'Endturn: <select name="endturn" id="endturn"><option value="-">-</option>';
		for (t=10;t<31;t++) {
			HTML += '<option value="'+t+'">'+t+'</option>';
		}
		HTML += '</select>';
	}
	HTML += '</td><td></td></tr><tr style="background-color:orange;">';
	for (t=1;t<4;t++) {
		HTML += '<td align="center"><select name="Spion[]" class="Spion" onchange="updatePP();"><option value="-">-</option>';
		for (p=1;p<41;p++) {
			if (data.planet[p].O != i) {
				HTML += '<option value="'+ p + '">' + p + '</option>';
			}
		}
		HTML += '</select></td>';
	}
	HTML += '<td width="40"></td><td><input type="number" name="PRplus[]" class="PRplus" onchange="updatePP();" min="0" step="1"></td><td>PP&rarr;PR auf</td><td><select name="PRplusPL[]" class="PRplusPL"><option value="-">-</option>';
	for (p=1;p<41;p++) {
		HTML += '<option value="'+p+'">'+p+'</option>';
	}
	HTML += '</select></td><td width="40"></td><td>PP&rarr;TM%</td><td><input type="number" name="TMplus" class="TMplus" onchange="updatePP();" min="0" step="1"></td><td></td><td>verf&uuml;gbare PP</td><td><input type="number" name="PPtemp" id="PPtemp" style="width:29px;" disabled></td></tr>';
	HTML += '<tr style="background-color:orange;"><td colspan="13">Frachtfl&uuml;ge: #<input type="number" name="QC[]" class="QC" min="0" step="1"> C<select name="C[]" class="C"><option value="-">-</option>';
	for (c=0;c<10;c++) {
		HTML += '<option value="' + c + '">' + c + '</option>';
	}
	HTML += '</select> von <select name="vonc[]" class="vonc"><option value="-">-</option>';
	for (p=1;p<41;p++) {
		if (data.planet[p].O == i && data.planet[p].TR[i][0]) {
			HTML += '<option value="' + p + '">' + p + '</option>';
		}
	}
	HTML += '</select> nach <select name="nachc[]" class="nachc"><option value="-">-</option>';
	for (p=1;p<41;p++) {
		HTML += '<option value="' + p + '">' + p + '</option>';
	}
	HTML += '</select> <span onclick="addcargo();">[+]</span></td></tr>';
	HTML += '<tr style="background-color:orange;"><td colspan="11">Benenne Planet <select name="newplanetnamePL[]" class="newplanetnamePL"><option value="-">-</option>';
	for (p=1;p<41;p++) {
		HTML += '<option value="'+p+'">'+p+'</option>';
	}
	HTML += '</select> um in <input type="text" name="newplanetname[]" class="newplanetname"></td><td onclick="addrow();">[+]</td><td onclick="show(\'sonder\');">[x]</td></tr>';
	HTML += '<tr><td>&nbsp;</td></tr></table>'
	HTML += '\r                   <span onclick="show(\'newHP\')">Heimatplanet = ' + data.player[i].HP + ' (' + data.planet[data.player[i].HP].name + ')</span>\r\n';
	HTML += '             <span id="newHP" style="display:none; background-color:orange;">neuer Heimatplanet <select name="HP" onchange="changeHPname(this.value);" id="HPnew">';
	for (p=1;p<41;p++) {
		if (data.planet[p].O == i) {
			HTML += '<option value="'+p.toString()+'"';
			if (p == data.player[i].HP) {
				HTML += ' selected';
			}
			HTML += '>' + p.toString() + '</option>';
		}
	}
	HTML += '<select> (<span id="HPname">' + data.planet[data.player[i].HP].name + '</span>)<span onclick="show(\'newHP\');">[x]</span></span>';
	HTML += '<table onclick="show(\'neuesPV\');" cellspacing="0">\r\n<tr>\r\n<td width="118"></td><td width="80" align="right">PV</td><td width="20" align="center">0</td><td width="20" align="center">1</td><td width="20" align="center">2</td><td width="20" align="center">3</td><td width="20" align="center">4</td><td width="20" align="center">5</td><td width="20" align="center">6</td><td width="20" align="center">7</td><td width="20" align="center">8</td>\r\n</tr>\r\n';
	HTML += '<tr>\r\n<td></td><td></td><td align="center">0</td>';
	for (j=1;j<9;j++) {
		if (j==i) {
			HTML += '<td align="center">1</td>';
		} else {
			HTML += '<td align="center">' + data.PV[i][j] + '</td>';
		}
	}
	HTML += '</tr>\r\n</table>';
	HTML += '<table id="neuesPV" style="display:none;" cellspacing="0">\r\n<tr>\r\n<td width="118"></td><td width="80" align="right" style="background-color:orange;">neues PV</td><td width="20" align="center" style="background-color:orange;">0<input type="hidden" name="PV[]" class="PV" value="0"></td>';
	for (j=1;j<9;j++) {
		if (j==i) {
			HTML += '<td width="20" align="center" style="background-color:orange;"><select name="PV[]" class="PV" style="display:none;"><option value="1"></option></select>1</td>';
		} else {
			HTML += '<td width="20" align="center" style="background-color:orange;"><select name="PV[]" class="PV">';
			if (data.PV[i][j] < 2) {
				HTML += '<option value="0"';
				if (data.PV[i][j] == 0) { HTML += 'selected';}
				HTML += '>0</option>';
			}
			HTML += '<option value="1"';
			if (data.PV[i][j] == 1) { HTML += 'selected';}
			HTML += '>1</option>';
			if (data.PV[i][j] > 0) {
				HTML += '<option value="2"';
				if (data.PV[i][j] == 2) { HTML += 'selected';}
				HTML += '>2</option>';
			}
			HTML += '</select></td>';
		}
	}
	HTML += '<td onclick="show(\'neuesPV\');" style="background-color:orange;">[x]</td>\r\n</tr>\r\n';
	HTML += '</table>\r\n';
	HTML += '     Name  A  PL FP OP RP FY TY PD SP FI TR GI PP GNP Rang\r\n';
	for (r=1;r<10;r++) {
		for (xi=0;xi< 9-data.player[permut[r]].name.length; xi++) {
			HTML += ' ';
		}
		HTML += data.player[permut[r]].name + '  ' + data.rank[permut[r]].A + '  ' + data.rank[permut[r]].PL + '  ' + data.rank[permut[r]].FP + '  ' + data.rank[permut[r]].OP + '  ' + data.rank[permut[r]].RP + '  ' + data.rank[permut[r]].FY + '  ' + data.rank[permut[r]].TY + '  ' + data.rank[permut[r]].PD + '  ' + data.rank[permut[r]].SP + '  ' + data.rank[permut[r]].FI + '  ' + data.rank[permut[r]].TR + '  ' + data.rank[permut[r]].GI + '  ' + data.rank[permut[r]].PP + '  ' + data.player[permut[r]].GNP + '   ' + data.rank[permut[r]].GNP + '\r\n';
	}
	HTML += '\r\n';
	for (p=1;p<41;p++){
		if (data.planet[p].O == i) {
			HTML += '<table border="0" cellspacing="0" onclick="show(\'bau' + p + '\'); updatebau('+p+');"><tr><td colspan="16">Planet ' + p + ': ' + data.planet[p].name + '   Besitzer: ' + data.player[i].name + '   GIP: ' + data.planet[p].GIP + '   PM: ' + data.planet[p].PM + '\%</td></tr>';
			HTML += '<tr><td colspan="16">A: ' + data.planet[p].A + '   PR: ' + data.planet[p].PR + '   HD: ' + Math.ceil(data.planet[p].A/40) + '   Fuel: ' + data.planet[p].FUEL + '   Ore: ' + data.planet[p].ORE + '   Rare: ' + data.planet[p].RARE + '</td></tr>';
			HTML += '<tr><td width="40">PDU:</td><td width="40">' + data.planet[p].PDU + '</td><td width="30">FP:</td><td width="40">' + data.planet[p].FP + '</td><td width="30">OP:</td><td width="40">' + data.planet[p].OP + '</td><td width="30">RP:</td><td width="40">' + data.planet[p].RP + '</td><td width="30">FY:</td><td width="40">' + data.planet[p].FY + '</td><td width="30">TY:</td><td width="40">' + data.planet[p].TY + '</td><td width="30">FI:</td><td width="40">' + data.planet[p].FI[i][0] + '</td><td width="30">TR:</td><td width="40">' + data.planet[p].TR[i][0] + '</td></tr></table>';
			HTML += '<table id="bau' + p + '" style="display:none;" cellspacing="0" border="0">';
			HTML += '<tr style="background-color:orange;"><td width="40"><input type="hidden" name="pl[]" class="pl" value="' + p + '">PDU:</td><td width="40"><input type="number" class="PDU" name="PDU[]" class="PDU" onchange="updatebau('+p+');" min="0" step="1"></td><td width="30">FP:</td><td width="40"><input type="number" name="FP[]" class="FP" onchange="updatebau('+p+');" min="0" step="1"></td><td width="30">OP:</td><td width="40"><input type="number" name="OP[]" class="OP" onchange="updatebau('+p+');" min="0" step="1"></td><td width="30">RP:</td><td width="40"><input type="number" name="RP[]" class="RP" onchange="updatebau('+p+');" min="0" step="1"></td><td width="30">FY:</td><td width="40"><input type="number" name="FY[]" class="FY" onchange="updatebau('+p+');" min="0" step="1"></td><td width="30">TY:</td><td width="40"><input type="number" name="TY[]" class="TY" onchange="updatebau('+p+');" min="0" step="1"></td><td width="30">FI:</td><td width="40"><input type="number" name="FI[]" class="FI" onchange="updatebau('+p+');" min="0" step="1"></td><td width="30">TR:</td><td width="40"><input type="number" name="TR[]" class="TR" onchange="updatebau('+p+');" min="0" step="1"></td><td onclick="show(\'bau'+p+'\');">[x]</td></tr>';
			HTML += '<tr style="background-color:orange;"><td colspan="17">A: <span id="Atemp' + p + '"></span> Fuel: <span id="FUELtemp' + p + '"></span> Ore: <span id="OREtemp' + p + '"></span> Rare: <span id="RAREtemp' + p + '"></span> FY: <span id="FYtemp' + p + '"></span> TY: <span id="TYtemp' + p + '"></span></td></tr>';
			HTML += '<tr style="background-color:#F8C880;"><td colspan="14">Planet ' + p + ': <span id="NAMEnew' + p +'"></span> Besitzer: <span id="OWNERNAMEnew' + p + '"></span> GIP: <span id="GIPnew' + p + '"></span> PM: <span id="PMnew' + p + '"></span>%</td><td align="right">&rarr;</td><td colspan="2"><span id="FImaxFI' + p + '"></span>/<span id="FImaxTR' + p + '"></span></td></tr>';
			HTML += '<tr style="background-color:#F8C880;"><td colspan="14">A: <span id="Anew' + p + '"></span> PR: <span id="PRnew' + p + '"></span> HD: <span id="HDnew' + p + '"></span> Fuel: <span id="FUELnew' + p + '"></span> Ore: <span id="OREnew' + p + '"></span> Rare: <span id="RAREnew'+ p + '"></span></td><td align="right">&rarr;</td><td colspan="2"><span id="TRmaxFI' + p + '"></span>/<span id="TRmaxTR' + p + '"></span></td></tr>';
			HTML += '<tr style="background-color:#F8C880;"><td width="30">PDU:</td><td width="40"><span id="PDUnew' + p + '"></span></td><td width="30">FP:</td><td width="40"><span id="FPnew'+ p+'"></span></td><td width="30">OP:</td><td width="40"><span id="OPnew'+ p+'"></span></td><td width="30">RP:</td><td width="40"><span id="RPnew'+ p+'"></span></td><td width="30">FY:</td><td width="40"><span id="FYnew'+p+'"></span></td><td width="30">TY:</td><td width="40"><span id="TYnew'+p+'"></span></td><td width="30">FI:</td><td width="40"><span id="FInew'+p+'"></span></td><td width="30">TR:</td><td width="40"><span id="TRnew'+p+'"></span></td><td></td></tr><tr><td>&nbsp;</td></tr>';
			HTML += '</table>';
			HTML += '\r\n';
		}		
	}
	HTML += 'A: ' + data.player[i].A + '   PL: ' + data.player[i].PL + '   FP: ' + data.player[i].FP + '   OP: ' + data.player[i].OP + '   RP: ' + data.player[i].RP + '   FY: ' + data.player[i].FY + '   TY: ' + data.player[i].TY + '   PDU: ' + data.player[i].PDU + '\r\n' + 'SP: ' + data.player[i].SP + '   FI: ' + data.player[i].FI + '   FM: ' + data.player[i].FM + '   TR: ' + data.player[i].TR + '   TM: ' + data.player[i].TM + '   GIP: ' + data.player[i].GIP + '   PP: ' + data.player[i].PP + '\r\n\r\n';	
	if (data.player[i].RG) {
		HTML += 'Gefechtsberichte\r\n\r\n' + data.player[i].RG;
	}
	HTML += '<span onclick="show(\'simTable\');">Gefechtssimulation</span>        <span onclick="show(\'map\');show(\'mapBR\');">Karte</span>           <span onclick="show(\'dataT1\');show(\'dataT1BR\');">Planetenbest&uuml;ckung</span>\r\n';
	HTML += '<canvas id="map" width="600" height="400" style="display:none;"></canvas><span id="mapBR" style="display:none;">\r\n</span>';
	HTML += '<table id="dataT1" style="display: none;" cellspacing="0" onclick="show(\'dataT1\');show(\'dataT1BR\');"><tbody><tr style="background-color:orange;" align="center"><td>Planet</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr><tr style="background-color:#F8C880;" align="center"><td>A</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>110</td></tr><tr style="background-color:#F8C880;" align="center"><td>PR</td><td>0.683</td><td>0.666</td><td>0.833</td><td>0.65</td><td>0.616</td><td>0.7</td><td>0.816</td><td>0.716</td><td>0.5</td><td>1.083</td></tr><tr style="background-color:#F8C880;" align="center"><td>PDU</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>7</td><td>10</td></tr><tr style="background-color:#F8C880;" align="center"><td>FI</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr style="background-color:#F8C880;" align="center"><td>TR</td><td>4</td><td>3</td><td>10</td><td>3</td><td>1</td><td>5</td><td>10</td><td>5</td><td>9</td><td>6</td></tr><tr style="background-color:orange;" align="center"><td>Planet</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr><tr style="background-color:#F8C880;" align="center"><td>A</td><td>180</td><td>80</td><td>205</td><td>90</td><td>160</td><td>120</td><td>160</td><td>180</td><td>220</td><td>230</td></tr><tr style="background-color:#F8C880;" align="center"><td>PR</td><td>0.666</td><td>1.5</td><td>0.583</td><td>1.333</td><td>0.75</td><td>1</td><td>1</td><td>0.833</td><td>0.666</td><td>1</td></tr><tr style="background-color:#F8C880;" align="center"><td>PDU</td><td>6</td><td>11</td><td>12</td><td>8</td><td>6</td><td>9</td><td>4</td><td>5</td><td>6</td><td>6</td></tr><tr style="background-color:#F8C880;" align="center"><td>FI</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr style="background-color:#F8C880;" align="center"><td>TR</td><td>7</td><td>5</td><td>1</td><td>6</td><td>8</td><td>5</td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr style="background-color:orange;" align="center"><td>Planet</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td></tr><tr style="background-color:#F8C880;" align="center"><td>A</td><td>80</td><td>110</td><td>150</td><td>120</td><td>85</td><td>100</td><td>90</td><td>80</td><td>80</td><td>110</td></tr><tr style="background-color:#F8C880;" align="center"><td>PR</td><td>0.666</td><td>1</td><td>0.833</td><td>1.166</td><td>1.333</td><td>0.583</td><td>1.083</td><td>0.833</td><td>1</td><td>1.166</td></tr><tr style="background-color:#F8C880;" align="center"><td>PDU</td><td>2</td><td>3</td><td>4</td><td>3</td><td>3</td><td>3</td><td>3</td><td>2</td><td>2</td><td>3</td></tr><tr style="background-color:#F8C880;" align="center"><td>FI</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr style="background-color:#F8C880;" align="center"><td>TR</td><td>1</td><td>2</td><td>3</td><td>3</td><td>1</td><td>2</td><td>1</td><td>1</td><td>1</td><td>2</td></tr><tr style="background-color:orange;" align="center"><td>Planet</td><td>31</td><td>32</td><td>33</td><td>34</td><td>35</td><td>36</td><td>37</td><td>38</td><td>39</td><td>40</td></tr><tr style="background-color:#F8C880;" align="center"><td>A</td><td>100</td><td>160</td><td>90</td><td>220</td><td>180</td><td>140</td><td>20</td><td>20</td><td>20</td><td>20</td></tr><tr style="background-color:#F8C880;" align="center"><td>PR</td><td>0.916</td><td>1.083</td><td>1.25</td><td>1.25</td><td>0.75</td><td>1.166</td><td>0.5</td><td>0.5</td><td>0.5</td><td>0.5</td></tr><tr style="background-color:#F8C880;" align="center"><td>PDU</td><td>3</td><td>4</td><td>3</td><td>6</td><td>5</td><td>4</td><td>1</td><td>1</td><td>1</td><td>1</td></tr><tr style="background-color:#F8C880;" align="center"><td>FI</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>2</td><td>2</td><td>2</td><td>2</td></tr><tr style="background-color:#F8C880;" align="center"><td>TR</td><td>2</td><td>3</td><td>1</td><td>3</td><td>3</td><td>3</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr style="background-color:orange;" align="center"><td colspan="11">Alle Planeten in t=0: Fuel:30 Ore:30 Rare:30 FY:6 TY:3</td></tr></tbody></table><span id="dataT1BR" style="display:none;">\r\n</span>';
	// HTML += '<table id="dataT1" style="display:none;" cellspacing="0" onclick="show(\'dataT1\');">';
	// for (row=0;row<4;row++) {
		// HTML += '<tr style="background-color:orange;" align="center"><td>Planet</td>';
		// for (p=row*10+1;p<(row+1)*10+1;p++) {
		// HTML += '<td>' + p + '</td>';
		// }
		// HTML += '</tr>';
		// HTML += '<tr style="background-color:#F8C880;" align="center"><td>A</td>';
		// for (p=row*10+1;p<(row+1)*10+1;p++) {
		// HTML += '<td>' + data.planet[p].A + '</td>';
		// }
		// HTML += '</tr>';
		// HTML += '<tr style="background-color:#F8C880;" align="center"><td>PR</td>';
		// for (p=row*10+1;p<(row+1)*10+1;p++) {
		// HTML += '<td>' + data.planet[p].PR + '</td>';
		// }
		// HTML += '</tr>';
		// HTML += '<tr style="background-color:#F8C880;" align="center"><td>PDU</td>';
		// for (p=row*10+1;p<(row+1)*10+1;p++) {
		// HTML += '<td>' + data.planet[p].PDU + '</td>';
		// }
		// HTML += '</tr>';
		// HTML += '<tr style="background-color:#F8C880;" align="center"><td>FI</td>';
		// for (p=row*10+1;p<(row+1)*10+1;p++) {
		// HTML += '<td>';
			// if (p<37) { HTML += '6</td>'; } else {HTML += '2</td>';}
		// }
		// HTML += '</tr>';
		// HTML += '<tr style="background-color:#F8C880;" align="center"><td>TR</td>';
		// for (p=row*10+1;p<(row+1)*10+1;p++) {
		// HTML += '<td>3</td>';
		// }
		// HTML += '</tr>';
	// }
	// HTML += '<tr style="background-color:orange;" align="center"><td colspan="11">Alle Planeten in t=0: Fuel:30 Ore:30 Rare:30 FY:6 TY:3</td></tr></table><br>';
	HTML += '<table id="simTable" style="display:none;" cellspacing="0">';
	HTML += '<tr style="background-color:#F8C880;"><td>Planetenbesitzer<input type="hidden" value="1" id="simVert"><input type="hidden" value="1" id="simAngr"></td><td>FI:<input type="number" class="double" min="0" step="1" id="simFIO" onchange="sim();"> TR:<input type="number" class="double" min="0" step="1" id="simTRO" onchange="sim();"> FM%:<input type="number" class="simFMO" min="50" step="1" id="simFMO" onchange="sim();" value="100"> PDU:<input type="number" class="double" min="0" step="1" id="simPDU" onchange="sim();"> PM:<input type="number" class="triple" min="50" step="1" id="simPM" onchange="sim();" value="100">% <span onclick="addsimVrow();">[+]</span></td></tr>';
	HTML += '<tr style="background-color:#F8C880;"><td>Angreifer 1</td><td>FI:<input type="number" min="0" step="1" name="simFIA[]" class="simFIA" onchange="sim();"> TR:<input type="number" min="0" step="1" name="simTRA[]" class="simTRA" onchange="sim();"> FM%:<input type="number" name="simFMA[]" class="simFMA" min="50" step="1" onchange="sim();" value="100" max="150"> TM%:<input type="number" name="simTMA[]" class="simTMA" min="50" step="1" onchange="sim();" value="100" max="150"><span onclick="addsimArow();">[+]</span></td></tr>';
	HTML += '<tr style="background-color:#F8C880;"><td colspan="2">Gefechtsbericht PDU: <span id="simPDUber"></span> AS:<span id="simAS"></span> AF:<span id="simAF"></span> DS:<span id="simDS"></span> DF:<span id="simDF"></span> &Uuml;F:<span id="simUF"></span></td></tr>';
	HTML += '<tr style="background-color:#F8C880;"><td colspan="2">Besitzer verteidigt mit <span id="simFIOber"></span>FI <span id="simTROber"></span>TR (-<span id="simVFIO"></span>FI -<span id="simVTRO"></span>TR)<span id="simHPO"></span>.</td></tr>';
	HTML += '<tr style="background-color:#F8C880;"><td colspan="2">Angreifer 1 greift an mit <span name="simFIAber[]" class="simFIAber"></span>FI <span name ="simTRAber[]" class="simTRAber"></span>TR (-<span name="simVFIA[]" class="simVFIA"></span>FI -<span name="simVTRA[]" class="simVTRA"></span>TR<span name="simVPDU[]" class="simVPDU"></span>)<span name="simHPA[]" class="simHPA"></span>.</td></tr>';
	HTML += '<tr style="background-color:#F8C880;"><td colspan="2"><span id="simLV"></span></td></tr><tr style="background-color:#F8C880;"><td colspan="2"><span id="simRESULT"></span></td></tr><tr><td>&nbsp;</td></tr></table><br>';
	HTML += '<script>';
	HTML += 'function drawMap (c,planet) {';
	HTML += 'var ctx = c.getContext("2d");';
	HTML += 'var grd = ctx.createRadialGradient(300,200,0,300,200,400);';
	HTML += 'grd.addColorStop(0,"gray");';
	HTML += 'grd.addColorStop(1,"black");';
	HTML += 'ctx.fillStyle = grd;';
	HTML += 'ctx.fillRect(0,0,800,600);';
	HTML += 'for (p=1;p<41;p++) {';
	HTML += 'if (data.planet[p]) {';
	HTML += 'ctx.beginPath();';
	HTML += 'ctx.arc(data.X[p],data.Y[p],7,0,2*Math.PI);';
	HTML += 'ctx.fillStyle = "#FF0000";';
	HTML += 'ctx.fill();'
	HTML += '}';
	HTML += 'ctx.beginPath();';
	HTML += 'ctx.arc(data.X[p],data.Y[p],5,0,2*Math.PI);';
	HTML += 'if (planet == 0) {'
	HTML += 'ctx.fillStyle = "#AAAAAA";';
	HTML += '} else {';
	HTML += 'if (data.D[planet][p] == 0) {'
	HTML += 'ctx.fillStyle = "#A7E8E8";';
	HTML += '} else if (data.D[planet][p] == 1) {';
	HTML += 'ctx.fillStyle = "#00BBFF";';
	HTML += '} else if (data.D[planet][p] == 2) {';
	HTML += 'ctx.fillStyle = "#084D9C";';
	HTML += '} else if (data.D[planet][p] == 3) {';
	HTML += 'ctx.fillStyle = "#031659";';
	HTML += '}';
	HTML += '}';
	HTML += 'ctx.fill();'
	HTML += 'ctx.fillStyle = "#FFFFFF";';
	HTML += 'if (data.X[p]<300) {ctx.textAlign="end";} else {ctx.textAlign="start";}';
	HTML += 'if (data.Y[p] < 200) {';
	HTML += 'if (data.planet[p]) {';
	HTML += 'ctx.fillText(p + \' \' + data.planet[p].name,data.X[p],data.Y[p]-5);';
	HTML += '} else {'
	HTML += 'ctx.fillText(p,data.X[p],data.Y[p]-5);';
	HTML += '}';
	HTML += '} else if (data.Y[p] > 200) {';
	HTML += 'if (data.planet[p]) {';
	HTML += 'ctx.fillText(p + \' \' + data.planet[p].name,data.X[p],data.Y[p]+10);';
	HTML += '} else {'
	HTML += 'ctx.fillText(p,data.X[p],data.Y[p]+10);';	
	HTML += '}';
	HTML += '}';
	HTML += '}';
	HTML += '}';
	HTML += 'function drawDistance(c,evt) {';
	HTML += 'var rect = c.getBoundingClientRect();'
	HTML += 'var x = evt.clientX - rect.left;';
	HTML += 'var y = evt.clientY - rect.top;';
	HTML += 'var min = 1000;';
	HTML += 'var minp = 0;';
	HTML += 'var D = 1000;';
	HTML += 'for (p=1;p<41;p++) {';
	HTML += 'D = Math.sqrt(Math.pow(data.X[p]-x,2)+Math.pow(data.Y[p]-y,2));';
	HTML += 'if (D < min) {';
	HTML += 'min = D;';
	HTML += 'minp = p;';
	HTML += '}';
	HTML += '}';
	HTML += 'drawMap(c,minp);';
	HTML += 'var ctx = c.getContext(\'2d\');'
	HTML += 'for (r=1;r<4;r++) {'
	HTML += 'ctx.setLineDash([5, 15]);';
	HTML += 'ctx.beginPath();';
	HTML += 'ctx.arc(data.X[minp],data.Y[minp],r*68.5,0,2*Math.PI);';
	HTML += 'ctx.stroke();';
	HTML += '}';
	HTML += '}';
	HTML += 'var c = document.getElementById("map");';
	HTML += 'drawMap(c,0);';
	HTML += 'c.addEventListener(\'mousemove\',function(evt) {drawDistance(c,evt);},false);';
	HTML += '</script>';
	HTML += 'Flotten&uuml;bersicht\r\n';
	HTML += '  (I) = Flotte steht im Orbit\r\n  (D+x) = erreicht in x Runden den Orbit\r\n\r\n';
	
	for (p=1; p <41; p++) {
		var wroteplid = false;
		var sumfleet = 0;
		var fleet = [0,0,0,0,0];
		var sumcfleet = 0;
		var cfleet = [0,0,0,0,0];
		for (d=0;d<5;d++) {
			for (c=0;c<10;c++) {
				cfleet[d] += data.planet[p].C[c][d];
			}
			sumcfleet += cfleet[d];
			if (data.planet[p].O == i) {
				for (j=0;j<9;j++) {
					fleet[d] += data.planet[p].FI[j][d] + data.planet[p].TR[j][d];
					sumfleet += fleet[d];
				}
			} else {
				fleet[d] += data.planet[p].FI[i][d] + data.planet[p].TR[i][d];
				sumfleet += fleet[d];
			}
		}
		if (sumfleet || sumcfleet) {
			HTML += (p<10)? '   ':'  ';
			HTML += p.toString();
			if (fleet[0] || cfleet[0]) {
				HTML += ' (I)';
				if (fleet[0]) {
					for (j=0; j < 9; j++) {
						if (data.planet[p].O == i || j == i) {
							if (data.planet[p].FI[j][0] + data.planet[p].TR[j][0] && j == i) {
								HTML += '<span onclick="show(\'flugbef'+p+'\');">';
							}
							if (data.planet[p].FI[j][0]) {
								HTML += ' ' + data.planet[p].FI[j][0] + 'FI';
							}
							if (data.planet[p].TR[j][0]) {
								HTML += ' ' + data.planet[p].TR[j][0] + 'TR';
							}
							if (data.planet[p].FI[j][0] + data.planet[p].TR[j][0] && i != j && data.planet[p].O == i) {
								HTML += ' von ' + data.player[j].name;
							}
							if (data.planet[p].FI[j][0] + data.planet[p].TR[j][0] && j == i) {
								HTML += '</span><span id="flugbef'+p+'" style="display:none;"><br><table id="flugbeftable'+p+'" border="0" cellspacing="0"><tr style="background-color:orange;"><td width="80" style="background-color:white;"></td><td><input type="hidden" name="von[]" class="von" value="' + p + '"><input type="number" name="FlugFI[]" class="FlugFI" min="0" step="1">FI / <input type="number" name="FlugTR[]" class="FlugTR" min="0" step="1">TR --\> <select name="nach[]" class="nach"><option value="-">-</option>';
								for (q=1;q<41;q++) {
									HTML += '<option value="' + q + '">' + q + ' (D+'+data.D[p][q]+')</option>';
								}
								HTML += '</select></td><td onclick="addflugbefrow('+p+');">[+]</td></tr></table></span>';
							}
						}
					}
				}
				if (cfleet[0]) {
					for (c=0; c<10; c++) {
						if (data.planet[p].C[c][0]) {
							HTML += ' ' + data.planet[p].C[c][0] + 'C' + c;
						}
					}
				}
			}
			for (d=1;d<5;d++) {
				if (fleet[d] || cfleet[d]) {
					HTML += ' (D+' + (d-1).toString() + ')';
					if (fleet[d]) {
						for (j=0; j<9; j++) {
							if (data.planet[p].O == i || j == i) {
								if (data.planet[p].FI[j][d]) {
									HTML += ' ' + data.planet[p].FI[j][d] + 'FI';
								}
								if (data.planet[p].TR[j][d]) {
									HTML += ' ' + data.planet[p].TR[j][d] + 'TR';
								}
								if (data.planet[p].FI[j][d] + data.planet[p].TR[j][d] && i != j && data.planet[p].O == i) {
									HTML += ' von ' + data.player[j].name;
								}
							}
						}
					}
					if (cfleet[d]) {
						for (c=0;c<10;c++) {
							if (data.planet[p].C[c][d]) {
								HTML += ' ' + data.planet[p].C[c][d] + 'C' + c;
							}
						}
					}
				}
			}
			HTML += '\r\n';
		}
	}
    HTML += '\r\n';
	HTML += '<script>';
	HTML += 'function addsimArow() {';
	HTML += 'var table = document.getElementById(\'simTable\');';
	HTML += 'var simVert = document.getElementById(\'simVert\').value;';
	HTML += 'var simAngr = document.getElementById(\'simAngr\').value;';
	HTML += 'simAngr++;';
	HTML += 'document.getElementById(\'simAngr\').value++;';
	HTML += 'var row = table.insertRow(parseInt(simVert)+parseInt(simAngr)-1);';
	HTML += 'row.style.backgroundColor = \'#F8C880\';';
	HTML += 'row.insertCell(0).innerHTML = \'Angreifer \' + simAngr;';
	HTML += 'row.insertCell(1).innerHTML = \'FI:<input type="number" name="simFIA[]" class="simFIA" min="0" step="1" onchange="sim();"> TR:<input type="number" name="simTRA[]" class="simTRA" min="0" step="1"" onchange="sim();"> FM%:<input type="number" name="simFMA[]" class="simFMA" min="50" step="1" onchange="sim();" value="100" max="150"> TM%:<input type="number" name="simTMA[]" class="simTMA" min="50" step="1" onchange="sim();" value="100" max="150">\';';
	HTML += 'var row = table.insertRow(2*parseInt(simVert)+2*parseInt(simAngr));';
	HTML += 'row.style.backgroundColor = \'#F8C880\';';
	HTML += 'row.insertCell(0).innerHTML = \'Angreifer \' + simAngr +\' greift an mit <span name="simFIAber[]" class="simFIAber"></span>FI <span name="simTRAber[]" class="simTRAber"></span>TR (-<span name="simVFIA[]" class="simVFIA"></span>FI -<span name="simVTRA[]" class="simVTRA"></span>TR<span name="simVPDU[]" class="simVPDU"></span>)<span name="simHPA[]" class="simHPA"></span>.\';';
	HTML += 'row.cells[0].colSpan = 2;';
	HTML += '}'
	HTML += 'function addsimVrow() {';
	HTML += 'var table = document.getElementById(\'simTable\');';
	HTML += 'var simVert = document.getElementById(\'simVert\').value;';
	HTML += 'var simAngr = document.getElementById(\'simAngr\').value;';
	HTML += 'simVert++;';
	HTML += 'document.getElementById(\'simVert\').value++;';
	HTML += 'var row = table.insertRow(parseInt(simVert)-1);';
	HTML += 'row.style.backgroundColor = \'#F8C880\';';
	HTML += 'row.insertCell(0).innerHTML = \'Verteidiger \' + simVert;';
	HTML += 'row.insertCell(1).innerHTML = \'FI:<input type="number" name="simFIV[]" class="simFIV" min="0" step="1" onchange="sim();"> TR:<input type="number" name="simTRV[]" class="simTRV" min="0" step="1"" onchange="sim();"> FM%:<input type="number" name="simFMV[]" class="simFMV" min="50" step="1" onchange="sim();" value="100">\';';
	HTML += 'var row = table.insertRow(2*parseInt(simVert)+parseInt(simAngr));';
	HTML += 'row.insertCell(0).innerHTML = \'Verteidiger \' + simVert + \' verteidigt mit <span name="simFIVber[]" class="simFIVber"></span>FI <span name="simTRVber[]" class="simTRVber"></span>TR (-<span name="simVFIV[]" class="simVFIV"></span>FI -<span name="simVTRV[]" class="simVTRV"></span>TR)<span name="simHPV[]" class="simHPV"></span>.\';';
	HTML += 'row.cells[0].colSpan = 2;';
	HTML += 'row.style.backgroundColor = \'#F8C880\';';
	HTML += '}'
	HTML += 'function sim() {\r\n';
	HTML += 'var PDU = document.getElementById(\'simPDU\').value;\r\n';
	HTML += 'document.getElementById(\'simPDUber\').innerHTML=document.getElementById(\'simPDU\').value;\r\n';
	HTML += 'var PM = document.getElementById(\'simPM\').value;\r\n';
	HTML += 'var FIO = document.getElementById(\'simFIO\').value;\r\n';
	HTML += 'var TRO = document.getElementById(\'simTRO\').value;\r\n';
	HTML += 'var FMO = document.getElementById(\'simFMO\').value;\r\n';
	HTML += 'var FIV = document.getElementsByClassName(\'simFIV\');\r\n';
	HTML += 'var TRV = document.getElementsByClassName(\'simTRV\');\r\n';
	HTML += 'var FMV = document.getElementsByClassName(\'simFMV\');\r\n';
	HTML += 'var FIA = document.getElementsByClassName(\'simFIA\');\r\n';
	HTML += 'var TRA = document.getElementsByClassName(\'simTRA\');\r\n';
	HTML += 'var FMA = document.getElementsByClassName(\'simFMA\');\r\n';
	HTML += 'var TMA = document.getElementsByClassName(\'simTMA\');\r\n';
	HTML += 'if (PDU == "") { PDU=0; }\r\n';
	HTML += 'PDU = parseInt(PDU);';
	HTML += 'if (PM == "") { PM=100; }\r\n';
	HTML += 'PM = parseInt(PM);';
	HTML += 'if (FIO == "") { FIO=0; }\r\n';
	HTML += 'FIO = parseInt(FIO);';
	HTML += 'if (TRO == "") { TRO=0; }\r\n';
	HTML += 'TRO = parseInt(TRO);';
	HTML += 'if (FMO == "") { FMO=100; }\r\n';
	HTML += 'FMO = parseInt(FMO);';
	HTML += 'if (typeof FIV != \'undefined\') {\r\n';
	HTML += 'for (j=0;j<FIV.length;j++) {\r\n';
	HTML += 'if (FIV[j].value == "") { FIV[j].value=0; }\r\n';
	HTML += 'if (TRV[j].value == "") { TRV[j].value=0; }\r\n';
	HTML += 'if (FMV[j].value == "") { FMV[j].value=0; }\r\n';
	HTML += 'FIV[j].value = parseInt(FIV[j].value);\r\n';
	HTML += 'TRV[j].value = parseInt(TRV[j].value);\r\n';
	HTML += 'FMV[j].value = parseInt(FMV[j].value);\r\n';
	HTML += '}\r\n}\r\n';
	HTML += 'for (j=0;j<FIA.length;j++) {';
	HTML += 'if (FIA[j].value == "") { FIA[j].value=0; }\r\n';
	HTML += 'if (TRA[j].value == "") { TRA[j].value=0; }\r\n';
	HTML += 'if (FMA[j].value == "") { FMA[j].value=0; }\r\n';
	HTML += 'if (TMA[j].value == "") { TMA[j].value=0; }\r\n';
	HTML += 'FIA[j].value = parseInt(FIA[j].value);\r\n';
	HTML += 'TRA[j].value = parseInt(TRA[j].value);\r\n';
	HTML += 'FMA[j].value = parseInt(FMA[j].value);\r\n';
	HTML += 'TMA[j].value = parseInt(TMA[j].value);\r\n';
	HTML += '}';
	HTML += 'var DS = Math.round(100*Math.max(FIO-Math.ceil(TRO/5),0)*(Math.max(PM,100)/100)*FMO/100)/100;';
	HTML += 'var DF = Math.max(FIO-Math.ceil(TRO/5),0);';
	HTML += 'for (j=0;j<FIV.length;j++) {';
	HTML += 'DF += Math.max(parseInt(FIV[j].value)-Math.ceil(parseInt(TRV[j].value)/5),0);';
	HTML += 'DS += Math.max(parseInt(FIV[j].value)-Math.ceil(parseInt(TRV[j].value)/5),0)*parseInt(FMV[j].value)/100;';
	HTML += '}';
	HTML += 'var AF = 0;';
	HTML += 'var AS = 0;';
	HTML += 'for (j=0;j<FIA.length;j++) {';
	HTML += 'AF += Math.max(parseInt(FIA[j].value)-Math.ceil(TRA[j].value/5),0);'
	HTML += 'AS += Math.max(parseInt(FIA[j].value)-Math.ceil(TRA[j].value/5),0)*FMA[j].value/100;';
	HTML += '}';
	HTML += 'AS = Math.round(AS*100)/100;';
	HTML += 'var UF = 0;';
	HTML += 'if (AS>DS) {UF = Math.min(Math.round(100*AS/DS)/100,2.5);} else {UF = Math.min(Math.round(100*DS/AS)/100,2.5);}';
	HTML += 'var table = document.getElementById(\'simTable\');';
	HTML += 'var simVert = document.getElementById(\'simVert\');';
	HTML += 'var simAngr = document.getElementById(\'simAngr\');';
	HTML += 'var DSLV = PDU*PM/100;';
	HTML += 'document.getElementById(\'simDF\').innerHTML = DF;';
	HTML += 'document.getElementById(\'simDS\').innerHTML = DS;';
	HTML += 'document.getElementById(\'simAF\').innerHTML = AF;';
	HTML += 'document.getElementById(\'simAS\').innerHTML = AS;';
	HTML += 'document.getElementById(\'simUF\').innerHTML = UF;';
	HTML += 'document.getElementById(\'simFIOber\').innerHTML = FIO;';
	HTML += 'document.getElementById(\'simTROber\').innerHTML = TRO;';
	HTML += 'for (j=0;j<FIV.length;j++) {';
	HTML += 'document.getElementsByClassName(\'simFIVber\')[j].innerHTML = FIV[j].value;';
	HTML += 'document.getElementsByClassName(\'simTRVber\')[j].innerHTML = TRV[j].value;';
	HTML += '}';
	HTML += 'for (j=0;j<FIA.length;j++) {';
	HTML += 'document.getElementsByClassName(\'simFIAber\')[j].innerHTML = FIA[j].value;';
	HTML += 'document.getElementsByClassName(\'simTRAber\')[j].innerHTML = TRA[j].value;';
	HTML += '}';
	HTML += 'var simVFIVgesamt = Math.floor(0.5*AS/UF);';
	HTML += 'if (DF > 0) {';
	HTML += 'var simVFIO = Math.min(Math.max(Math.floor(Math.max(FIO-Math.ceil(TRO/5),0)*simVFIVgesamt/DF),0),FIO);';
	HTML += '} else { var simVFIO = 0;}';
	HTML += 'var simVFIV = 0;';
	HTML += 'for (j=0;j<FIV.length;j++) {';
	HTML += 'if (DF > 0) {';
	HTML += 'simVFIV = Math.min(Math.max(Math.floor(Math.max(parseInt(FIV[j].value)-Math.ceil(parseInt(TRV[j].value)/5),0)*simVFIVgesamt/DF),0),parseInt(FIV[j].value));';
	HTML += '} else {simVFIV = 0;}';
	HTML += 'document.getElementsByClassName(\'simVFIV\')[j].innerHTML = simVFIV;';
	HTML += '}';
	HTML += 'document.getElementById(\'simVFIO\').innerHTML = simVFIO;';
	HTML += 'var simVFIAgesamt = Math.floor(0.5*(DS + Math.max(FIO-Math.ceil(TRO/5),0)*(FMO/100)*(1-Math.max(PM,100)/100))/UF);';
	HTML += 'var simVFIA = 0;';
	HTML += 'for (j=0;j<FIA.length;j++) {';
	HTML += 'if (AF > 0) {';
	HTML += 'simVFIA = Math.min(Math.max(Math.floor(Math.max(parseInt(FIA[j].value)-Math.ceil(parseInt(TRA[j].value)/5),0)*simVFIAgesamt/AF),0),parseInt(FIA[j].value));';
	HTML += '} else { simVFIA = 0;}';
	HTML += 'document.getElementsByClassName(\'simVFIA\')[j].innerHTML = simVFIA;';
	HTML += '}';
	HTML += 'if (AS>DS) {';
	HTML += 'document.getElementById(\'simVTRO\').innerHTML = TRO;';
	HTML += 'if (FIO > simVFIO) {';
	HTML += 'document.getElementById(\'simHPO\').innerHTML = \'&nbsp;&nbsp;\';';
	HTML += 'document.getElementById(\'simHPO\').innerHTML += FIO - simVFIO + \'FI \';'
	HTML += 'if (FIO == simVFIO + 1) { document.getElementById(\'simHPO\').innerHTML += \'flieht zum HP\';} else { document.getElementById(\'simHPO\').innerHTML += \'fliehen zum HP\';}';
	HTML += '}';
	HTML += 'for (j=0;j<FIV.length;j++) {';
	HTML += 'if (FIV[j].value > parseInt(document.getElementsByClassName(\'simVFIV\')[j].innerHTML)) {';
	HTML += 'document.getElementsByClassName(\'simHPV\')[j].innerHTML = \'&nbsp;&nbsp;\';';
	HTML += 'document.getElementsByClassName(\'simHPV\')[j].innerHTML += FIV[j].value - parseInt(document.getElementsByClassName(\'simVFIV\')[j].innerHTML);';
	HTML += 'document.getElementsByClassName(\'simHPV\')[j].innerHTML += \'FI \';';
	HTML += 'if (FIV[j].value == parseInt(document.getElementsByClassName(\'simVFIV\')[j].innerHTML) + 1) { document.getElementsByClassName(\'simHPV\')[j].innerHTML += \'flieht zum HP\';} else { document.getElementsByClassName(\'simHPV\')[j].innerHTML += \'fliehen zum HP\';}';
	HTML += '}';
	HTML += 'document.getElementsByClassName(\'simVTRV\')[j].innerHTML = TRV[j].value;';
	HTML += '}';
	HTML += 'var simVTRAgesamt = Math.floor(DSLV);';
	HTML += 'var ATR = 0;';
	HTML += 'var ASLV = 0;';
	HTML += 'for (j=0;j<FIA.length;j++) {';
	HTML += 'ATR += parseInt(TRA[j].value);';
	HTML += 'ASLV += parseInt(TRA[j].value)*TMA[j].value/100;';
	HTML += '}';
	HTML += 'ASLV = Math.round(ASLV*UF*100)/100;';
	HTML += 'for (j=0;j<FIA.length;j++) {';
	HTML += 'if (ATR>0) {'
	HTML += 'var VTRA = Math.min(Math.floor(simVTRAgesamt*TRA[j].value/ATR),TRA[j].value);';
	HTML += '} else {VTRA=0;}';
	HTML += 'document.getElementsByClassName(\'simVTRA\')[j].innerHTML = VTRA;';
	HTML += 'document.getElementsByClassName(\'simVPDU\')[j].innerHTML = \' => -\'+ Math.min(Math.floor(parseInt(TRA[j].value)*parseInt(TMA[j].value)*UF/100),PDU) + \'PDU\';';
	HTML += 'document.getElementsByClassName(\'simHPA\')[j].innerHTML = \'\';';
	HTML += '}';
	HTML += 'document.getElementById(\'simLV\').innerHTML = \'Landeversuch: AS:\';';
	HTML += 'document.getElementById(\'simLV\').innerHTML += ASLV;';
	HTML += 'document.getElementById(\'simLV\').innerHTML += \' DS:\';';
	HTML += 'document.getElementById(\'simLV\').innerHTML += DSLV;';
	HTML += 'if (ASLV > DSLV) {';
	HTML += 'document.getElementById(\'simRESULT\').innerHTML = \'Der Planet f&auml;llt an den Angreifer mit den meisten TR bzw. mit der h&ouml;chsten TM%.\';';
	HTML += '} else {';
	HTML += 'document.getElementById(\'simRESULT\').innerHTML = \'Der Planet revoltiert bzw. revolutioniert.\';';
	HTML += '}';
	HTML += '} else {';
	HTML += 'document.getElementById(\'simRESULT\').innerHTML = \'\';';
	HTML += 'document.getElementById(\'simLV\').innerHTML = \'\';';
	HTML += 'document.getElementById(\'simVTRO\').innerHTML = 0;';
	HTML += 'document.getElementById(\'simHPO\').innerHTML = \'\';';
	HTML += 'for (j=0;j<FIV.length;j++) {';
	HTML += 'document.getElementsByClassName(\'simVTRV\')[j].innerHTML = 0;';
	HTML += '}';
	HTML += 'for (j=0;j<FIA.length;j++) {';
	HTML += 'if (FIA[j].value > parseInt(document.getElementsByClassName(\'simVFIA\')[j].innerHTML)) {';
	HTML += 'document.getElementsByClassName(\'simHPA\')[j].innerHTML = \'&nbsp;&nbsp;\';';
	HTML += 'document.getElementsByClassName(\'simHPA\')[j].innerHTML += FIA[j].value - parseInt(document.getElementsByClassName(\'simVFIA\')[j].innerHTML);';
	HTML += 'document.getElementsByClassName(\'simHPA\')[j].innerHTML += \'FI \';';
	HTML += 'if (FIA[j].value == parseInt(document.getElementsByClassName(\'simVFIA\')[j].innerHTML)+1) {document.getElementsByClassName(\'simHPA\')[j].innerHTML += \'flieht zum HP\';} else {document.getElementsByClassName(\'simHPA\')[j].innerHTML += \'fliehen zum HP\';}';
	HTML += '}';
	HTML += 'document.getElementsByClassName(\'simVTRA\')[j].innerHTML = TRA[j].value;';
	HTML += 'document.getElementsByClassName(\'simVPDU\')[j].innerHTML = \'\';';
	HTML += '}';
	HTML += '}';
	HTML += '}';	
	HTML += '</script>';
	for (j=1;j<9;j++) {
		if (data.PV[i][j]==2) {
			HTML += '** Geheimbotschaft von ' + data.player[j].name + ' **\r\n\r\n';
			HTML += '                   PV  0  1  2  3  4  5  6  7  8\r\n';
			HTML += '                       0  ' + data.PV[j][1] + '  ' + data.PV[j][2] + '  ' + data.PV[j][3] + '  ' + data.PV[j][4] + '  ' + data.PV[j][5] + '  ' + data.PV[j][6] + '  ' + data.PV[j][7] + '  ' + data.PV[j][8] + '\r\n\r\n';
			HTML += 'Flotten&uuml;bersicht (ab '+ (data.turn*2+10).toString() + 'FI)\r\n\r\n';
	
	for (p=1; p <41; p++) {
		var wroteplid = false;
		var sumfleet = 0;
		var fleet = new Array;
		var sumshowfleet = 0;
		var showfleet = new Array;
		for (d=0;d<5;d++) {
			showfleet[d] = data.planet[p].FI[j][d];
			fleet[d] = data.planet[p].FI[j][d] + data.planet[p].TR[j][d];
			sumfleet += showfleet[d];
		}
		if (sumfleet>=data.turn*2+10) {
			HTML += (p<10)? '   ':'  ';
			HTML += p.toString();
			if (fleet[0]) {
				HTML += ' (I)';
				if (data.planet[p].FI[j][0]) {
					HTML += ' ' + data.planet[p].FI[j][0] + 'FI';
				}
				if (data.planet[p].TR[j][0]) {
					HTML += ' ' + data.planet[p].TR[j][0] + 'TR';
				}
			}
			for (d=1;d<5;d++) {
				if (fleet[d]) {
					HTML += ' (D+' + (d-1).toString() + ')';
					if (data.planet[p].FI[j][d]) {
						HTML += ' ' + data.planet[p].FI[j][d] + 'FI';
					}
					if (data.planet[p].TR[j][d]) {
						HTML += ' ' + data.planet[p].TR[j][d] + 'TR';
					}
				}
			}
			HTML += '\r\n';
		}
	}	
			HTML += '\r\n';
		}
	}
	HTML += report[i];
	
	HTML += GM;
	
	for (j=1;j<9;j++) {
		if (data.player[i].GHB[j]) {
			HTML += data.player[i].GHB[j];
		}
	}
	
	HTML += '<div id="writeMessages" style="display:none; background-color:orange;">&ouml;ffentliche Nachricht erstellen:                              <br><textarea name="publicmessage" class="publicmessage" form="bef" rows="4" cols="80" style="background-color:orange;"></textarea><br>';
	HTML += '<input type="hidden" name="GHB[]" class="GHB">';
	for (j=1;j<9;j++) {
		if (j!=i) {
			HTML += '                                                              <br>Geheimbotschaft an Spieler ' + j + ' erstellen:                       <br><textarea name="GHB[]" class="GHB" form="bef" rows="4" cols="80" style="background-color:orange;"></textarea><br>';
		} else {
			HTML += '<input type="hidden" name="GHB[]" class="GHB">';
		}
	}
	HTML += '                                                           <span onclick="show(\'writeMessages\');">[x]</span><br></div>';
	HTML += '<br><label for="save" class="buttonLabel">Befehle speichern</label><input type="button" onClick="SaveOrders();" id="save" class="button">';
	HTML += ' <label for="loadorders" class="buttonLabel">Befehle laden</label><input type="file" onchange="ReadOrders();" id="loadorders" class="button">';
	HTML += '</form></pre></body></html>';
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(HTML));
	pom.setAttribute('download', filenameHTML);

	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	} else {
		pom.click();
    }
  }
  ptext.innerHTML += 'Spiel: ' + data.game + '  Turn: ' + data.turn + '  Z&uuml;ge gespeichert.\r'; 
}

function NMR(i) {
	ptext = document.getElementById('ptext');
	
	orders[i] = {
		player: i,
		game: data.game,
		turn: data.turn,
		name: data.player[i].name,
		HP: data.player[i].HP,
		PV: [
			data.PV[i][0],
			data.PV[i][1],
			data.PV[i][2],
			data.PV[i][3],
			data.PV[i][4],
			data.PV[i][5],
			data.PV[i][6],
			data.PV[i][7],
			data.PV[i][8]
			],
		PL : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		FI : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		TR : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		FY : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		TY : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		FP : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		OP : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		RP : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		PDU : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		planetname : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		von : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		FlugFI : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		FlugTR : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		nach : [
			null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null
			],
		vonc: [
			null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
			],
		C: [
			null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
			],
		QC: [
			null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
			],
		nachc: [
			null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
			],
		Spion: [
			null, null, null
			],
		PRplus: [
			null, null
			],
		PRplusPL: [
			null, null
			],
		FMplus: null,
		TMplus: null
	};
	var q=0;
	var pnach;
	if (i==0) {
		for (p=1;p<41;p++) {
			if (data.planet[p].O == 0) {
				pnach = Math.floor(Math.random()*40)+1;
				if (pnach != p) {
					orders[0].von[p] = p;
					orders[0].FlugFI[p] = data.planet[p].FI[0][0];
					orders[0].FlugTR[p] = data.planet[p].TR[0][0];
					orders[0].nach[p] = pnach;
				}
			}
		}
	}
	
	for (p=1;p<41;p++) {
		if (data.planet[p].O == i) {
			var Atemp=0;
			var FUELtemp=0;
			var OREtemp=0;
			var RAREtemp=0;
			var Fftemp=0;
			var Oftemp=0;
			var RFtemp=0;
			orders[i].PL[q]=p;
			Atemp = data.planet[p].A;
			FUELtemp = data.planet[p].FUEL;
			OREtemp = data.planet[p].ORE;
			RAREtemp = data.planet[p].RARE;
			if(data.planet[p].HD > data.planet[p].PDU) {
				orders[i].PDU[q] = Math.floor(Math.min(data.planet[p].HD-data.planet[p].PDU,Atemp/15));
			}
			if(data.planet[p].O>0) {
				Atemp -= orders[i].PDU[q]*15;
			}
			orders[i].FI[q] = Math.floor(Math.min(Atemp/10,data.planet[p].FY,FUELtemp,OREtemp,RAREtemp/3));
			Atemp -= orders[i].FI[q]*10;
			FUELtemp -= orders[i].FI[q];
			OREtemp -= orders[i].FI[q];
			RAREtemp -= 3*orders[i].FI[q];
			orders[i].TR[q] = Math.floor(Math.min(Atemp/20,data.planet[p].TY,FUELtemp/2,OREtemp/3,RAREtemp));
			Atemp -= orders[i].TR[q]*20;
			FUELtemp -= 2*orders[i].TR[q];
			OREtemp -= 3*orders[i].TR[q];
			RAREtemp -= orders[i].TR[q];
			while (Atemp > 3) {
				Fftemp = Math.floor((data.planet[p].FP + orders[i].FP[q])*data.planet[p].PR)+FUELtemp;
				Oftemp = Math.floor((data.planet[p].OP + orders[i].OP[q])*data.planet[p].PR)+OREtemp;
				Rftemp = Math.floor((data.planet[p].RP + orders[i].RP[q])*data.planet[p].PR)+RAREtemp;
				if (Atemp >= 15 && Fftemp > data.planet[p].FY+orders[i].FY[q] && Oftemp > data.planet[p].FY+orders[i].FY[q] && Rftemp >= 3*(data.planet[p].FY+orders[i].FY[q]+1)) {
					orders[i].FY[q] += 1;
					Atemp -= 15;
				} else {
					if (Rftemp/3 <= Math.min(Oftemp,Fftemp) && Atemp >= 10) {
						orders[i].RP[q] += 1;
						Atemp -= 10;
					} else if (Fftemp < Oftemp && Atemp >= 5) {
						orders[i].FP[q] += 1;
						Atemp -= 5;
					} else {
						orders[i].OP[q] += 1;
						Atemp -= 4;
					}
				}
			}
			q++;
		}
	}
	// sdata=JSON.stringify(orders[i]);
	// var filename = 'Befg' + data.game + 't' + data.turn + 'p' + i.toString() + '.AoE';
	
	// var pom = document.createElement('a');
	// pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(sdata));
	// pom.setAttribute('download', filename);

	// if (document.createEvent) {
		// var event = document.createEvent('MouseEvents');
		// event.initEvent('click', true, true);
		// pom.dispatchEvent(event);
	// } else {
		// pom.click();
    // } 
}

function ReadOrders() {
  var input = document.getElementById('loadorders');
  var roders;
  
  ptext = document.getElementById('ptext');
	
  var fr = new FileReader();
  fr.onload = function() {
	rorders = JSON.parse(fr.result);
	orders[rorders.player] = rorders;
	ptext.innerHTML += 'Befehle von Spiel: ' + rorders.game + '  Turn: ' + rorders.turn + '  Spieler: ' + rorders.player +'  geladen.\r';
  };
  fr.readAsText(input.files[0]);
}

function Auswerten () {
    ptext = document.getElementById('ptext');

	var thirteenplanets = [null,false,false,false,false,false,false,false,false];
	for (i=1;i<9;i++) {
		if (data.player[i].PL == 13) {thirteenplanets[i]=true;}
	}
	
	var nmr = false;
	for (i=1;i<9;i++) {
		if (!orders[i]) {nmr=true;}
	}
	if (nmr) {
		ptext.innerHTML += 'NMR f&uuml;r Spieler ';
	}
	for (i=1;i<9;i++) {
		if (!orders[i]) {
			NMR(i);
			ptext.innerHTML += i + ' ';
		}
	}
	ptext.innerHTML += 'in Spiel: ' + data.game + '  Turn: ' + data.turn + '.\r';
	nmr = false;
	
	NMR(0);
	
	//7.0
	//Endturn
	if(data.turn==0) {
		count = 0;
		endturn = 0;
		for (i=1;i<9;i++) {
			if (orders[i].end) {
				count++;
				endturn += parseInt(orders[i].end);
			}
		}
		if (count) {
			data.end = Math.round(endturn/count);
		}
	}
	
	data.turn +=1;
		
	//7.1
	//Änderung Spielername, Änderung Planetenname, HP, Anpassung PP, PV
	{
	var incr = 0;
	for (i=1;i<9;i++) {
		if (orders[i].name) {data.player[i].name = orders[i].name};
		if (orders[i].HP) {data.player[i].HP = orders[i].HP};
		for (j=1;j<9;j++) {
			if (orders[i].PV[j]==null || Math.abs(orders[i].PV[j]-data.PV[i][j])>1 || i==j) {
				orders[i].PV[j] = data.PV[i][j];
			}
		}
	}
	for (i=1;i<9;i++) {
		if (orders[i].newplanetnamePL) {
			for (q=0;q<orders[i].newplanetnamePL.length;q++) {
				if (orders[i].newplanetname[q]) {
					if (data.planet[orders[i].newplanetnamePL[q]].O == i) {
						data.planet[orders[i].newplanetnamePL[q]].name = orders[i].newplanetname[q];
					}
				}
			}
		}
	}
	for (i=1; i<9; i++) {
		for (q=0;q<3;q++) {
			if (orders[i].Spion[q] && data.player[i].PP >6) {
				data.player[i].PP -= 7;
				var p = orders[i].Spion[q];
				report[i] += 'Spionagebericht fuer Planet ' + p + ' in Turn ' + (data.turn-1).toString() + ':\r\n';
				report[i] += '  Planet ' + p + ': ' + data.planet[p].name + '   Besitzer: ' + data.player[data.planet[p].O].name + '   GIP: ' + data.planet[p].GIP + '   PM: ' + data.planet[p].PM + ' \%\r\n';
				report[i] += '  A: ' + data.planet[p].A + '   PR: ' + data.planet[p].PR + '   HD: ' + Math.ceil(data.planet[p].A/40) + '   Fuel: ' + data.planet[p].FUEL + '   Ore: ' + data.planet[p].ORE + '   Rare: ' + data.planet[p].RARE + '\r\n';
				report[i] += '  PDU: ' + data.planet[p].PDU + '   FP: ' + data.planet[p].FP + '   OP: ' + data.planet[p].OP + '   RP: ' + data.planet[p].RP + '   FY: ' + data.planet[p].FY + '   TY: ' + data.planet[p].TY + '    FI: ' + data.planet[p].FI[i][0] + '    TR: ' + data.planet[p].TR[i][0] + '\r\n\r\n';
			}
		}
		for (q=0;q<2;q++) {
			if (orders[i].PRplus[q] && orders[i].PRplusPL) {
				orders[i].PRplus[q] = Math.min(orders[i].PRplus[q],data.player[i].PP);
				data.player[i].PP -= orders[i].PRplus[q];
				for (c=0;c<orders[i].PRplus[q];c++) {
					incr += Math.floor(Math.random()*2);
				}
				data.planet[orders[i].PRplusPL[q]].PR = Math.round((data.planet[orders[i].PRplusPL[q]].PR*60 + incr)*100/6)/1000;
				incr = 0;
			}
		}
		if (orders[i].FMplus) {
			orders[i].FMplus = Math.min(orders[i].FMplus,data.player[i].PP);
			data.player[i].PP -= orders[i].FMplus;
			for (c=0;c<orders[i].FMplus;c++) {
				incr += Math.floor(Math.random()*2);
			}
			data.player[i].FM += incr;
			incr = 0;
		}
		if (orders[i].TMplus) {
			orders[i].TMplus = Math.min(orders[i].TMplus,data.player[i].PP);
			data.player[i].PP -= orders[i].TMplus;
			for (c=0;c<orders[i].TMplus;c++) {
				incr += Math.floor(Math.random()*2);
			}
			data.player[i].TM += incr;
			incr = 0;
		}
	}
	for (i=1;i<9;i++) {
		for (j=1;j<9;j++) {
			data.PV[i][j] = Math.min(orders[i].PV[j],orders[j].PV[i]);
		}
	}
	var PDUdestr;
	for (i=1;i<9;i++) {
		for (j=1;j<9;j++) {
			data.player[i].PP += data.PV[i][j]-1;
		}
		if (data.player[i].PP < 0) {
			for (p=1; p<41; p++) {
				if (data.planet[p].O == i) {
					PDUdestr = Math.min(Math.floor(Math.random()*(data.planet[p].HD+1)),data.planet[p].PDU);
					data.planet[p].PDU -= PDUdestr;
					data.planet[p].PM -= PDUdestr+10;
					if (data.planet[p].PDU) {
						GM += 'Revolte auf ' + data.planet[p].name + '.\r\n';
					} else {
						data.planet[p].O = 0;
						data.planet[p].PM = 40;
						data.planet[p].PDU = data.planet[p].HD;
						GM += 'Revolution auf ' + data.planet[p].name + ', Planet faellt an ' + data.player[0].name + '.\r\n';
					}
				}
			}
		}
	}
	}
	
	
	//7.2
	//Frachtschiffe beladen
	{
	var vonc;
	var nachc;
	for (i=1;i<9;i++) {
		for (q=0;q<orders[i].vonc.length;q++) {
			if (orders[i].vonc[q] != null && orders[i].C[q] != null && orders[i].QC[q] != null && orders[i].nachc[q] != null) {
				vonc = orders[i].vonc[q];
				nachc = orders[i].nachc[q];
				if (data.planet[vonc].O == i && data.planet[vonc].FI[i][0] && data.planet[vonc].TR[i][0]) {
					orders[i].QC[q] = Math.min(orders[i].QC[q], data.planet[vonc].TR[i][0]);
					switch (orders[i].C[q]) {
						case 0:
							orders[i].QC[q] = Math.min(orders[i].QC[q],Math.floor(data.planet[vonc].A/8));
							data.planet[vonc].A -= orders[i].QC[q]*8;
							data.planet[vonc].HD = Math.ceil(data.planet[vonc].A/40);
							break;
						case 1:
							orders[i].QC[q] = Math.min(orders[i].QC[q],data.planet[vonc].PDU);
							data.planet[vonc].PDU -= orders[i].QC[q];
							break;
						case 2:
							orders[i].QC[q] = Math.min(orders[i].QC[q],Math.floor(data.planet[vonc].FP/4));
							data.planet[vonc].FP -= orders[i].QC[q]*4;
							break;
						case 3:
							orders[i].QC[q] = Math.min(orders[i].QC[q],Math.floor(data.planet[vonc].OP/5));
							data.planet[vonc].OP -= orders[i].QC[q]*5;
							break;
						case 4:
							orders[i].QC[q] = Math.min(orders[i].QC[q],Math.floor(data.planet[vonc].RP/2));
							data.planet[vonc].RP -= orders[i].QC[q]*2;
							break;
						case 5:
							orders[i].QC[q] = Math.min(orders[i].QC[q],Math.floor(data.planet[vonc].FUEL/40));
							data.planet[vonc].FUEL -= orders[i].QC[q]*40;
							break;
						case 6:
							orders[i].QC[q] = Math.min(orders[i].QC[q],Math.floor(data.planet[vonc].ORE/50));
							data.planet[vonc].ORE -= orders[i].QC[q]*50;
							break;
						case 7:
							orders[i].QC[q] = Math.min(orders[i].QC[q],Math.floor(data.planet[vonc].RARE/20));
							data.planet[vonc].RARE -= orders[i].QC[q]*20;
							break;
						case 8:
							orders[i].QC[q] = Math.min(orders[i].QC[q],data.planet[vonc].FY);
							data.planet[vonc].FY -= orders[i].QC[q];
							break;
						case 9:
							orders[i].QC[q] = Math.min(orders[i].QC[q],data.planet[vonc].TY);
							data.planet[vonc].TY -= orders[i].QC[q];
							break;
					}
					data.planet[nachc].C[orders[i].C[q]][data.D[vonc][nachc]+1] += orders[i].QC[q]
					data.planet[vonc].TR[i][0] -= orders[i].QC[q];
				}
			}
		}
	}
	for (p=1;p<41;p++) {
		data.planet[p].FUEL = Math.min(data.planet[p].FUEL,data.planet[p].FP*10);
		data.planet[p].ORE = Math.min(data.planet[p].ORE,data.planet[p].OP*10);
		data.planet[p].RARE = Math.min(data.planet[p].RARE,data.planet[p].RP*10);
	}
	}
	
	//7.3
	//Flotten
	{
	var pvon;
	var pnach;
	var D;
	for (i=0; i<9; i++) {
		for (q=0; q<orders[i].von.length; q++) {
			if (orders[i].von[q] && orders[i].nach[q]) {
				pvon = orders[i].von[q];
				pnach = orders[i].nach[q];
				if (data.PV[i][data.planet[pvon].O]==2 || data.planet[pvon].O == i) {
					D = data.D[pvon][pnach]+1;
				} else {
					pnach = data.player[i].HP;
					D = Math.min(data.D[pvon][pnach]+2,4);
				}
				data.planet[pnach].FI[i][D] += Math.min(data.planet[pvon].FI[i][0],orders[i].FlugFI[q]);
				data.planet[pvon].FI[i][0] -= Math.min(data.planet[pvon].FI[i][0],orders[i].FlugFI[q]);
				data.planet[pnach].TR[i][D] += Math.min(data.planet[pvon].TR[i][0],orders[i].FlugTR[q]);
				data.planet[pvon].TR[i][0] -= Math.min(data.planet[pvon].TR[i][0],orders[i].FlugTR[q]);
			}
		}
	}
	for (p=1;p<41;p++) {
		for (q=0;q<4;q++) {
			for (i=0;i<9;i++) {
				data.planet[p].FI[i][q] += data.planet[p].FI[i][q+1];
				data.planet[p].FI[i][q+1] = 0;
				data.planet[p].TR[i][q] += data.planet[p].TR[i][q+1];
				data.planet[p].TR[i][q+1] = 0;
			}
			for (c=0; c<10; c++) {
				data.planet[p].C[c][q] += data.planet[p].C[c][q+1];
				data.planet[p].C[c][q+1] = 0;					
			}
		}
	}
	}
	
	//7.4
	//Baubefehle
	{
	var Atemp;
	var ordersp;
	var qmax;
	for (i=0;i<9;i++) {
		for (p=1;p<41;p++) {
			if (data.planet[p].O == i) {
				ordersp=0;
				// if (i==0) {
					// qmax = 39;
				// } else {
					// qmax = 13;
				// }
				for (q=0; q<orders[i].PL.length; q++) {
					if (orders[i].PL[q] && orders[i].PL[q]==p && ordersp==0) {
						ordersp++;
						Atemp = data.planet[p].A;
						if (15*orders[i].PDU[q] > Atemp) {
							orders[i].PDU[q] = Math.floor(Atemp/15);
						}
						if (data.planet[p].O>0) {
							Atemp -= orders[i].PDU[q]*15;
						}
						data.planet[p].PDU += orders[i].PDU[q];
						if (5*orders[i].FP[q] > Atemp) {
							orders[i].FP[q] = Math.floor(Atemp/5);
						}
						Atemp -= orders[i].FP[q]*5;
						data.planet[p].FP += orders[i].FP[q];
						if (4*orders[i].OP[q] > Atemp) {
							orders[i].OP[q] = Math.floor(Atemp/4);
						}
						Atemp -= orders[i].OP[q]*4;
						data.planet[p].OP += orders[i].OP[q];
						if (10*orders[i].RP[q] > Atemp) {
							orders[i].RP[q] = Math.floor(Atemp/10);
						}
						Atemp -= orders[i].RP[q]*10;
						data.planet[p].RP += orders[i].RP[q];
						if (15*orders[i].FY[q] > Atemp) {
							orders[i].FY[q] = Math.floor(Atemp/15);
						}
						Atemp -= orders[i].FY[q]*15;
						data.planet[p].FY += orders[i].FY[q];
						if (20*orders[i].TY[q] > Atemp) {
							orders[i].TY[q] = Math.floor(Atemp/20);
						}
						Atemp -= orders[i].TY[q]*20;
						data.planet[p].TY += orders[i].TY[q];
						if (10*orders[i].FI[q] > Atemp || orders[i].FI[q] > data.planet[p].FY || orders[i].FI[q] > data.planet[p].FUEL || orders[i].FI[q] > data.planet[p].ORE || 3*orders[i].FI[q] > data.planet[p].RARE) {
							orders[i].FI[q] = Math.floor(Math.min(Atemp/10,data.planet[p].FY,data.planet[p].FUEL,data.planet[p].ORE,data.planet[p].RARE/3));
						}
						Atemp -= orders[i].FI[q]*10;
						data.planet[p].FUEL -= orders[i].FI[q];
						data.planet[p].ORE -= orders[i].FI[q];
						data.planet[p].RARE -= 3*orders[i].FI[q];
						data.planet[p].FI[i][0] += orders[i].FI[q];
						if (20*orders[i].TR[q] > Atemp || orders[i].TR[q] > data.planet[p].TY || 2*orders[i].TR[q] > data.planet[p].FUEL || 3*orders[i].TR[q] > data.planet[p].ORE || orders[i].TR[q] > data.planet[p].RARE) {
							orders[i].TR[q] = Math.floor(Math.min(Atemp/20,data.planet[p].TY,data.planet[p].FUEL/2,data.planet[p].ORE/3,data.planet[p].RARE));
						}
						Atemp -= orders[i].TR[q]*20;
						data.planet[p].FUEL -= 2*orders[i].TR[q];
						data.planet[p].ORE -= 3*orders[i].TR[q];
						data.planet[p].RARE -= orders[i].TR[q];
						data.planet[p].TR[i][0] += orders[i].TR[q];
					}
				}
			}
		}
	}
	}
	
	//7.5
	//Revolten
	{
	for (p=1;p<41;p++) {
		if (data.planet[p].HD > data.planet[p].PDU) {
			PDUdestr = Math.min(Math.floor(Math.random()*(data.planet[p].HD+1)),data.planet[p].PDU);
			data.planet[p].PDU -= PDUdestr;
			data.planet[p].PM -= PDUdestr+10;
			if (data.planet[p].PDU) {
				GM += 'Revolte auf ' + data.planet[p].name + '.\r\n';
			} else {
				data.planet[p].O = 0;
				data.planet[p].PM = 40;
				data.planet[p].PDU = data.planet[p].HD;
				GM += 'Revolution auf ' + data.planet[p].name + ', Planet faellt an ' + data.player[0].name + '.\r\n';
			}
		}
	}
	}
	
	//7.6
	//Produktion, PM% 
	{
	for (p=1;p<41;p++) {
		data.planet[p].FUEL += Math.floor(data.planet[p].FP*data.planet[p].PR);
		data.planet[p].FUEL = Math.min(10*data.planet[p].FP,data.planet[p].FUEL);
		data.planet[p].ORE += Math.floor(data.planet[p].OP*data.planet[p].PR);
		data.planet[p].ORE = Math.min(10*data.planet[p].OP,data.planet[p].ORE);
		data.planet[p].RARE += Math.floor(data.planet[p].RP*data.planet[p].PR);
		data.planet[p].RARE = Math.min(10*data.planet[p].RP,data.planet[p].RARE);
		data.planet[p].PM += 10;
		data.planet[p].PM = Math.min(data.planet[p].PM,250);
	}
	}
	
	//7.7
	{	//Raumgefechte & Landeversuche
	var gefecht = 0;
	var sgefecht = 0;
	var O;
	var AS;
	var DS;
	var AF;
	var DF;
	var AD;
	var DeltaMoral = {
		FI : [0,0,0,0,0,0,0,0,0],
		TR : [0,0,0,0,0,0,0,0,0]
	};
	for (p=1;p<41;p++) {
		data.planet[p].RG = null;
	}
	for (i=0;i<9;i++) {
		data.player[i].RG = null;
	}
	for (p=1;p<41;p++) {
		var showreport = [0,0,0,0,0,0,0,0,0];
		O = data.planet[p].O;
		for (i=0;i<9;i++) {
			if (O != i && data.planet[p].FI[i][0] + data.planet[p].TR[i][0]) {
				sgefecht++;
				if (data.PV[O][i]==0) {
					gefecht++;
				}
			}
		}
		if (sgefecht) {
			for (i=0; i< 9; i++) {
				if (data.planet[p].FI[i][0]) {
					showreport[i] = 1;
				}
			}
		}
		if (sgefecht && !gefecht) {
			DF = Math.max(data.planet[p].FI[O][0]-Math.ceil(data.planet[p].TR[O][0]/5),0);
			DS = DF*(data.player[O].FM/100)*Math.max(data.planet[p].PM,100)/100;
			for (j=1;j<9;j++) {
				if (data.PV[O][j]==2) {
					DF += Math.max(data.planet[p].FI[j][0]-Math.ceil(data.planet[p].TR[j][0]/5),0);
					DS += Math.max(data.planet[p].FI[j][0]-Math.ceil(data.planet[p].TR[j][0]/5),0)*(data.player[j].FM/100);
				}
			}
			data.planet[p].RG = '  ' + p + ' ' + data.planet[p].name + ' ('+ data.player[O].name + ') PDU:' + data.planet[p].PDU + ' AS:0 AF:0 DS:' + Math.floor(DS*100)/100 + ' DF:' + DF +'\r\n';
			for (i=0;i<9;i++) {
				if (data.planet[p].FI[i][0]+data.planet[p].TR[i][0]) {
					data.planet[p].RG += '  ' + data.player[i].name;
					if (data.PV[O][i] == 2 || O == i) {
						data.planet[p].RG += ' verteidigt mit';
					} else if (data.PV[O][i] == 1) {
						data.planet[p].RG += ' ist neutral mit';
					}
					if (data.planet[p].FI[i][0]) {
						data.planet[p].RG += ' ' + data.planet[p].FI[i][0] + 'FI';
					}
					if (data.planet[p].TR[i][0]) {
						data.planet[p].RG += ' ' + data.planet[p].TR[i][0] + 'TR';
					}
					data.planet[p].RG += '.\r\n';
				}
			}
			data.planet[p].RG += '\r\n';
			for (i=0;i<9;i++) {
				if (showreport[i]) {
					if (data.player[i].RG == null) {
						data.player[i].RG = data.planet[p].RG;
					} else {
						data.player[i].RG += data.planet[p].RG;
					}
				}
			}
		} else if (gefecht) {
			DF = Math.max(data.planet[p].FI[O][0]-Math.ceil(data.planet[p].TR[O][0]/5),0);
			DS = DF*(data.player[O].FM/100)*Math.max(data.planet[p].PM,100)/100;
			AF = 0;
			AS = 0;
			for (j=0;j<9;j++) {
				if (data.PV[O][j] == 2) {
					DF += Math.max(data.planet[p].FI[j][0]-Math.ceil(data.planet[p].TR[j][0]/5),0);
					DS += Math.max(data.planet[p].FI[j][0]-Math.ceil(data.planet[p].TR[j][0]/5),0)*data.player[j].FM/100;
				} else if (data.PV[O][j] == 0) {
					AF += Math.max(data.planet[p].FI[j][0]-Math.ceil(data.planet[p].TR[j][0]/5),0);
					AS += Math.max(data.planet[p].FI[j][0]-Math.ceil(data.planet[p].TR[j][0]/5),0)*data.player[j].FM/100;
				}
			}
			V = {
				FI : [0,0,0,0,0,0,0,0,0],
				TR : [0,0,0,0,0,0,0,0,0],
				PDU : 0
				};
			
			AD = Math.min(Math.round(100*Math.max(DS/AS,AS/DS))/100,2.5);
			AFgesamt = 0;
			DFgesamt = 0;
			for (j=0;j<9;j++) {
				if (data.PV[O][j] == 0) {
					AFgesamt += data.planet[p].FI[j][0];
				} else if (data.PV[O][j] == 2 || j == O) {
					DFgesamt += data.planet[p].FI[j][0];
				}
			}
			VAgesamt = Math.min(0.5*((DS + Math.max(data.planet[p].FI[O][0]-Math.ceil(data.planet[p].TR[O][0]/5),0)*(data.player[O].FM/100)*(1-Math.max(data.planet[p].PM,100)/100))/AD),AFgesamt);
			VDgesamt = Math.min(0.5*AS/AD,DFgesamt);
			for (j=0;j<9;j++) {
				if (data.PV[O][j] == 0 && data.planet[p].FI[j][0]) {
					//Verluste FI
					V.FI[j] = Math.floor(VAgesamt*data.planet[p].FI[j][0]/AFgesamt);
					DeltaMoral.FI[j] += Math.floor(VDgesamt*data.planet[p].FI[j][0]/AFgesamt);
					//Verluste TR
					if (AS <= DS) {
						V.TR[j] = data.planet[p].TR[j][0];
					} else {
						if (V.FI[j] > data.planet[p].FI[j][0] - Math.ceil(data.planet[p].TR[j][0]/5)) {
							V.TR[j] = Math.min((V.FI[j] - data.planet[p].FI[j][0] + Math.ceil(data.planet[p].TR[j][0]/5))*5,data.planet[p].TR[j][0]);
						}
					}
				}
				if (data.PV[O][j] == 2 || j == O) {
					//Verluste FI
					V.FI[j] = Math.floor(VDgesamt*data.planet[p].FI[j][0]/DFgesamt);
					DeltaMoral.FI[j] += Math.floor(VAgesamt*data.planet[p].FI[j][0]/DFgesamt);
					//Verluste TR
					if (AS > DS) {
						V.TR[j] = data.planet[p].TR[j][0];
					}
				}
			}
			if (AS > DS) {
				ASLV = 0;
				AT = 0;
				DSLV = data.planet[p].PDU * data.planet[p].PM/100;
				for (j=0;j<9;j++) {
					if (data.PV[O][j] == 0 && data.planet[p].TR[j][0]) {
						AT += Math.min((data.planet[p].FI[j][0]-V.FI[j])*5,data.planet[p].TR[j][0]);
						ASLV += Math.min((data.planet[p].FI[j][0]-V.FI[j])*5,data.planet[p].TR[j][0]) * (data.player[j].TM/100) * AD;
					}
				}
				V.PDU = Math.min(Math.floor(ASLV),data.planet[p].PDU);
				for (j=0;j<9;j++) {
					if (data.PV[O][j] == 0 && data.planet[p].TR[j][0]) {
						V.TR[j] = Math.min(Math.floor(data.planet[p].PDU * (data.planet[p].PM/100) * Math.min((data.planet[p].FI[j][0]-V.FI[j])*5,data.planet[p].TR[j][0]) / AT),data.planet[p].TR[j][0]);
					}
				}
			}
				
			data.planet[p].RG = '  ' + p + ' ' + data.planet[p].name + ' (' + data.player[O].name + ') PDU:' + data.planet[p].PDU + ' AS:' + Math.floor(AS*100)/100 + ' AF:' + AF + ' DS:' + Math.floor(DS*100)/100 + ' DF:' + DF + ' &Uuml;F:' + AD + '\r\n';
			for (i=0;i<9;i++) {
				if (data.planet[p].FI[i][0]+data.planet[p].TR[i][0]) {
					data.planet[p].RG += '  ' + data.player[i].name;
					if (data.PV[O][i] == 2 || O == i) {
						data.planet[p].RG += ' verteidigt mit';
					} else if (data.PV[O][i] == 1) {
						data.planet[p].RG += ' ist neutral mit';
					} else if (data.PV[O][i] == 0) {
						data.planet[p].RG += ' greift an mit';
					}
					if (data.planet[p].FI[i][0]) {
						data.planet[p].RG += ' ' + data.planet[p].FI[i][0] + 'FI';
					}
					if (data.planet[p].TR[i][0]) {
						data.planet[p].RG += ' ' + data.planet[p].TR[i][0] + 'TR';
					}
					if (V.FI[i]+V.TR[i]) {
						data.planet[p].RG += ' (';
					}
					if (V.FI[i]) {
						data.planet[p].RG += '-' + V.FI[i] + 'FI';
					}
					if (V.TR[i]) {
						if (V.FI[i]) {
							data.planet[p].RG += ' ';
						}
						data.planet[p].RG += '-' + V.TR[i]+ 'TR';
					}
					if (V.PDU && data.PV[O][i] == 0 && data.planet[p].TR[i][0] && data.planet[p].FI[i][0] > V.FI[i]) {
						data.planet[p].RG += ' => -' + (Math.floor(Math.min(V.PDU,data.planet[p].PDU)*Math.min((data.planet[p].FI[i][0]-V.FI[i])*5,data.planet[p].TR[i][0])/AT)).toString() + 'PDU';
						DeltaMoral.TR[i] += Math.floor(V.PDU*Math.min(data.planet[p].FI[i][0]*5,data.planet[p].TR[i][0])/AT);
					}
					if (V.FI[i]+V.TR[i]) {
						data.planet[p].RG += ')';
					}
					if (V.FI[i]) {
						data.planet[p].FI[i][0] -= V.FI[i];
						DeltaMoral.FI[i] -= V.FI[i];
					}
					if (V.TR[i]) {
						data.planet[p].TR[i][0] -= V.TR[i];
						DeltaMoral.TR[i] -= V.TR[i];
					}
					
					if (data.planet[p].FI[i][0] && data.PV[O][i] == 0 && i!= O && DS >= AS) {
						data.planet[p].RG += ' ' + data.planet[p].FI[i][0] + 'FI fliehen zum HP';
						data.planet[data.player[i].HP].FI[i][data.D[p][data.player[i].HP]+1] += data.planet[p].FI[i][0];
						data.planet[p].FI[i][0] = 0;
					}
					if (data.planet[p].FI[i][0] && (data.PV[O][i] == 2 || i == 0) && DS < AS) {
						data.planet[p].RG += ' ' + data.planet[p].FI[i][0] + 'FI fliehen zum HP';
						data.planet[data.player[i].HP].FI[i][data.D[p][data.player[i].HP]+1] += data.planet[p].FI[i][0];
						data.planet[p].FI[i][0] = 0;
					}
					data.planet[p].RG += '.\r\n';
				}
			}
			data.planet[p].PDU -= V.PDU;
			data.planet[p].PM -= V.PDU;
			if (AS>DS) {
				data.planet[p].RG += '  Landeversuch: AS:' + Math.floor(ASLV*100)/100 + ' DS:' + Math.floor(DSLV*100)/100 + '\r\n';
				if (ASLV <= DSLV || (ASLV > DSLV && data.planet[p].PDU > 0)) { // revolte
					PDUdestr = Math.min(Math.floor(Math.random()*(data.planet[p].HD+1)),data.planet[p].PDU);
					data.planet[p].PDU -= PDUdestr;
					data.planet[p].PM -= PDUdestr+10;
					if (data.planet[p].PDU > 0) {
						data.planet[p].RG += '  Revolte auf ' + data.planet[p].name + '.\r\n';
						GM += 'Revolte auf ' + data.planet[p].name + '.\r\n';
					} else {
						data.planet[p].O = 0;
						data.planet[p].PM = 40;
						data.planet[p].PDU = data.planet[p].HD;
						data.planet[p].RG += '  Revolution auf ' + data.planet[p].name + ', Planet f&auml;llt an ' + data.player[0].name + '.\r\n';
						GM += 'Revolution auf ' + data.planet[p].name + ', Planet f&auml;llt an ' + data.player[0].name + '.\r\n';
					}
				}
				if (ASLV > DSLV && data.planet[p].PDU == 0) {// LV geglückt
					max = 0;
					winner = 0;
					multiwinner = -1;
					for (j=0;j<9;j++) {
						ATj = Math.min((data.planet[p].FI[j][0]+V.FI[j])*5,data.planet[p].TR[j][0]+V.TR[j]);
						if (data.PV[O][j] == 0 && ATj > max) {
							max = ATj;
							winner = j;
						}
					}
					for (j=0; j<9; j++) {
						ATj = Math.min((data.planet[p].FI[j][0]+V.FI[j])*5,data.planet[p].TR[j][0]+V.TR[j]);
						if (data.PV[O][j] == 0 && ATj == max) {
							multiwinner++;
						}
					}
					if (multiwinner>0) {
						multiwinner = -1;
						maxTM = 49;
						for (j=0;j<9;j++) {
							ATj = Math.min((data.planet[p].FI[j][0]+V.FI[j])*5,data.planet[p].TR[j][0]+V.TR[j]);
							if (data.PV[O][j] == 0 && ATj == max && data.player[j].TM > maxTM) {
								maxTM = data.player[j].TM;
								winner = j;
							}
						}
						for (j=0;j<9;j++) {
							ATj = Math.min((data.planet[p].FI[j][0]+V.FI[j])*5,data.planet[p].TR[j][0]+V.TR[j]);
							if (data.PV[O][j] == 0 && ATj == max && data.player[j].TM == maxTM) {
								multiwinner++;
							}
						}
					}
					if (multiwinner>0) {
						count = 0;
						lottery = Math.floor(Math.random()*(multiwinner + 2));
						for (j=0;j<9;j++) {
							ATj = Math.min((data.planet[p].FI[j][0]+V.FI[j])*5,data.planet[p].TR[j][0]+V.TR[j]);
							if (data.PV[O][j] == 0 && ATj == max && data.player[j].TM == maxTM) {
								count++;
								if (count == lottery) {
									winner = j;
								}
							}
						}
					}
					
					data.planet[p].RG += '  ' + data.planet[p].name + ' f&auml;llt an ' + data.player[winner].name + '.\r\n';
					data.planet[p].O = winner;
					data.planet[p].PM = 50;
					var qstop = 0;
					if (orders[winner].newplanetnamePL != undefined) {qstop = orders[winner].newplanetnamePL.length;}
					for (q=0;q<qstop;q++) {
						if (orders[winner].newplanetnamePL[q] == p && orders[winner].newplanetname[q] != null) {
							data.planet[p].RG += '  ' + data.planet[p].name + ' wird von ' + data.player[winner].name + ' in ' + orders[winner].newplanetname[q] + ' umbenannt.\r\n';
							data.planet[p].name = orders[winner].newplanetname[q];
						}
					}
					GM += data.planet[p].name + ' f&auml;llt an ' + data.player[winner].name + '.\r\n';
				}
			}
			data.planet[p].RG += '\r\n';
			for (i=0;i<9;i++) {
				if (showreport[i]) {
					if (data.player[i].RG == null) {
						data.player[i].RG = data.planet[p].RG;
					} else {
						data.player[i].RG += data.planet[p].RG;
					}
				}
			}
		}
		gefecht = 0;
		sgefecht = 0;
	}	//p-Schleife Ende
		for (i=0;i<9;i++) {
			data.player[i].FM += DeltaMoral.FI[i];
			data.player[i].FM = Math.min(Math.max(data.player[i].FM,50),150);
			data.player[i].TM += DeltaMoral.TR[i];
			data.player[i].TM = Math.min(Math.max(data.player[i].TM,50),150);
		}
	}	//Raumgefechte Ende
	
	//7.9
	//Entladen von Frachtschiffen
	{
	for (p=1;p<41;p++) {
		if (data.planet[p].FI[data.planet[p].O][0]) {
			if (data.planet[p].C[0][0]) {
				data.planet[p].A += data.planet[p].C[0][0]*8;
				data.planet[p].TR[data.planet[p].O][0] += data.planet[p].C[0][0];
				data.planet[p].C[0][0] = 0;
			}
			if (data.planet[p].C[1][0]) {
				data.planet[p].PDU += data.planet[p].C[1][0];
				data.planet[p].TR[data.planet[p].O][0] += data.planet[p].C[1][0];
				data.planet[p].C[1][0] = 0;
			}
			if (data.planet[p].C[2][0]) {
				data.planet[p].FP += data.planet[p].C[2][0]*4;
				data.planet[p].TR[data.planet[p].O][0] += data.planet[p].C[2][0];
				data.planet[p].C[2][0] = 0;
			}
			if (data.planet[p].C[3][0]) {
				data.planet[p].OP += data.planet[p].C[3][0]*5;
				data.planet[p].TR[data.planet[p].O][0] += data.planet[p].C[3][0];
				data.planet[p].C[3][0] = 0;
			}
			if (data.planet[p].C[4][0]) {
				data.planet[p].RP += data.planet[p].C[4][0]*2;
				data.planet[p].TR[data.planet[p].O][0] += data.planet[p].C[4][0];
				data.planet[p].C[4][0] = 0;
			}
			if (data.planet[p].C[5][0]) {
				data.planet[p].FUEL += data.planet[p].C[5][0]*40;
				data.planet[p].TR[data.planet[p].O][0] += data.planet[p].C[5][0];
				data.planet[p].C[5][0] = 0;
			}
			if (data.planet[p].C[6][0]) {
				data.planet[p].ORE += data.planet[p].C[6][0]*50;
				data.planet[p].TR[data.planet[p].O][0] += data.planet[p].C[6][0];
				data.planet[p].C[6][0] = 0;
			}
			if (data.planet[p].C[7][0]) {
				data.planet[p].RARE += data.planet[p].C[7][0]*20;
				data.planet[p].TR[data.planet[p].O][0] += data.planet[p].C[7][0];
				data.planet[p].C[7][0] = 0;
			}
			if (data.planet[p].C[8][0]) {
				data.planet[p].FY += data.planet[p].C[8][0];
				data.planet[p].TR[data.planet[p].O][0] += data.planet[p].C[8][0];
				data.planet[p].C[8][0] = 0;
			}
			if (data.planet[p].C[9][0]) {
				data.planet[p].TY += data.planet[p].C[9][0];
				data.planet[p].TR[data.planet[p].O][0] += data.planet[p].C[9][0];
				data.planet[p].C[9][0] = 0;
			}
		}
	}
	}
	
	//7.10
	//GIP & GNP-Tabelle
	{
	for (p=1;p<41;p++) {
		data.planet[p].GIP = data.planet[p].FP + data.planet[p].OP + data.planet[p].RP + Math.floor((data.planet[p].A*data.planet[p].PR)/20 + (data.planet[p].FUEL + data.planet[p].ORE + data.planet[p].RARE)/10);
		data.planet[p].A += Math.floor(data.planet[p].GIP/40);
		data.planet[p].HD = Math.ceil(data.planet[p].A/40);
		data.planet[p].PR = Math.floor((Math.round(data.planet[p].PR*60)+Math.floor(data.planet[p].GIP/200))*1000/60)/1000;
	}
	//GNP-Tabelle
	for (i=0;i<9;i++) {
		data.player[i].A = 0;
		data.player[i].PL = 0;
		data.player[i].FP = 0;
		data.player[i].OP = 0;
		data.player[i].RP = 0;
		data.player[i].FY = 0;
		data.player[i].TY = 0;
		data.player[i].PDU = 0;
		data.player[i].SP = 0;
		data.player[i].FI = 0;
		data.player[i].TR = 0;
		data.player[i].GIP = 0;
		
		for (p=1;p<41;p++){
			for (d=0;d<5;d++) {
				data.player[i].FI += data.planet[p].FI[i][d];
				data.player[i].TR += data.planet[p].TR[i][d];
			}
			if (data.planet[p].O == i) {
				data.player[i].A += data.planet[p].A;
				data.player[i].PL += 1;
				data.player[i].FP += data.planet[p].FP;
				data.player[i].OP += data.planet[p].OP;
				data.player[i].RP += data.planet[p].RP;
				data.player[i].FY += data.planet[p].FY;
				data.player[i].TY += data.planet[p].TY;
				data.player[i].PDU += data.planet[p].PDU;
				data.player[i].SP += data.planet[p].FUEL + data.planet[p].ORE + data.planet[p].RARE;
				data.player[i].GIP += data.planet[p].GIP;
			}
		}
	}
	CalcRank();
	}
	
	//7.11
	//Siegbedingung
	if (data.end == data.turn) {
		for (i=1;i<9;i++) {
			if (data.rank[i].GNP == 1) {
				GM += 'Der Endturn ist erreicht, die Partie ist beendet.\r\n';
				GM += data.player[i].name +' (Spieler ' + i + ') h&auml;lt Platz 1 der GNP-Tabelle und gewinnt die Partie.\r\n';		
			}
		}
	}
	for (i=1;i<9;i++) {
		if (data.player[i].PL == 14) {
			GM += data.player[i].name + ' (Spieler ' + i + ') h&auml;lt 14 Planeten und gewinnt die Partie.\r\n';
		} else if (data.player[i].PL == 13 && thirteenplanets[i]) {
			GM += data.player[i].name + ' (Spieler ' + i + ') h&auml;lt 13 Planeten einen Turn und gewinnt die Partie.\r\n';
		}
	}
	
	//Galactic Media
	for (i=1;i<9;i++) {
		if (orders[i].publicmessage != undefined && orders[i].publicmessage != "") {
			GM += '&Ouml;ffentliche Nachricht von ' + data.player[i].name + ' (Spieler ' + i + '):<br><textarea cols="80" rows="4" disabled style="background-color:white;">'+orders[i].publicmessage+'</textarea><br><br>';
		}
		for (j=1;j<9;j++) {
			data.player[i].GHB[j] = null;
			if (orders[j].GHB && orders[j].GHB[i] != "") {
				data.player[i].GHB[j] = 'Geheimbotschaft von ' + data.player[j].name + ' (Spieler ' + j + '):<br><textarea cols="80" rows="4" disabled style="background-color:white;">'+orders[j].GHB[i]+'</textarea><br><br>';
			}
		}
	}
	
	var filename = "g" + data.game + "t" + data.turn + ".AoE";
	
	var sdata = JSON.stringify(data);
	
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(sdata));
	pom.setAttribute('download', filename);
	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	} else {
		pom.click();
    }
	
	ptext.innerHTML += 'Spiel: ' + data.game + '  Turn: ' + data.turn + '  gespeichert.\r';
	
	SaveTurns();
}

function CalcRank () {
	for (i=0;i<9;i++) {
		data.rank[i].A = 9;
		data.rank[i].PL = 9;
		data.rank[i].FP = 9;
		data.rank[i].OP = 9;
		data.rank[i].RP = 9;
		data.rank[i].FY = 9;
		data.rank[i].TY = 9;
		data.rank[i].PD = 9;
		data.rank[i].SP = 9;
		data.rank[i].FI = 9;
		data.rank[i].TR = 9;
		data.rank[i].GI = 9;
		data.rank[i].PP = 9;
		data.rank[i].GNP = 9;
	}

	//ranking A
	var r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].A > Max && data.rank[i].A > r) {Max = data.player[i].A};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].A == Max) {
				data.rank[i].A = r;
				c++;
			}
		}
		r += c;
	}
	//ranking PL
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].PL > Max && data.rank[i].PL > r) {Max = data.player[i].PL};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].PL == Max) {
				data.rank[i].PL = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].FP > Max && data.rank[i].FP > r) {Max = data.player[i].FP};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].FP == Max) {
				data.rank[i].FP = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].OP > Max && data.rank[i].OP > r) {Max = data.player[i].OP};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].OP == Max) {
				data.rank[i].OP = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].RP > Max && data.rank[i].RP > r) {Max = data.player[i].RP};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].RP == Max) {
				data.rank[i].RP = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].FY > Max && data.rank[i].FY > r) {Max = data.player[i].FY};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].FY == Max) {
				data.rank[i].FY = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].TY > Max && data.rank[i].TY > r) {Max = data.player[i].TY};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].TY == Max) {
				data.rank[i].TY = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].PDU > Max && data.rank[i].PD > r) {Max = data.player[i].PDU};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].PDU == Max) {
				data.rank[i].PD = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].SP > Max && data.rank[i].SP > r) {Max = data.player[i].SP};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].SP == Max) {
				data.rank[i].SP = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].FI > Max && data.rank[i].FI > r) {Max = data.player[i].FI};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].FI == Max) {
				data.rank[i].FI = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].TR > Max && data.rank[i].TR > r) {Max = data.player[i].TR};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].TR == Max) {
				data.rank[i].TR = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].GIP > Max && data.rank[i].GI > r) {Max = data.player[i].GIP};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].GIP == Max) {
				data.rank[i].GI = r;
				c++;
			}
		}
		r += c;
	}
	r=1;
	while (r<9) {
		var c=0;
		var Max = 0;
		for (i=0;i<9;i++) {
			if (data.player[i].PP > Max && data.rank[i].PP > r) {Max = data.player[i].PP};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].PP == Max) {
				data.rank[i].PP = r;
				c++;
			}
		}
		r += c;
	}
	
	for (i=0;i<9;i++) {
		data.player[i].GNP = Math.round((100*(data.rank[i].A+data.rank[i].PL+data.rank[i].FP+data.rank[i].OP+data.rank[i].RP+data.rank[i].FY+data.rank[i].TY+data.rank[i].PD+data.rank[i].SP+data.rank[i].FI+data.rank[i].TR+data.rank[i].GI+data.rank[i].PP))/13)/100;
	}
	
	r=1;
	while (r<9) {
		var c=0;
		var GNPMin = 9;
		for (i=0;i<9;i++) {
			if (data.player[i].GNP < GNPMin && data.rank[i].GNP > r) {GNPMin = data.player[i].GNP};
		}
		for (i=0;i<9;i++) {
			if (data.player[i].GNP == GNPMin) {
				data.rank[i].GNP = r;
				c++;
			}
		}
		r += c;
	}
}

function GenerateGame() {
	var newgame = document.getElementById('newgameid').value;  
	ptext = document.getElementById('ptext');
  
	var filename = 'g' + newgame + 't0.AoE';
  
	
	var sdata = '{"game":0,"turn":0,"end":30,"player":[{"name":"Neutral","PP":0,"HP":27,"GNP":2.23,"A":2765,"PL":24,"FP":72,"OP":72,"RP":72,"FY":144,"TY":72,"PDU":78,"SP":2160,"GIP":552,"FI":0,"TR":0,"FM":100,"TM":100, "RG": null, "LV": null},{"name":"Spieler 1","HP":1,"PP":0,"A":480,"PL":2,"FP":6,"OP":6,"RP":6,"FY":12,"TY":6,"PDU":13,"SP":180,"GIP":50,"FI":25,"TR":13,"FM":100,"TM":100,"GNP":2.38, "RG": null, "LV": null, "GHB": [null,null,null,null,null,null,null,null,null]},{"name":"Spieler 2","HP":2,"PP":0,"A":350,"PL":2,"FP":6,"OP":6,"RP":6,"FY":12,"TY":6,"PDU":16,"SP":180,"GIP":48,"FI":25,"TR":9,"FM":100,"TM":100,"GNP":3.15, "RG": null, "LV": null, "GHB": [null,null,null,null,null,null,null,null,null]},{"name":"Spieler 3","HP":3,"PP":0,"A":420,"PL":2,"FP":6,"OP":6,"RP":6,"FY":12,"TY":6,"PDU":12,"SP":180,"GIP":50,"FI":25,"TR":17,"FM":100,"TM":100,"GNP":2.54, "RG": null, "LV": null, "GHB": [null,null,null,null,null,null,null,null,null]},{"name":"Spieler 4","HP":4,"PP":0,"A":320,"PL":2,"FP":6,"OP":6,"RP":6,"FY":12,"TY":6,"PDU":17,"SP":180,"GIP":49,"FI":25,"TR":8,"FM":100,"TM":100,"GNP":3.15, "RG": null, "LV": null, "GHB": [null,null,null,null,null,null,null,null,null]},{"name":"Spieler 5","HP":5,"PP":0,"A":445,"PL":2,"FP":6,"OP":6,"RP":6,"FY":12,"TY":6,"PDU":18,"SP":180,"GIP":48,"FI":25,"TR":2,"FM":100,"TM":100,"GNP":2.85, "RG": null, "LV": null, "GHB": [null,null,null,null,null,null,null,null,null]},{"name":"Spieler 6","HP":6,"PP":0,"A":330,"PL":2,"FP":6,"OP":6,"RP":6,"FY":12,"TY":6,"PDU":14,"SP":180,"GIP":49,"FI":25,"TR":11,"FM":100,"TM":100,"GNP":3.08, "RG": null, "LV": null, "GHB": [null,null,null,null,null,null,null,null,null]},{"name":"Spieler 7","HP":7,"PP":0,"A":400,"PL":2,"FP":6,"OP":6,"RP":6,"FY":12,"TY":6,"PDU":12,"SP":180,"GIP":51,"FI":25,"TR":18,"FM":100,"TM":100,"GNP":2.46, "RG": null, "LV": null, "GHB": [null,null,null,null,null,null,null,null,null]},{"name":"Spieler 8","HP":8,"PP":0,"A":360,"PL":2,"FP":6,"OP":6,"RP":6,"FY":12,"TY":6,"PDU":15,"SP":180,"GIP":50,"FI":25,"TR":10,"FM":100,"TM":100,"GNP":2.69, "RG": null, "LV": null, "GHB": [null,null,null,null,null,null,null,null,null]}], "PV":[[1,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1]],"planet":[null,{"name":"Earth","A":240,"PR":0.683,"PDU":6,"X":50.1,"Y":-13.5,"O":1,"FI":[[0,0,0,0,0],[15,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[4,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":150,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":26,"RG":null,"LV":null},{"name":"Crab","A":240,"PR":0.666,"PDU":6,"X":76.1,"Y":-20.3,"O":2,"FI":[[0,0,0,0,0],[0,0,0,0,0],[15,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[3,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":150,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":25,"RG":null,"LV":null},{"name":"Eastside","A":240,"PR":0.833,"PDU":6,"X":97.2,"Y":-40.4,"O":3,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[15,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[10,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":150,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":27,"RG":null,"LV":null},{"name":"Nameless","A":240,"PR":0.65,"PDU":6,"X":77,"Y":-61.3,"O":4,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[15,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[3,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":150,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":25,"RG":null,"LV":null},{"name":"Lenin","A":240,"PR":0.616,"PDU":6,"X":50.1,"Y":-68,"O":5,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[15,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":150,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":25,"RG":null,"LV":null},{"name":"Shadow","A":240,"PR":0.7,"PDU":6,"X":23.2,"Y":-61.1,"O":6,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[15,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[5,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":150,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":26,"RG":null,"LV":null},{"name":"Sombrero","A":240,"PR":0.816,"PDU":6,"X":2,"Y":-41,"O":7,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[15,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[10,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":150,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":27,"RG":null,"LV":null},{"name":"Lone Star","A":240,"PR":0.716,"PDU":6,"X":22.1,"Y":-20,"O":8,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[15,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[5,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":150,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":26,"RG":null,"LV":null},{"name":"Barnard\'s Arrow","A":240,"PR":0.5,"PDU":7,"X":54,"Y":-2.1,"O":1,"FI":[[0,0,0,0,0],[10,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[9,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":24,"RG":null,"LV":null},{"name":"Outpost","A":110,"PR":1.083,"PDU":10,"X":81.9,"Y":-23.2,"O":2,"FI":[[0,0,0,0,0],[0,0,0,0,0],[10,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[6,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":23,"RG":null,"LV":null},{"name":"Desert Rock","A":180,"PR":0.666,"PDU":6,"X":90.5,"Y":-39.4,"O":3,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[10,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[7,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":5,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":23,"RG":null,"LV":null},{"name":"Mechanica","A":80,"PR":1.5,"PDU":11,"X":81.9,"Y":-58.5,"O":4,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[10,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[5,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":2,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":24,"RG":null,"LV":null},{"name":"Last Hope","A":205,"PR":0.583,"PDU":12,"X":44.3,"Y":-69.7,"O":5,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[10,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":23,"RG":null,"LV":null},{"name":"Wilderness","A":90,"PR":1.333,"PDU":8,"X":17.4,"Y":-52.5,"O":6,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[10,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[6,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":23,"RG":null,"LV":null},{"name":"Tramp","A":160,"PR":0.75,"PDU":6,"X":7.8,"Y":-42,"O":7,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[10,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[8,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":4,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":24,"RG":null,"LV":null},{"name":"New Nome","A":120,"PR":1,"PDU":9,"X":18.3,"Y":-30.5,"O":8,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[10,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[5,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":24,"RG":null,"LV":null},{"name":"Kalgourlie","A":160,"PR":1,"PDU":4,"X":30.8,"Y":-16.3,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":4,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":26,"RG":null,"LV":null},{"name":"Draken","A":180,"PR":0.833,"PDU":5,"X":63.7,"Y":-20.3,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":5,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":25,"RG":null,"LV":null},{"name":"Rivet","A":220,"PR":0.666,"PDU":6,"X":37.5,"Y":-22.8,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":25,"RG":null,"LV":null},{"name":"Crossland","A":230,"PR":1,"PDU":6,"X":54.5,"Y":-26.9,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":29,"RG":null,"LV":null},{"name":"Beyond","A":80,"PR":0.666,"PDU":2,"X":71.2,"Y":-29.8,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":2,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":20,"RG":null,"LV":null},{"name":"New Earth","A":110,"PR":1,"PDU":3,"X":35.5,"Y":-36.2,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":23,"RG":null,"LV":null},{"name":"Scott\'s Home","A":150,"PR":0.833,"PDU":4,"X":42.3,"Y":-32.5,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":4,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":24,"RG":null,"LV":null},{"name":"Newton","A":120,"PR":1.166,"PDU":3,"X":62.5,"Y":-33.5,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":24,"RG":null,"LV":null},{"name":"Murphy","A":85,"PR":1.333,"PDU":3,"X":31.7,"Y":-41.9,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":23,"RG":null,"LV":null},{"name":"Aitchison","A":100,"PR":0.583,"PDU":3,"X":45.2,"Y":-44.8,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":20,"RG":null,"LV":null},{"name":"Landfall","A":90,"PR":1.083,"PDU":3,"X":51.2,"Y":-39.3,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":22,"RG":null,"LV":null},{"name":"Atlas","A":80,"PR":0.833,"PDU":2,"X":58.8,"Y":-43,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":2,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":21,"RG":null,"LV":null},{"name":"New Mecca","A":80,"PR":1,"PDU":2,"X":68.3,"Y":-41.1,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":2,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":22,"RG":null,"LV":null},{"name":"Evergreen","A":110,"PR":1.166,"PDU":3,"X":61.6,"Y":-47.9,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":24,"RG":null,"LV":null},{"name":"New Jerusalem","A":100,"PR":0.916,"PDU":3,"X":37.8,"Y":-51.6,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":22,"RG":null,"LV":null},{"name":"Lesser Evil","A":160,"PR":1.083,"PDU":4,"X":52.8,"Y":-50.9,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":4,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":26,"RG":null,"LV":null},{"name":"Lermontov","A":90,"PR":1.25,"PDU":3,"X":70.5,"Y":-52.8,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":3,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":23,"RG":null,"LV":null},{"name":"Einstein","A":220,"PR":1.25,"PDU":6,"X":53.2,"Y":-60.3,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":6,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":31,"RG":null,"LV":null},{"name":"Dunroamin","A":180,"PR":0.75,"PDU":5,"X":61.9,"Y":-58.5,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":5,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":24,"RG":null,"LV":null},{"name":"Strife","A":140,"PR":1.166,"PDU":4,"X":33,"Y":-63,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":4,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":26,"RG":null,"LV":null},{"name":"Potter\'s Bar","A":20,"PR":0.5,"PDU":1,"X":18.4,"Y":-40.2,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":1,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":18,"RG":null,"LV":null},{"name":"Kaironow","A":20,"PR":0.5,"PDU":1,"X":42.4,"Y":-40,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":1,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":18,"RG":null,"LV":null},{"name":"Stormbringer","A":20,"PR":0.5,"PDU":1,"X":55.1,"Y":-40.3,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":1,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":18,"RG":null,"LV":null},{"name":"Mike\'s Dream","A":20,"PR":0.5,"PDU":1,"X":79.1,"Y":-40.4,"O":0,"FI":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"TR":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"C":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"PM":100,"HD":1,"FUEL":30,"ORE":30,"RARE":30,"FP":3,"OP":3,"RP":3,"FY":6,"TY":3,"GIP":18}],"rank":[{"A":1,"PL":1,"FP":1,"OP":1,"RP":1,"FY":1,"TY":1,"PD":1,"SP":1,"FI":9,"TR":9,"GI":1,"PP":1,"GNP":1},{"A":2,"PL":2,"FP":2,"OP":2,"RP":2,"FY":2,"TY":2,"PD":7,"SP":2,"FI":1,"TR":3,"GI":3,"PP":1,"GNP":2},{"A":7,"PL":2,"FP":2,"OP":2,"RP":2,"FY":2,"TY":2,"PD":4,"SP":2,"FI":1,"TR":6,"GI":8,"PP":1,"GNP":8},{"A":4,"PL":2,"FP":2,"OP":2,"RP":2,"FY":2,"TY":2,"PD":8,"SP":2,"FI":1,"TR":2,"GI":3,"PP":1,"GNP":4},{"A":9,"PL":2,"FP":2,"OP":2,"RP":2,"FY":2,"TY":2,"PD":3,"SP":2,"FI":1,"TR":7,"GI":6,"PP":1,"GNP":8},{"A":3,"PL":2,"FP":2,"OP":2,"RP":2,"FY":2,"TY":2,"PD":2,"SP":2,"FI":1,"TR":8,"GI":8,"PP":1,"GNP":6},{"A":8,"PL":2,"FP":2,"OP":2,"RP":2,"FY":2,"TY":2,"PD":6,"SP":2,"FI":1,"TR":4,"GI":6,"PP":1,"GNP":7},{"A":5,"PL":2,"FP":2,"OP":2,"RP":2,"FY":2,"TY":2,"PD":8,"SP":2,"FI":1,"TR":1,"GI":2,"PP":1,"GNP":3},{"A":6,"PL":2,"FP":2,"OP":2,"RP":2,"FY":2,"TY":2,"PD":5,"SP":2,"FI":1,"TR":5,"GI":3,"PP":1,"GNP":5}],"D":[null,[null,0,1,3,3,3,3,3,2,0,2,3,3,3,3,3,2,1,1,1,1,1,1,1,1,2,2,1,2,2,2,2,2,3,3,3,3,2,2,1,2],[null,1,0,2,2,3,3,3,3,2,0,1,2,3,3,3,3,3,0,2,1,0,3,2,1,3,2,2,2,1,2,3,2,2,3,2,3,3,2,2,1],[null,3,2,0,2,3,3,3,3,3,1,0,1,3,3,3,3,3,2,3,3,2,3,3,2,3,3,3,2,2,2,3,3,2,3,2,3,3,3,3,1],[null,3,2,2,0,1,3,3,3,3,2,1,0,2,3,3,3,3,3,3,2,2,3,3,2,3,2,2,1,1,1,2,1,0,1,1,3,3,2,2,1],[null,3,3,3,1,0,2,3,3,3,3,3,2,0,2,3,3,3,3,3,2,3,2,2,2,2,1,2,1,2,1,1,1,1,0,1,1,3,2,2,2],[null,3,3,3,3,2,0,2,2,3,3,3,3,1,0,1,2,3,3,2,3,3,2,2,3,1,1,2,2,3,2,1,2,3,2,2,0,1,2,2,3],[null,3,3,3,3,3,2,0,2,3,3,3,3,3,1,0,1,2,3,2,3,3,2,2,3,2,3,3,3,3,3,2,3,3,3,3,2,1,2,3,3],[null,2,3,3,3,3,2,2,0,2,3,3,3,3,2,1,0,0,3,1,2,3,1,1,3,1,2,2,3,3,3,2,3,3,3,3,3,1,2,2,3],[null,0,2,3,3,3,3,3,2,0,2,3,3,3,3,3,3,2,1,1,1,2,2,2,2,3,3,2,2,3,3,3,3,3,3,3,3,3,2,2,3],[null,2,0,1,2,3,3,3,3,2,0,1,2,3,3,3,3,3,1,3,2,0,3,2,1,3,3,2,2,1,2,3,2,2,3,2,3,3,3,2,1],[null,3,1,0,1,3,3,3,3,3,1,0,1,3,3,3,3,3,2,3,2,1,3,3,2,3,3,2,2,1,2,3,2,1,3,2,3,3,3,2,0],[null,3,2,1,0,2,3,3,3,3,2,1,0,2,3,3,3,3,3,3,3,2,3,3,2,3,2,2,1,1,1,3,2,0,2,1,3,3,3,2,1],[null,3,3,3,2,0,1,3,3,3,3,3,2,0,2,3,3,3,3,3,3,3,2,2,2,2,1,2,2,2,2,1,1,2,0,1,0,2,2,2,3],[null,3,3,3,3,2,0,1,2,3,3,3,3,2,0,1,1,2,3,2,3,3,1,2,3,1,2,2,3,3,3,1,2,3,2,3,1,0,2,2,3],[null,3,3,3,3,3,1,0,1,3,3,3,3,3,1,0,1,2,3,2,3,3,2,2,3,1,2,3,3,3,3,2,3,3,3,3,2,0,2,3,3],[null,2,3,3,3,3,2,1,0,3,3,3,3,3,1,1,0,1,3,1,2,3,1,1,3,1,2,2,3,3,3,2,2,3,3,3,2,0,1,2,3],[null,1,3,3,3,3,3,2,0,2,3,3,3,3,2,2,1,0,2,0,1,3,1,1,2,1,2,2,2,3,3,2,2,3,3,3,3,1,1,2,3],[null,1,0,2,3,3,3,3,3,1,1,2,3,3,3,3,3,2,0,1,0,0,2,1,0,2,2,1,1,1,2,2,2,2,2,2,3,3,2,1,1],[null,1,2,3,3,3,2,2,1,1,3,3,3,3,2,2,1,0,1,0,1,2,0,0,2,1,1,1,2,2,2,2,2,3,2,3,2,1,1,1,3],[null,1,1,3,2,2,3,3,2,1,2,2,3,3,3,3,2,1,0,1,0,1,1,0,0,1,1,0,1,1,1,2,1,2,2,2,3,2,1,0,2],[null,1,0,2,2,3,3,3,3,2,0,1,2,3,3,3,3,3,0,2,1,0,2,2,0,3,2,1,1,0,1,2,2,1,2,2,3,3,2,1,0],[null,1,3,3,3,2,2,2,1,2,3,3,3,2,1,2,1,1,2,0,1,2,0,0,2,0,0,1,1,2,2,1,1,2,2,2,1,1,0,1,3],[null,1,2,3,3,2,2,2,1,2,2,3,3,2,2,2,1,1,1,0,0,2,0,0,1,1,0,0,1,2,1,1,1,2,2,2,2,1,0,1,2],[null,1,1,2,2,2,3,3,3,2,1,2,2,2,3,3,3,2,0,2,0,0,2,1,0,2,1,0,0,0,1,2,1,1,2,1,3,3,1,0,1],[null,2,3,3,3,2,1,2,1,3,3,3,3,2,1,1,1,1,2,1,1,3,0,1,2,0,0,1,2,2,2,0,1,2,2,2,1,0,0,1,3],[null,2,2,3,2,1,1,3,2,3,3,3,2,1,2,2,2,2,2,1,1,2,0,0,1,0,0,0,1,1,1,0,0,1,1,1,1,1,0,0,2],[null,1,2,3,2,2,2,3,2,2,2,2,2,2,2,3,2,2,1,1,0,1,1,0,0,1,0,0,0,1,0,1,0,1,1,1,2,2,0,0,2],[null,2,2,2,1,1,2,3,3,2,2,2,1,2,3,3,3,2,1,2,1,1,1,1,0,2,1,0,0,0,0,1,0,1,1,1,2,2,1,0,1],[null,2,1,2,1,2,3,3,3,3,1,1,1,2,3,3,3,3,1,2,1,0,2,2,0,2,1,1,0,0,0,2,1,0,1,1,3,3,1,0,0],[null,2,2,2,1,1,2,3,3,3,2,2,1,2,3,3,3,3,2,2,1,1,2,1,1,2,1,0,0,0,0,1,0,0,1,0,2,3,1,0,1],[null,2,3,3,2,1,1,2,2,3,3,3,3,1,1,2,2,2,2,2,2,2,1,1,2,0,0,1,1,2,1,0,1,2,1,1,0,1,0,1,3],[null,2,2,3,1,1,2,3,3,3,2,2,2,1,2,3,2,2,2,2,1,2,1,1,1,1,0,0,0,1,0,1,0,1,0,0,1,2,1,0,2],[null,3,2,2,0,1,3,3,3,3,2,1,0,2,3,3,3,3,2,3,2,1,2,2,1,2,1,1,1,0,0,2,1,0,1,0,2,3,2,1,1],[null,3,3,3,1,0,2,3,3,3,3,3,2,0,2,3,3,3,2,2,2,2,2,2,2,2,1,1,1,1,1,1,0,1,0,0,1,2,1,1,2],[null,3,2,2,1,1,2,3,3,3,2,2,1,1,3,3,3,3,2,3,2,2,2,2,1,2,1,1,1,1,0,1,0,0,0,0,2,3,1,1,1],[null,3,3,3,3,1,0,2,3,3,3,3,3,0,1,2,2,3,3,2,3,3,1,2,3,1,1,2,2,3,2,0,1,2,1,2,0,1,1,2,3],[null,2,3,3,3,3,1,1,1,3,3,3,3,2,0,0,0,1,3,1,2,3,1,1,3,0,1,2,2,3,3,1,2,3,2,3,1,0,1,2,3],[null,2,2,3,2,2,2,2,2,2,3,3,3,2,2,2,1,1,2,1,1,2,0,0,1,0,0,0,1,1,1,0,1,2,1,1,1,1,0,0,2],[null,1,2,3,2,2,2,3,2,2,2,2,2,2,2,3,2,2,1,1,0,1,1,1,0,1,0,0,0,0,0,1,0,1,1,1,2,2,0,0,1],[null,2,1,1,1,2,3,3,3,3,1,0,1,3,3,3,3,3,1,3,2,0,3,2,1,3,2,2,1,0,1,3,2,1,2,1,3,3,2,1,0]]}';
	
	data = JSON.parse(sdata);

	data.game = newgame;
	
	CalcRank();
		
	sdata = JSON.stringify(data);
	
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(sdata));
	pom.setAttribute('download', filename);

	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	} else {
		pom.click();
    }
		
	ptext.innerHTML += 'Spiel: ' + newgame + '  Turn: 0  generiert und geladen.\r';
	
	SaveTurns();	 
}