class Point {
}
class vectorDiagram {
    constructor(idVectorDia, idVectorPowerDia) {
        this.idVectorDia = idVectorDia;
        this.idVectorPowerDia = idVectorPowerDia;
    }
    PairVector(Fa, Ua, h, Pa, Sa, Ia, Qa, color) {
        let VoltagePoint = this.VoltagePoint(Fa, Ua, h);
        this.drawVector(VoltagePoint, color, false, this.idVectorDia);
        let CarrentPoint = this.CarrentPoint(Fa, Pa, Sa, Ia, Qa, h);
        this.drawVector(CarrentPoint, color, true, this.idVectorDia);
    }
    VoltagePoint(fi, u, half) {
        let x = half + u * Math.cos(fi);
        let y = half - u * Math.sin(fi);
        return { x: x, y: y };
    }
    CarrentPoint(phase, p, s, i, q, half) {
        let xfi = Math.acos(p / s);
        if (q < 0) {
            xfi = -1 * xfi;
        }
        xfi = phase - xfi;
        xfi = Math.cos(xfi);
        let x = half + i * xfi;
        let yfi = Math.acos(p / s);
        if (q < 0) {
            yfi = -1 * yfi;
        }
        yfi = phase - yfi;
        yfi = Math.sin(yfi);
        let y = half - i * yfi;
        return { x: x, y: y };
    }
    drawVector(point, color, dash, id, x0 = 75, y0 = 75, lineWidth = 3, fillText = "", textX = 0, textY = 0) {
        var canvas = document.getElementById(id);
        var context = canvas.getContext("2d");
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(point.x, point.y);
        context.lineWidth = lineWidth;
        context.setLineDash(dash ? [5, 2] : []);
        context.strokeStyle = color;
        if (fillText != "") {
            context.fillStyle = "#fff";
            context.fillText(fillText, textX, textY);
        }
        context.stroke();
    }
    redraw(Ia, Ib, Ic, Ua, Ub, Uc, P, Q, Pa, Pb, Pc, Sa, Sb, Sc, Qa, Qb, Qc) {
        let h = 75;
        let Ki = this.Max(Ia, Ib, Ic);
        let Ku = this.Max(Ua, Ub, Uc);
        let Kfull = this.Max(Math.abs(P), Math.abs(Q), 0);
        let Fa = this.Grad2Rad(0 + 90);
        let Fb = this.Grad2Rad(-120 + 90);
        let Fc = this.Grad2Rad(120 + 90);
        Ia = (Ia / Ki) * 50;
        Ib = (Ib / Ki) * 50;
        Ic = (Ic / Ki) * 50;
        Ua = (Ua / Ku) * 75;
        Ub = (Ub / Ku) * 75;
        Uc = (Uc / Ku) * 75;
        P = (P / Kfull) * 75;
        Q = (Q / Kfull) * 75;
        this.Furnitura();
        this.PairVector(Fa, Ua, h, Pa, Sa, Ia, Qa, '#f00');
        this.PairVector(Fb, Ub, h, Pb, Sb, Ib, Qb, '#0f0');
        this.PairVector(Fc, Uc, h, Pc, Sc, Ic, Qc, '#ff0');
        this.drawVector({ x: Q, y: P }, '#fff', false, this.idVectorPowerDia);
    }
    Max(Ia, Ib, Ic) {
        if (Ia >= Ib) {
            if (Ia >= Ic) {
                return Ia;
            }
            else {
                return Ic;
            }
        }
        else {
            if (Ib >= Ic) {
                return Ib;
            }
            else {
                return Ic;
            }
        }
    }
    Grad2Rad(grad) {
        return (grad / 57.3);
    }
    Furnitura() {
        this.drawVector({ x: 150, y: 75 }, "#349", false, this.idVectorDia, 0, 75, 2);
        this.drawVector({ x: 75, y: 150 }, "#349", false, this.idVectorDia, 75, 0, 2);
        this.drawVector({ x: 150, y: 75 }, "#349", false, this.idVectorPowerDia, 0, 75, 2, "P", 80, 10);
        this.drawVector({ x: 75, y: 150 }, "#349", false, this.idVectorPowerDia, 75, 0, 2, "Q", 140, 70);
    }
}
let vector = new vectorDiagram("vector", "vector_power");
vector.redraw(1.333, 1.333, 1.333, 228.53, 228.53, 228.53, 138.42, -870, 49, 49, 49, 304, 304, 304, -300, -300, -300);
function setHtml(id, html) {
    var generateHere = document.getElementById(id);
    generateHere.innerHTML = html;
}
function about(name) {
    if (name == "TC")
        setHtml("right_ts_tu", '������������ �� ���������� ��� ��������� "������ ��", ���������� �� ������� 230� ����������� ���� � �����-���� ��');
    if (name == "TU")
        setHtml("right_ts_tu", '���� ���-01�� ��������� ������������� ���� ��... ');
    if (name == "RP")
        setHtml("right_ts_tu", '��������� ������� � ������ ����������� ���������� 24 ������ ����������� ����.');
}
Animations();
function Animations() {
    document.getElementById('css').innerHTML = '<style>.wrap {margin-top: -300 !important;}</style>';
    setTimeout("document.getElementById('css').innerHTML='<style>.wrap {margin-top: 0 !important;-webkit-transition: top 1s ease-out 0.5s;-moz-transition: top 1s ease-out 0.5s;-o-transition: top 1s ease-out 0.5s;transition: 0.5s ease-out 0.5s;}</style>'", 100);
}
setParametrs();
function setParametrs() {
    let a = document.getElementById('kprname').innerHTML;
    try {
        let regpit = "��(.{2,3})";
        document.getElementById('regpit').innerHTML = a.match(regpit)[1] + "� �������";
    }
    catch (e) { }
    try {
        let regtu = "([0-9]{1,2})��";
        document.getElementById('regtu').innerHTML = a.match(regtu)[1] + " ��";
    }
    catch (e) { }
    try {
        let regts = "[0-9]{1,2}��[0-9]{2,3}";
        document.getElementById('regts').innerHTML = a.match(regts)[0] + "�";
    }
    catch (e) { }
    try {
        let regeth = "([0-9]{1,2})E";
        document.getElementById('regeth').innerHTML = a.match(regeth)[1] + " Ethernet";
    }
    catch (e) {
        try {
            let regrs = "()E";
            document.getElementById('regrs').innerHTML = "1 Ethernet";
        }
        catch (e) { }
    }
    try {
        let regrs = "([0-9]{1,2})R";
        document.getElementById('regrs').innerHTML = a.match(regrs)[1] + " RS-485";
    }
    catch (e) {
        try {
            let regrs = "()R";
            document.getElementById('regrs').innerHTML = "1 RS-485";
        }
        catch (e) { }
    }
}
