'use strict';

var htmldecode = (function() {
	var entities = [
		['nbsp', ' '], ['middot', '·'],
		['quot', '"'], ['apos', "'"], ['gt',   '>'], ['lt',   '<'], ['amp',  '&']
	].map(function(x) { return [new RegExp('&' + x[0] + ';', "ig"), x[1]]; });
	return function htmldecode(str) {
		var o = str
				// Remove new lines and spaces from start of content
				.replace(/^[\t\n\r ]+/, "")
				// Remove new lines and spaces from end of content
				.replace(/[\t\n\r ]+$/,"")
				// Added line which removes any white space characters after and before html tags
				.replace(/>\s+/g,">").replace(/\s+</g,"<")
				// Replace remaining new lines and spaces with space
				.replace(/[\t\n\r ]+/g, " ")
				// Replace <br> tags with new lines
				.replace(/<\s*[bB][rR]\s*\/?>/g,"\n")
				// Strip HTML elements
				.replace(/<[^>]*>/g,"");
		for(var i = 0; i < entities.length; ++i) o = o.replace(entities[i][0], entities[i][1]);
		return o;
	};
})();


function parse_dom_table(table, _opts) {
	var opts = _opts || {};
	var ws = opts.dense ? ([]) : ({});
	return sheet_add_dom(ws, table, _opts);
}

function sheet_add_dom(ws, table, _opts) {
	var opts = _opts || {};
	var or_R = 0, or_C = 0;
	if(opts.origin != null) {
		if(typeof opts.origin == 'number') or_R = opts.origin;
		else {
			var _origin = typeof opts.origin == "string" ? decode_cell(opts.origin) : opts.origin;
			or_R = _origin.r; or_C = _origin.c;
		}
	}

	var rows = table.getElementsByTagName('tr');
	var sheetRows = Math.min(opts.sheetRows||10000000, rows.length);
	var range = {s:{r:0,c:0},e:{r:or_R,c:or_C}};
	if(ws["!ref"]) {
		var _range = decode_range(ws["!ref"]);
		range.s.r = Math.min(range.s.r, _range.s.r);
		range.s.c = Math.min(range.s.c, _range.s.c);
		range.e.r = Math.max(range.e.r, _range.e.r);
		range.e.c = Math.max(range.e.c, _range.e.c);
		if(or_R == -1) range.e.r = or_R = _range.e.r + 1;
	}
	var merges = [], midx = 0;
	var rowinfo = ws["!rows"] || (ws["!rows"] = []);
	var _R = 0, R = 0, _C = 0, C = 0, RS = 0, CS = 0;
	if(!ws["!cols"]) ws['!cols'] = [];
	for(; _R < rows.length && R < sheetRows; ++_R) {
		var row = rows[_R];
		if (is_dom_element_hidden(row)) {
			if (opts.display) continue;
			rowinfo[R] = {hidden: true};
		}
		var elts = (row.children);
		for(_C = C = 0; _C < elts.length; ++_C) {
			var elt = elts[_C];
			if (opts.display && is_dom_element_hidden(elt)) continue;
			var v = elt.hasAttribute('data-v') ? elt.getAttribute('data-v') : elt.hasAttribute('v') ? elt.getAttribute('v') : htmldecode(elt.innerHTML);
			var z = elt.getAttribute('data-z') || elt.getAttribute('z');
			for(midx = 0; midx < merges.length; ++midx) {
				var m = merges[midx];
				if(m.s.c == C + or_C && m.s.r < R + or_R && R + or_R <= m.e.r) { C = m.e.c+1 - or_C; midx = -1; }
			}
			/* TODO: figure out how to extract nonstandard mso- style */
			CS = +elt.getAttribute("colspan") || 1;
			if( ((RS = (+elt.getAttribute("rowspan") || 1)))>1 || CS>1) merges.push({s:{r:R + or_R,c:C + or_C},e:{r:R + or_R + (RS||1) - 1, c:C + or_C + (CS||1) - 1}});
			var o = {t:'s', v:v};
			var _t = elt.getAttribute("data-t") || elt.getAttribute("t") || "";
			if(v != null) {
				if(v.length == 0) o.t = _t || 'z';
				else if(opts.raw || v.trim().length == 0 || _t == "s");
				else if(v === 'TRUE') o = {t:'b', v:true};
				else if(v === 'FALSE') o = {t:'b', v:false};
				else if(!isNaN(fuzzynum(v))) o = {t:'n', v:fuzzynum(v)};
				else if(!isNaN(fuzzydate(v).getDate())) {
					o = ({t:'d', v:parseDate(v)});
					if(!opts.cellDates) o = ({t:'n', v:datenum(o.v)});
					o.z = opts.dateNF || table_fmt[14];
				}
			}
			if(o.z === undefined && z != null) o.z = z;
			var l = "", Aelts = elt.getElementsByTagName("A");
			if(Aelts && Aelts.length) for(var Aelti = 0; Aelti < Aelts.length; ++Aelti)	if(Aelts[Aelti].hasAttribute("href")) {
				l = Aelts[Aelti].getAttribute("href"); if(l.charAt(0) != "#") break;
			}
			if(l && l.charAt(0) != "#" &&	l.slice(0, 11).toLowerCase() != 'javascript:') o.l = ({ Target: l });
			if(opts.dense) { if(!ws[R + or_R]) ws[R + or_R] = []; ws[R + or_R][C + or_C] = o; }
			else ws[encode_cell({c:C + or_C, r:R + or_R})] = o;
			if(range.e.c < C + or_C) range.e.c = C + or_C;
			C += CS;
		}
		++R;
	}
	if(merges.length) ws['!merges'] = (ws["!merges"] || []).concat(merges);
	range.e.r = Math.max(range.e.r, R - 1 + or_R);
	ws['!ref'] = encode_range(range);
	if(R >= sheetRows) ws['!fullref'] = encode_range((range.e.r = rows.length-_R+R-1 + or_R,range)); // We can count the real number of rows to parse but we don't to improve the performance
	return ws;
}
function is_dom_element_hidden(element) {
	var display = '';
	var get_computed_style = get_get_computed_style_function(element);
	if(get_computed_style) display = get_computed_style(element).getPropertyValue('display');
	if(!display) display = element.style && element.style.display;
	return display === 'none';
}
function get_get_computed_style_function(element) {
	if(element.ownerDocument.defaultView && typeof element.ownerDocument.defaultView.getComputedStyle === 'function') return element.ownerDocument.defaultView.getComputedStyle;
	if(typeof getComputedStyle === 'function') return getComputedStyle;
	return null;
}
function fuzzynum(s) {
	var v = Number(s);
	if(!isNaN(v)) return isFinite(v) ? v : NaN;
	if(!/\d/.test(s)) return v;
	var wt = 1;
	var ss = s.replace(/([\d]),([\d])/g,"$1$2").replace(/[$]/g,"").replace(/[%]/g, function() { wt *= 100; return "";});
	if(!isNaN(v = Number(ss))) return v / wt;
	ss = ss.replace(/[(](.*)[)]/,function($$, $1) { wt = -wt; return $1;});
	if(!isNaN(v = Number(ss))) return v / wt;
	return v;
}

function encode_cell(cell) {
	var col = cell.c + 1;
	var s="";
	for(; col; col=((col-1)/26)|0) s = String.fromCharCode(((col-1)%26) + 65) + s;
	return s + (cell.r + 1);
}
function encode_range(cs,ce) {
	if(typeof ce === 'undefined' || typeof ce === 'number') {
        return encode_range(cs.s, cs.e);
	}
    if(typeof cs !== 'string') cs = encode_cell((cs));
	if(typeof ce !== 'string') ce = encode_cell((ce));
    return cs == ce ? cs : cs + ":" + ce;
}

module.exports = parse_dom_table;
